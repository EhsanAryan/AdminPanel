import React from 'react'
import ProductsTable from './ProductsTable';

const Products = () => {
    return (
        <div id="manage_product_section" className="manage_product_section main_section">
            <h4 className="text-center my-3">مدیریت محصولات</h4>
            <ProductsTable />
        </div>
    )
}

export default Products;