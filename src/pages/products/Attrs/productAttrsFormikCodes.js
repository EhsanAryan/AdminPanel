import { addProductAttributeService } from "../../../services/productServices"
import { Alert } from "../../../utils/Alerts";


export const onSubmit = async (values, actions, productId) => {
    let data = {};
    for (let key in values) {
        values[key] && (data = { ...data, [key]: { value: values[key] } });
    }
    try {
        const response = await addProductAttributeService(productId, data);
        if(response.status === 200) {
            Alert("افزودن ویژگی ها", response.data.message, "success");
        }
    } catch (error) {

    }
}