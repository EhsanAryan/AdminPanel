import React, { useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ActionIcon from '../../../components/ActionIcon';
import { CategoryContext } from '../../../context/categoryContext';

const Actions = ({ rowData, handleDeleteCategory }) => {
    const navigate = useNavigate();

    const params = useParams();

    const { setEditId } = useContext(CategoryContext);

    return (
        <>
            {!params.categoryId ?
                (
                    <ActionIcon
                        permTitle=""
                        iconClasses="fas fa-project-diagram text-info"
                        title="زیرمجموعه"
                        onClick={() => navigate(`/categories/${rowData.id}`, {
                            state: {
                                parentData: rowData
                            }
                        })}
                    />
                ) : null
            }

            <ActionIcon
                permTitle="update-category"
                iconClasses="fas fa-edit text-warning"
                targetModalId="#add_product_category_modal"
                title="ویرایش دسته"
                onClick={() => setEditId(rowData.id)}
            />

            {params.categoryId ? (
                <ActionIcon
                    permTitle="create_category_attr"
                    iconClasses="fas fa-receipt text-success"
                    title="افزودن ویژگی"
                    onClick={() => navigate(`/categories/${rowData.id}/attributes`, {
                        state: {
                            categoryData: rowData
                        }
                    })}
                />
            ) : null}

            <ActionIcon
                permTitle="delete_category"
                iconClasses="fas fa-times text-danger"
                title="حذف دسته"
                onClick={() => handleDeleteCategory(rowData)}
            />
        </>
    );
}

export default Actions;
