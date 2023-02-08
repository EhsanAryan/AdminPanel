import httpService from "./httpService";

export const getBrandsService = () => {
    return httpService("/admin/brands", "get");
}

export const deleteBrandService = (id) => {
    return httpService(`/admin/brands/${id}`, "delete");
}

export const addNewBrandService = (data) => {
    if(data.logo) {
        let formdata = new FormData();
        formdata.append("original_name", data.original_name);
        formdata.append("persian_name", data.persian_name);
        formdata.append("descriptions", data.descriptions);
        formdata.append("logo", data.logo);
        data = formdata;
    }
    return httpService("/admin/brands", "post", data);
}

// export const getSignleBrand = (id) => {
//     return httpService(`/admin/brands/${id}`, "get");
// }

export const editBrandService = (id, data) => {
    if(data.logo) {
        let formdata = new FormData();
        formdata.append("original_name", data.original_name);
        formdata.append("persian_name", data.persian_name);
        formdata.append("descriptions", data.descriptions);
        formdata.append("logo", data.logo);
        data = formdata;
    }
    return httpService(`/admin/brands/${id}`, "post", data)
}