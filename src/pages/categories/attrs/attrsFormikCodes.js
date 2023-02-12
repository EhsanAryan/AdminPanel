import * as Yup from "yup";
import { addCategoryAttrSerivce, editAttrService } from "../../../services/categoryAttrsServices";
import { Alert } from "../../../utils/Alerts";

export const initialValues = {
    title: "",
    unit: "",
    in_filter: true
}

export const onSubmit = async (values, actions, categoryId, setData, editAttrId, setEditAttrId, editAttr) => {
    try {
        const data = {
            ...values,
            in_filter: values.in_filter ? 1 : 0
        }
        if (editAttr) {
            const response = await editAttrService(editAttrId, data);
            if(response.status === 200) {
                Alert("ویرایش ویژگی", response.data.message, "success");
                setEditAttrId(null);
                // To rerender the component without sending an extra request to server
                setData(prevData => prevData.map(d => {
                    if(d.id === editAttrId) {
                        return response.data.data;
                    } else {
                        return d;
                    }
                }));
            }
        } else {
            const response = await addCategoryAttrSerivce(categoryId, data);
            if(response.status === 201) {
                Alert("ثبت ویژگی", response.data.message, "success");
                actions.resetForm();
                // To rerender the component without sending an extra request to server
                setData(prevData => [...prevData, response.data.data]);
            }
        }
    } catch (error) {
        
    }
}

export const validationSchema = Yup.object({
    title: Yup.string().required("فیلد را پر کنید").matches(/^[a-zA-Z0-9!?@#$%&\u0600-\u06FF\s]+$/,
        "فقط از حروف و اعداد و کاراکترها استفاده شود"),
    unit: Yup.string().required("فیلد را پر کنید").matches(/^[a-zA-Z0-9!?@#$%&\u0600-\u06FF\s]+$/,
    "فقط از حروف و اعداد و کاراکترها استفاده شود"),
    in_filter: Yup.boolean()
});