import * as Yup from "yup";
import { addNewProductService } from "../../services/productServices";
import { Alert } from "../../utils/Alerts";


export const initialValues = {
    category_ids: "",
    title: "",
    price: "",
    weight: "",
    brand_id: "",
    color_ids: "",
    guarantee_ids: "",
    descriptions: "",
    short_descriptions: "",
    cart_descriptions: "",
    image: null,
    alt_image: "",
    keywords: "",
    stock: "",
    discount: ""
}

export const onSubmit = async (values, actions) => {
    try {
        const response = await addNewProductService(values);
        if (response.status === 201) {
            Alert("افزودن محصول", response.data.message, "success");
            actions.resetForm();
        }
    } catch (error) {
        console.log(error);
    }
}

export const validationSchema = Yup.object({
    category_ids: Yup.string().required("حداقل یک دسته را باید انتخاب کنید")
        .matches(/^[0-9\s-]+$/, "فقط از اعداد و خط تیره استفاده شود"),
    title: Yup.string().required("فیلد را پر کنید").matches(/^[a-zA-Z0-9!?@#$%&\u0600-\u06FF\s]+$/,
        "فقط از حروف و اعداد و کاراکترها استفاده شود"),
    price: Yup.number().required("فیلد را پر کنید").min(1, "قیمت نمیتواند 0 یا منفی باشد"),
    weight: Yup.number().min(1, "وزن محصول نمیتواند 0 یا منفی باشد"),
    brand_id: Yup.number(),
    color_ids: Yup.string().matches(/^[0-9\s-]+$/, "فقط از اعداد و خط تیره استفاده شود"),
    guarantee_ids: Yup.string().matches(/^[0-9\s-]+$/, "فقط از اعداد و خط تیره استفاده شود"),
    descriptions: Yup.string().matches(/^[a-zA-Z0-9!?@#$%&\u0600-\u06FF\s.]+$/,
        "فقط از حروف و اعداد و کاراکترها استفاده شود"),
    short_descriptions: Yup.string().matches(/^[a-zA-Z0-9!?@#$%&\u0600-\u06FF\s.]+$/,
        "فقط از حروف و اعداد و کاراکترها استفاده شود"),
    cart_descriptions: Yup.string().matches(/^[a-zA-Z0-9!?@#$%&\u0600-\u06FF\s.]+$/,
        "فقط از حروف و اعداد و کاراکترها استفاده شود"),
    image: Yup.mixed().test("filesize",
        "حجم فایل نمیتواند بیشتر از 500 کیلوبایت باشد",
        (value) => !value ? true : (value.size <= 500 * 1024))
        .test("format",
            "فرمت فایل باید jpg یا png باشد",
            (value) => !value ? true : (value.type === "image/jpeg") || (value.type === "image/png")),
    alt_image: Yup.string().matches(/^[a-zA-Z0-9!?@#$%&\u0600-\u06FF\s]+$/,
        "فقط از حروف و اعداد و کاراکترها استفاده شود"),
    keywords: Yup.string().matches(/^[a-zA-Z0-9\u0600-\u06FF-]+$/,
        "فقط از حروف و اعداد و خط تیره استفاده شود (بدون فاصله)"),
    stock: Yup.number().required("تعداد موجودی محصول را مشخص کنید")
        .min(1, "برای ثبت محصول، حداقل یک نمونه باید موجود باشد"),
    discount: Yup.number().min(0, "تخفیف نمیتواند منفی باشد").max(100, "حداکثر تخفیف 100 درصد است")
});