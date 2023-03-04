import * as Yup from "yup";
import { addNewUserService, editUserService } from "../../services/usersServices";
import { Alert } from "../../utils/Alerts";
import { convertDateToGregorian } from "../../utils/convertDate";

export const initialValues = {
    user_name: "",
    first_name: "",
    last_name: "",
    phone: "",
    national_code: "",
    email: "",
    password: "",
    birth_date: "",
    gender: 1,
    roles_id: []
}

export const onSubmit = async (values, actions, setData, editUserId, navigate) => {
    const data = {
        ...values,
        birth_date: values.birth_date ? convertDateToGregorian(values.birth_date) : ""
    }
    try {
        if (editUserId) {
            const response = await editUserService(editUserId, data);
            if (response.status === 200) {
                Alert("ویرایش کاربر", response.data.message, "success");
                setData(prevData => prevData.map(d => {
                    if (d.id == editUserId) {
                        return response.data.data;
                    }
                    return d;
                }));
                navigate(-1);
            }
        } else {
            const response = await addNewUserService(data);
            if (response.status === 201) {
                Alert("افزودن کاربر", response.data.message, "success");
                setData(prevData => [...prevData, response.data.data]);
                actions.resetForm();
            }
        }
    } catch (error) {

    }
}

// "isEditing" is not a real field, it's only used for editing user
export const validationSchema = Yup.object().shape({
    user_name: Yup.string().required("نام کاربری الزامی است")
        .matches(/^[a-zA-Z0-9\u0600-\u06FF-_]+$/, "فقط از حروف و اعداد استفاده شود"),
    first_name: Yup.string()
        .matches(/^[a-zA-Z\u0600-\u06FF\s-_]+$/, "فقط از حروف استفاده شود"),
    last_name: Yup.string()
        .matches(/^[a-zA-Z\u0600-\u06FF\s-_]+$/, "فقط از حروف استفاده شود"),
    phone: Yup.string().required("شماره موبایل الزامی است").matches(/^[0-9]{11}$/, "فرمت اشتباه است (شماره تلفن 11 رقمی است)"),
    national_code: Yup.string().matches(/^[0-9]{10}$/, "فرمت اشتباه است (کد ملی 10 رقمی است)"),
    email: Yup.string().matches(/^[a-zA-Z0-9._]+@[a-zA-Z0-9_]+\.[a-zA-Z]{2,3}$/, "فرمت ایمیل اشتباه است"),
    password: Yup.string().when("isEditing", {
        is: true,
        then: Yup.string().matches(/^[a-zA-Z0-9@#$_-]+$/, "از کاراکترهای غیرمجاز استفاده شده است")
            .min(8, "رمز عبور باید حداقل 8 کاراکتر باشد")
            .max(20, "رمز عبور باید حداکثر 20 کاراکتر باشد"),
        otherwise: Yup.string().required("رمز عبور الزامی است")
            .matches(/^[a-zA-Z0-9@#$_-]+$/, "از کاراکترهای غیرمجاز استفاده شده است")
            .min(8, "رمز عبور باید حداقل 8 کاراکتر باشد")
            .max(20, "رمز عبور باید حداکثر 20 کاراکتر باشد")
    }),
    birth_date: Yup.string()
        .matches(/^[0-9]{4}[/]{1}(0?[1-9]{1}|1[0-2]{1})[/]{1}(0?[1-9]{1}|[1-2]{1}[0-9]{1}|3[0-1]{1})$/,
            "تاریخ را به تقویم شمسی وارد کنید"),
    gender: Yup.number(),
    roles_id: Yup.array().min(1, "باید حداقل یک نقش برای کاربر انتخاب کنید")
})