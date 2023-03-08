import React from 'react';
import { useNavigate } from 'react-router-dom';
import ActionIcon from '../../../components/ActionIcon';

const Actions = ({ rowData, handleDeleteUser }) => {
    const navigate = useNavigate();

    return (
        <>
            <ActionIcon
                permTitle="update_user"
                iconClasses="fas fa-edit text-warning"
                title="ویرایش کاربر" 
                onClick={() => navigate("/users/add-user", {
                    state: {
                        editUserId: rowData.id
                    }
                })}
            />

            <ActionIcon
                permTitle="delete_user"
                iconClasses="fas fa-times text-danger"
                title="حذف کاربر" 
                onClick={() => handleDeleteUser(rowData)}
            />
        </>
    );
}

export default Actions;
