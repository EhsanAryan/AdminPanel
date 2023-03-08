import React from 'react';
import { useNavigate } from 'react-router-dom';
import ActionIcon from '../../../components/ActionIcon';

const Actions = ({ rowData, handleDeleteDelivery }) => {
    const navigate = useNavigate();

    return (
        <>
            <ActionIcon
                permTitle="update_color"
                iconClasses="fas fa-edit text-warning"
                title="ویرایش سرویس"
                onClick={() => navigate("/deliveries/add-delivery", {
                    state : {
                        editDelivery: rowData
                    }
                })}
            />

            <ActionIcon
                permTitle="delete_color"
                iconClasses="fas fa-times text-danger "
                title="حذف رنگ"
                onClick={() => handleDeleteDelivery(rowData)}
            />
        </>
    );
}

export default Actions;
