import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useLocation, useNavigate, useOutletContext } from 'react-router-dom';
import ModalContainer from '../../components/ModalContainer';
import { getAllRolesService, getSingleUserService } from '../../services/usersServices';
import { Form, Formik } from 'formik';
import FormikControl from '../../components/form/FormikControl';
import { initialValues, onSubmit, validationSchema } from './usersFormikCodes';
import { convertDateToJalali } from '../../utils/convertDate';

const AddUser = () => {
    const [allRoles, setAllRoles] = useState([]);
    const [editUser, setEditUser] = useState(null);
    const [reinitializeValues, setReinitializeValues] = useState(null);
    const [initialRoles, setInitialRoles] = useState([]);

    const navigate = useNavigate();

    const { setData } = useOutletContext();

    const location = useLocation();
    const editUserId = location.state?.editUserId;

    const handleGetAllRoles = async () => {
        try {
            const response = await getAllRolesService();
            if (response.status === 200) {
                setAllRoles(response.data.data.map(r => {
                    return { id: r.id, value: r.title }
                }));
            }
        } catch (error) {

        }
    }

    const getEditUser = async () => {
        try {
            const response = await getSingleUserService(editUserId);
            if (response.status === 200) {
                setEditUser(response.data.data);
            }
            else {
                setEditUser(null);
            }
        } catch (error) {
            setEditUser(null);
        }
    }

    useEffect(() => {
        handleGetAllRoles();
        if (editUserId) {
            getEditUser();
        } else {
            setEditUser(null);
        }
    }, []);

    useEffect(() => {
        if (editUser) {
            // API doesn't send the password (for security reasons), but user can change the password
            setReinitializeValues({
                user_name: editUser.user_name || "",
                first_name: editUser.first_name || "",
                last_name: editUser.last_name || "",
                phone: editUser.phone || "",
                national_code: editUser.national_code || "",
                email: editUser.email || "",
                password: "",
                birth_date: editUser.birth_date ? convertDateToJalali(editUser.birth_date) : "",
                gender: editUser.gender || 1,
                roles_id: editUser.roles.map(r => r.id),
                isEditing: true
            });
            setInitialRoles(editUser.roles.map(r => {
                return { id: r.id, value: r.title };
            }))
        } else {
            setReinitializeValues(null);
            setInitialRoles([]);
        }
    }, [editUser]);

    return (
        <>
            {/* <button className="btn btn-success d-flex justify-content-center align-items-center" data-bs-toggle="modal" data-bs-target="#add_user_modal">
                <i className="fas fa-plus text-light"></i>
            </button> */}

            <ModalContainer
                id={"add_user_modal"}
                title={editUserId ? "ویرایش کاربر" : "افزودن کاربر"}
                fullScreen={true}
                className="show d-block"
                closeFunction={() => navigate(-1)}
            >
                <Formik
                    initialValues={reinitializeValues || initialValues}
                    onSubmit={(values, actions) => onSubmit(values, actions, setData, editUserId,
                        navigate)}
                    validationSchema={validationSchema}
                    enableReinitialize
                >
                    {(formik) => {
                        return (
                            <Form>
                                <div className="container">
                                    <div className="row justify-content-center">
                                        <FormikControl
                                            control="input"
                                            name="user_name"
                                            label="نام کاربری*"
                                            type="text"
                                            className="label-8rem col-md-8 mx-auto"
                                            placeHolder="نام کاربری"
                                        />

                                        <FormikControl
                                            control="input"
                                            name="first_name"
                                            label="نام"
                                            type="text"
                                            className="label-8rem col-md-8 mx-auto"
                                            placeHolder="نام"
                                        />

                                        <FormikControl
                                            control="input"
                                            name="last_name"
                                            label="نام خانوادگی"
                                            type="text"
                                            className="label-8rem col-md-8 mx-auto"
                                            placeHolder="نام خانوادگی"
                                        />

                                        <FormikControl
                                            control="input"
                                            name="phone"
                                            label="شماره موبایل*"
                                            type="text"
                                            className="label-8rem col-md-8 mx-auto"
                                            placeHolder="مثل 09191234567"
                                        />

                                        <FormikControl
                                            control="input"
                                            name="national_code"
                                            label="کد ملی"
                                            type="string"
                                            className="label-8rem col-md-8 mx-auto"
                                            placeHolder="کد ملی"
                                        />

                                        <FormikControl
                                            control="input"
                                            name="email"
                                            label="ایمیل"
                                            type="text"
                                            className="label-8rem col-md-8 mx-auto"
                                            placeHolder="مثل test@example.com"
                                        />

                                        <FormikControl
                                            control="input"
                                            name="password"
                                            label="رمز عبور"
                                            type="password"
                                            className="label-8rem col-md-8 mx-auto"
                                            placeHolder="رمز عبور"
                                        />

                                        <FormikControl
                                            control="date"
                                            name="birth_date"
                                            label="تاریخ تولد"
                                            className="label-8rem col-md-8 mx-auto"
                                            placeHolder="تاریخ تولدتان را انتخاب کنید"
                                            formik={formik}
                                            yearRange={{ form: 100, to: 0 }}
                                            initialDate={editUser?.birth_date || ""}
                                        />

                                        <FormikControl
                                            control="select"
                                            name="gender"
                                            label="جنسیت"
                                            className="col-md-8"
                                            options={[{ id: 1, value: "مرد" }, { id: 0, value: "زن" }]}
                                            headerText="جنسیت را انتخاب کنید"
                                        />

                                        <FormikControl
                                            control="multiSelect"
                                            formikOptions={formik}
                                            resultType="array"
                                            name="roles_id"
                                            label="نقش ها"
                                            options={allRoles}
                                            className="col-md-8 my-2"
                                            headerText="نقش های کاربر را انتخاب کنید"
                                            initialItems={initialRoles}
                                        />




                                        <div className="btn_box text-center
                                        col-12 col-md-8 mt-4">
                                            <FormikControl
                                                control="submit"
                                                btnText={editUserId ? "ویرایش" : "ذخیره"}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </Form>
                        );
                    }}
                </Formik>
            </ModalContainer>
        </>
    );
}

export default AddUser;
