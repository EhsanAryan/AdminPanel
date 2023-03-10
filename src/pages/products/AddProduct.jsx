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
                {location.state ? "???????????? ??????????????" : "???????????? ??????????????"}
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
                                    label="???????? ????????"
                                    className="col-md-6 col-lg-8 mx-auto"
                                    headerText="???????? ???????? ???? ???????????? ????????"
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
                                    label="???????? ????????"
                                    className="col-md-6 col-lg-8 mx-auto"
                                    headerText="???????? ???????? ???? ???????????? ????????"
                                    resultType="string"
                                    placeHolder="???????? ???? ?????? ???????? ???? ???????? ????????"
                                    formikOptions={formik}
                                    initialItems={initialCategories}
                                />

                                <FormikControl
                                    control="input"
                                    name="title"
                                    label="??????????"
                                    type="text"
                                    className="col-md-6 col-lg-8 my-3"
                                    placeHolder="?????????? ??????????"
                                />

                                <FormikControl
                                    control="input"
                                    name="price"
                                    label="????????"
                                    type="number"
                                    className="col-md-6 col-lg-8"
                                    placeHolder="???????? ??????????"
                                />

                                <FormikControl
                                    control="input"
                                    name="weight"
                                    label="??????"
                                    type="number"
                                    className="col-md-6 col-lg-8"
                                    placeHolder="?????? ?????????? (??????????????)"
                                />

                                <FormikControl
                                    control="select"
                                    name="brand_id"
                                    options={allBrands}
                                    label="????????"
                                    className="col-md-6 col-lg-8 mx-auto"
                                    headerText="???????? ???? ???????????? ????????"
                                />

                                <FormikControl
                                    control="searchableSelect"
                                    name="color_ids"
                                    options={allColors}
                                    label="??????"
                                    className="col-md-6 col-lg-8 mx-auto"
                                    headerText="?????? ???? ???????????? ????????"
                                    resultType="string"
                                    placeHolder="???????? ???? ?????? ?????? ???? ???????? ????????"
                                    formikOptions={formik}
                                    initialItems={initialColors}
                                />

                                <FormikControl
                                    control="multiSelect"
                                    name="guarantee_ids"
                                    options={allGuaranties}
                                    label="??????????????"
                                    className="col-md-6 col-lg-8 mx-auto mb-1"
                                    headerText="?????????????? ???? ???????????? ????????"
                                    resultType="string"
                                    formikOptions={formik}
                                    initialItems={initialGuaranties}
                                />

                                <FormikControl
                                    control="ckeditor"
                                    name="descriptions"
                                    label="??????????????"
                                    className="col-md-6 col-lg-8"
                                    placeHolder="?????????????? ?????????? ?????????? ???? ???????? ????????"
                                />


                                <FormikControl
                                    control="textarea"
                                    name="short_descriptions"
                                    label="?????????????? ??????????"
                                    className="col-md-6 col-lg-8 label-8rem"
                                    placeHolder="?????????????? ?????????? ???? ???????? ??????????"
                                    rows={2}
                                />

                                <FormikControl
                                    control="textarea"
                                    name="cart_descriptions"
                                    label="?????????????? ?????? ????????"
                                    className="col-md-6 col-lg-8 label-8rem"
                                    placeHolder="??????????????  ???? ?????? ????????"
                                    rows={2}
                                />

                                {!location.state ? (
                                    <FormikControl
                                        control="file"
                                        name="image"
                                        label="??????????"
                                        className="col-md-6 col-lg-8"
                                        placeHolder="??????????"
                                    />
                                ) : null}

                                <FormikControl
                                    control="input"
                                    name="alt_image"
                                    label="?????????? ??????????"
                                    type="text"
                                    className="col-md-6 col-lg-8"
                                    placeHolder="???? ???????? ???? ???????? ??????????"
                                />

                                <FormikControl
                                    control="input"
                                    name="keywords"
                                    label="?????????? ??????????"
                                    type="text"
                                    className="col-md-6 col-lg-8"
                                    placeHolder="???? - ???? ???? ?????? ????????"
                                />

                                <FormikControl
                                    control="input"
                                    name="stock"
                                    label="????????????"
                                    type="number"
                                    className="col-md-6 col-lg-8"
                                    placeHolder="?????? ??????"
                                />

                                <FormikControl
                                    control="input"
                                    name="discount"
                                    label="???????? ??????????"
                                    type="number"
                                    className="col-md-6 col-lg-8"
                                    placeHolder="?????? ??????"
                                />

                                <div className="col-12 col-md-6 mt-4 mb-3 col-lg-8 text-center btn_box">
                                    <FormikControl
                                        control="submit"
                                        btnText={location.state ? "????????????" : "??????????"}
                                    />
                                    <PrevButton btnText="????????????" className="mx-2" />
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
