import React from 'react';

const ColorField = ({rowData}) => {
    return (
        <div className="w-100 text-center" style={{
            backgroundColor: rowData.code,
            color: rowData.code
        }}>.</div>
    );
}

export default ColorField;
