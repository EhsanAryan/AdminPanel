import React from 'react';

const Actions = ({ rowData, handleDeleteDiscount, setEditDiscount }) => {
    return (
        <>
            <i className="fas fa-edit text-warning mx-1 hoverable_text pointer has_tooltip"
                title="ویرایش تخفیف" data-bs-placement="top" data-bs-toggle="modal"
                data-bs-target="#add_discount_modal"
                onClick={() => setEditDiscount(rowData)}
            >
            </i>

            <i className="fas fa-times text-danger mx-1 hoverable_text pointer has_tooltip"
                title="حذف تخفیف" data-bs-toggle="tooltip" data-bs-placement="top"
                onClick={() => handleDeleteDiscount(rowData)}>
            </i>
        </>
    );
}

export default Actions;
