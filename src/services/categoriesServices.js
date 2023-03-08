import { convertDataToFormData } from "../utils/convertData";
import httpService from "./httpService"

export const getCategoriesService = (parentId=null) => {
    return httpService(`/admin/categories${parentId ? `?parent=${parentId}` : ""}` , "get");
}

export const getSingleCategoryService = (id) => {
    return httpService(`/admin/categories/${id}`, "get");
}

export const createNewCategoryService = (data) => {
    return httpService("/admin/categories", "post", data.image ? convertDataToFormData(data) : data)
}

export const editCategoryService = (id, data) => {
    return httpService(`/admin/categories/${id}`, "put", data);
}

export const deleteCategoryService = (id) => {
    return httpService(`/admin/categories/${id}`, "delete");
}
