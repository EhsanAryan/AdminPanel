import { ErrorMessage, FastField } from 'formik'
import React from 'react'
import FormShowError from './FormShowError'

const File = ({ name, label, className, placeHolder }) => {
    return (
        <div className={`col-12 ${className || ""} p-0`}>
            <div className="input-group mb-2 dir_ltr">
                <FastField name={name}>
                    {({form}) => {
                        return (
                            <input type="file" id={name} className="form-control" placeholder={placeHolder}
                            onChange={(ev) => form.setFieldValue(name, ev.target.files[0])} />
                            );
                        }}
                </FastField>
                <span className="input-group-text w_6rem justify-content-center">{label}</span>
            </div>
            <ErrorMessage name={name} component={FormShowError} />
        </div>
    )
}

export default File;

