import httpService from "./httpService";

export const getColorsServices = () => {
    return httpService("/admin/colors", "get");
}

export const deleteColorService = (id) => {
    return httpService(`/admin/colors/${id}`, "delete");
}

