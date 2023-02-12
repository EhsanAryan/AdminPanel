import React from 'react';
import { useLocation } from 'react-router-dom';

const ProductToEdit = () => {
    const location = useLocation()
    
    return (
        <h5 className="text-center mb-3">
            ویرایش محصول:
            <span className="text-primary mx-2">
                {location.state ? location.state.editProduct.categories[0].title : null}
            </span>
        </h5>
    )
}

export default ProductToEdit;