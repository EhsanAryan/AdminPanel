import { addNewGuarantee, editGuaranteeService } from "../../services/guarantiesServices";
import { Alert } from "../../utils/Alerts";
import * as Yup from "yup";


export const initialValues = {
    title: "",
    descriptions: "",
    length: "",
}

export const onSubmit = async (values, actions, setData, editGuarantee, setEditGuarantee) => {
    try {
        if(editGuarantee) {
            const response = await editGuaranteeService(editGuarantee.id, values);
            if(response.status === 200) {
                Alert("ویرایش گارانتی", response.data.message, "success");
                setData(prevData => prevData.map(d => {
                    if(d.id === editGuarantee.id) {
                        return response.data.data;
                    }
                    return d;
                }));
                setEditGuarantee(null);
            }
        } else {
            const response = await addNewGuarantee(values);
            if(response.status === 201) {
                Alert("افزودن گارانتی", response.data.message);
                actions.resetForm();
                setData(prevData => [...prevData , response.data.data]);
            }
        }
    } catch (error) {
        
    }

} 

export const validationSchema = Yup.object({
    title: Yup.string().required("فیلد را پر کنید").matches(/^[a-zA-Z0-9!?@#$%&\u0600-\u06FF\s]+$/,
        "فقط از حروف و اعداد و کاراکترها استفاده شود"),
    descriptions: Yup.string().matches(/^[a-zA-Z0-9!?@#$%&\u0600-\u06FF\s.]+$/,
        "فقط از حروف و اعداد و کاراکترها استفاده شود"),
    length: Yup.number().required("مدت گارانتی را مشخص کنید").min(1, "مدت گارانتی نمیتواند کمتر از 1 ماه باشد")
});