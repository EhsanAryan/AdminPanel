import React from 'react';

const ShowFieldError = ({children}) => {
    return (
        <div className="custom-field-size mx-auto bg-light text-danger border border-danger 
        mt-1 px-3 py-2 rounded-pill">
            <i className="fas fa-exclamation ms-2"></i>
            {children}
        </div> 
    );
}

export default ShowFieldError;
