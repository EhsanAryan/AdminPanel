import { ErrorMessage, FastField } from 'formik'
import React from 'react'
import FormShowError from './FormShowError'

const Color = ({ name, label, className }) => {
    return (
        <div className={`col-12 my-2 ${className}`}>
            <FastField type="color" id={name} name={name} className="form-control form-control-color"
                title="Choose your color" />
            {label ? (
                <label htmlFor={name} className="form-label">{label}</label>
            ) : null}
            <ErrorMessage name={name} component={FormShowError} />
        </div>
    )
}

export default Color;
