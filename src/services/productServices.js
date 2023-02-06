import httpService from "./httpService";

export const getProductsService = () => {
    return httpService("/admin/products", "get");
}

export const deleteProductservice = (id) => {
    return httpService(`/admin/products/${id}`, "delete");
}