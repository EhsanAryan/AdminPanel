import React, { useEffect, useState } from 'react';
import PaginatedTable from '../../components/PaginatedTable';
import { getAllPermissionsService } from '../../services/usersServices';

const PermissionsTable = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);

    const dataInfo = [
        { field: "id", title: "#" },
        { field: "title", title: "عنوان" },
        { field: "description", title: "توضیح" },
        { field: "category", title: "دسته مربوطه" }
    ]

    const searchParams = {
        searchField: "description",
        title: "جستجو",
        placeHolder: "توضیحات مجوز را وارد کنید"
    }

    const handleGetPermission = async () => {
        setLoading(true);
        try {
            const response = await getAllPermissionsService();
            if(response.status === 200) {
                setData(response.data.data);
            }
        } catch (error) {
            
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        handleGetPermission();
    }, []);


    return (
        <PaginatedTable
            data={data}
            dataInfo={dataInfo}
            numOfItems={8}
            searchParams={searchParams}
            loading={loading}
        >
        </PaginatedTable>
    );
}

export default PermissionsTable;
