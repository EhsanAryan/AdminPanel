import { Form, Formik } from 'formik';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useOutletContext } from 'react-router-dom';
import FormikControl from '../../components/form/FormikControl';
import ModalContainer from '../../components/ModalContainer';
import { initialValues, onSubmit, validationSchema } from './deliveryFormikCodes';

const AddDelivery = () => {
    const [reinitializeValues, setReinitializeValues] = useState(null);

    const navigate = useNavigate();

    const location = useLocation();
    const editDelivery = location.state?.editDelivery;

    const { setData } = useOutletContext();

    useEffect(() => {
        if (editDelivery) {
            for (let key in editDelivery) {
                editDelivery[key] === null && (editDelivery[key] = "");
            }

            setReinitializeValues({
                title: editDelivery.title,
                amount: editDelivery.amount,
                time: editDelivery.time,
                time_unit: editDelivery.time_unit
            });
        } else {
            setReinitializeValues(null);
        }
    }, [editDelivery]);


    return (
        <>
            {/* <button className="btn btn-success d-flex justify-content-center align-items-center" data-bs-toggle="modal" data-bs-target="#add_delivery_modal">
                <i className="fas fa-plus text-light"></i>
            </button> */}

            <ModalContainer
                id={"add_delivery_modal"}
                title={editDelivery ?
                    "ویرایش نحوه ارسال:" + " " + editDelivery.title :
                    "افزودن نحوه ارسال"}
                fullScreen={false}
                className="show d-block"
                closeFunction={() => navigate(-1)}
            >
                <div className="container">
                    <Formik
                        initialValues={reinitializeValues || initialValues}
                        onSubmit={(values, actions) => onSubmit(values, actions, setData, 
                            editDelivery, navigate)}
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
                                            label="عنوان"
                                            type="text"
                                            className="label-8rem"
                                            placeHolder="عنوان سرویس"
                                        />

                                        <FormikControl
                                            control="input"
                                            name="amount"
                                            label="هزینه"
                                            type="number"
                                            className="label-8rem"
                                            placeHolder="هزینه ارسال (تومان)"
                                        />

                                        <FormikControl
                                            control="input"
                                            name="time"
                                            label="مدت"
                                            type="number"
                                            className="label-8rem"
                                            placeHolder="مدت ارسال"
                                        />

                                        <FormikControl
                                            control="input"
                                            name="time_unit"
                                            label="واحد"
                                            type="text"
                                            className="label-8rem"
                                            placeHolder="واحد مدت ارسال"
                                        />

                                        <div className="col-12 text-center mt-4">
                                            <FormikControl
                                                control="submit"
                                                btnText={editDelivery ? "ویرایش" : "ذخیره"}
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

export default AddDelivery;
