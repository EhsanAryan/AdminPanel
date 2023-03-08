import React from 'react';
import { useLocation } from 'react-router-dom';
import PrevButton from '../../components/PrevButton';

const CategoriesChildren = () => {
    const location = useLocation();
    
    return (
        <h4 className="text-center mb-2 d-flex justify-content-between align-items-center">
            <div className="d-felx justify-content-center align-items-center">
                <span className="ms-2 me-1">سرگروه:</span>
                <span className="text-success fw-bold">{location.state.parentData.title}</span>
            </div>
            <PrevButton />
        </h4>
    );
}

export default CategoriesChildren;
