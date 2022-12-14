import React from 'react'
import PaginatedTable from '../../components/PaginatedTable'
import AddCategory from './AddCategory'


const data = [
    {
        id: "1",
        category: "aaa",
        title: "aaa_",
        price: "1,000,000",
        stoke: "2",
        like_count: "40",
        status: "10"
    },
    {
        id: "2",
        category: "bbb",
        title: "bbb_",
        price: "2,000,000",
        stoke: "3",
        like_count: "50",
        status: "20"
    },
    {
        id: "3",
        category: "ccc",
        title: "ccc_",
        price: "3,000,000",
        stoke: "4",
        like_count: "60",
        status: "30"
    },
    {
        id: "4",
        category: "ddd",
        title: "ddd_",
        price: "4,000,000",
        stoke: "5",
        like_count: "70",
        status: "40"
    },
    {
        id: "5",
        category: "eee",
        title: "eee_",
        price: "5,000,000",
        stoke: "6",
        like_count: "80",
        status: "50"
    }
]

const dataInfo = [
    { field: "id", title: "#" },
    { field: "title", title: "عنوان محصول" },
    { field: "price", title: "قیمت" }
]

const additionElements = (itemId) => {
    // console.log(itemId);
    return (
        <>
            <i className="fas fa-project-diagram text-info mx-1 hoverable_text pointer has_tooltip"
                title="زیرمجموعه" data-bs-toggle="tooltip" data-bs-placement="top">
            </i>

            <i className="fas fa-edit text-warning mx-1 hoverable_text pointer has_tooltip"
                title="ویرایش دسته" data-bs-placement="top" data-bs-toggle="modal" 
                data-bs-target="#add_product_category_modal">
            </i>

            <i className="fas fa-plus text-success mx-1 hoverable_text pointer has_tooltip"
                title="افزودن ویژگی" data-bs-placement="top" data-bs-toggle="modal"
                data-bs-target="#add_product_category_attr_modal">
            </i>

            <i className="fas fa-times text-danger mx-1 hoverable_text pointer has_tooltip"
                title="حذف دسته" data-bs-toggle="tooltip" data-bs-placement="top">
            </i>
        </>
    )
}

const additionField = {
    title: "عملیات",
    elements: (itemId) => additionElements(itemId)
}

const searchParams = {
    searchField: "title",
    title: "جستجو",
    placeHolder: "قسمتی از عنوان را وارد کنید"
}


const CategoriesTable = () => {
    return (
        <PaginatedTable
            data={data}
            dataInfo={dataInfo}
            additionField={additionField}
            numOfItems={4}
            searchParams={searchParams}
        >
            <AddCategory />
        </PaginatedTable>
    )
}

export default CategoriesTable;
