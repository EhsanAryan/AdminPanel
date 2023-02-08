import React from 'react';

const ForAll = ({rowData}) => {
    return (
        <span>
            {rowData.for_all ? "همه" : "افراد خاص"}
        </span>
    );
}

export default ForAll;
