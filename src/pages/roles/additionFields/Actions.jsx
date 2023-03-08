import React from 'react';
import { useNavigate } from 'react-router-dom';
import ActionIcon from '../../../components/ActionIcon';

const Actions = ({ rowData, handleDeleteRole }) => {
    const navigate = useNavigate();

    return (
        <>
            <ActionIcon
            permTitle="update_role"
            iconClasses="fas fa-edit text-warning"
            title="ویرایش نقش"
            onClick={() => navigate("/roles/add-role", {
                state : {
                    editRoleId : rowData.id,
                    editType: "role"
                }
            })}
            />

            <ActionIcon
            permTitle="update_role_permissions"
            iconClasses="fas fa-fingerprint text-info"
            title="ویرایش مجوزهای نقش"
            onClick={() => navigate("/roles/add-role", {
                state : {
                    editRoleId : rowData.id,
                    editType: "permissions"
                }
            })}
            />

            <ActionIcon
            permTitle="delete_role"
            iconClasses="fas fa-times text-danger"
            title="حذف نقش"
            onClick={() => handleDeleteRole(rowData)}
            />
        </>
    );
}

export default Actions;
