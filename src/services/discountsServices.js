import httpService from "./httpService";

export const getDiscountsService = () => {
    return httpService("/admin/discounts", "get");
}

export const deleteDiscountService = (id) => {
    return httpService(`/admin/discounts/${id}`, "delete");
}

export const addNewDiscountService = (data) => {
    return httpService("/admin/discounts", "post", data);
}

export const editDiscountService = (discountId, data) => {
    return httpService(`/admin/discounts/${discountId}`, "put", data);
}
