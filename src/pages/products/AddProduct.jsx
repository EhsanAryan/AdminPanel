import { Form, Formik } from 'formik';
import React, { useEffect } from 'react';
import FormikControl from '../../components/form/FormikControl';
import { initialValues, onSubmit, validationSchema } from './productsFormikCodes';
import { useState } from 'react';
import { getCategoriesService } from '../../services/categoriesServices';
import SpinnerLoader from '../../components/SpinnerLoader';
import PrevButton from '../../components/PrevButton';
import { getBrandsService } from '../../services/brandsServices';
import { getColorsServices } from '../../services/colorsServices';
import { getGuarantiesService } from '../../services/guarantiesServices';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';


const AddProduct = () => {
    const [parentCategories, setParentCategories] = useState([]);
    const [allBrands, setAllBrands] = useState([]);
    const [allColors, setAllColors] = useState([]);
    const [allGuaranties, setAllGuaranties] = useState([]);
    const [mainCategories, setMainCategories] = useState([]);
    const [reinitializeValues, setReinitializeValues] = useState(null);
    const [initialCategories, setInitialCategories] = useState([]); // used in editing product
    const [initialColors, setInitialColors] = useState([]); // used in editing product
    const [initialGuaranties, setInitialGuaranties] = useState([]); // used in editing product

    const location = useLocation();
    const editProduct = location.state?.editProduct;

    const navigate = useNavigate();

    const getAllParentCategories = async () => {
        try {
            const response = await getCategoriesService();
            if (response.status === 200) {
                setParentCategories(response.data.data.map(c => {
                    return { id: c.id, value: c.title };
                }))
            }
        } catch (error) {

        }
    }

    const getAllBrands = async () => {
        try {
            const response = await getBrandsService();
            if (response.status === 200) {
                setAllBrands(response.data.data.map(d => {
                    return { id: d.id, value: d.persian_name }
                }))
            }
        } catch (error) {

        }
    }

    const getAllColors = async () => {
        try {
            const response = await getColorsServices();
            if (response.status === 200) {
                setAllColors(response.data.data.map(d => {
                    return { id: d.id, value: d.title }
                }))
            }
        } catch (error) {

        }
    }

    const getAllGuaranties = async () => {
        try {
            const response = await getGuarantiesService();
            if (response.status === 200) {
                setAllGuaranties(response.data.data.map(d => {
                    return { id: d.id, value: d.title }
                }))
            }
        } catch (error) {

        }
    }

    const handleSetMainCategories = async (value) => {
        setMainCategories("waiting");
        if (value) {
            try {
                const response = await getCategoriesService(value);
                if (response.status === 200) {
                    setMainCategories(response.data.data.map(c => {
                        return { id: c.id, value: c.title };
                    }))
                } else {
                    setMainCategories([]);
                }
            } catch (error) {
                setMainCategories([]);
            }
        } else {
            setMainCategories([]);
        }
    }

    const setInitialItems = () => {
        if (editProduct) {
            setInitialCategories(editProduct.categories.map(c => {
                return { id: c.id, value: c.title };
            }));
            setInitialColors(editProduct.colors.map(c => {
                return { id: c.id, value: c.title };
            }));
            setInitialGuaranties(editProduct.guarantees.map(g => {
                return { id: g.id, value: g.title };
            }));
        }
    }

    useEffect(() => {
        getAllParentCategories();
        getAllBrands();
        getAllColors();
        getAllGuaranties();

        if (editProduct) {
            setInitialItems();

            for (let key in editProduct) {
                editProduct[key] === null && (editProduct[key] = "");
            }

            setReinitializeValues({
                category_ids: editProduct.categories.map(c => c.id).join("-"),
                title: editProduct.title,
                price: editProduct.price,
                weight: editProduct.weight,
                brand_id: editProduct.brand_id,
                color_ids: editProduct.colors.map(c => c.id).join("-"),
                guarantee_ids: editProduct.guarantees.map(g => g.id).join("-"),
                descriptions: editProduct.descriptions,
                short_descriptions: editProduct.short_descriptions,
                cart_descriptions: editProduct.cart_descriptions,
                image: null,
                alt_image: editProduct.alt_image,
                keywords: editProduct.keywords,
                stock: editProduct.stock,
                discount: editProduct.discount,
            });
        } else {
            setReinitializeValues(null);
        }
    }, []);


    return (
        <div className="container">
            <h4 className="text-center mt-3 mb-2">
                {location.state ? "ویرایش محصولات" : "افزودن محصولات"}
            </h4>

            <Outlet />

            <Formik
                initialValues={reinitializeValues || initialValues}
                onSubmit={(values, actions) => onSubmit(values, actions, editProduct, navigate)}
                validationSchema={validationSchema}
                enableReinitialize
            >
                {(formik) => {
                    return (
                        <Form>
                            <div className="row justify-content-center">
                                <div className="col-12 col-md-6 col-lg-8 mt-1 mb-3 
                                d-flex justify-content-end align-items-center">
                                    <PrevButton />
                                </div>
                                <FormikControl
                                    control="select"
                                    name="parentCats"
                                    options={parentCategories}
                                    label="دسته والد"
                                    className="col-md-6 col-lg-8 mx-auto"
                                    headerText="دسته والد را انتخاب کنید"
                                    handleOnChange={handleSetMainCategories}
                                />

                                {
                                    mainCategories === "waiting" ? (
                                        <SpinnerLoader isSmall={true} colorClass="text-primary" />
                                    ) : null
                                }

                                <FormikControl
                                    control="searchableSelect"
                                    name="category_ids"
                                    options={typeof mainCategories === "object" ? mainCategories : []}
                                    label="دسته اصلی"
                                    className="col-md-6 col-lg-8 mx-auto"
                                    headerText="دسته اصلی را انتخاب کنید"
                                    resultType="string"
                                    placeHolder="بخشی از نام دسته را وارد کنید"
                                    formikOptions={formik}
                                    initialItems={initialCategories}
                                />

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
                                    type="number"
                                    className="col-md-6 col-lg-8"
                                    placeHolder="وزن محصول (کیلوگرم)"
                                />

                                <FormikControl
                                    control="select"
                                    name="brand_id"
                                    options={allBrands}
                                    label="برند"
                                    className="col-md-6 col-lg-8 mx-auto"
                                    headerText="برند را انتخاب کنید"
                                />

                                <FormikControl
                                    control="searchableSelect"
                                    name="color_ids"
                                    options={allColors}
                                    label="رنگ"
                                    className="col-md-6 col-lg-8 mx-auto"
                                    headerText="رنگ را انتخاب کنید"
                                    resultType="string"
                                    placeHolder="بخشی از نام رنگ را وارد کنید"
                                    formikOptions={formik}
                                    initialItems={initialColors}
                                />

                                <FormikControl
                                    control="multiSelect"
                                    name="guarantee_ids"
                                    options={allGuaranties}
                                    label="گارانتی"
                                    className="col-md-6 col-lg-8 mx-auto mb-1"
                                    headerText="گارانتی را انتخاب کنید"
                                    resultType="string"
                                    formikOptions={formik}
                                    initialItems={initialGuaranties}
                                />

                                <FormikControl
                                    control="ckeditor"
                                    name="descriptions"
                                    label="توضیحات"
                                    className="col-md-6 col-lg-8"
                                    placeHolder="توضیحات مربوط محصول را وارد کنید"
                                />


                                <FormikControl
                                    control="textarea"
                                    name="short_descriptions"
                                    label="توضیحات کوتاه"
                                    className="col-md-6 col-lg-8 label-8rem"
                                    placeHolder="توضیحات کوتاه در مورد محصول"
                                    rows={2}
                                />

                                <FormikControl
                                    control="textarea"
                                    name="cart_descriptions"
                                    label="توضیحات سبد خرید"
                                    className="col-md-6 col-lg-8 label-8rem"
                                    placeHolder="توضیحات  در سبد خرید"
                                    rows={2}
                                />

                                {!location.state ? (
                                    <FormikControl
                                        control="file"
                                        name="image"
                                        label="تصویر"
                                        className="col-md-6 col-lg-8"
                                        placeHolder="تصویر"
                                    />
                                ) : null}

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
                                    label="کلمات کلیدی"
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

                                <div className="col-12 col-md-6 mt-4 mb-3 col-lg-8 text-center btn_box">
                                    <FormikControl
                                        control="submit"
                                        btnText={location.state ? "ویرایش" : "ذخیره"}
                                    />
                                    <PrevButton btnText="انصراف" className="mx-2" />
                                </div>
                            </div>
                        </Form>
                    )
                }}

            </Formik>
        </div>
    );
}

export default AddProduct;
