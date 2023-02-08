import { Form, Formik } from 'formik';
import React from 'react';
import ModalContainer from '../../components/ModalContainer';
import * as Yup from "yup";
import FormikControl from '../../components/form/FormikControl';

const initialValues = {
    categories: [],
    title: "",
    price: "",
    weight: "",
    brand_id: "",
    colors: [],
    guarantees: [],
    descriptions: "",
    image: null,
    alt_image: "",
    keywords: "",
    stock: "",
    discount: "",
    is_active: true
}

const onSubmit = (values, actions) => {
    console.log(values);
}

const validationSchema = Yup.object({
    categories: Yup.array().required("حداقل یک دسته را باید انتخاب کنید"),
    title: Yup.string().required("فیلد را پر کنید").matches(/^[a-zA-Z0-9!?@#$%&\u0600-\u06FF\s]+$/,
        "فقط از حروف و اعداد و کاراکترها استفاده شود"),
    price: Yup.number().required("فیلد را پر کنید").min(1, "قیمت نمیتواند 0 یا منفی باشد"),
    weight: Yup.string(),
    brand_id: Yup.number(),
    colors: Yup.array(),
    guarantees: Yup.array(),
    descriptions: Yup.string().matches(/^[a-zA-Z0-9!?@#$%&\u0600-\u06FF\s.]+$/,
        "فقط از حروف و اعداد و کاراکترها استفاده شود"),
    image: Yup.mixed().test("filesize",
        "حجم فایل نمیتواند بیشتر از 500 کیلوبایت باشد",
        (value) => !value ? true : (value.size <= 500 * 1024))
        .test("format",
            "فرمت فایل باید jpg باشد",
            (value) => !value ? true : (value.type === "image/jpeg")),
    alt_image: Yup.string().matches(/^[a-zA-Z0-9!?@#$%&\u0600-\u06FF\s]+$/,
        "فقط از حروف و اعداد و کاراکترها استفاده شود"),
    keywords: Yup.string().matches(/^[a-zA-Z0-9!?@#$%&\u0600-\u06FF\s-]+$/,
        "فقط از حروف و اعداد و کاراکترها استفاده شود"),
    stock: Yup.number().min(0, "موجودی نمیتواند منفی باشد"),
    discount: Yup.number().min(0, "تخفیف نمیتواند منفی باشد").max(100, "حداکثر تخفیف 100 درصد است"),
    is_active: Yup.boolean()
});


const AddProduct = () => {
    return (
        <>
            <button className="btn btn-success d-flex justify-content-center align-items-center"
                data-bs-toggle="modal" data-bs-target="#add_product_modal">
                <i className="fas fa-plus text-light"></i>
            </button>

            <ModalContainer
                id={"add_product_modal"}
                title={"افزودن محصول جدید"}
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
                                <div className="col-12 col-md-6 col-lg-8">
                                    <div className="input-group mb-2 dir_ltr">
                                        <select type="text" className="form-control">
                                            <option value="1">انتخاب دسته محصول</option>
                                            <option value="1">دسته شماره 1</option>
                                        </select>
                                        <span className="input-group-text w_6rem justify-content-center">دسته</span>
                                    </div>
                                    <div className="col-12 col-md-6 col-lg-8">
                                        <span className="chips_elem">
                                            <i className="fas fa-times text-danger"></i>
                                            دسته فلان
                                        </span>
                                        <span className="chips_elem">
                                            <i className="fas fa-times text-danger"></i>
                                            دسته فلان
                                        </span>
                                    </div>
                                </div>

                                <FormikControl
                                    control="input"
                                    name="title"
                                    label="عنوان"
                                    type="text"
                                    className="col-md-6 col-lg-8 my-3"
                                    placeHolder="عنوان محصول"
                                />

                                <FormikControl
                                    control="input"
                                    name="price"
                                    label="قیمت"
                                    type="number"
                                    className="col-md-6 col-lg-8"
                                    placeHolder="قیمت محصول"
                                />

                                <FormikControl
                                    control="input"
                                    name="weight"
                                    label="وزن"
                                    type="text"
                                    className="col-md-6 col-lg-8"
                                    placeHolder="وزن محصول (کیلوگرم)"
                                />


                               
                                <div className="col-12 col-md-6 col-lg-8">
                                    <div className="input-group mb-3 dir_ltr" >
                                        <span className="input-group-text justify-content-center">
                                            <i className="fas fa-plus text-success hoverable_text pointer"></i>
                                        </span>
                                        <input type="text" className="form-control"
                                            placeholder="قسمتی از نام برند را وارد کنید" list="brandLists" />
                                        <span className="input-group-text w_6rem justify-content-center">برند</span>
                                        <datalist id="brandLists">
                                            <option value="سامسونگ" />
                                            <option value="سونی" />
                                            <option value="اپل" />
                                        </datalist>
                                    </div>
                                </div>
                                <div className="col-12 col-md-6 col-lg-8">
                                    <div className="input-group mb-2 dir_ltr" >
                                        <input type="text" className="form-control"
                                            placeholder="قسمتی از نام رنگ را وارد کنید" list="colorList" />
                                        <datalist id="colorList">
                                            <option value="مشکی" />
                                            <option value="سفید" />
                                            <option value="قرمز" />
                                        </datalist>
                                        <span className="input-group-text w_6rem justify-content-center">رنگ</span>
                                    </div>
                                    <div className="col-12 col-md-6 col-lg-8 mb-3 d-flex">
                                        <span className="color_tag chips_elem d-flex justify-content-center align-items-center pb-2">
                                            <i className="fas fa-times text-danger hoverable_text"></i>
                                        </span>
                                    </div>
                                </div>
                                <div className="col-12 col-md-6 col-lg-8">
                                    <div className="input-group mb-2 dir_ltr" >
                                        <input type="text" className="form-control"
                                            placeholder="قسمتی از نام گارانتی را وارد کنید" list="guarantiList" />
                                        <datalist id="guarantiList">
                                            <option value="گارانتی فلان 1" />
                                            <option value="گارانتی فلان 2" />
                                            <option value="گارانتی فلان 3" />
                                        </datalist>
                                        <span className="input-group-text w_6rem justify-content-center">گارانتی</span>
                                    </div>
                                    <div className="col-12 col-md-6 col-lg-8 mb-3">
                                        <span className="chips_elem">
                                            <i className="fas fa-times text-danger"></i>
                                            گارانتی فلان
                                        </span>
                                        <span className="chips_elem">
                                            <i className="fas fa-times text-danger"></i>
                                            گارانتی فلان
                                        </span>
                                    </div>
                                </div>

                                <FormikControl
                                    control="textarea"
                                    name="descriptions"
                                    label="توضیحات"
                                    className="col-md-6 col-lg-8"
                                    placeHolder="توضیحات"
                                    rows={5}
                                />


                                <FormikControl
                                    control="file"
                                    name="image"
                                    label="تصویر"
                                    className="col-md-6 col-lg-8"
                                    placeHolder="تصویر"
                                />

                                <FormikControl
                                    control="input"
                                    name="alt_image"
                                    label="توضیح تصویر"
                                    type="text"
                                    className="col-md-6 col-lg-8"
                                    placeHolder="یک کلمه در مورد تصویر"
                                />

                                <FormikControl
                                    control="input"
                                    name="keywords"
                                    label="تگ ها"
                                    type="text"
                                    className="col-md-6 col-lg-8"
                                    placeHolder="با - از هم جدا شوند"
                                />

                                <FormikControl
                                    control="input"
                                    name="stock"
                                    label="موجودی"
                                    type="number"
                                    className="col-md-6 col-lg-8"
                                    placeHolder="فقط عدد"
                                />

                                <FormikControl
                                    control="input"
                                    name="discount"
                                    label="درصد تخفیف"
                                    type="number"
                                    className="col-md-6 col-lg-8"
                                    placeHolder="فقط عدد"
                                />

                                <FormikControl
                                    control="switch"
                                    name="is_active"
                                    label="وضعیت فعال"
                                    className="col-12 col-md-6 col-lg-8 d-flex justify-content-center"
                                />

                                <FormikControl
                                    control="submit"
                                    btnText="ذخیره"
                                    className="col-md-6 col-lg-8 mt-4 btn_box text-center"
                                />
                            </div>
                        </Form>
                    </Formik>
                </div>
            </ModalContainer>
        </>
    );
}

export default AddProduct;
