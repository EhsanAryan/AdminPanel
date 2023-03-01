import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import AddButtonLink from '../../components/AddButtonLink';
import PaginatedDataTable from '../../components/PaginatedDataTable';
import { deleteUserService, getUsersService } from '../../services/usersServices';
import { Alert, Confirm } from '../../utils/Alerts';
import Actions from './additionField/Actions';

const UsersTable = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchChar, setSearchChar] = useState("");
    const [itemsCount, setItemsCount] = useState(8);
    const [pagesCount, setPagesCount] = useState(0);

    const dataInfo = [
        { field: "id", title: "#" },
        { field: "user_name", title: "نام کاربری" },
        {
            field: null,
            title: "نام و نام خانوداگی",
            elements: (rowData) => <span>{rowData.first_name || ""} {rowData.last_name || ""}</span>
        },
        { field: "phone", title: "شماره موبایل" },
        { field: "email", title: "ایمیل" },
        {
            field: null,
            title: "نقش",
            elements: (rowData) => <span>{rowData.roles[0]?.title || ""}</span>
        },
        {
            field: null,
            title: "جنسیت",
            elements: (rowData) => <span>{rowData.gender == 1 ? "مرد" : "زن"}</span>
        },
        {
            field: null,
            title: "عملیات",
            elements: (rowData) => <Actions rowData={rowData} handleDeleteUser={handleDeleteUser} />
        }
    ]

    const searchParams = {
        title: "جستجو",
        placeHolder: "قسمتی از شماره تلفن یا ایمیل را وارد کنید"
    }

    const handleGetUsers = async (page, count, char) => {
        setLoading(true);
        try {
            const response = await getUsersService(page, count, char);
            if (response.status === 200) {
                setData(response.data.data.data);
                setPagesCount(response.data.data.last_page);
            }
        } catch (error) {

        } finally {
            setLoading(false);
        }
    }

    const handleDeleteUser = async (userData) => {
        const res = await Confirm("حذف کاربر", `آیا از حذف کاربر ${userData.user_name} مطمئن هستید؟`, "warning");
        if (res) {
            try {
                const response = await deleteUserService(userData.id);
                if (response.status === 200) {
                    Alert("حذف کاربر", response.data.message, "success");
                    handleGetUsers(1, itemsCount, searchChar);
                    setCurrentPage(1);
                }
            } catch (error) {

            }
        } else {
            Alert("لغو عملیات", "شما عملیات حذف کاربر را لغو کردید", "info");
        }
    }

    const handleSearch = (char) => {
        setSearchChar(char);
        handleGetUsers(1, itemsCount, char);
        setCurrentPage(1);
    }

    useEffect(() => {
        handleGetUsers(currentPage, itemsCount, searchChar);
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
            <AddButtonLink href="/users/add-user" />
            <Outlet context={{
                setData
            }} />
        </PaginatedDataTable>
    );
}

export default UsersTable;
