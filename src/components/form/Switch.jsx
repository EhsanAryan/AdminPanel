import { FastField } from 'formik';
import React from 'react';

const Switch = ({ name, label, className }) => {
    return (
        <div className={`form-check form-switch ${className}`}>
            <FastField type="checkbox" className="form-check-input"
                name={name} id={name} />
            <label className="form-check-label me-5" htmlFor={name}>
                {label}
            </label>
        </div>
    );
}

export default Switch;
