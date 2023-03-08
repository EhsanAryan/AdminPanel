import httpService from "./httpService";

export const getAllCartsService = () => {
    return httpService("/admin/carts", "get");
}

export const addNewCartService = (data) => {
    return httpService("/admin/carts", "post", data);
}

export const editCartService = (cartId, data) => {
    return httpService(`/admin/carts/${cartId}`, "put", data);
}

export const deleteCartService = (cartId) => {
    return httpService(`/admin/carts/${cartId}`, "delete");
}

export const getSingleCartService = (cartId) => {
    return httpService(`/admin/carts/${cartId}`, "get");
}