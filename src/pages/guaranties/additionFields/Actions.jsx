import React from 'react';

const Actions = ({rowData, handleDeleteGuarantee, setEditGuarantee}) => {
    return (
        <>
            <i className="fas fa-edit text-warning mx-1 hoverable_text pointer has_tooltip"
                title="ویرایش دسته" data-bs-placement="top" data-bs-toggle="modal"
                data-bs-target="#add_guarantee_modal"
                onClick={() => setEditGuarantee(rowData)}
            >
            </i>

            <i className="fas fa-times text-danger mx-1 hoverable_text pointer has_tooltip"
                title="حذف دسته" data-bs-toggle="tooltip" data-bs-placement="top"
            onClick={() => handleDeleteGuarantee(rowData)}>
            </i>

        </>
    );
}

export default Actions;
