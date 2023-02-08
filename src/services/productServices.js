import httpService from "./httpService";

export const getProductsService = (page, count, searchChar) => {
    return httpService(`/admin/products?page=${page}&count=${count}&searchChar=${searchChar}`, "get");
}

export const deleteProductservice = (id) => {
    return httpService(`/admin/products/${id}`, "delete");
}