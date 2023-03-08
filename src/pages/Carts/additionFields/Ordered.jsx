import React from 'react';

const Ordered = ({ rowData }) => {
    return (
        <span className={`${rowData.is_ordered ? "text-success" : "text-danger"}`}>
            {rowData.is_ordered ? "تحویل داده شده" : "در حال ارسال"}
        </span>
    );
}

export default Ordered;
