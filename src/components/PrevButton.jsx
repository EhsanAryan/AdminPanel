import React from 'react';
import { useNavigate } from 'react-router-dom';

const PrevButton = ({btnText, btnColor, className}) => {
    const navigate = useNavigate();

    return (
        <button type="button" className={`btn ${btnColor || "btn-secondary"} ${className || ""}`}
        onClick={() => navigate(-1)}>
            {btnText || "بازگشت"}
        </button>
    );
}

export default PrevButton;
