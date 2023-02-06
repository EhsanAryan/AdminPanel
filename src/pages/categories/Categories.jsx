import React from 'react'
import CategoryContextContainer from '../../context/categoryContext';
import CategoriesTable from './CategoriesTable';


const Categories = () => {
    return (
        <CategoryContextContainer>
            <div id="manage_product_category" className="manage_product_category main_section">
                <h4 className="text-center my-3">مدیریت دسته بندی محصولات</h4>
                <CategoriesTable />
            </div>
        </CategoryContextContainer>
    )
}

export default Categories;