import React, { useEffect } from 'react'
import { useState } from 'react'
import PaginatedTable from '../../components/PaginatedTable'
import { getCategoriesService } from '../../services/categoriesServices'
import { Alert } from '../../utils/Alerts'
import AddCategory from './AddCategory'
import Actions from './additionFields/Actions'
import ShowInMenu from './additionFields/ShowInMenu'


const dataInfo = [
    { field: "id", title: "#" },
    { field: "title", title: "عنوان محصول" },
    { field: "parent_id", title: "والد" } ,
    { field: "created_at", title: "تاریخ" }
]

const additionFields = [
    {
        title: "نمایش در منو" ,
        elements: (rowData) => <ShowInMenu rowData={rowData} /> 
    } ,
    {
        title: "عملیات",
        elements: (rowData) => <Actions rowData={rowData} />
    }
]

const searchParams = {
    searchField: "title",
    title: "جستجو",
    placeHolder: "عنوان محصول را وارد کنید"
}


const CategoriesTable = () => {
    const [data , setData] = useState([]);

    const handleGetCategories = async () => {
        try {
            const response = await getCategoriesService();
            if(response.status === 200) {
                setData(response.data.data);
            }
            else {
                Alert("اررور!" , response.data.message , "error");
            }
        } catch (error) {
            Alert("اررور!" , "مشکلی از سمت سرور رخ داده است." , "error");
        }
    }

    useEffect(() => {
        handleGetCategories();
    }, []);


    return (
        <PaginatedTable
            data={data}
            dataInfo={dataInfo}
            additionFields={additionFields}
            numOfItems={4}
            searchParams={searchParams}
        >
            <AddCategory />
        </PaginatedTable>
    )
}

export default CategoriesTable;
