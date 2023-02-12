import { FastField, Form, Formik } from 'formik';
import React from 'react';
import FormikControl from '../../../components/form/FormikControl';
import { initialValues, onSubmit, validationSchema } from './attrsFormikCodes';

const AddAttrForm = ({reinitializeValues,location,setData, editAttrId, setEditAttrId, editAttr}) => {
    return (
        <Formik
            initialValues={reinitializeValues || initialValues}
            onSubmit={(values, actions) => onSubmit(values, actions, location.state.categoryData.id,
                setData, editAttrId, setEditAttrId, editAttr)}
            validationSchema={validationSchema}
            enableReinitialize
        >
            <Form>
                <div className="row justify-content-center">
                    {editAttr ? (
                        <h5 className="text-center mt-2">
                            ویرایش ویژگی <span className="text-primary">{editAttr.title}</span>
                        </h5>
                    ) : null}
                    <div className="row my-3 justify-content-center align-items-center">
                        <FormikControl
                            control="input"
                            type="text"
                            name="title"
                            className="col-md-6 col-lg-4 my-1 no-margin mb-3 mb-lg-0"
                            placeHolder="عنوان ویژگی جدید"
                        />

                        <FormikControl
                            control="input"
                            type="text"
                            name="unit"
                            className="col-md-6 col-lg-4 my-1 no-margin mb-3 mb-lg-0"
                            placeHolder="واحد ویژگی جدید"
                        />

                        <FormikControl
                            control="switch"
                            name="in_filter"
                            label="نمایش در فیلتر"
                            className="col-8 col-lg-2 my-1 d-flex justify-content-center align-items-center p-0"
                        />

                        <div className="col-4 col-lg-2 d-flex justify-content-center align-items-center my-1">
                            <FastField>
                                {(form) => {
                                    return (
                                        <button type="submit" className="transparent-btn" disabled={form.isSubmitting}>
                                            <i className={`fas ${editAttr ? "fa-pen bg-warning" : "fa-check bg-success"} 
                                                    text-light rounded-circle p-2 mx-1 hoverable_text hoverable 
                                                    pointer has_tooltip hoverable_text`}
                                                title="ثبت ویژگی" data-bs-toggle="tooltip" data-bs-placement="top">
                                            </i>
                                        </button>
                                    );
                                }}
                            </FastField>
                            {editAttr ? (
                                <button type="button" className="btn btn-secondary btn-sm mx-1"
                                    onClick={() => setEditAttrId(null)}>
                                    انصراف
                                </button>
                            ) : null}
                        </div>
                    </div>

                </div>
            </Form>
        </Formik>
    );
}

export default AddAttrForm;
