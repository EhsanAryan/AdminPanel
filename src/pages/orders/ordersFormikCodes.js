import * as Yup from "yup";
import { addNewOrderService } from "../../services/ordersServices";
import { Alert } from "../../utils/Alerts";
import { convertDateToGregorian } from "../../utils/convertDate";

export const initialValues = {
    cart_id: "",
    discount_id: "",
    delivery_id: "",
    address: "",
    phone: "",
    email: "",
    pay_at: "",
    pay_card_number: "",
    pay_bank: "",
}

export const onSubmit = async (values, actions, handleGetOrders, navigate) => {
    const data ={
        ...values,
        pay_at: convertDateToGregorian(values.pay_at)
    }

    try {
        const response = await addNewOrderService(data);
        if(response.status === 201) {
            Alert("افزودن سفارش", response.data.message, "success");
            handleGetOrders();
            navigate(-1)
        }
    } catch (error) {
        
    }
}

export const validationSchema = Yup.object({
    cart_id: Yup.number().typeError("فقط عدد وارد کنید").required("این فیلد الزامی است")
    .min(0, "کد سبد نمیتواند کمتر از 1 باشد"),
    discount_id: Yup.number().typeError("فقط عدد وارد کنید")
    .min(0, "آیدی تخفیف نمیتواند کمتر از 1 باشد"),
    delivery_id: Yup.number().typeError("فقط عدد وارد کنید").required("این فیلد الزامی است")
    .min(0, "آیدی روش تحویل نمیتواند کمتر از 1 باشد"),
    address: Yup.string().required("این فیلد الزامی است")
        .matches(/^[a-zA-Z0-9\u0600-\u06FF\s._-]+$/, "فقط از حروف و اعداد استفاده شود"),
    phone: Yup.string().required("این فیلد الزامی است")
        .matches(/^[0-9]{11}$/, "شماره تلفن باید 11 رقمی باشد"),
    email: Yup.string()
        .matches(/^[a-zA-Z0-9._]+@[a-zA-Z0-9_]+\.[a-zA-Z]{2,3}$/, "فرمت ایمیل اشتباه است"),
    pay_at: Yup.string()
        .matches(/^[0-9]{4}[/]{1}(0?[1-9]{1}|1[0-2]{1})[/]{1}(0?[1-9]{1}|[1-2]{1}[0-9]{1}|3[0-1]{1})$/,
            "تاریخ را به تقویم شمسی وارد کنید"),
    pay_card_number: Yup.string().required("این فیلد الزامی است")
        .matches(/^[0-9]{16}$/, "شماره کارت باید 16 رقمی باشد"),
    pay_bank: Yup.string()
        .matches(/^[a-zA-Z0-9\u0600-\u06FF\s_-]+$/, "فقط از حروف و اعداد استفاده شود"),
});
