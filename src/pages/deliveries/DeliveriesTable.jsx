import React, { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import AddButtonLink from '../../components/AddButtonLink';
import PaginatedTable from '../../components/PaginatedTable';
import { useHasPermission } from '../../hooks/hasPermission';
import { deleteDeliveryService, getAllDeliveriesService } from '../../services/deliveriesServices';
import { Alert, Confirm } from '../../utils/Alerts';
import Actions from './additionFields/Actions';

const DeliveriesTable = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);

    const hasAddDeliveryPermission = useHasPermission("create_delivery");

    const dataInfo = [
        { field: "id", title: "#" },
        { field: "title", title: "نام سرویس" },
        { field: "amount", title: "هزینه" },
        {
            field: null,
            title: "مدت تحویل",
            elements: (rowData) => <span>{rowData.time} {rowData.time_unit}</span>
        },
        {
            field: null,
            title: "عملیات",
            elements: (rowData) => <Actions rowData={rowData} handleDeleteDelivery={handleDeleteDelivery} />
        },
    ]

    const searchParams = {
        searchField: "title",
        title: "جستجو",
        placeHolder: "عنوان محصول را وارد کنید"
    }

    const handleGetAllDeliveries = async () => {
        setLoading(true);
        try {
            const response = await getAllDeliveriesService();
            if (response.status === 200) {
                setData(response.data.data);
            }
        } catch (error) {

        } finally {
            setLoading(false);
        }
    }

    const handleDeleteDelivery = async (deliveryData) => {
        const res = await Confirm("حذف سرویس تحویل", `آیا از حذف سرویس تحویل ${deliveryData.title} مطمئن هستید؟`, "warning");
        if (res) {
            try {
                const response = await deleteDeliveryService(deliveryData.id);
                if (response.status === 200) {
                    Alert("حذف سرویس تحویل", response.data.message, "success");
                    setData(prevData => prevData.filter(d => d.id != deliveryData.id));
                }
            } catch (error) {

            }
        } else {
            Alert("لغو عملیات", "شما عملیات حذف سرویس تحویل را لغو کردید", "info");
        }
    }

    useEffect(() => {
        handleGetAllDeliveries();
    }, []);


    return (
        <PaginatedTable
            data={data}
            dataInfo={dataInfo}
            numOfItems={8}
            searchParams={searchParams}
            loading={loading}
        >
            {hasAddDeliveryPermission && (
                <>
                    <AddButtonLink href="/deliveries/add-delivery" />
                    <Outlet context={{
                        setData
                    }} />
                </>
            )}
        </PaginatedTable>
    );
}

export default DeliveriesTable;
