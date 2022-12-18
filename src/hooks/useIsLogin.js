import { useEffect, useState } from "react";
import { getUsersService } from "../services/authServices";

export const useIsLogin = () => {
    const [isLogin , setIsLogin] = useState(false);
    const [loading , setLoading] = useState(true);

    const handleCheckLogin = async () => {
        const loginToken = JSON.parse(localStorage.getItem("loginToken"));
        if(loginToken) {
            try {
                const response = await getUsersService();
                setIsLogin(response.status===200 ? true : false)
                setLoading(false);
            } catch (error) {
                localStorage.removeItem("loginToken");
                setIsLogin(false);
                setLoading(false);
            }
        }
        else {
            setIsLogin(false);
            setLoading(false);
        }
    }

    useEffect(() => {
        handleCheckLogin();
    } , []);

    return [loading , isLogin];
}