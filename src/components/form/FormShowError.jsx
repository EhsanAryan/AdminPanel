import React from 'react';

const FormShowError = ({children}) => {
    return (
        <small className="d-block text-danger mb-4 mt-2">{children}</small>
    );
}

export default FormShowError;
