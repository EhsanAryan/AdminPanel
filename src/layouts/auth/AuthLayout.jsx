import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { useIsLogin } from '../../hooks/useIsLogin';
import Login from '../../pages/auth/Login';
import Error from '../../pages/Error/Error';

const AuthLayout = () => {
    const [loading, isLogin] = useIsLogin();

    return (
        <>
            {loading ? (
                <div className="waiting-div">
                    لطفاً صبر کنید...
                </div>
            ) : isLogin ? (
                <Navigate to="/" />
            ) : (
                <div className="auth-container d-flex justify-content-center align-items-center">
                    <Routes>
                        <Route path="/auth/login" element={<Login />} />
                        <Route path="/auth/" element={<Login />} />
                        <Route path="/auth/*" element={<Error />} />
                    </Routes>
                </div>
            )}
        </>


    );
}

export default AuthLayout;
