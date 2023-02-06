import { ErrorMessage, FastField } from 'formik'
import React from 'react'
import FormShowError from './FormShowError'

const Select = ({ name, label, options, className, headerText}) => {
    return (
        <div className={`col-12 ${className}`}>
            <div className="input-group mb-2 dir_ltr">
                <FastField as="select" id={name} name={name} className="form-select">
                    <option value="">{headerText}</option>
                    {options.map(opt => {
                        return (
                            <option key={`option-${opt.id}`} value={opt.id}>{opt.value}</option>
                            );
                        })}
                </FastField>
                <span className="input-group-text w_6rem justify-content-center">{label}</span>
            </div>
            <ErrorMessage name={name} component={FormShowError} />
        </div>
    )
}

export default Select;

