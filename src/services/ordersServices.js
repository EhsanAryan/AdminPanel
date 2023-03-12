import httpService from "./httpService";

export const getOrdersService = (page, count, searchChar) => {
    return httpService(`/admin/orders?page=${page}&count=${count}&searchChar=${searchChar}`, "get");
}

export const getSingleOrderService = (orderId) => {
    return httpService(`/admin/orders/${orderId}`, "get");
}

export const deleteOrderService = (orderId) => {
    return httpService(`/admin/orders/${orderId}`, "delete");
}

export const addNewOrderService = (data) => {
    return httpService("/admin/orders", "post", data);
}