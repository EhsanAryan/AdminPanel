import React, { useState } from 'react';
import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import AddButtonLink from '../../components/AddButtonLink';
import PaginatedTable from '../../components/PaginatedTable';
import { useHasPermission } from '../../hooks/hasPermission';
import { deleteRoleService, getAllRolesService } from '../../services/usersServices';
import { Confirm, Alert } from '../../utils/Alerts';
import Actions from './additionFields/Actions';

const RolesTable = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);

    const hasAddRolePermission = useHasPermission("create_role");

    const dataInfo = [
        { field: "id", title: "#" },
        { field: "title", title: "عنوان" },
        { field: "description", title: "توضیح" },
        {
            field: null,
            title: "عملیات",
            elements: (rowData) => <Actions rowData={rowData} handleDeleteRole={handleDeleteRole} />
        }
    ]

    const searchParams = {
        searchField: "title",
        title: "جستجو",
        placeHolder: "عنوان نقش را وارد کنید"
    }

    const handleGetAllRoles = async () => {
        setLoading(true);
        try {
            const response = await getAllRolesService();
            if (response.status === 200) {
                setData(response.data.data);
            }
        } catch (error) {

        } finally {
            setLoading(false);
        }
    }

    const handleDeleteRole = async (roleData) => {
        const res = await Confirm("حذف نقش", `آیا از حذف نقش ${roleData.title} مطمئن هستید؟`, "warning");
        if (res) {
            try {
                const resposne = await deleteRoleService(roleData.id);
                if (resposne.status === 200) {
                    Alert("حذف نقش", resposne.data.message, "success");
                    setData(prevData => prevData.filter(d => d.id != roleData.id));
                }
            } catch (error) {

            }
        } else {
            Alert("لغو عملیات", "شما عملیات حذف نقش را لغو کردید", "info");
        }
    }

    useEffect(() => {
        handleGetAllRoles();
    }, []);


    return (
        <PaginatedTable
            data={data}
            dataInfo={dataInfo}
            numOfItems={8}
            searchParams={searchParams}
            loading={loading}
        >
            {hasAddRolePermission && (
                <>
                    <AddButtonLink href="/roles/add-role" />
                    <Outlet context={{
                        setData
                    }} />
                </>
            )}
        </PaginatedTable>
    );
}

export default RolesTable;
