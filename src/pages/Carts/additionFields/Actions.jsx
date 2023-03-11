import React from 'react';
import { useNavigate } from 'react-router-dom';
import ActionIcon from '../../../components/ActionIcon';

const Actions = ({ rowData, handleDeleteCart }) => {
    const navigate = useNavigate();

    return (
        <>
            <ActionIcon 
            permTitle="update_cart"
            iconClasses="fas fa-edit text-warning"
            title="ویرایش سبد"
            onClick={() => navigate("/carts/add-cart", {
                state: {
                    editCartId: rowData.id
                }
            })}
            />

            {rowData.is_ordered == 0 ? (
                <ActionIcon 
                permTitle="delete_cart"
                iconClasses="fas fa-times text-danger"
                title="حذف سبد"
                onClick={() => handleDeleteCart(rowData)}
                />
            ) : null}
        </>
    );
}

export default Actions;
