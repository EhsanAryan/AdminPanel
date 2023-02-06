import React, { useEffect } from 'react'
import { useState } from 'react'
import { Outlet, useParams } from 'react-router-dom'
import PaginatedTable from '../../components/PaginatedTable'
import { deleteCategoryService, getCategoriesService } from '../../services/categoriesServices'
import { Alert, Confirm } from '../../utils/Alerts'
import AddCategory from './AddCategory'
import Actions from './additionFields/Actions'
import ShowInMenu from './additionFields/ShowInMenu'
import { convertDateToJalali } from '../../utils/convertDate'


const CategoriesTable = () => {
    const [data, setData] = useState([]);
    const [forceRender, setForceRender] = useState(false);
    const [loading, setLoading] = useState(false);

    const params = useParams();

    const dataInfo = [
        { field: "id", title: "#" },
        { field: "title", title: "عنوان محصول" },
        { field: "parent_id", title: "والد" }
    ]
    
    const additionFields = [
        {
            title: "تاریخ",
            elements: (rowData) => convertDateToJalali(rowData.created_at)
        },
        {
            title: "نمایش در منو",
            elements: (rowData) => <ShowInMenu rowData={rowData} />
        },
        {
            title: "عملیات",
            elements: (rowData) => <Actions rowData={rowData} handleDeleteCategory={handleDeleteCategory} />
        }
    ]
    
    const searchParams = {
        searchField: "title",
        title: "جستجو",
        placeHolder: "عنوان محصول را وارد کنید"
    }

    const handleDeleteCategory = async (rowData) => {
        const res = await Confirm("تایید", `آیا از حذف  گروه ${rowData.title} مطمئن هستید؟`, "warning");
        if(res) {
            try {
                const response = await deleteCategoryService(rowData.id);
                if(response.status === 200) {
                    Alert("حذف رکورد", response.data.message, "success");
                    // To rerender the component without sending an extra request to server
                    setData(prevData => prevData.filter(d => d.id !== rowData.id));
                }
            } catch (error) {
                
            }
        } else {
            Alert("لفو عملیات", "شما عملیات حذف رکورد را لفو کردید", "info");
        }
    }

    const handleGetCategories = async () => {
        setLoading(true);
        try {
            const response = await getCategoriesService(params.categoryId);
            if (response.status === 200) {
                setData(response.data.data);
            }
        } catch (error) {

        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        handleGetCategories();
    }, [params.categoryId, forceRender]);


    return (
        <>
            <Outlet />
            <PaginatedTable
                data={data}
                dataInfo={dataInfo}
                additionFields={additionFields}
                numOfItems={8}
                searchParams={searchParams}
                loading={loading}
            >
                <AddCategory setForceRender={setForceRender} />
            </PaginatedTable>
        </>
    )
}

export default CategoriesTable;
