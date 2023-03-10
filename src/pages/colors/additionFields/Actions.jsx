import React from 'react';
import ActionIcon from '../../../components/ActionIcon';

const Actions = ({ rowData, handleDeleteColor, setEditColor }) => {
    return (
        <>
            <ActionIcon
                permTitle="update_color"
                iconClasses="fas fa-edit text-warning"
                title="ویرایش رنگ"
                targetModalId="#add_color_modal"
                onClick={() => setEditColor(rowData)}
            />

            <ActionIcon
                permTitle="delete_color"
                iconClasses="fas fa-times text-danger "
                title="حذف رنگ"
                onClick={() => handleDeleteColor(rowData)}
            />
        </>
    );
}

export default Actions;
