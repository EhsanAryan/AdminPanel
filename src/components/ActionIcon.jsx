import React from 'react';
import { useHasPermission } from '../hooks/hasPermission';

const ActionIcon = ({ iconClasses, permTitle, targetModalId, ...props}) => {
    const hasPermission = useHasPermission(permTitle);

    return hasPermission && (
        <i
            className={`${iconClasses} mx-1 hoverable_text pointer has_tooltip`}
            title="ویرایش دسته"
            data-bs-placement="top"
            data-bs-toggle={targetModalId ? "modal" : ""}
            data-bs-target={targetModalId}
            {...props}
        >
        </i>
    );
}

export default ActionIcon;
