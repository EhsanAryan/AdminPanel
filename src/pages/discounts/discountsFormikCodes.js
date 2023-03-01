import * as Yup from "yup";
import { addNewDiscountService, editDiscountService } from "../../services/discountsServices";
import { Alert } from "../../utils/Alerts";
import { convertDateToGregorian } from "../../utils/convertDate";


export const initialValues = {
    title: "",
    code: "",
    percent: "",
    expire_at: "",
    for_all: true,
    product_ids: "",
}

export const onSubmit = async (values, actions, setData, editDiscount, navigate) => {
    const data = {
        ...values,
        expire_at: convertDateToGregorian(values.expire_at)
    };
    try {
        if (editDiscount) {
            const response = await editDiscountService(editDiscount.id, data);
            if (response.status === 200) {
                Alert("ویرایش تخفیف", response.data.message, "success");
                setData(prevData => {
                    return prevData.map(d => {
                        if (d.id == editDiscount.id) {
                            return response.data.data;
                        }
                        return d;
                    })
                });
                navigate("/discounts");
            }
        } else {
            const response = await addNewDiscountService(data);
            if (response.status === 201) {
                Alert("افزودن تخفیف", response.data.message, "success");
                setData(prevData => [...prevData, response.data.data]);
                actions.resetForm();
            }
        }
    } catch (error) {

    }
}

export const validationSchema = Yup.object().shape({
    title: Yup.string().required("عنوان تخفیف را مشخص کنید")
        .matches(/^[a-zA-Z0-9\u0600-\u06FF_-\s]+$/, "فقط از حروف و اعداد استفاده شود"),
    code: Yup.string().required("کد تخفیف را مشخص کنید")
        .matches(/^[a-zA-Z0-9_-]+$/, "فقط از حروف انگلیسی و اعداد استفاده شود"),
    percent: Yup.number().required("درصد تخفیف را مشخص کنید")
        .min(1, "درصد تخفیف نمیتواند کمتر از 1 باشد")
        .max(100, "درصد تخفیف نمیتواند از 100 بیشتر باشد"),
    expire_at: Yup.string().required("تاریخ پایان تخفیف را مشخص کنید")
        .matches(/^[0-9]{4}[/]{1}(0?[1-9]{1}|1[0-2]{1})[/]{1}(0?[1-9]{1}|[1-2]{1}[0-9]{1}|3[0-1]{1})$/,
            "تاریخ را به تقویم شمسی وارد کنید"),
    for_all: Yup.boolean(),
    product_ids: Yup.string().when("for_all", {
        is: false,
        then: Yup.string().required("باید حداقل یک محصول را انتخاب کنید")
            .matches(/^[0-9-]+$/, "فقط از اعداد و خط تیره استفاده شود"),
        otherwise: Yup.string().matches(/^[0-9-]+$/, "فقط از اعداد و خط تیره استفاده شود")
    })
});