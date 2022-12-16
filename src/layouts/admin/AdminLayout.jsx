import React from 'react';
import AdminContextContainer from '../../context/AdminLayoutContext';
import Navbar from "./navbar/Navbar";
import Sidebar from "./sidebar/Sidebar";
import Content from '../../pages/Content';
import { Navigate } from 'react-router-dom';
import { useIsLogin } from '../../hooks/useIsLogin';

const AdminLayout = () => {
    const [loading , isLogin] = useIsLogin();

    return (
        <AdminContextContainer>
            {loading ? (
                <div className="waiting-div">
                    لطفاً صبر کنید...
                </div>
            ) : isLogin ? (
                <>
                    <Navbar />
                    <Sidebar />
                    <Content />
                </>
            ) : (
                <Navigate to="/auth/login" />
            )}
        </AdminContextContainer>
    )
}

export default AdminLayout;