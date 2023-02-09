import React, { useEffect, useState } from 'react';
import AddButtonLink from '../../components/AddButtonLink';
import PaginatedDataTable from '../../components/PaginatedDataTable';
import { deleteProductservice, getProductsService } from '../../services/productServices';
import { Alert, Confirm } from '../../utils/Alerts';
import Actions from './additionFields/Actions';
import LikeCounts from './additionFields/LikeCounts';
import Status from './additionFields/Status';


const ProductsTable = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searchChar, setSearchChar] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsCount, setItemsCount] = useState(5);
    const [pagesCount, setPagesCount] = useState(0);

    const dataInfo = [
        {
            field: "id",
            title: "#"
        },
        {
            field: null,
            title: "گروه محصول",
            elements: (rowData) => <span>{rowData.categories[0].title}</span>
        },
        {
            field: "title",
            title: "عنوان"
        },
        {
            field: "price",
            title: "قیمت"
        },
        {
            field: "stock",
            title: "موجودی"
        },
        {
            field: null,
            title: "تعداد لایک",
            elements: (rowData) => <LikeCounts rowData={rowData} />
        },
        {
            field: null,
            title: "وضعیت",
            elements: (rowData) => <Status rowData={rowData} />
        },
        {
            field: null,
            title: "عملیات",
            elements: (rowData) => <Actions rowData={rowData} handleDeleteProduct={handleDeleteProduct} />
        }
    ];

    const searchParams = {
        title: "جستجو",
        placeHolder: "عنوان محصول را وارد کنید"
    }

    const handleGetProducts = async (page, count, char) => {
        setLoading(true);
        try {
            const response = await getProductsService(page, count, char);
            if (response.status === 200) {
                setData(response.data.data);
                setPagesCount(response.data.last_page);
                console.log(response);
            } else {

            }
        } catch (error) {

        } finally {
            setLoading(false);
        }
    }

    const handleDeleteProduct = async (productData) => {
        const res = await Confirm("تایید حذف", `آیا از حذف ${productData.title} مطمئن هستید؟`, "warning");
        if (res) {
            try {
                const response = await deleteProductservice(productData.id);
                if (response.status === 200) {
                    Alert("حذف محصول", data.message, "success");
                    handleGetProducts(currentPage, itemsCount, searchChar);
                }
            } catch (error) {

            }
        } else {
            Alert("لغو عملیات", "شما عملیات حذف محصول را لغو کردید", "info");
        }

    }

    const handleSearch = (char) => {
        setSearchChar(char);
        handleGetProducts(1, itemsCount, char);
    }

    useEffect(() => {
        handleGetProducts(currentPage, itemsCount, searchChar);
    }, [currentPage, itemsCount]);


    return (
        <>
            <PaginatedDataTable
                tableData={data}
                dataInfo={dataInfo}
                searchParams={searchParams}
                loading={loading}
                itemsCount={itemsCount}
                setItemsCount={setItemsCount}
                pagesCount={pagesCount}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                handleSearch={handleSearch}
            >
                <AddButtonLink href="/products/add-product" />
            </PaginatedDataTable>
        </>
    );
}

export default ProductsTable;
