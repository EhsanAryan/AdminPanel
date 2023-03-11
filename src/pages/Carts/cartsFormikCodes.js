import * as Yup from "yup";

export const initialValues = {
    user_id: "",
    product_id: "",
    color_id: "",
    guarantee_id: "",
    count: ""
}

export const onSubmit = (values, actions, currentProduct, setSelectedProductsInfo) => {
    setSelectedProductsInfo(prevValue => [...prevValue, {
        id: currentProduct.id + Math.random(),
        productData: currentProduct,
        color: values.color_id ? currentProduct.colors.filter(c => c.id == values.color_id)[0] : null,
        guarantee: values.guarantee_id ? currentProduct.guarantees.filter(g => g.id == values.guarantee_id)[0] : null,
        count: values.count,
    }]);

    actions.resetForm();
    actions.setFieldValue("user_id", values.user_id);
}

export const validationSchema = Yup.object({
    user_id: Yup.number().typeError("فقط عدد وارد کنید").required("این فیلد الزامی است"),
    product_id: Yup.number().typeError("فقط عدد وارد کنید").required("این فیلد الزامی است"),
    color_id: Yup.number().typeError("فقط عدد وارد کنید"),
    guarantee_id: Yup.number().typeError("فقط عدد وارد کنید"),
    count: Yup.number().typeError("فقط عدد وارد کنید").required("این فیلد الزامی است")
    .min(1, "حداقل باید 1 محصول انتخاب شود"),
});
