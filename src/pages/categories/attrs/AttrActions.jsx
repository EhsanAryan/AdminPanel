import React from 'react';

const AttrActions = ({rowData, handleDeleteCategoryAttr,editAttrId, setEditAttrId}) => {
    return (
        <div className={`${editAttrId && editAttrId === rowData.id ? "alert-danger danger-shadow" : ""} text-center`}>
            <i className="fas fa-edit text-warning mx-1 hoverable_text pointer has_tooltip"
                title="ویرایش دسته" data-bs-placement="top"
                onClick={() => setEditAttrId(rowData.id)}>
            </i>

            <i className="fas fa-times text-danger mx-1 hoverable_text pointer has_tooltip"
                title="حذف دسته" data-bs-toggle="tooltip" data-bs-placement="top"
                onClick={() => handleDeleteCategoryAttr(rowData)}>
            </i>
        </div>
    );
}

export default AttrActions;
