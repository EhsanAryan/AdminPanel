import httpService from "./httpService"

export const loginService = (data) => {
    return httpService("/auth/login", "post", data);
}

export const logoutService = () => {
    return httpService("/auth/logout", "get");
}

export const getUserService = () => {
    return httpService("/auth/user", "get");
}