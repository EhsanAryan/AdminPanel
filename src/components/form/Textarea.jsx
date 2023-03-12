import { ErrorMessage, FastField } from 'formik'
import React from 'react'
import FormShowError from './FormShowError'

const Textarea = ({ name, label, className, placeHolder, rows, unresizable }) => {
    return (
        <div className={`col-12 ${className || ""} p-0`}>
            <div className="input-group mb-2 dir_ltr">
                <FastField as="textarea" id={name} name={name} placeholder={placeHolder} rows={rows || 3}
                    className="form-control" style={{
                        resize: unresizable ? "none" : "vertical"
                    }} />
                {label ? (
                    <span className="input-group-text w_6rem justify-content-center">{label}</span>
                ) : null}
            </div>
            <ErrorMessage name={name} component={FormShowError} />
        </div>
    )
}

export default Textarea;

