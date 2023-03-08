import httpService from "./httpService";

export const getAllDeliveriesService = () => {
    return httpService("/admin/deliveries", "get");
}

export const getSingleDeliveryService = (deiveryId) => {
    return httpService(`/admin/deliveries/${deiveryId}`, "get");
}

export const deleteDeliveryService = (deiveryId) => {
    return httpService(`/admin/deliveries/${deiveryId}`, "delete");
}

export const addNewDeliveryService = (data) => {
    return httpService("/admin/deliveries", "post", data);
}

export const editDeliveryService = (data, deliveryId) => {
    return httpService(`/admin/deliveries/${deliveryId}`, "put", data);
}