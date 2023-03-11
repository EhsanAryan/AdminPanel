import { convertDataToFormData } from "../utils/convertData";
import httpService from "./httpService";

export const getProductsService = (page, count, searchChar) => {
    return httpService(`/admin/products?page=${page}&count=${count}&searchChar=${searchChar}`, "get");
}

export const getAllProductsTitlesService = () => {
    return httpService("/admin/products/all_titles" , "get");
}

export const deleteProductservice = (id) => {
    return httpService(`/admin/products/${id}`, "delete");
}

export const addNewProductService = (data) => {
    return httpService("/admin/products", "post", data.image ? convertDataToFormData(data) : data, 
    "multipart/form-data");
}

export const getSingleProduct = (id) => {
    return httpService(`/admin/products/${id}`, "get");
}

export const editProductService = (id, data) => {
    return httpService(`/admin/products/${id}`, "put", data);
}

export const addProductAttributeService = (id, data) => {
    return httpService(`/admin/products/${id}/add_attr`, "post", data);
}

export const addGalleryImageSerive = (productId, data) => {
    return httpService(`/admin/products/${productId}/add_image`, "post", data, "multipart/form-data");
}

export const deleteGalleryImageService = (imageId) => {
    return httpService(`/admin/products/gallery/${imageId}`, "delete");
}

export const setMainGalleryImageService = (imageId) => {
    return httpService(`/admin/products/gallery/set_main/${imageId}`, "get");
}