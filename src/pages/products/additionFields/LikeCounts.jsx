import React from 'react';

const LikeCounts = ({rowData}) => {
    return (
        <>
         <span className="mx-2 text-success">{rowData.like_count}</span>
         <span className="mx-2 text-danger">{rowData.dislike_count}</span>   
        </>
    );
}

export default LikeCounts;
