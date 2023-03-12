import React from 'react';
import { useNavigate } from 'react-router-dom';
import ActionIcon from '../../../components/ActionIcon';

const Actions = ({ rowData, handleDeleteOrder }) => {
    const navigate = useNavigate();

    return (
        <>
            <ActionIcon
                permTitle="read_orders"
                iconClasses="fas fa-shopping-cart text-info"
                title="مشاهده جزئیات سفارش"
                onClick={() => navigate("/orders/add-order", {
                    state: {
                        selectedOrderId: rowData.id
                    }
                })}
            />

            <ActionIcon
                permTitle="delete_order"
                iconClasses="fas fa-times text-danger"
                title="حذف سفارش"
                onClick={() => handleDeleteOrder(rowData)}
            />
        </>
    );
}

export default Actions;
