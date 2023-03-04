import React from "react";
import { useNavigate } from "react-router-dom";

const Error = () => {
    const navigate = useNavigate();

    return (
        <div className="w-100 h-100 overflow-auto d-flex justify-content-center align-items-center
        py-1 px-0 px-md-4 ">
            <div className="fs-1 w-100 bg-light border border-2 border-dark 
            rounded-pill p-2">
                <div className="text-center my-3">
                    ارور 404
                    <br />
                    صفحه مورد نظر یافت نشد!
                </div>
                <div className="my-4 text-center text-danger">
                    <i className="fas fa-bug fa-3x error-bug-icon pointer" title="انتقال به داشبورد"
                    onClick={() => navigate("/dashboard")}></i>
                </div>
            </div>
        </div>
    );
}

export default Error;
