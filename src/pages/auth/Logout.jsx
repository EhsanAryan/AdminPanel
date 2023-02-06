import React, { useEffect } from 'react';
import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { logoutService } from '../../services/authServices';

const Logout = () => {
    const [loading , setLoading] = useState(true);

    const handleLogout = async () => {
        try {
            const response = await logoutService();
            if(response.status===200) {
                localStorage.removeItem("loginToken");
            }
            setLoading(false);
        } catch (error) {
            setLoading(false);
        } 
    }

    useEffect(() => {
       handleLogout();
    }, []);


    return (
        <>
            {loading ? (
                <div className="waiting-div">
                    لطفاً صبر کنید...
                </div>
            ) : (
                <Navigate to={"/auth/login"} />
            )}
        </>
    );
}

export default Logout;
