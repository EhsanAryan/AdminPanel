import { ErrorMessage } from 'formik';
import React from 'react';
import SelectSearch from 'react-select-search';
import FormShowError from './FormShowError';

const CustomSelectSearch = ({ name, options, className, placeHolder, handleChange }) => {
    return (
        <div className={`col-12 ${className || ""} p-0`}>
            <SelectSearch options={options} name={name} placeholder={placeHolder}
                onChange={(value) => handleChange(value)} disabled={options.length === 0} />
            <ErrorMessage name={name} component={FormShowError} />
        </div>
    );
}

export default CustomSelectSearch;
