import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import AddButtonLink from '../../components/AddButtonLink';
import PaginatedDataTable from '../../components/PaginatedDataTable';
import { useHasPermission } from '../../hooks/hasPermission';
import { deleteOrderService, getOrdersService } from '../../services/ordersServices';
import { Alert, Confirm } from '../../utils/Alerts';
import { convertDateToJalali } from '../../utils/convertDate';
import Actions from './additionFields/Actions';

const OrdersTable = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searchChar, setSearchChar] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsCount, setItemsCount] = useState(8);
    const [pagesCount, setPagesCount] = useState(0);

    const hasAddOrderPermission = useHasPermission("create_order");

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
        { field: "cart_id", title: "کد سبد", },
        {
            field: null,
            title: "تاریخ پرداخت",
            elements: (rowData) => <span>{convertDateToJalali(rowData.pay_at)}</span>
        },
        {
            field: null,
            title: "مبلغ پرداختی",
            elements: (rowData) => <span>{Number(rowData.pay_amount).toLocaleString()}</span>
        },
        {
            field: null,
            title: "عملیات",
            elements: (rowData) => <Actions rowData={rowData} handleDeleteOrder={handleDeleteOrder} />
        },
    ]

    const searchParams = {
        title: "جستجو",
        placeHolder: "عنوان محصول را وارد کنید"
    }

    const handleGetOrders = async (page = currentPage, count = itemsCount, char = searchChar) => {
        try {
            const response = await getOrdersService(page, count, char);
            if (response.status === 200) {
                setData(response.data.data.data);
                setPagesCount(response.data.data.last_page);
            }
        } catch (error) {

        }
    }

    const handleSearch = (char) => {
        setSearchChar(char);
        handleGetOrders(1, itemsCount, char);
        setCurrentPage(1);
    }

    const handleDeleteOrder = async (orderData) => {
        if (await Confirm("حذف سفارش", `آیا از حذف سفارش ${orderData.id} مطمئن هستید؟`, "warning")) {
            try {
                const response = await deleteOrderService(orderData.id);
                if (response.status === 200) {
                    Alert("حذف سفارش", response.data.message, "success");
                    handleGetOrders(1, itemsCount, searchChar);
                    setCurrentPage(1);
                }
            } catch (error) {

            }
        } else {
            Alert("لغو عملیات", "شما عملیات حذف سفارش را لغو کردید", "info");
        }
    }

    useEffect(() => {
        handleGetOrders(currentPage, itemsCount, searchChar);
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
            {hasAddOrderPermission && (
                <>
                    <AddButtonLink href="/orders/add-order" />
                    <Outlet context={{
                        handleGetOrders
                    }} />
                </>
            )}
        </PaginatedDataTable>
    );
}

export default OrdersTable;
