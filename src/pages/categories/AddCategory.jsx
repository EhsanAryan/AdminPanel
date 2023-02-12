import { Form, Formik } from 'formik';
import React, { useEffect, useState } from 'react';
import ModalContainer from '../../components/ModalContainer';
import FormikControl from '../../components/form/FormikControl';
import { getCategoriesService, getSingleCategoryService } from '../../services/categoriesServices';
import { useParams } from 'react-router-dom';
import { initialValues, onSubmit, validationSchema } from './categoriesFormikCodes';
import { useContext } from 'react';
import { CategoryContext } from '../../context/categoryContext';


const AddCategory = ({ setForceRender }) => {
    const [parents, setParents] = useState([]);
    const [reinitializeValues, setReinitializeValues] = useState(null);
    const [editCategory, setEditCategory] = useState(null);

    const { editId, setEditId } = useContext(CategoryContext);

    const params = useParams();

    const handleGetParents = async () => {
        try {
            const response = await getCategoriesService();
            if (response.status === 200) {
                const allParents = response.data.data;
                setParents(allParents.map(p => {
                    return { id: p.id, value: p.title };
                }));
            }
        } catch (error) {

        }
    }

    const handleGetSingleCategory = async () => {
        try {
            const response = await getSingleCategoryService(editId);
            if (response.status === 200) {
                setEditCategory(response.data.data);
            }
        } catch (error) {

        }
    }

    useEffect(() => {
        if (editId) {
            handleGetSingleCategory();
        } else {
            setEditCategory(null);
        }
    }, [editId]);

    useEffect(() => {
        handleGetParents();
    }, []);

    useEffect(() => {
        if (editCategory) {
            setReinitializeValues({
                parent_id: editCategory.parent_id ? editCategory.parent_id : "",
                title: editCategory.title,
                descriptions: editCategory.descriptions ? editCategory.descriptions : "",
                is_active: editCategory.is_active ? true : false,
                show_in_menu: editCategory.show_in_menu ? true : false,
                image: null
            })
        } else if (params.categoryId) {
            setReinitializeValues({
                ...initialValues,
                parent_id: params.categoryId
            });
        } else {
            setReinitializeValues(null);
        }
    }, [params.categoryId, editCategory]);

    return (
        <>
            <button className="btn btn-success d-flex justify-content-center align-items-center"
                data-bs-toggle="modal" data-bs-target="#add_product_category_modal"
                onClick={() => setEditId(null)}>
                <i className="fas fa-plus text-light"></i>
            </button>

            <ModalContainer
                id={"add_product_category_modal"}
                title={editId ? (editCategory ? `ویرایش ${editCategory.title}` : "") : "افزودن دسته محصولات"}
                fullScreen={true}
            >
                <Formik
                    initialValues={reinitializeValues || initialValues}
                    onSubmit={(values, actions) => onSubmit(values, actions, setForceRender, editId, setEditId)}
                    validationSchema={validationSchema}
                    enableReinitialize
                >
                    <Form>
                        <div className="container">
                            <div className="row justify-content-center">
                                {parents.length > 0 ? (
                                    <FormikControl
                                        control="select"
                                        name="parent_id"
                                        options={parents}
                                        label="دسته والد"
                                        className="col-md-6 col-lg-8 mx-auto"
                                        headerText="دسته والد را انتخاب کنید (اختیاری)"
                                    />
                                ) : null}

                                <FormikControl
                                    control="input"
                                    type="text"
                                    name="title"
                                    placeHolder="عنوان دسته"
                                    label="عنوان"
                                    className="col-md-6 col-lg-8 mx-auto"
                                />

                                <FormikControl
                                    control="ckeditor"
                                    name="descriptions"
                                    label="توضیحات"
                                    className="col-md-6 col-lg-8 mx-auto"
                                    placeHolder="توضیحات مربوط به دسته را وارد کنید"
                                />

                                {!editId ? (
                                    <FormikControl
                                        control="file"
                                        name="image"
                                        label="تصویر"
                                        placeHolder="تصویر"
                                        className="col-md-6 col-lg-8 mx-auto"
                                    />
                                ) : null}

                                <FormikControl
                                    control="switch"
                                    name="is_active"
                                    label="وضعیت فعال"
                                    className="mx-auto col-12 col-md-6 my-1 my-md-3 d-flex justify-content-center align-items-center"
                                />

                                <FormikControl
                                    control="switch"
                                    name="show_in_menu"
                                    label="نمایش در منو"
                                    className="mx-auto col-12 col-md-6 my-1 my-md-3 d-flex justify-content-center align-items-center"
                                />

                                <FormikControl
                                    control="submit"
                                    className="col-md-6 col-lg-8 mt-4 btn_box text-center"
                                    btnText={`${editId ? "ویرایش" : "ذخیره"}`}
                                />

                            </div>
                        </div>
                    </Form>
                </Formik>
            </ModalContainer>
        </>
    )
}

export default AddCategory;