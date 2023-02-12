import httpService from "./httpService";

export const getCategoryAttrsSerivce = (categoryId) => {
    return httpService(`/admin/categories/${categoryId}/attributes`, "get");
}

export const addCategoryAttrSerivce = (categoryId, data) => {
    return httpService(`/admin/categories/${categoryId}/attributes`, "post", data);
}

export const deleteCategoryAttrSerivce = (id) => {
    return httpService(`/admin/categories/attributes/${id}`, "delete");
}

export const getSingleAttrSerivce = (id) => {
    return httpService(`/admin/categories/attributes/${id}`, "get");
}

export const editAttrService = (id, data) => {
    return httpService(`/admin/categories/attributes/${id}`, "put", data);
}
