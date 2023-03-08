import React, { useEffect, useState } from 'react';
import PaginatedTable from '../../components/PaginatedTable';
import { useHasPermission } from '../../hooks/hasPermission';
import { deleteBrandService, getBrandsService } from '../../services/brandsServices';
import { apiPath } from '../../services/httpService';
import { Alert, Confirm } from '../../utils/Alerts';
import AddBrand from './AddBrand';
import Actions from "./additionFields/Actions";


const BrandsTable = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [editBrand, setEditBrand] = useState(null);

    const hasAddBrandPermission = useHasPermission("create_brand");

    const dataInfo = [
        { field: "id", title: "#" },
        { field: "original_name", title: "نام لاتین" },
        { field: "persian_name", title: "نام فارسی" },
        { field: "descriptions", title: "توضیحات" },
        {
            field: null,
            title: "لوگو",
            elements: (rowData) => {
                if (rowData.logo) {
                    return <img src={`${apiPath}/${rowData.logo}`} className="img-fluid brand-img"
                        alt="Logo" />
                }
            }
        },
        {
            field: null,
            title: "عملیات",
            elements: (rowData) => <Actions rowData={rowData} handleDeleteBrand={handleDeleteBrand}
                setEditBrand={setEditBrand} />
        }
    ]

    const searchParams = {
        searchField: "original_name",
        title: "جستجو",
        placeHolder: "عنوان محصول را وارد کنید"
    }

    const handleGetBrands = async () => {
        setLoading(true);
        try {
            const response = await getBrandsService();
            if (response.status === 200) {
                setData(response.data.data);
            }
        } catch (error) {

        } finally {
            setLoading(false);
        }
    }

    const handleDeleteBrand = async (brandData) => {
        const res = await Confirm("تایید حذف", `آیا از حذف ${brandData.original_name} مطمئن هستید؟`, "warning");
        if (res) {
            try {
                const response = await deleteBrandService(brandData.id);
                if (response.status === 200) {
                    Alert("حذف برند", response.data.message, "success");
                    setData(prevData => prevData.filter(d => d.id !== brandData.id));
                }
            } catch (error) {

            }
        } else {
            Alert("لغو عملیات", "شما عملیات حذف برند را لغو کردید", "info");
        }
    }

    useEffect(() => {
        handleGetBrands();
    }, []);


    return (
        <PaginatedTable
            data={data}
            dataInfo={dataInfo}
            numOfItems={10}
            searchParams={searchParams}
            loading={loading}
        >
            {hasAddBrandPermission && <AddBrand setData={setData} editBrand={editBrand} setEditBrand={setEditBrand} />}
        </PaginatedTable>
    );
}

export default BrandsTable;
