import httpService from "./httpService";

export const getBrandsService = () => {
    return httpService("/admin/brands", "get");
}

export const deleteBrandService = (id) => {
    return httpService(`/admin/brands/${id}`, "delete");
}

export const addNewBrandService = (data) => {
    return httpService("/admin/brands", "post", data)
}

// export const getSignleBrand = (id) => {
//     return httpService(`/admin/brands/${id}`, "get");
// }

export const editBrandService = (id, data) => {
    return httpService(`/admin/brands/${id}`, "post", data)
}