import {Form, Formik } from 'formik';
import React from 'react';
import * as Yup from "yup";
import GetField from '../../components/GetField';
import { useNavigate } from 'react-router-dom';
import { Alert } from '../../utils/Alerts';
import { loginService } from '../../services/authServices';


const initialValues = {
    phone: "",
    password: "",
    remember: false
}

const onSubmit = async (values, submitProps, navigate) => {
    try {
        const response = await loginService({
            ...values,
            remember: values.remember ? 1 : 0
        });
        if (response.status === 200) {
            localStorage.setItem("loginToken" , JSON.stringify(response.data));
            navigate("/");
        }
        submitProps.setSubmitting(false);

    } catch (error) {
        submitProps.setSubmitting(false);
    }
}

const validationSchema = Yup.object({
    phone: Yup.string().required("شماره تلفن را وارد کنید.")
        .matches(/^[0-9]{11}$/, "شماره تلفن باید 11 رقمی باشد."),
    password: Yup.string().required("رمز عبور را وارد کنید.")
        .matches(/^[a-zA-Z0-9!@#$%&]+$/, "رمز عبور فقط میتواند شامل حروف الفبا و اعداد و آندراسکور و برخی کاراکترها باشد.")
        .min(6, "رمز عبور حداقل باید 6 کارکتر باشد."),
    remember: Yup.boolean()
});


const Login = () => {
    const navigate = useNavigate();

    return (
        <div className="auth-form-container bg-light box-shadow-10 px-2 py-3">
            <div className="text-center mt-2 mb-3">
                <i className="fas fa-user fa-3x"></i>
            </div>
            <Formik
                initialValues={initialValues}
                onSubmit={(values, submitProps) => onSubmit(values, submitProps, navigate)}
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
                                            <div className="spinner-border text-light">
                                                <span className="visually-hidden">Loading...</span>
                                            </div>
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
