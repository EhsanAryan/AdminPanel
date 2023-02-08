import { Form, Formik } from 'formik';
import React, { useEffect } from 'react';
import ModalContainer from '../../components/ModalContainer';
import FormikControl from '../../components/form/FormikControl';
import { initialValues, onSubmit, validationSchema } from './colorsFormikCodes';
import { useState } from 'react';

const AddColor = ({ setData, editColor, setEditColor }) => {
    const [reinitializeValues, setReinitializeValues] = useState(null);

    useEffect(() => {
        if (editColor) {
            setReinitializeValues({
                title: editColor.title,
                code: editColor.code
            });
        } else {
            setReinitializeValues(null);
        }
    }, [editColor]);

    return (
        <>
            <button className="btn btn-success d-flex justify-content-center align-items-center" 
            data-bs-toggle="modal" data-bs-target="#add_color_modal"
            onClick={() => setEditColor(null)}>
                <i className="fas fa-plus text-light"></i>
            </button>

            <ModalContainer
                id={"add_color_modal"}
                title={`${editColor ? "ویرایش رنگ" : "افزون رنگ"}`}
                fullScreen={false}
            >
                <div className="container">
                    <Formik
                        initialValues={reinitializeValues || initialValues}
                        onSubmit={(values, actions) => onSubmit(values, actions, setData,
                            editColor, setEditColor)}
                        validationSchema={validationSchema}
                        enableReinitialize
                    >
                        <Form>
                            <div className="row justify-content-center">
                                <FormikControl
                                    control="input"
                                    name="title"
                                    label="نام رنگ"
                                    type="text"
                                    className="label-8rem"
                                    placeHolder="نام رنگ"

                                />

                                <FormikControl
                                    control="color"
                                    name="code"
                                    label="انتخاب رنگ"
                                    className="d-flex justify-content-center flex-column align-items-center"
                                />

                                <FormikControl
                                    control="submit"
                                    btnText={`${editColor ? "ویرایش" : "ذخیره"}`}
                                    className="col-md-6 col-lg-8 mt-4 btn_box text-center"
                                />
                            </div>
                        </Form>
                    </Formik>
                </div>
            </ModalContainer>
        </>
    );
}

export default AddColor;
