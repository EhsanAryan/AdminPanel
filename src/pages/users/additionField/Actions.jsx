import React from 'react';
import { useNavigate } from 'react-router-dom';

const Actions = ({ rowData, handleDeleteUser }) => {
    const navigate = useNavigate();

    return (
        <>
            <i className="fas fa-edit text-warning mx-1 
            hoverable_text pointer has_tooltip" title="ویرایش نقش"
            onClick={() => navigate("/users/add-user", {
                state: {
                    editUserId: rowData.id
                }
            })}>
            </i>

            <i className="fas fa-times text-danger mx-1 
            hoverable_text pointer has_tooltip"
                title="حذف نقش" data-bs-toggle="tooltip" data-bs-placement="top"
                onClick={() => handleDeleteUser(rowData)}
            >
            </i>
        </>
    );
}

export default Actions;
