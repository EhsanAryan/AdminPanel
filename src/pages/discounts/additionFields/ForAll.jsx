import React from 'react';

const ForAll = ({rowData}) => {
    return (
        <span>
            {rowData.for_all ? "همه" : "تعدادی از محصولات"}
        </span>
    );
}

export default ForAll;
