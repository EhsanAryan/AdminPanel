import * as Yup from "yup";
import { addNewDeliveryService, editDeliveryService } from "../../services/deliveriesServices";
import { Alert } from "../../utils/Alerts";

export const initialValues = {
    title: "",
    amount: "",
    time: "",
    time_unit: ""
}

export const onSubmit = async (values, actions, setData, editDelivery, navigate) => {
    try {
        if (editDelivery) {
            const response = await editDeliveryService(values, editDelivery.id);
            if(response.status === 200) {
                Alert("ویرایش سرویس ارسال", response.data.message, "success");
                setData(prevData => {
                    return prevData.map(d => {
                        if(d.id == editDelivery.id) {
                            return response.data.data;
                        }
                        return d;
                    })
                });
                return navigate(-1);
            }
        } else {
            const response = await addNewDeliveryService(values);
            if(response.status === 201) {
                Alert("افزودن سرویس ارسال", response.data.message, "success");
                setData(prevData => [...prevData, response.data.data]);
                actions.resetForm();
            }
        }
    } catch (error) {

    }
}

export const validationSchema = Yup.object({
    title: Yup.string().required("این فیلد الزامی است")
        .matches(/^[a-zA-Z0-9!?@#$%&\u0600-\u06FF\s]+$/, "فقط از حروف و اعداد و کاراکترها استفاده شود"),
    amount: Yup.number().required("این فیلد الزامی است").typeError("فقط عدد وارد کنید")
        .min(1, "قیمت باید بزرگتر از 0 باشد"),
    time: Yup.number().required("این فیلد الزامی است").typeError("فقط عدد وارد کنید")
        .min(1, "زمان تحویل نمیتواند 0 باشد"),
    time_unit: Yup.string().required("این فیلد الزامی است")
        .matches(/^[a-zA-Z\u0600-\u06FF\s]+$/, "فقط از حروف استفاده شود")
});