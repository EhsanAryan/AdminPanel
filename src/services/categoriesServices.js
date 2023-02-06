import httpService from "./httpService"

export const getCategoriesService = (parentId=null) => {
    return httpService(`/admin/categories${parentId ? `?parent=${parentId}` : ""}` , "get");
}

export const getSingleCategoryService = (id) => {
    return httpService(`/admin/categories/${id}`, "get");
}

export const createNewCategoryService = (data) => {
    if(data.image) {
        let formdata = new FormData();
        formdata.append("parent_id", data.parent_id);
        formdata.append("title", data.title);
        formdata.append("descriptions", data.descriptions);
        formdata.append("is_active", data.is_active);
        formdata.append("show_in_menu", data.show_in_menu);
        formdata.append("image", data.image);
        data = formdata;
    }

    return httpService("/admin/categories", "post", data)
}

export const editCategoryService = (id, data) => {
    return httpService(`/admin/categories/${id}`, "put", data);
}

export const deleteCategoryService = (id) => {
    return httpService(`/admin/categories/${id}`, "delete");
}
