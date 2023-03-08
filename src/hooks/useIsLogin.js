import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { receiveUserResponseAction } from "../redux/user/userActions";
import { getUserService } from "../services/authServices";

export const useIsLogin = () => {
    const [isLogin, setIsLogin] = useState(false);
    const [loading, setLoading] = useState(true);

    const dispatch = useDispatch();

    const handleCheckLogin = async () => {
        const loginToken = JSON.parse(localStorage.getItem("loginToken"));
        if (loginToken) {
            try {
                const response = await getUserService();
                setIsLogin(response.status === 200 ? true : false);
                let userData = response.data;
                // add a full_name property to user data
                userData.full_name = `${userData.first_name || ""} ${userData.last_name || ""}`.trim();
                dispatch(receiveUserResponseAction(userData));
            } catch (error) {
                localStorage.removeItem("loginToken");
                setIsLogin(false);
            } finally {
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
    }, []);

    return [loading, isLogin];
}