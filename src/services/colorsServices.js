import httpService from "./httpService";

export const getColorsServices = () => {
    return httpService("/admin/colors", "get");
}

export const deleteColorService = (id) => {
    return httpService(`/admin/colors/${id}`, "delete");
}

export const addNewColorService = (data) => {
    return httpService("/admin/colors", "post", data);
}

// export const getSingleColorService = (id) => {
//     return httpService(`/admin/colors/${id}`, "get");
// }

export const editColorService = (id, data) => {
    return httpService(`/admin/colors/${id}`, "put", data);
}
