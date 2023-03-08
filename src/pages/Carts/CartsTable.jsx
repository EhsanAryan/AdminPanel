import React, { useState } from 'react';
import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import AddButtonLink from '../../components/AddButtonLink';
import PaginatedTable from '../../components/PaginatedTable';
import { deleteCartService, getAllCartsService } from '../../services/cartsServices';
import { Alert, Confirm } from '../../utils/Alerts';
import { convertDateToJalali } from "../../utils/convertDate";
import Actions from './additionFields/Actions';
import Ordered from './additionFields/Ordered';
import Status from './additionFields/Status';

const CartsTable = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);

    const dataInfo = [
        { field: "id", title: "#" },
        { 
            field: null,
            title: "نام مشتری",
            elements: (rowData) => <span>{`${rowData.user.first_name || ""} ${rowData.user.last_name || ""}`}</span> 
        },
        {
            field: null,
            title: "تاریخ ایجاد",
            elements: (rowData) => <span>{convertDateToJalali(rowData.created_at)}</span>
        },
        {
            field: null,
            title: "وضعیت سبد",
            elements: (rowData) => <Status rowData={rowData} />
        },
        {
            field: null,
            title: "وضعیت تحویل",
            elements: (rowData) => <Ordered rowData={rowData} />
        },
        {
            field: null,
            title: "عملیات",
            elements: (rowData) => <Actions rowData={rowData} handleDeleteCart={handleDeleteCart} />
        },
    ]

    const searchParams = {
        searchField: "",
        title: "جستجو",
        placeHolder: "عنوان محصول را وارد کنید"
    }

    const handleGetAllCarts = async () => {
        setLoading(true);
        try {
            const response = await getAllCartsService();
            if(response.status === 200) {
                console.log(response);
                setData(response.data.data);
            }
        } catch (error) {
            
        } finally {
            setLoading(false);
        }
    }

    const handleDeleteCart = async (cartData) => {
        const res = await Confirm("حذف سبد خرید", `آیا از حذف سبد خرید ${cartData.id} مطمئن هستید؟`, "warning");
        if(res) {
            try {
                const response = await deleteCartService(cartData.id);
                if(response.status === 200) {
                    Alert("حذف سبد خرید", response.data.message, "success");
                    setData(prevData => prevData.filter(d => d.id != cartData.id))
                }
            } catch (error) {
                
            }
        } else {
            Alert("لغو عملیات", "شما عملیات حذف سبد خرید را لغو کردید", "info");
        }
    }

    useEffect(() => {
        handleGetAllCarts();
    }, []);


    return (
        <PaginatedTable
            data={data}
            dataInfo={dataInfo}
            numOfItems={10}
            searchParams={searchParams}
            loading={loading}
        >
            <AddButtonLink href="/carts/add-cart" />
            <Outlet context={{
                setData
            }} />
        </PaginatedTable>
    );
}

export default CartsTable;
