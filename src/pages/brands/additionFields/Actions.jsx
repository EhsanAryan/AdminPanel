import React from 'react';
import ActionIcon from '../../../components/ActionIcon';

const Actions = ({rowData , handleDeleteBrand, setEditBrand}) => {
    return (
        <>
            <ActionIcon
                permTitle="update_brand"
                iconClasses="fas fa-edit text-warning"
                title="ویرایش دسته"
                targetModalId="#add_brand_modal"
                onClick={() => setEditBrand(rowData)}
            />

            <ActionIcon
                permTitle="delete_brand"
                iconClasses="fas fa-times text-danger"
                title="حذف دسته"
                onClick={() => handleDeleteBrand(rowData)}
            />
        </>
    );
}

export default Actions;
