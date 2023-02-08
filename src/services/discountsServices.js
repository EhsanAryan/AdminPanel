import httpService from "./httpService";

export const getDiscountsService = () => {
    return httpService("/admin/discounts", "get");
}

export const deleteDiscountService = (id) => {
    return httpService(`/admin/discounts/${id}`, "delete");
}


