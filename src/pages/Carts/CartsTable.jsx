import React, { useState } from 'react';
import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import AddButtonLink from '../../components/AddButtonLink';
import PaginatedDataTable from '../../components/PaginatedDataTable';
import { useHasPermission } from '../../hooks/hasPermission';
import { deleteCartService, getCartsService } from '../../services/cartsServices';
import { Alert, Confirm } from '../../utils/Alerts';
import { convertDateToJalali } from "../../utils/convertDate";
import Actions from './additionFields/Actions';
import Ordered from './additionFields/Ordered';

const CartsTable = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searchChar, setSearchChar] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsCount, setItemsCount] = useState(8);
    const [pagesCount, setPagesCount] = useState(0);

    const hasAddCartPermission = useHasPermission("create_cart")

    const dataInfo = [
        { field: "id", title: "#" },
        { field: "user_id", title: "آیدی کاربر" },
        {
            field: null,
            title: "نام کاربر",
            elements: (rowData) => <span>{`${rowData.user.first_name || ""} ${rowData.user.last_name || ""}`}</span>
        },
        {
            field: null,
            title: "شماره کاربر",
            elements: (rowData) => <span>{rowData.user.phone}</span>
        },
        {
            field: null,
            title: "تعداد کالاها",
            elements: (rowData) => <span>{rowData.items.length}</span>
        },
        {
            field: null,
            title: "تاریخ ایجاد",
            elements: (rowData) => <span>{convertDateToJalali(rowData.created_at)}</span>
        },
        {
            field: null,
            title: "وضعیت",
            elements: (rowData) => <Ordered rowData={rowData} />
        },
        {
            field: null,
            title: "عملیات",
            elements: (rowData) => <Actions rowData={rowData} handleDeleteCart={handleDeleteCart} />
        },
    ]

    const searchParams = {
        title: "جستجو",
        placeHolder: "عنوان محصول را وارد کنید"
    }

    const handleGetCarts = async (page = currentPage, count = itemsCount, char = searchChar) => {
        setLoading(true);
        try {
            const response = await getCartsService(page, count, char);
            if (response.status === 200) {
                setData(response.data.data.data);
                setPagesCount(response.data.data.last_page);
            }
        } catch (error) {

        } finally {
            setLoading(false);
        }
    }

    const handleDeleteCart = async (cartData) => {
        const res = await Confirm("حذف سبد خرید", `آیا از حذف سبد خرید ${cartData.id} مطمئن هستید؟`, "warning");
        if (res) {
            try {
                const response = await deleteCartService(cartData.id);
                if (response.status === 200) {
                    Alert("حذف سبد خرید", response.data.message, "success");
                    handleGetCarts(1, itemsCount, searchChar);
                    setCurrentPage(1);
                }
            } catch (error) {

            }
        } else {
            Alert("لغو عملیات", "شما عملیات حذف سبد خرید را لغو کردید", "info");
        }
    }

    const handleSearch = (char) => {
        setSearchChar(char);
        handleGetCarts(1, itemsCount, char);
        setCurrentPage(1);
    }

    useEffect(() => {
        handleGetCarts(currentPage, itemsCount, searchChar);
    }, [currentPage, itemsCount]);


    return (
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
            {hasAddCartPermission && (
                <>
                    <AddButtonLink href="/carts/add-cart" />
                    <Outlet context={{
                        handleGetCarts
                    }} />
                </>
            )}
        </PaginatedDataTable>
    );
}

export default CartsTable;
