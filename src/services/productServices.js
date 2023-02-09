import { convertDataToFormData } from "../utils/convertData";
import httpService from "./httpService";

export const getProductsService = (page, count, searchChar) => {
    return httpService(`/admin/products?page=${page}&count=${count}&searchChar=${searchChar}`, "get");
}

export const deleteProductservice = (id) => {
    return httpService(`/admin/products/${id}`, "delete");
}

export const addNewProductService = (data) => {
    return httpService("/admin/products", "post", data.image ? convertDataToFormData(data) : data);
}