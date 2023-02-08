import React from 'react';

const Status = ({rowData}) => {
    return (
        <span className={`${rowData.is_active ? "text-success" : "text-danger"}`}>
            {rowData.is_active === 1 ? "فعال" : "غیرفعال"}
        </span>
    );
}

export default Status;
