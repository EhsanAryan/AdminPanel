import { Form, Formik } from 'formik';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useOutletContext } from 'react-router-dom';
import FormikControl from '../../components/form/FormikControl';
import ModalContainer from '../../components/ModalContainer';
import { getAllProductsTitlesService, getSingleProduct } from '../../services/productServices';
import { initialValues, onSubmit, validationSchema } from './cartsFormikCodes';
import "react-select-search/style.css";
import { addNewCartService, editCartService, getSingleCartService } from '../../services/cartsServices';
import { Alert } from '../../utils/Alerts';

const AddCart = () => {
    const [allProducts, setAllProducts] = useState([]);
    const [colors, setColors] = useState([]);
    const [guarantees, setGuarantees] = useState([]);
    const [currentProduct, setCurrentProduct] = useState(null);
    const [selectedProductsInfo, setSelectedProductsInfo] = useState([]);
    const [reinitializeValues, setReinitializeValues] = useState(null);

    const navigate = useNavigate();

    const location = useLocation();
    const editCartId = location.state?.editCartId;

    const { handleGetCarts } = useOutletContext();

    const handleGetAllProducts = async () => {
        try {
            const response = await getAllProductsTitlesService();
            if (response.status === 200) {
                setAllProducts(response.data.data.map(p => { return { name: p.title, value: p.id } }));
            }
        } catch (error) {

        }
    }

    const handleSetProduct = async (productId, formik) => {
        formik.setFieldValue("product_id", productId);
        try {
            const response = await getSingleProduct(productId);
            if (response.status === 200) {
                const product = response.data.data;
                setCurrentProduct(product);
                setColors(product.colors.map(c => { return { name: c.title, value: c.id } }));
                setGuarantees(product.guarantees.map(g => { return { name: g.title, value: g.id } }));
            }
        } catch (error) {

        }
    }

    const handleDeleteProduct = (productInfoId) => {
        setSelectedProductsInfo(prevValue => prevValue.filter(p => p.id != productInfoId));
    }

    const handleGetEditCart = async () => {
        try {
            const response = await getSingleCartService(editCartId);
            if (response.status === 200) {
                const cart = response.data.data;
                setReinitializeValues({ ...initialValues, user_id: cart.user_id });
                let allProducts = [];
                for (let item of cart.items) {
                    allProducts.push({
                        id: item.id,
                        productData: item.product,
                        color: item.color || null,
                        guarantee: item.guarantee || null,
                        count: item.count,
                    });
                }
                setSelectedProductsInfo(allProducts);
            }
        } catch (error) {

        }
    }

    const handleAddCart = async (formik) => {
        let selectedProducts = [];
        for (let product of selectedProductsInfo) {
            selectedProducts.push({
                product_id: product.productData.id,
                color_id: product.color?.id || "",
                guarantee_id: product.guarantee?.id || "",
                count: product.count
            });
        }

        const data = {
            user_id: formik.values.user_id,
            products: selectedProducts
        }

        try {
            if (editCartId) {
                const response = await editCartService(data, editCartId);
                if (response.status === 200) {
                    Alert("ویرایش سبد خرید", response.data.message, "success");
                    handleGetCarts();
                    return navigate(-1);
                }
            } else {
                const response = await addNewCartService(data);
                if (response.status === 201) {
                    Alert("افزودن سبد خرید", response.data.message, "success");
                    handleGetCarts();
                    return navigate(-1);
                }
            }
        } catch (error) {

        }
    }

    useEffect(() => {
        handleGetAllProducts();
        if (editCartId) {
            handleGetEditCart();
        }
    }, []);

    return (
        <>
            {/* <button className="btn btn-success d-flex justify-content-center align-items-center" data-bs-toggle="modal" data-bs-target="#edit_cart_modal">
                <i className="fas fa-plus text-light"></i>
            </button> */}

            <ModalContainer
                id={"edit_cart_modal"}
                title={editCartId ?
                    "ویرایش سبد خرید:" + " " + editCartId :
                    "ایجاد سبد خرید"}
                fullScreen={true}
                className="show d-block"
                closeFunction={() => navigate(-1)}
            >
                <div className="container">
                    <Formik
                        initialValues={reinitializeValues || initialValues}
                        onSubmit={(values, actions) => onSubmit(values, actions,
                            currentProduct, setSelectedProductsInfo)}
                        validationSchema={validationSchema}
                        enableReinitialize
                    >
                        {(formik) => {
                            return (
                                <Form>
                                    <div className="row my-3 justify-content-center">

                                        <FormikControl
                                            control="input"
                                            name="user_id"
                                            type="text"
                                            placeHolder="آیدی کاربر"
                                            className="col-md-4 col-lg-2 my-1 px-2"
                                        />

                                        <FormikControl
                                            control="selectSearch"
                                            placeHolder="محصول"
                                            name="product_id"
                                            options={allProducts}
                                            className="col-md-4 col-lg-2 my-1 px-2"
                                            handleChange={(value) => handleSetProduct(value, formik)}
                                        />

                                        <FormikControl
                                            control="selectSearch"
                                            placeHolder="رنگ"
                                            name="color_id"
                                            options={colors}
                                            className="col-md-4 col-lg-2 my-1 px-2"
                                            handleChange={(value) => formik.setFieldValue("color_id", value)}
                                        />

                                        <FormikControl
                                            control="selectSearch"
                                            placeHolder="گارانتی"
                                            name="guarantee_id"
                                            options={guarantees}
                                            className="col-md-4 col-lg-2 my-1 px-2"
                                            handleChange={(value) => formik.setFieldValue("guarantee_id", value)}
                                        />

                                        <FormikControl
                                            control="input"
                                            name="count"
                                            type="number"
                                            placeHolder="تعداد"
                                            className="col-md-4 col-lg-2 my-1 px-2"
                                        />

                                        <div className="col-md-4 col-lg-1 my-1 px-2 py-1
                                         d-flex justify-content-center align-items-start">
                                            <i className="fas fa-check text-light bg-success 
                                            rounded-circle p-2 mx-1 hoverable pointer"
                                                title="ثبت محصول"
                                                onClick={() => formik.submitForm()}>
                                            </i>
                                        </div>
                                        <hr className="mt-3" />
                                    </div>

                                    {selectedProductsInfo.length > 0 ? (
                                        <div className="row justify-content-center">
                                            {selectedProductsInfo.map(product => {
                                                return (
                                                    <div className="col-12 col-md-9 col-lg-7" key={product.id}>
                                                        <div className="input-group my-3 d-flex justify-content-start">
                                                            <span className="input-group-text w-100 d-flex flex-wrap overflow-hidden">
                                                                <i className="fas fa-times ms-2 text-danger hoverable_text pointer"
                                                                    onClick={() => handleDeleteProduct(product.id)}></i>
                                                                {product.productData.title}&nbsp;
                                                                ({"قیمت واحد: " + product.productData.price.toLocaleString() + " تومان"})&nbsp;
                                                                ({product.guarantee ? "گارانتی: " + product.guarantee.title : "گارانتی ندارد"})&nbsp;
                                                                ({product.count + " عدد"})&nbsp;
                                                                {product.color ? (
                                                                    <>
                                                                        <i className="fas fa-circle me-1" style={{ color: product.color.code }}></i>
                                                                        <span className="mx-1">{product.color.title}</span>
                                                                    </>
                                                                ) : "(رنگ پیشفرض)"}
                                                            </span>


                                                        </div>
                                                    </div>
                                                );
                                            })}

                                            <div className="col-10 col-lg-6">
                                                <div className="input-group my-3">
                                                    <span className="input-group-text justify-content-center w-100">
                                                        جمع کل:&nbsp;
                                                        {selectedProductsInfo.map(p => p.count * p.productData.price)
                                                            .reduce((acc, currPrice) => acc + currPrice).toLocaleString()}
                                                        &nbsp;تومان
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="text-center col-12 mt-4">
                                                <button type="button" className="btn btn-primary"
                                                    onClick={() => handleAddCart(formik)}>
                                                    {editCartId ? "ویرایش" : "ذخیره"}
                                                </button>
                                            </div>
                                        </div>
                                    ) : null}
                                </Form>
                            );
                        }}
                    </Formik>
                </div>

            </ModalContainer>
        </>
    );
}

export default AddCart;
