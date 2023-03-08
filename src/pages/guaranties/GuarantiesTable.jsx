import React, { useEffect, useState } from 'react';
import PaginatedTable from '../../components/PaginatedTable';
import { useHasPermission } from '../../hooks/hasPermission';
import { deleteGuaranteeService, getGuarantiesService } from '../../services/guarantiesServices';
import { Alert, Confirm } from '../../utils/Alerts';
import AddGuarantee from './AddGuarantee';
import Actions from './additionFields/Actions';


const GuarantiesTable = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [editGuarantee, setEditGuarantee] = useState(null);

    const hasAddGuaranteePermission = useHasPermission("create_guarantee");

    const dataInfo = [
        { field: "id", title: "#" },
        { field: "title", title: "عنوان" },
        { field: "descriptions", title: "توضیحات" },
        { field: "length", title: "مدت" },
        { field: "length_unit", title: "واحد" },
        {
            field: null,
            title: "عملیات",
            elements: (rowData) => <Actions rowData={rowData}
                handleDeleteGuarantee={handleDeleteGuarantee} setEditGuarantee={setEditGuarantee} />
        }
    ]


    const searchParams = {
        searchField: "title",
        title: "جستجو",
        placeHolder: "عنوان محصول را وارد کنید"
    }

    const handleGetGuarantees = async () => {
        setLoading(true);
        try {
            const response = await getGuarantiesService();
            if (response.status === 200) {
                setData(response.data.data);
            }
        } catch (error) {

        } finally {
            setLoading(false);
        }
    }

    const handleDeleteGuarantee = async (guaranteeData) => {
        const res = await Confirm("حذف گارانتی", `آیا از حذف گارانتی ${guaranteeData.title} مطمئن هستید؟`, "warning");
        if (res) {
            try {
                const response = await deleteGuaranteeService(guaranteeData.id);
                if (response.status === 200) {
                    Alert("حذف گارانتی", response.data.message, "success");
                    setData(prevData => prevData.filter(d => d.id !== guaranteeData.id));
                }
            } catch (error) {

            }
        } else {
            Alert("لغو عملیات", "شما عملیات حذف گارانتی را لغو کردید", "info");
        }
    }

    useEffect(() => {
        handleGetGuarantees();
    }, []);

    return (
        <>
            <PaginatedTable
                data={data}
                dataInfo={dataInfo}
                numOfItems={4}
                searchParams={searchParams}
                loading={loading}
            >
                {hasAddGuaranteePermission && <AddGuarantee setData={setData}
                    editGuarantee={editGuarantee} setEditGuarantee={setEditGuarantee} />}
            </PaginatedTable>
        </>
    );
}

export default GuarantiesTable;
