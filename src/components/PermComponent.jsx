import React from 'react';
import { Navigate } from 'react-router-dom';
import { useHasPermission } from '../hooks/hasPermission';

const PermComponent = ({ component, permTitle }) => {
    return useHasPermission(permTitle) ? component : <Navigate to={"/dashboard"} />;
}

export default PermComponent;
