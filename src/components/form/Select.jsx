import { ErrorMessage, Field } from 'formik'
import React from 'react'
import FormShowError from './FormShowError'

const Select = ({ name, label, options, className, headerText, handleOnChange }) => {
    
    const optionsElements = () => {
        return (
            <>
                <option value="">{headerText}</option>
                {options.map(opt => {
                    return (
                        <option key={`option-${opt.id}`} value={opt.id}>{opt.value}</option>
                    );
                })}
            </>
        );
    }

    return (
        <div className={`col-12 ${className || ""} p-0`}>
            <div className="input-group mb-2 dir_ltr">
                <Field>
                    {({ form }) => {
                        if (handleOnChange) {
                            return (
                                <Field as="select" id={name} name={name} className="form-select pointer"
                                    onChange={(ev) => handleOnChange(ev.target.value, form)}>
                                    {optionsElements()}
                                </Field>
                            );
                        } else {
                            return (
                                <Field as="select" id={name} name={name} className="form-select pointer">
                                    {optionsElements()}
                                </Field>
                            );
                        }
                    }}
                </Field>
                <span className="input-group-text w_6rem justify-content-center">{label}</span>
            </div>
            <ErrorMessage name={name} component={FormShowError} />
        </div>
    )
}

export default Select;

