import { ErrorMessage, FastField } from 'formik'
import React, { useState } from 'react'
import FormShowError from './FormShowError'

const PasswordField = ({ name, label, className, placeHolder }) => {
  const [isVisible, setIsVisible] = useState(false);
  
  return (
    <div className={`col-12 ${className || ""} p-0`}>
      <div className="input-group mb-2 dir_ltr">
        <span className="input-group-text w_6rem justify-content-center pointer"
          onClick={() => setIsVisible(pervValue => !pervValue)}>
          {
            isVisible ? (
              <i class="fas fa-eye-slash"></i>
            ) : (
              <i className="fas fa-eye"></i>
            )
          }
        </span>
        {
          isVisible ? (
            <FastField type="text" id={name} name={name}
              placeholder={placeHolder} className="form-control" />
          ) : (
            <FastField type="password" id={name} name={name}
              placeholder={placeHolder} className="form-control" />
          )
        }
        {label ? (
          <span className="input-group-text w_6rem justify-content-center">{label}</span>
        ) : null}
      </div>
      <ErrorMessage name={name} component={FormShowError} />
    </div>
  )
}

export default PasswordField;
