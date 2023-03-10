import { ErrorMessage, FastField } from 'formik'
import React from 'react'
import FormShowError from './FormShowError'

const InputField = ({ name, label, type, className, placeHolder, ...others }) => {
  return (
    <div className={`col-12 ${className || ""} p-0`}>
      <div className="input-group dir_ltr">
        <FastField type={type} id={name} name={name} on
          placeholder={placeHolder} className="form-control" {...others} />
        {label ? (
          <span className="input-group-text w_6rem justify-content-center">{label}</span>
        ) : null}
      </div>
      <ErrorMessage name={name} component={FormShowError} />
    </div>
  );
}

export default InputField;
