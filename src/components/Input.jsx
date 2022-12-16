import { ErrorMessage, FastField } from 'formik';
import React from 'react';
import ShowFieldError from './authForm/ShowFieldError';

const Input = ({name, type, placeholder}) => {
    return (
        <>
            <FastField type={type} className="form-control custom-field-size mx-auto"
                placeholder={placeholder} id={name} name={name} />
            <ErrorMessage name={name} component={ShowFieldError} />
        </>
    );
}

export default Input;
