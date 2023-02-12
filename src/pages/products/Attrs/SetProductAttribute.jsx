import React, { useEffect, useState } from 'react';
import { Form, Formik } from 'formik';
import { useLocation } from 'react-router-dom';
import PrevButton from '../../../components/PrevButton';
import { getCategoryAttrsSerivce } from '../../../services/categoryAttrsServices';
import SpinnerLoader from '../../../components/SpinnerLoader';
import { initialValues, onSubmit, validationSchema } from './productAttrsFormikCodes';

const SetProductAttribute = () => {
    const [attrs, setAttrs] = useState(null);

    const location = useLocation();
    const { productData } = location.state;

    const handleGetAttributes = () => {
        Promise.all(
            productData.categories.map(async (category) => {
                try {
                    const response = await getCategoryAttrsSerivce(category.id);
                    if (response.status === 200) {
                        if (attrs) {
                            if (attrs.findIndex(a => a.groupTitle == category.title) === -1) {
                                const newAttrs = [...attrs, { groupTitle: category.title, data: response.data.data }];
                                setAttrs(newAttrs);
                            }
                        } else {
                            setAttrs([{ groupTitle: category.title, data: response.data.data }]);
                        }
                    }
                } catch (error) {

                }
            })
        );
    }

    useEffect(() => {
        handleGetAttributes();
    }, []);

    return (

        <div className="container">
            <h4 className="text-center mt-3 mb-4">افزودن ویژگی محصول:
                <span className="text-primary mx-1">{productData.title}</span>
            </h4>
            <Formik
                initialValues={initialValues}
                onSubmit={(values, actions) => onSubmit(values, actions)}
                validationSchema={validationSchema}
            >
                <Form>
                    <div className="row justify-content-center">
                        <div className="col-12 col-md-6 col-lg-8 mb-2 
                        d-flex justify-content-end align-items-center">
                            <PrevButton />
                        </div>

                        {
                            attrs ? (
                                <>
                                    {attrs.map((a, index) => {
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
                                                        a.data.map(d => {
                                                            return (
                                                                <div className="input-group my-3 dir_ltr"
                                                                    key={`group_${index}_attr_${d.id}`}>
                                                                    <span className="input-group-text w_6rem justify-content-center">
                                                                        {d.unit}
                                                                    </span>
                                                                    <input type="text" className="form-control" placeholder="" />
                                                                    <span className="input-group-text w_8rem justify-content-center">
                                                                        {d.title}
                                                                    </span>
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
                                </>
                            ) : (
                                <SpinnerLoader />
                            )
                        }

                        <div className="btn_box text-center col-12 col-md-6 col-lg-8 mt-4">
                            <button className="btn btn-primary mx-3">ذخیره</button>
                            <PrevButton btnText="انصراف" />
                        </div>
                    </div>
                </Form>
            </Formik>
        </div>
    );
}

export default SetProductAttribute;
