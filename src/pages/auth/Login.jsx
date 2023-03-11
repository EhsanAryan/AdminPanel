import { Form, Formik } from 'formik';
import React from 'react';
import GetField from '../../components/GetField';
import { useNavigate } from 'react-router-dom';
import { initialValues, onSubmit, validationSchema } from './loginFormikCodes';
import SpinnerLoader from '../../components/SpinnerLoader';


const Login = () => {
    const navigate = useNavigate();

    return (
        <div className="auth-form-container bg-light box-shadow-10 px-2 py-3">
            <div className="text-center mt-2 mb-3">
                <i className="fas fa-user fa-3x"></i>
            </div>
            <Formik
                initialValues={initialValues}
                onSubmit={(values, actions) => onSubmit(values, actions, navigate)}
                validationSchema={validationSchema}
                validateOnMount
            >
                {(formik) => {
                    return (
                        <Form>
                            <div className="row">
                                <div className="col-12 mt-3 my-2">
                                    <GetField
                                        control="input"
                                        name="phone"
                                        type="phone"
                                        placeholder="شماره تلفن"
                                    />
                                </div>

                                <div className="col-12 my-2">
                                    <GetField
                                        control="input"
                                        name="password"
                                        type="password"
                                        placeholder="رمز عبور"
                                    />
                                </div>

                                <div className="col-12 my-2">
                                    <GetField
                                        control="switch"
                                        name="remember"
                                        label=" مرا به خاطر بسپار"
                                        className={"mx-auto custom-field-size d-flex justify-content-start align-items-center"}
                                    />
                                </div>

                                <div className="col-12 text-center mt-4 mb-2">
                                    <button type="submit"
                                        className="btn btn-lg btn-success rounded-pill px-5 mx-auto
                                    d-flex justify-content-center align-items-center"
                                        disabled={!(formik.dirty && formik.isValid) || formik.isSubmitting}>
                                        {formik.isSubmitting ? (
                                            <SpinnerLoader colorClass={"text-light"} />
                                        ) : "ورود"}
                                    </button>
                                </div>
                            </div>
                        </Form>
                    )
                }}
            </Formik>
        </div>
    );
}

export default Login;
