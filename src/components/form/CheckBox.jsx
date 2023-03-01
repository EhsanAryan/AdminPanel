import { ErrorMessage, Field } from 'formik';
import React from 'react';
import FormShowError from './FormShowError';

const CheckBox = ({ name, options, className }) => {
    return (
        <div className={`row my-3 ${className || ""} p-0`}>
            <Field name={name} id={name}>
                {({ field }) => {
                    return (
                        <>
                            {options.map(o => {
                                return (
                                    <div className="d-flex justify-content-start align-items-center 
                                    col-12 col-md-6 col-xl-4 form-check"
                                    key={`checkbox_${o.id}`}>
                                        <input className="form-check-input ms-2" type="checkbox"
                                        {...field} value={o.id} id={`${o.id}_${name}`}
                                        checked={field.value.includes(`${o.id}`)} />

                                        <label className="form-check-label" htmlFor={`${o.id}_${name}`}>
                                            {o.title}
                                        </label>
                                    </div>
                                );
                            })}
                        </>
                    );
                }}
            </Field>
            <ErrorMessage name={name} component={FormShowError} />
        </div>
    );
}

export default CheckBox;
