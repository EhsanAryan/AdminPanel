import React, { useEffect, useState } from 'react';
import { ErrorMessage, FastField, Field, Form, Formik } from 'formik';
import { useLocation } from 'react-router-dom';
import PrevButton from '../../../components/PrevButton';
import { getCategoryAttrsSerivce } from '../../../services/categoryAttrsServices';
import SpinnerLoader from '../../../components/SpinnerLoader';
import { onSubmit } from './productAttrsFormikCodes';
import * as Yup from "yup";
import FormShowError from '../../../components/form/FormShowError';
import FormikControl from '../../../components/form/FormikControl';

const SetProductAttribute = () => {
    const [attributes, setAttributes] = useState([]);
    const [initialValues, setInitialValues] = useState(null);
    const [validationSchema, setValidationSchema] = useState({});

    const location = useLocation();
    const { productData } = location.state;

    const handleGetAttributes = () => {
        let allattrs = [];
        let initialVals = {};
        let valSchema = {};

        Promise.all(
            productData.categories.map(async (category) => {
                const response = await getCategoryAttrsSerivce(category.id);
                if (response.status === 200) {
                    allattrs = [...allattrs, { groupTitle: category.title, data: response.data.data }];
                    if (response.data.data.length > 0) {
                        for (let attr of response.data.data) {
                            let val = productData.attributes.filter(a => a.id == attr.id)[0]?.pivot.value 
                            || "";
                            initialVals = { ...initialVals, [attr.id]: val };
                            valSchema = {
                                ...valSchema,
                                [attr.id]: Yup.string().matches(/^[a-zA-Z0-9\u0600-\u06FF\s]+$/,
                                    "فقط از حروف و اعداد استفاده شود")
                            }
                        }
                    }
                }
            })
        ).then(() => {
            setAttributes(allattrs);
            setInitialValues(initialVals);
            setValidationSchema(valSchema);
        })
    }

    useEffect(() => {
        handleGetAttributes();
    }, []);

    return (
        <div className="container">
            <h4 className="text-center mt-3 mb-4">افزودن ویژگی محصول:
                <span className="text-primary mx-1">{productData.title}</span>
            </h4>
            {
                initialValues ? (
                    <Formik
                        initialValues={initialValues}
                        onSubmit={(values, actions) => onSubmit(values, actions, productData.id)}
                        validationSchema={Yup.object(validationSchema)}
                    >
                        <Form>
                            <div className="row justify-content-center">
                                <div className="col-12 col-md-6 col-lg-8 mb-2 
                                d-flex justify-content-end align-items-center">
                                    <PrevButton />
                                </div>

                                {attributes.map((a, index) => {
                                    return (
                                        <div className="col-12 col-md-6 col-lg-8 mb-3"
                                            key={`group_${index}`}>
                                            <h5 className="text-center">
                                                گروه:
                                                <span className="mx-1 text-primary">
                                                    {a.groupTitle}
                                                </span>
                                            </h5>
                                            {
                                                a.data.length > 0 ? (
                                                    a.data.map(attrData => {
                                                        return (
                                                            <div className="my-3" key={`group_${index}_attr_${attrData.id}`}>
                                                                <div className="input-group dir_ltr mb-1">
                                                                    <span className="input-group-text w_6rem justify-content-center">
                                                                        {attrData.unit}
                                                                    </span>
                                                                    <FastField name={attrData.id} type="text" className="form-control" />
                                                                    <span className="input-group-text w_8rem justify-content-center">
                                                                        {attrData.title}
                                                                    </span>
                                                                </div>
                                                                <ErrorMessage name={attrData.id} component={FormShowError} />
                                                            </div>
                                                        );
                                                    })
                                                ) : (
                                                    <div className="text-danger text-center">
                                                        هیچ ویژگی ای برای این گروه تعریف نشده است!
                                                    </div>
                                                )
                                            }
                                        </div>
                                    );
                                })}

                                {
                                    Object.keys(initialValues).length > 0 ? (
                                        <div className="col-12 col-md-6 col-lg-8 mt-2 btn_box text-center">
                                            <FormikControl
                                                control="submit"
                                                btnText="ذخیره"
                                            />
                                            <PrevButton btnText="انصراف" className="mx-2" />
                                        </div>
                                    ) : (
                                        null
                                    )
                                }
                            </div>
                        </Form>
                    </Formik>
                ) : (
                    <SpinnerLoader colorClass={"text-primary"} />
                )
            }
        </div>
    );
}

export default SetProductAttribute;
