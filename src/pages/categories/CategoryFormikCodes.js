import { createNewCategoryService, editCategoryService } from "../../services/categoriesServices";
import { Alert } from "../../utils/Alerts";
import * as Yup from "yup";

export const initialValues = {
    parent_id: "",
    title: "",
    descriptions: "",
    is_active: true,
    show_in_menu: true,
    image: null
}

export const onSubmit = async (values, actions, setForceRender, editId, setEditId) => {
    try {
        const data = {
            ...values,
            is_active: values.is_active ? 1 : 0,
            show_in_menu: values.show_in_menu ? 1 : 0
        }
        if (editId) {
            const response = await editCategoryService(editId, data);
            if (response.status === 200) {
                Alert("ویرایش رکورد", response.data.message, "success");
                setEditId(null);
                setForceRender(prevValue => !prevValue);
            }
        } else {
            const response = await createNewCategoryService(data);
            if (response.status === 201) {
                Alert("ثبت رکورد", response.data.message, "success");
                actions.resetForm();
                setForceRender(prevValue => !prevValue);
            }
            actions.resetForm();
        }
    } catch (error) {

    }
}

export const validationSchema = Yup.object({
    parent_id: Yup.number(),
    title: Yup.string().required("فیلد را پر کنید").matches(/^[a-zA-Z0-9!?@#$%&\u0600-\u06FF\s]+$/,
        "فقط از حروف و اعداد و کاراکترها استفاده شود"),
    descriptions: Yup.string().matches(/^[a-zA-Z0-9!?@#$%&\u0600-\u06FF\s.]+$/,
        "فقط از حروف و اعداد و کاراکترها استفاده شود"),
    image: Yup.mixed().test("filesize",
        "حجم فایل نمیتواند بیشتر از 500 کیلوبایت باشد",
        (value) => !value ? true : (value.size <= 500 * 1024))
        .test("format",
            "فرمت فایل باید jpg باشد",
            (value) => !value ? true : (value.type === "image/jpeg")),
    is_active: Yup.boolean(),
    show_in_menu: Yup.boolean()
});