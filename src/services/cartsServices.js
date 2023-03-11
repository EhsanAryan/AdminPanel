import httpService from "./httpService";

export const getCartsService = (page, count, searchChar) => {
    return httpService(`/admin/carts?page=${page}&count=${count}&searchChar=${searchChar}`, "get");
}

export const getSingleCartService = (cartId) => {
    return httpService(`/admin/carts/${cartId}`, "get");
}

export const deleteCartService = (cartId) => {
    return httpService(`/admin/carts/${cartId}`, "delete");
}

export const addNewCartService = (data) => {
    return httpService("/admin/carts", "post", data);
}

export const editCartService = (data, cartId) => {
    return httpService(`/admin/carts/${cartId}`, "put", data);
}
