import { Form, Formik } from 'formik';
import React from 'react';
import ModalContainer from '../../components/ModalContainer';
import FormikControl from '../../components/form/FormikControl';
import { initialValues, onSubmit, validationSchema } from './guaranteeFormikCodes';
import { useState } from 'react';
import { useEffect } from 'react';


const AddGuarantee = ({ setData, editGuarantee, setEditGuarantee }) => {
    const [reinitializeValues, setReinitializeValues] = useState(null);

    useEffect(() => {
        if (editGuarantee) {
            setReinitializeValues({
                title: editGuarantee.title,
                descriptions: editGuarantee.descriptions ? editGuarantee.descriptions : "",
                length: editGuarantee.length,
                length_unit: editGuarantee.length_unit,
            });
        } else {
            setReinitializeValues(null);
        }
    }, [editGuarantee]);

    return (
        <>
            <button className="btn btn-success d-flex justify-content-center align-items-center"
                data-bs-toggle="modal" data-bs-target="#add_guarantee_modal"
                onClick={() => setEditGuarantee(null)}>
                <i className="fas fa-plus text-light"></i>
            </button>

            <ModalContainer
                id={"add_guarantee_modal"}
                title={`${editGuarantee ? "ویرایش گارانتی" : "افزودن گارانتی"}`}
                fullScreen={false}
            >
                <div className="container">
                    <Formik
                        initialValues={reinitializeValues || initialValues}
                        onSubmit={(values, actions) => onSubmit(values, actions, setData,
                            editGuarantee, setEditGuarantee)}
                        validationSchema={validationSchema}
                        enableReinitialize
                    >
                        <Form>
                            <div className="row justify-content-center">
                                <FormikControl
                                    control="input"
                                    name="title"
                                    label="عنوان گارانتی"
                                    type="text"
                                    className="label-8rem my-2"
                                    placeHolder="عنوان گارانتی"

                                />

                                <FormikControl
                                    control="input"
                                    name="descriptions"
                                    label="توضیحات گارانتی"
                                    type="text"
                                    className="label-8rem my-2"
                                    placeHolder="توضیحات گارانتی"

                                />

                                <FormikControl
                                    control="input"
                                    name="length"
                                    label="مدت گارانتی"
                                    type="number"
                                    className="label-8rem my-2"
                                    placeHolder="مدت گارانتی"
                                />

                                <FormikControl
                                    control="input"
                                    name="length_unit"
                                    label="واحد"
                                    type="text"
                                    className="label-8rem my-2"
                                    placeHolder="واحد"
                                />

                                <FormikControl
                                    control="submit"
                                    btnText={`${editGuarantee ? "ویرایش" : "ذخیره"}`}
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

export default AddGuarantee;
