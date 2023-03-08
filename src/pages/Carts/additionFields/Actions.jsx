import React from 'react';

const Actions = ({ rowData, handleDeleteCart }) => {
    return (
        <>
            <i className="fas fa-edit text-warning mx-1 hoverable_text pointer has_tooltip"
                title="ویرایش دسته">
            </i>
            <i className="fas fa-times text-danger mx-1 hoverable_text pointer has_tooltip"
                title="حذف دسته" data-bs-toggle="tooltip"
                onClick={() => handleDeleteCart(rowData)}>
            </i>
        </>
    );
}

export default Actions;
