import * as Yup from "yup";
import { loginService } from "../../services/authServices";

export const initialValues = {
    phone: "",
    password: "",
    remember: false
}

export const onSubmit = async (values, actions, navigate) => {
    const data = {
        ...values,
        remember: values.remember ? 1 : 0
    };
    try {
        const response = await loginService(data);
        if (response.status === 200) {
            localStorage.setItem("loginToken", JSON.stringify(response.data));
            navigate("/");
        }
    } catch (error) {

    }
}

export const validationSchema = Yup.object({
    phone: Yup.string().required("شماره تلفن را وارد کنید.")
        .matches(/^[0-9]{11}$/, "شماره تلفن باید 11 رقمی باشد."),
    password: Yup.string().required("رمز عبور را وارد کنید.")
        .matches(/^[a-zA-Z0-9!@#$%&]+$/, "رمز عبور فقط میتواند شامل حروف الفبا و اعداد و آندراسکور و برخی کاراکترها باشد.")
        .min(6, "رمز عبور حداقل باید 6 کارکتر باشد."),
    remember: Yup.boolean()
});