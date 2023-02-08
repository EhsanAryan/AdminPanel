import React from 'react'
import ProductsTable from './ProductsTable';
import SetProductAttribute from './SetProductAttribute';

const Products = () => {
    return (
        <div id="manage_product_section" className="manage_product_section main_section">
            <h4 className="text-center my-3">مدیریت محصولات</h4>
            <ProductsTable />
            <SetProductAttribute />
        </div>
    )
}

export default Products;