import { Form, Formik } from 'formik';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useOutletContext } from 'react-router-dom';
import FormikControl from '../../components/form/FormikControl';
import ModalContainer from '../../components/ModalContainer';
import { getSingleCartService } from '../../services/cartsServices';
import { getAllDeliveriesService } from '../../services/deliveriesServices';
import { getDiscountsService, getSingleDiscountsService } from '../../services/discountsServices';
import { getSingleOrderService } from '../../services/ordersServices';
import { convertDateToJalali } from '../../utils/convertDate';
import { initialValues, onSubmit, validationSchema } from './ordersFormikCodes';

const AddOrder = () => {
    const [selectedProductsInfo, setSelectedProductsInfo] = useState([]);
    const [allDeliveries, setAllDeliveries] = useState([]);
    const [allDiscounts, setAllDiscounts] = useState([]);
    const [discountPercent, setDiscountPercent] = useState(0);
    const [reinitilizeValues, setReinitilizeValues] = useState(null);

    const navigate = useNavigate();

    const { handleGetOrders } = useOutletContext();

    const location = useLocation();
    const selectedOrderId = location.state?.selectedOrderId;

    const handleSetSelectedProductsInfo = async (cartId) => {
        try {
            const response = await getSingleCartService(cartId);
            if (response.status === 200) {
                const cart = response.data.data;
                let selectedProducts = [];
                for (let item of cart.items) {
                    selectedProducts.push({
                        id: item.id,
                        productData: item.product,
                        color: item.color || null,
                        guarantee: item.guarantee || null,
                        count: item.count
                    });
                }
                setSelectedProductsInfo(selectedProducts);
            }
        } catch (error) {

        }
    }

    const handleGetAllDiscounts = async () => {
        try {
            const response = await getDiscountsService();
            if (response.status === 200) {
                setAllDiscounts(response.data.data.map(d => { return { id: d.id, value: d.title } }));
            }
        } catch (error) {

        }
    }

    const handleGetAllDeliveries = async () => {
        try {
            const response = await getAllDeliveriesService();
            if (response.status === 200) {
                setAllDeliveries(response.data.data.map(d => {
                    return { id: d.id, value: d.title + " (" + Number(d.amount).toLocaleString() + ")" };
                }));
            }
        } catch (error) {

        }
    }

    const handleSetDiscountPercent = async (discountId, formik) => {
        formik.setFieldValue("discount_id", discountId);
        try {
            const response = await getSingleDiscountsService(discountId);
            if (response.status === 200) {
                setDiscountPercent(response.data.data.percent);
            }
        } catch (error) {

        }
    }

    const handleGetSelectedOrder = async () => {
        try {
            const response = await getSingleOrderService(selectedOrderId);
            if (response.status === 200) {
                const selectedOrder = response.data.data;
                setReinitilizeValues({
                    cart_id: selectedOrder.cart_id,
                    discount_id: selectedOrder.discount_id || "",
                    delivery_id: selectedOrder.delivery_id,
                    address: selectedOrder.address,
                    phone: selectedOrder.phone,
                    email: selectedOrder.email || "",
                    pay_at: selectedOrder.pay_at ? convertDateToJalali(selectedOrder.pay_at) : "",
                    pay_card_number: selectedOrder.pay_card_number,
                    pay_bank: selectedOrder.pay_bank || "",
                });

                const cart = response.data.data.cart;
                let selectedProducts = [];
                for (let item of cart.items) {
                    selectedProducts.push({
                        id: item.id,
                        productData: item.product,
                        color: item.color || null,
                        guarantee: item.guarantee || null,
                        count: item.count,
                        unit_price: item.unit_price || ""
                    });
                }
                setSelectedProductsInfo(selectedProducts);
            }
        } catch (error) {

        }
    }

    useEffect(() => {
        handleGetAllDiscounts();
        handleGetAllDeliveries();
        selectedOrderId && handleGetSelectedOrder();
    }, []);


    return (
        <>
            {/* <button className="btn btn-success d-flex justify-content-center align-items-center" data-bs-toggle="modal" data-bs-target="#add_order_modal">
                <i className="fas fa-plus text-light"></i>
            </button> */}

            <ModalContainer
                id={"add_order_modal"}
                title={selectedOrderId ?
                    "جزئیات سفارش:" + " " + selectedOrderId :
                    "افزودن سفارش"}
                fullScreen={true}
                className="show d-block"
                closeFunction={() => navigate(-1)}
            >
                <div className="container">
                    <Formik
                        initialValues={reinitilizeValues || initialValues}
                        onSubmit={(values, actions) => onSubmit(values, actions, handleGetOrders,
                            navigate)}
                        validationSchema={validationSchema}
                        enableReinitialize
                    >
                        {(formik) => {
                            return (
                                <Form>
                                    <div className="row my-1 justify-content-start">
                                        <FormikControl
                                            control="input"
                                            name="cart_id"
                                            type="number"
                                            className="col-md-4 col-lg-2 my-1 px-2"
                                            placeHolder="کد سبد"
                                            onBlur={(ev) => handleSetSelectedProductsInfo(ev.target.value)}
                                        />

                                        <div className="col-12 col-md-4 col-lg-2 my-1 px-2">
                                            <input type="text" className='form-control'
                                                value={"مبلغ سبد: " + (selectedProductsInfo.length > 0 ? (
                                                    selectedProductsInfo.map(p => p.count * (p.unit_price || p.productData.price))
                                                        .reduce((acc, currPrice) => acc + currPrice).toLocaleString()
                                                ) : 0)}
                                                disabled />
                                        </div>

                                        <FormikControl
                                            control="select"
                                            name="discount_id"
                                            options={allDiscounts}
                                            className="col-md-4 col-lg-2 my-1 px-2"
                                            headerText="تخفیف"
                                            handleOnChange={handleSetDiscountPercent}
                                        />

                                        <div className="col-12 col-md-4 col-lg-2 my-1 px-2">
                                            <input type="text" className='form-control'
                                                value={"درصد تخفیف: " + discountPercent}
                                                disabled />
                                        </div>

                                        <FormikControl
                                            control="date"
                                            name="pay_at"
                                            className="col-md-6 col-lg-4 my-1 px-2"
                                            placeHolder="تاریخ پرداخت"
                                            formik={formik}
                                            yearRange={{ form: 10, to: 0 }}
                                        />


                                        <FormikControl
                                            control="textarea"
                                            name="address"
                                            className="my-1 px-2"
                                            placeHolder="آدرس"
                                            rows={2}
                                            unresizable={true}
                                        />

                                        <FormikControl
                                            control="select"
                                            name="delivery_id"
                                            options={allDeliveries}
                                            className="col-md-4 col-lg-2 my-1 px-2"
                                            headerText="روش تحویل"
                                        />

                                        <FormikControl
                                            control="input"
                                            name="phone"
                                            type="text"
                                            className="col-md-4 col-lg-2 my-1 px-2"
                                            placeHolder="تلفن"
                                        />

                                        <FormikControl
                                            control="input"
                                            name="email"
                                            type="text"
                                            className="col-md-4 col-lg-2 my-1 px-2"
                                            placeHolder="ایمیل"
                                        />

                                        <FormikControl
                                            control="input"
                                            name="pay_card_number"
                                            type="number"
                                            className="col-md-5 col-lg-3 my-1 px-2"
                                            placeHolder="شماره کارت"
                                        />

                                        <FormikControl
                                            control="input"
                                            name="pay_bank"
                                            type="text"
                                            className="col-md-4 col-lg-2 my-1 px-2 mb-4"
                                            placeHolder="نام بانک"
                                        />

                                        <hr />

                                    </div>
                                    {selectedProductsInfo.length > 0 ? (
                                        <div className="row justify-content-center">
                                            {selectedProductsInfo.map(product => {
                                                return (
                                                    <div className="col-12 col-md-9 col-lg-7" key={product.id}>
                                                        <div className="input-group my-3 d-flex justify-content-start">
                                                            <span className="input-group-text w-100 d-flex flex-wrap overflow-hidden">
                                                                {product.productData.title}&nbsp;
                                                                ({"قیمت واحد: " + (product.unit_price || product.productData.price).toLocaleString() + " تومان"})&nbsp;
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

                                            {!selectedOrderId ? (
                                                <div className="text-center col-12 mt-4">
                                                    <FormikControl
                                                        control="submit"
                                                        btnText="ذخیره"
                                                    />
                                                </div>
                                            ) : null}
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

export default AddOrder;
