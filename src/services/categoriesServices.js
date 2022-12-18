import httpService from "./httpService"

export const getCategoriesService = (parentId=null) => {
    return httpService(`/admin/categories${parentId ? `?parent=${parentId}` : ""}` , "get");
}