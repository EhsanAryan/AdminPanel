import React from "react";

const Error = () => {
    return (
        <div className="h-100 d-flex justify-content-center align-items-center py-1 px-4">
            <div className="error-box fs-1 w-100 bg-light border border-2 border-dark 
            rounded-pill px-2 py-2">
                <div className="text-center my-3">
                    ارور 404
                    <br />
                    صفحه مورد نظر یافت نشد!
                </div>
                <div className="my-3 text-center text-danger">
                    <i className="fas fa-bug fa-3x"></i>
                </div>
            </div>
        </div>
    );
}

export default Error;
