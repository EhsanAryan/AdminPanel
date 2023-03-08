import React from 'react';
import { useNavigate } from 'react-router-dom';
import ActionIcon from '../../../components/ActionIcon';

const Actions = ({ rowData, handleDeleteDiscount }) => {
    const navigate = useNavigate();

    return (
        <>
            <ActionIcon
                permTitle="update_discount"
                iconClasses="fas fa-edit text-warning"
                title="ویرایش تخفیف"
                onClick={() => navigate("/discounts/add-discount", {
                    state: {
                        editDiscount: rowData
                    }
                })}
            />

            <ActionIcon
                permTitle="delete_discount"
                iconClasses="fas fa-times text-danger"
                title="حذف تخفیف"
                onClick={() => handleDeleteDiscount(rowData)}
            />

        </>
    );
}

export default Actions;
