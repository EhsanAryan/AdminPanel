import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import ActionIcon from '../../components/ActionIcon';
import SpinnerLoader from '../../components/SpinnerLoader';
import { getFewerProductsService, toggleProductNotificationService } from '../../services/productServices';
import { Alert } from '../../utils/Alerts';

const Table = () => {
    const [fewerProducts, setFewerProducts] = useState([]);
    const [loading, setLoading] = useState(null);

    const handleGetFewerProducts = async () => {
        setLoading(true);
        try {
            const response = await getFewerProductsService();
            if (response.status === 200) {
                setFewerProducts(response.data.data);
            }
        } catch (error) {

        } finally {
            setLoading(false);
        }
    }

    const handleSetOffNotification = async (productId) => {
        try {
            const response = await toggleProductNotificationService(productId);
            if(response.status === 200) {
                Alert("انجام شد", response.data.message, "success");
                setFewerProducts(prevValue => prevValue.filter(p => p.id != productId));
            }
        } catch (error) {
            
        }
    }

    useEffect(() => {
        handleGetFewerProducts();
    }, []);

    return (
        <div className="col-12 col-lg-6 table-responsive">
            <p className="text-center mt-3 mb-2 text-dark">محصولات رو به اتمام</p>
            {loading ? (
                <SpinnerLoader />
            ) : fewerProducts.length > 0 ? (
                <table className="table table-responsive text-center table-hover table-bordered 
                no_shadow_back_table font_08">
                    <thead className="table-secondary">
                        <tr>
                            <th>#</th>
                            <th>دسته</th>
                            <th>عنوان محصول</th>
                            <th>وضعیت</th>
                            <th>عملیات</th>
                        </tr>
                    </thead>
                    <tbody>
                        {fewerProducts.map(p => {
                            return (
                                <tr key={p.id}>
                                    <td>{p.id}</td>
                                    <td>{p.categories[0]?.title}</td>
                                    <td>{p.title}</td>
                                    <td>{p.stock === 0 ? (
                                        <span className="text-danger">پایان یافته</span>
                                    ) : `رو به اتمام (${p.stock})`}</td>
                                    <td>
                                        <ActionIcon 
                                        permTitle="read_fewer_products"
                                        iconClasses="fas fa-eye-slash text-danger"
                                        title="غیرفعال کردن اعلان محصول"
                                        onClick={() => handleSetOffNotification(p.id)}
                                        />
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            ) : (
                <strong className="text-primary text-center d-block fs-5">هیچ محصول رو به اتمامی یافت نشد!</strong>
            )}
        </div>
    )
}

export default Table;
