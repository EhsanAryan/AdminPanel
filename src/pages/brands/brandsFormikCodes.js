import { addNewBrandService, editBrandService } from "../../services/brandsServices";
import { Alert } from "../../utils/Alerts";
import * as Yup from "yup";

export const initialValues = {
    original_name: "",
    persian_name: "",
    descriptions: "",
    logo: null
}

export const onSubmit = async (values, actions, setData, editBrand, setEditBrand) => {
    try {
        if (editBrand) {
            const response = await editBrandService(editBrand.id, values);
            if (response.status === 200) {
                Alert("ویرایش برند", response.data.message, "success");
                setEditBrand(null);
                setData(prevData => prevData.map(d => {
                    if (d.id === editBrand.id) {
                        return response.data.data;
                    }
                    return d;
                }));
                console.log(values);
                console.log(response.data.data);
            }
        } else {
            const response = await addNewBrandService(values);
            if (response.status === 201) {
                Alert("ثبت برند", response.data.message, "success");
                actions.resetForm();
                setData(prevData => [...prevData, response.data.data]);
            }
        }

    } catch (error) {

    }
}

export const validationSchema = Yup.object({
    original_name: Yup.string().required("فیلد را پر کنید").matches(/^[a-zA-Z0-9!?@#$%&\s]+$/,
        "فقط از حروف انگلیسی و اعداد و کاراکترها استفاده شود"),
    persian_name: Yup.string().matches(/^[0-9!?@#$%&\u0600-\u06FF\s]+$/,
        "فقط از حروف فارسی و اعداد و کاراکترها استفاده شود"),
    descriptions: Yup.string().matches(/^[a-zA-Z0-9!?@#$%&\u0600-\u06FF\s]+$/,
        "فقط از حروف و اعداد و کاراکترها استفاده شود"),
    logo: Yup.mixed().test("filesize",
        "حجم فایل نمیتواند بیشتر از 500 کیلوبایت باشد",
        (value) => !value ? true : (value.size <= 500 * 1024))
        .test("format",
            "فرمت فایل باید jpg باشد",
            (value) => !value ? true : (value.type === "image/jpeg")),
});