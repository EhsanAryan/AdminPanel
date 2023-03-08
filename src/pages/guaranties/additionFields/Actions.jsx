import React from 'react';
import ActionIcon from '../../../components/ActionIcon';

const Actions = ({rowData, handleDeleteGuarantee, setEditGuarantee}) => {
    return (
        <>
            <ActionIcon
                permTitle="update_guarantee"
                iconClasses="fas fa-edit text-warning"
                title="ویرایش گارانتی" 
                targetModalId="#add_guarantee_modal"
                onClick={() => setEditGuarantee(rowData)}
            />

            <ActionIcon
                permTitle="delete_guarantee"
                iconClasses="fas fa-times text-danger"
                title="حذف گارانتی" 
                onClick={() => handleDeleteGuarantee(rowData)}
            />
        </>
    );
}

export default Actions;
