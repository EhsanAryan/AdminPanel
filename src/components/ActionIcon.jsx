import React from 'react';
import { useHasPermission } from '../hooks/hasPermission';

const ActionIcon = ({ iconClasses, permTitle, targetModalId, ...others}) => {
    const hasPermission = useHasPermission(permTitle);

    return hasPermission && (
        <i
            className={`${iconClasses} mx-1 hoverable_text pointer has_tooltip`}
            title="ویرایش دسته"
            data-bs-placement="top"
            data-bs-toggle={targetModalId ? "modal" : ""}
            data-bs-target={targetModalId}
            {...others}
        >
        </i>
    );
}

export default ActionIcon;
