import * as Yup from "yup";
import { addNewRoleService, editRolePermissionsService, editRoleService } from "../../services/usersServices";
import { Alert } from "../../utils/Alerts";

export const initialValues = {
    title: "",
    description: "",
    permissions_id: []
}

export const onSubmit = async (values, actions, setData, editRoleId, editType, navigate) => {
    try {
        if (editType === "role") {
            const response = await editRoleService(editRoleId, values);
            if (response.status === 200) {
                Alert("ویرایش نقش", response.data.message, "success");
                setData(prevData => {
                    return prevData.map(d => {
                        if (d.id == editRoleId) {
                            return response.data.data;
                        }
                        return d;
                    })
                });
                navigate(-1);
            }
        } else if (editType === "permissions") {
            const response = await editRolePermissionsService(editRoleId, values);
            if(response.status === 200) {
                Alert("ویرایش مجوزهای نقش", response.data.message, "success");
                setData(prevData => {
                    return prevData.map(d => {
                        if (d.id == editRoleId) {
                            return response.data.data;
                        }
                        return d;
                    })
                });
                navigate(-1);
            }
        } else {
            const response = await addNewRoleService(values);
            if (response.status === 201) {
                Alert("افزودن نقش", response.data.message, "success");
                setData(prevData => [...prevData, response.data.data]);
                actions.resetForm();
            }
        }
    } catch (error) {

    }
}

export const validationSchema = Yup.object().shape({
    title: Yup.string().when("editPermissions", {
        is: true,
        then: null,
        otherwise: Yup.string().required("فیلد را پر کنید").matches(/^[a-zA-Z0-9!?@#$%&\u0600-\u06FF\s-_]+$/,
            "فقط از حروف و اعداد و کاراکترها استفاده شود")
    }),
    description: Yup.string().when("editPermissions", {
        is: true,
        then: null,
        otherwise: Yup.string().required("فیلد را پر کنید").matches(/^[a-zA-Z0-9!?@#$%&\u0600-\u06FF\s-_]+$/,
            "فقط از حروف و اعداد و کاراکترها استفاده شود")
    }),
    permissions_id: Yup.array().min(1, "باید حداقل یک مجوز را انتخاب کنید")
});