import React from 'react';

const SpinnerLoader = ({isInline, isSmall, colorClass}) => {
    return (
        <span className={`text-center ${!isInline ? "d-block" : "mx-2"}`}>
            <div className={`spinner-border ${isSmall ? "spinner-border-sm" : "spinner-loader"} ${colorClass}`}>
                <span className="visually-hidden">Loading...</span>
            </div>
        </span>
    );
}

export default SpinnerLoader;
