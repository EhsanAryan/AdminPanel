import React, { useEffect, useState } from 'react';
import PaginatedTable from '../../components/PaginatedTable';
import { deleteProductservice, getProductsService } from '../../services/productServices';
import { Alert, Confirm } from '../../utils/Alerts';
import Actions from './additionFields/Actions';
import LikeCounts from './additionFields/LikeCounts';
import Status from './additionFields/Status';
import AddProduct from './AddProduct';


const ProductsTable = () => {
    const [data, setData] = useState([]);

    const dataInfo = [
        { field: "id", title: "#" },
        { field: "title", title: "عنوان" },
        { field: "price", title: "قیمت" },
        { field: "stock", title: "موجودی" },
    ];

    const additionFields = [
        {
            title: "تعداد لایک",
            elements: (rowData) => <LikeCounts rowData={rowData} />
        },
        {
            title: "وضعیت",
            elements: (rowData) => <Status rowData={rowData} />
        },
        {
            title: "عملیات",
            elements: (rowData) => <Actions rowData={rowData} handleDeleteProduct={handleDeleteProduct} />
        }
    ]

    const searchParams = {
        searchField: "title",
        title: "جستجو",
        placeHolder: "عنوان محصول را وارد کنید"
    }

    const handleGetProducts = async () => {
        try {
            const response = await getProductsService();
            if (response.status === 200) {
                setData(response.data.data);
                console.log(response);

            } else {

            }
        } catch (error) {

        }
    }

    const handleDeleteProduct = async (productData) => {
        const res = await Confirm("تایید حذف", `آیا از حذف ${productData.title} مطمئن هستید؟`, "warning");
        if (res) {
            try {
                const response = await deleteProductservice(productData.id);
                if (response.status === 200) {
                    Alert("حذف محصول", data.message, "success");
                    setData(oldData => oldData.filter(d => d.id !== productData.id));
                }
            } catch (error) {

            }
        } else {
            Alert("لغو عملیات", "شما عملیات حذف محصول را لغو کردید", "info");
        }

    }

    useEffect(() => {
        handleGetProducts();
    }, []);


    return (
        <>
            <PaginatedTable
                data={data}
                dataInfo={dataInfo}
                additionFields={additionFields}
                numOfItems={7}
                searchParams={searchParams}
            >
                <AddProduct />
            </PaginatedTable>
        </>
    );
}

export default ProductsTable;
