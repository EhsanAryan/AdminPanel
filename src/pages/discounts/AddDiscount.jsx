import React, { useEffect, useState } from 'react';
import { Form, Formik } from 'formik';
import ModalContainer from '../../components/ModalContainer';
import FormikControl from '../../components/form/FormikControl';
import { initialValues, onSubmit, validationSchema } from './discountsFormikCodes';
import { getAllProductsService } from '../../services/productServices';
import { convertDateToJalali } from '../../utils/convertDate';


const AddDiscount = ({ setData, editDiscount, setEditDiscount }) => {
    const [allProducts, setAllProducts] = useState([]);
    const [reinitializeValues, setReinitializeValues] = useState(null);
    const [initProducts, setInitProducts] = useState([]); // used in editing discount

    const handleGetAllProducts = async () => {
        try {
            const response = await getAllProductsService();
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
                return {id : p.id, value: p.title};
            }));
        }
    }

    useEffect(() => {
        handleGetAllProducts();
    }, []);

    useEffect(() => {
        if (editDiscount) {
            handleSetInitialProducts();

            for(let key in editDiscount) {
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
            <button className="btn btn-success d-flex justify-content-center align-items-center"
                data-bs-toggle="modal" data-bs-target="#add_discount_modal"
                onClick={() => setEditDiscount(null)}>
                <i className="fas fa-plus text-light"></i>
            </button>

            <ModalContainer
                id={"add_discount_modal"}
                title={editDiscount ? "ویرایش کد تخفیف" : "افزودن کد تخفیف"}
                fullScreen={true}
            >
                <div className="container">
                    <Formik
                        initialValues={reinitializeValues || initialValues}
                        onSubmit={(values, actions) => onSubmit(values, actions, setData,
                             editDiscount, setEditDiscount)}
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
                                            className="col-md-6 col-lg-8 my-3 label-8rem"
                                            placeHolder="عنوان تخفیف را وارد کنید"
                                        />

                                        <FormikControl
                                            control="input"
                                            name="code"
                                            label="کد تخفیف"
                                            type="text"
                                            className="col-md-6 col-lg-8 my-3 label-8rem"
                                            placeHolder="کد تخفیف را وارد کنید"
                                        />

                                        <FormikControl
                                            control="input"
                                            name="percent"
                                            label="درصد تخفیف"
                                            type="number"
                                            className="col-md-6 col-lg-8 my-3 label-8rem"
                                            placeHolder="فقط عدد"
                                        />

                                        <FormikControl
                                            control="input"
                                            name="expire_at"
                                            label="تاریخ اعتبار"
                                            type="text"
                                            className="col-md-6 col-lg-8 my-3 label-8rem"
                                            placeHolder="مثلا 1400/10/10"
                                        />

                                        <FormikControl
                                            control="searchableSelect"
                                            formikOptions={formik}
                                            resultType="string"
                                            name="product_ids"
                                            label="محصولات"
                                            options={allProducts}
                                            className="col-md-6 col-lg-8 my-3 label-8rem"
                                            headerText="انتخاب محصول"
                                            placeHolder="قسمتی از نام محصول را وارد کنید"
                                            initialItems={initProducts}
                                        />

                                        <FormikControl
                                            control="switch"
                                            name="for_all"
                                            label="برای همه"
                                            className="d-flex justify-content-center align-items-center"
                                        />


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
