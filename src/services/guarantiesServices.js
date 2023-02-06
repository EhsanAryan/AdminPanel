import httpService from "./httpService";

export const getGuarantiesService = () => {
    return httpService("/admin/guarantees", "get");
}

export const deleteGuaranteeService = (id) => {
    return httpService(`/admin/guarantees/${id}`, "delete");
}

export const addNewGuarantee = (data) => {
    return httpService(`/admin/guarantees`, "post", data);
}

// export const getSingleGuaranteeService = (id) => {
//     return httpService(`/admin/guarantees/${id}`, "get");
// }

export const editGuaranteeService = (id, data) => {
    return httpService(`/admin/guarantees/${id}`, "put", data);
}

