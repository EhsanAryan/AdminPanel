import * as Yup from "yup";
import { addNewColorService, editColorService } from "../../services/colorsServices";
import { Alert } from "../../utils/Alerts";

export const initialValues = {
    title: "",
    code: "#000000"
}

export const onSubmit = async (values, actions, setData, editColor, setEditColor) => {
    try {
        if (editColor) {
            const response = await editColorService(editColor.id, values);
            if (response.status === 200) {
                Alert("ویرایش رنگ", response.data.message, "success");
                setData(prevData => prevData.map(d => {
                    if (d.id === editColor.id) {
                        return response.data.data;
                    }
                    return d;
                }))
                setEditColor(null);
            }
        } else {
            const response = await addNewColorService(values);
            if (response.status === 201) {
                Alert("افزودن رنگ", response.data.message, "success");
                actions.resetForm();
                setData(prevData => [...prevData, response.data.data]);
            }
        }
    } catch (error) {

    }
}

export const validationSchema = Yup.object({
    title: Yup.string().required("نام رنگ را وارد کنید")
        .matches(/^[a-zA-Z0-9!?@#$%&\u0600-\u06FF\s]+$/, "فقط از حروف و اعداد و کاراکترها استفاده شود"),
    code: Yup.string().required("رنگ مورد نظر را انتخاب کنید")
})