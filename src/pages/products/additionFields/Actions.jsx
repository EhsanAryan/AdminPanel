import React from 'react';
import { useNavigate } from 'react-router-dom';
import ActionIcon from '../../../components/ActionIcon';

const Actions = ({ rowData, handleDeleteProduct, handleToggleProductNotification }) => {
    const navigate = useNavigate();

    return (
        <>
            <ActionIcon
                permTitle="update_product_notification"
                iconClasses={`fas ${rowData.has_notification ? "fa-eye-slash text-danger" : "fa-eye text-primary"}`}
                title={rowData.has_notification ? "غیرفعال کردن اعلان محصول" : "فعال کردن اعلان محصول"}
                onClick={() => handleToggleProductNotification(rowData.id)}
            />

            <ActionIcon
                permTitle="update_product"
                iconClasses="fas fa-edit text-warning"
                title="ویرایش محصول"
                onClick={() => {
                    navigate(`/products/add-product/${rowData.id}`, {
                        state: {
                            editProduct: rowData
                        }
                    });
                }}
            />

            <ActionIcon
                permTitle="create_product_attr"
                iconClasses="fas fa-receipt text-info"
                title="ثبت ویژگی"
                onClick={() => navigate("/products/set-attr", {
                    state: {
                        productData: rowData
                    }
                })}
            />

            <ActionIcon
                permTitle="create_product_image"
                iconClasses="fas fa-image text-success"
                title="گالری تصاویر"
                onClick={() => navigate("/products/gallery", {
                    state: {
                        productData: rowData
                    }
                })}
            />

            <ActionIcon
                permTitle="delete_product"
                iconClasses="fas fa-times text-danger"
                title="حذف محصول"
                onClick={() => handleDeleteProduct(rowData)}
            />
        </>
    );
}

export default Actions;
