import React from 'react';
import { useNavigate } from 'react-router-dom';

const PrevButton = ({btnText}) => {
    const navigate = useNavigate();

    return (
        <button type="button" className="btn btn-secondary"
        onClick={() => navigate(-1)}>
            {btnText || "بازگشت"}
        </button>
    );
}

export default PrevButton;
