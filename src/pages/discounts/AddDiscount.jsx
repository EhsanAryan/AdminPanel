import { Form, Formik } from 'formik';
import React from 'react';
import ModalContainer from '../../components/ModalContainer';
import * as Yup from "yup";
import FormikControl from '../../components/form/FormikControl';

const initialValues = {
    title: "",
    code: "",
    percent: "",
    expire_at: "",
    product_ids: [],
    for_all: true
}

const onSubmit = (values, actions) => {
    console.log(values);
}

const validationSchema = Yup.object({
    title: Yup.string().required("عنوان تخفیف را مشخص کنید")
        .matches(/^[a-zA-Z0-9!?@#$%&\u0600-\u06FF\s]+$/, "فقط از حروف و اعداد و کاراکترها استفاده شود"),
    code: Yup.string().required("کد تخفیف را مشخص کنید")
        .matches(/^[a-zA-Z0-9]+$/, "فقط از حروف انگلیسی و اعداد استفاده شود"),
    percent: Yup.number().required("درصد تخفیف را مشخص کنید").min(1, "درصد تخفیف نمیتواند کمتر از 1 باشد"),
    expire_at: Yup.string().required("تاریخ پایان تخفیف را مشخص کنید")
        .matches(/^[0-9]{4}[/]{1}(0?[1-9]{1}|1[0-2]{1})[/]{1}(0?[1-9]{1}|[1-2]{1}[0-9]{1}|3[0-1]{1})$/,
            "تاریخ را به تقویم شمسی وارد کنید"),
    product_ids: Yup.array(),
    for_all: Yup.boolean()
});


const AddDiscount = () => {
    return (
        <>
            <button className="btn btn-success d-flex justify-content-center align-items-center" data-bs-toggle="modal" data-bs-target="#add_discount_modal">
                <i className="fas fa-plus text-light"></i>
            </button>

            <ModalContainer
                id={"add_discount_modal"}
                title={"افزودن کد تخفیف"}
                fullScreen={true}
            >
                <div className="container">
                    <Formik
                        initialValues={initialValues}
                        onSubmit={onSubmit}
                        validationSchema={validationSchema}
                    >
                        <Form>
                            <div className="row justify-content-center">
                                <FormikControl
                                    control="input"
                                    name="title"
                                    label="عنوان تخفیف"
                                    type="text"
                                    className="col-md-6 col-lg-8 my-3 label-8rem"
                                    placeHolder="عنوان تخفیف را وارد کنید"
                                />

                                <FormikControl
                                    control="input"
                                    name="code"
                                    label="کد تخفیف"
                                    type="text"
                                    className="col-md-6 col-lg-8 my-3 label-8rem"
                                    placeHolder="کد تخفیف را وارد کنید"
                                />

                                <FormikControl
                                    control="input"
                                    name="percent"
                                    label="درصد تخفیف"
                                    type="number"
                                    className="col-md-6 col-lg-8 my-3 label-8rem"
                                    placeHolder="فقط عدد"
                                />

                                <FormikControl
                                    control="input"
                                    name="expire_at"
                                    label="تاریخ اعتبار"
                                    type="text"
                                    className="col-md-6 col-lg-8 my-3 label-8rem"
                                    placeHolder="مثلا 1400/10/10"
                                />

                                <div className="col-12 col-md-6 col-lg-8 col-md-6 col-lg-8">
                                    <div className="input-group my-3 dir_ltr">
                                        <input type="text" className="form-control"
                                            placeholder="قسمتی از نام محصول را وارد کنید"
                                            list="brandLists" />
                                        <span className="input-group-text w_8rem justify-content-center">برای</span>
                                        <datalist id="brandLists">
                                            <option value="محصول شماره 1" />
                                            <option value="محصول شماره 2" />
                                            <option value="محصول شماره 3" />
                                        </datalist>
                                    </div>
                                    <div className="col-12 col-md-6 col-lg-8">
                                        <span className="chips_elem">
                                            <i className="fas fa-times text-danger"></i>
                                            محصول 1
                                        </span>
                                        <span className="chips_elem">
                                            <i className="fas fa-times text-danger"></i>
                                            محصول 2
                                        </span>
                                    </div>
                                </div>

                                <div className="col-12 col-md-6 col-lg-8 mt-4 btn_box text-center">
                                    <FormikControl
                                        control="submit"
                                        btnText="ذخیره"
                                    />
                                </div>
                            </div>
                        </Form>
                    </Formik>
                </div>
            </ModalContainer>
        </>
    );
}

export default AddDiscount;
