import React from 'react';
import { useLocation } from 'react-router-dom';

const ProductToEdit = () => {
    const location = useLocation();
    
    return (
        <h5 className="text-center mb-3">
            ویرایش محصول:
            <span className="text-primary mx-2">
                {location.state.editProduct.title}
            </span>
        </h5>
    )
}

export default ProductToEdit;