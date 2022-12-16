import { FastField } from 'formik';
import React from 'react';

const Switch = ({name, label}) => {
    return (
        <div className="form-check form-switch mx-auto custom-field-size
        d-flex justify-content-start align-items-center">
            <FastField type="checkbox" className="form-check-input"
            name={name} id={name} />
            <label className="form-check-label me-5" htmlFor={name}>
               {label}
            </label>
        </div>
    );
}

export default Switch;
