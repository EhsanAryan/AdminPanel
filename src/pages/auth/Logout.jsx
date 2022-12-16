import axios from 'axios';
import React, { useEffect } from 'react';
import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { Alert } from '../../utils/Alerts';

const Logout = () => {
    const [loading , setLoading] = useState(true);

    useEffect(() => {
        const loginToken = JSON.parse(localStorage.getItem("loginToken"));

        axios.get("https://ecomadminapi.azhadev.ir/api/auth/logout" , {
            headers : {
                "Authorization" : `Bearer ${loginToken.token}`
            }
        })
        .then(response => {
            if(response.status===200) {
                localStorage.removeItem("loginToken");
            }
            else { 
                Alert("اررور!" , "مشکلی رخ داده است" , "error");
            }
            setLoading(false);
        })
        .catch(err => {
            Alert("اررور!" , "مشکلی از سمت سرور رخ داده است" , "error");
            setLoading(false);
        })
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
