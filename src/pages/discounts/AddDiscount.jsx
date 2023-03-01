import React, { useEffect, useState } from 'react';
import { Form, Formik } from 'formik';
import ModalContainer from '../../components/ModalContainer';
import FormikControl from '../../components/form/FormikControl';
import { initialValues, onSubmit, validationSchema } from './discountsFormikCodes';
import { getAllProductsTitlesService } from '../../services/productServices';
import { convertDateToJalali } from '../../utils/convertDate';
import { useLocation, useNavigate, useOutletContext } from 'react-router-dom';


const AddDiscount = () => {
    const [allProducts, setAllProducts] = useState([]);
    const [reinitializeValues, setReinitializeValues] = useState(null);
    const [initProducts, setInitProducts] = useState([]); // used in editing discount

    const navigate = useNavigate();

    const location = useLocation();
    const editDiscount = location.state?.editDiscount;

    const { setData } = useOutletContext();

    const handleGetAllProducts = async () => {
        try {
            const response = await getAllProductsTitlesService();
            if (response.status === 200) {
                const products = response.data.data.map(p => {
                    return { id: p.id, value: p.title };
                });
                setAllProducts(products);
            }
        } catch (error) {

        }
    }

    const handleSetInitialProducts = () => {
        if (editDiscount) {
            setInitProducts(editDiscount.products.map(p => {
                return { id: p.id, value: p.title };
            }));
        }
    }

    const handleSetSelectedProducts = (formik) => {
        const selectedProductsIds = formik.values.product_ids.split("-").filter(id => id);
        let selectedProducts = [];
        for (let id of selectedProductsIds) {
            selectedProducts = [...selectedProducts, allProducts.filter(p => p.id == id)[0]];
        }
        selectedProducts = selectedProducts.filter(p => p);

        return (
            <FormikControl
                control="searchableSelect"
                formikOptions={formik}
                resultType="string"
                name="product_ids"
                label="محصولات"
                options={allProducts}
                className="label-8rem mt-1 animate__animated animate__headShake"
                headerText="انتخاب محصول"
                placeHolder="قسمتی از نام محصول را وارد کنید"
                initialItems={selectedProducts.length > 0 ? selectedProducts : initProducts}
            />
        );
    }

    useEffect(() => {
        handleGetAllProducts();
    }, []);

    useEffect(() => {
        if (editDiscount) {
            handleSetInitialProducts();

            for (let key in editDiscount) {
                editDiscount[key] === null && (editDiscount[key] = "");
            }

            setReinitializeValues({
                title: editDiscount.title,
                code: editDiscount.code,
                percent: editDiscount.percent,
                expire_at: convertDateToJalali(editDiscount.expire_at),
                for_all: editDiscount.for_all === 1 ? true : false,
                product_ids: editDiscount.products.map(p => p.id).join("-")
            })
        } else {
            setReinitializeValues(null);
        }
    }, [editDiscount]);

    return (
        <>
            {/* <button className="btn btn-success d-flex justify-content-center align-items-center"
                data-bs-toggle="modal" data-bs-target="#add_discount_modal"
                onClick={() => setEditDiscount(null)}>
                <i className="fas fa-plus text-light"></i>
            </button> */}

            <ModalContainer
                id={"add_discount_modal"}
                title={editDiscount ? "ویرایش کد تخفیف" : "افزودن کد تخفیف"}
                fullScreen={false}
                className="show d-block"
                closeFunction={() => navigate(-1)}
            >
                <div className="container">
                    <Formik
                        initialValues={reinitializeValues || initialValues}
                        onSubmit={(values, actions) => onSubmit(values, actions, setData,
                            editDiscount, navigate, setReinitializeValues)}
                        validationSchema={validationSchema}
                        enableReinitialize
                    >
                        {(formik) => {
                            return (
                                <Form>
                                    <div className="row justify-content-center">
                                        <FormikControl
                                            control="input"
                                            name="title"
                                            label="عنوان تخفیف"
                                            type="text"
                                            className="label-8rem"
                                            placeHolder="عنوان تخفیف را وارد کنید"
                                        />

                                        <FormikControl
                                            control="input"
                                            name="code"
                                            label="کد تخفیف"
                                            type="text"
                                            className="label-8rem"
                                            placeHolder="کد تخفیف را وارد کنید"
                                        />

                                        <FormikControl
                                            control="input"
                                            name="percent"
                                            label="درصد تخفیف"
                                            type="number"
                                            className="label-8rem"
                                            placeHolder="فقط عدد"
                                        />

                                        <FormikControl
                                            control="date"
                                            name="expire_at"
                                            label="تاریخ اعتبار"
                                            className="label-8rem"
                                            formik={formik}
                                            yearRange={{ from: 50, to: 10 }}
                                            initialDate={editDiscount?.expire_at || ""}
                                        />

                                        <FormikControl
                                            control="switch"
                                            name="for_all"
                                            label="برای همه"
                                            className="d-flex justify-content-center align-items-center my-2"
                                        />

                                        {
                                            !formik.values.for_all ? (
                                                handleSetSelectedProducts(formik)
                                            ) : null
                                        }


                                        <div className="col-12 col-md-6 col-lg-8 mt-4 btn_box text-center">
                                            <FormikControl
                                                control="submit"
                                                btnText={editDiscount ? "ویرایش" : "ذخیره"}
                                            />
                                        </div>
                                    </div>
                                </Form>

                            );
                        }}
                    </Formik>
                </div>
            </ModalContainer>
        </>
    );
}

export default AddDiscount;
