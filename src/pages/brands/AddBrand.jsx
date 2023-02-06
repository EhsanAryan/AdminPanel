import { Form, Formik } from 'formik';
import React, { useEffect } from 'react';
import ModalContainer from '../../components/ModalContainer';
import FormikControl from '../../components/form/FormikControl';
import { initialValues, onSubmit, validationSchema } from './brandsFormikCodes';
import { useState } from 'react';


const AddBrand = ({ setData, editBrand, setEditBrand }) => {
    const [reinitializeValues, setReinitializeValues] = useState(null);

    useEffect(() => {
        if (editBrand) {
            setReinitializeValues(editBrand);
        } else {
            setReinitializeValues(null);
        }
    }, [editBrand]);


    return (
        <>
            <button className="btn btn-success d-flex justify-content-center align-items-center"
                data-bs-toggle="modal" data-bs-target="#add_brand_modal"
                onClick={() => setEditBrand(null)}>
                <i className="fas fa-plus text-light"></i>
            </button>

            <ModalContainer
                id={"add_brand_modal"}
                title={"افزودن برند"}
                fullScreen={false}
            >
                <div className="container">
                    <Formik
                        initialValues={reinitializeValues || initialValues}
                        onSubmit={(values, actions) => onSubmit(values, actions, setData,
                            editBrand, setEditBrand)}
                        validationSchema={validationSchema}
                        enableReinitialize
                    >
                        <Form>
                            <div className="row justify-content-center">
                                <FormikControl
                                    control="input"
                                    name="original_name"
                                    label="عنوان لاتیتن برند"
                                    type="text"
                                    placeHolder="کیبرد را در حالت لاتین قرار دهید"
                                    className="label-8rem"
                                />

                                <FormikControl
                                    control="input"
                                    name="persian_name"
                                    label="عنوان فارسی برند"
                                    type="text"
                                    placeHolder="کیبرد را در حالت فارسی قرار دهید"
                                    className="label-8rem"
                                />

                                <FormikControl
                                    control="input"
                                    name="descriptions"
                                    label="توضیحات برند"
                                    type="text"
                                    placeHolder="متن کوتاه در مورد برند"
                                    className="label-8rem"
                                />

                                {!editBrand ? (
                                <FormikControl
                                    control="file"
                                    name="logo"
                                    label="تصویر"
                                    placeHolder="تصویر"
                                    className="label-8rem"
                                />
                                ) : null}

                                <FormikControl
                                    control="submit"
                                    btnText="ذخیره"
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

export default AddBrand;
