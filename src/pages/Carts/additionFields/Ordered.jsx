import React from 'react';

const Ordered = ({ rowData }) => {
    return (
        <span className={`${rowData.is_ordered ? "text-success" : "text-danger"}`}>
            {rowData.is_ordered ? "سفارش داده شده" :  "سفارش داده نشده"}
        </span>
    );
}

export default Ordered;
