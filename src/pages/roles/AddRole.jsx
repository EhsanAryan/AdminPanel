import { Form, Formik } from 'formik';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useOutletContext } from 'react-router-dom';
import FormikControl from '../../components/form/FormikControl';
import ModalContainer from '../../components/ModalContainer';
import { getAllPermissionsService, getSingleRoleService } from '../../services/usersServices';
import { initialValues, onSubmit, validationSchema } from './rolesFormikCodes';

const AddRole = () => {
    const [allPermissions, setAllPermissions] = useState([]);
    const [reinitializeValues, setReinitializeValues] = useState(null);
    const [editRole, setEditRole] = useState(null);

    const navigate = useNavigate();

    const { setData } = useOutletContext();

    const location = useLocation();
    const editRoleId = location.state?.editRoleId;
    const editType = location.state?.editType;

    const getAllPermissions = async () => {
        try {
            const response = await getAllPermissionsService();
            if (response.status === 200) {
                setAllPermissions(response.data.data.map(p => {
                    return { id: p.id, title: p.description };
                }))
            }
        } catch (error) {

        }
    }

    const getEditRole = async () => {
        try {
            const response = await getSingleRoleService(editRoleId);
            if (response.status === 200) {
                setEditRole(response.data.data);
            } else {
                setEditRole(null);
            }
        } catch (error) {
            setEditRole(null);
        }
    }

    useEffect(() => {
        getAllPermissions();
        if (editRoleId) {
            getEditRole();
        }
    }, []);

    useEffect(() => {
        if (editRole) {
            editType === "role" ?
                setReinitializeValues({
                    title: editRole.title,
                    description: editRole.description,
                }) :
                setReinitializeValues({
                    permissions_id: editRole.permissions.map(p => `${p.id}`),
                    editPermissions: true
                });
        } else {
            setReinitializeValues(null);
        }
    }, [editRole]);

    return (
        <>
            {/* <button className="btn btn-success d-flex justify-content-center align-items-center" data-bs-toggle="modal" data-bs-target="#add_role_modal">
                <i className="fas fa-plus text-light"></i>
            </button> */}

            <ModalContainer
                id={"add_role_modal"}
                title={editType === "role" ?
                    "ویرایش نقش" :
                    editType === "permissions" ?
                        "ویرایش مجوزهای نقش:" + " " + editRole?.title || "" :
                        "افزودن نقش"}
                fullScreen={editType === "role" ? false : true}
                className="show d-block"
                closeFunction={() => navigate(-1)}
            >
                <Formik
                    initialValues={reinitializeValues || initialValues}
                    onSubmit={(values, actions) => onSubmit(values, actions, setData,
                        editRoleId, editType, navigate)}
                    validationSchema={validationSchema}
                    enableReinitialize
                >
                    {(formik) => {
                        return (
                            <Form>
                                <div className="container">
                                    <div className="row justify-content-center">
                                        {
                                            editType !== "permissions" ? (
                                                <>
                                                    <FormikControl
                                                        control="input"
                                                        name="title"
                                                        label="عنوان نقش"
                                                        type="text"
                                                        className={editType === "role" ? "col-12" : "col-md-8 mx-auto label-8rem"}
                                                        placeHolder="عنوان نقش را وارد کنید"
                                                    />

                                                    <FormikControl
                                                        control="input"
                                                        name="description"
                                                        label="توضیحات نقش"
                                                        type="text"
                                                        className={editType === "role" ? "col-12" : "col-md-8 mx-auto label-8rem"}
                                                        placeHolder="توضیحات نقش را وارد کنید"
                                                    />
                                                </>
                                            ) : null
                                        }

                                        {
                                            editType !== "role" ? (
                                                <FormikControl
                                                    control="checkbox"
                                                    name="permissions_id"
                                                    options={allPermissions}
                                                    className="col-md-8"
                                                />
                                            ) : null
                                        }

                                        <div className="text-center col-12 mt-4">
                                            <FormikControl
                                                control="submit"
                                                btnText={editRoleId ? "ویرایش" : "ذخیره"}
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

export default AddRole;
