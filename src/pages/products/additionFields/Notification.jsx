import React from 'react';

const Notification = ({rowData}) => {
    return (
        <span className={`${rowData.has_notification ? "text-success" : "text-danger"}`}>
            {rowData.has_notification === 1 ? "فعال" : "غیرفعال"}
        </span>
    );
}

export default Notification;
