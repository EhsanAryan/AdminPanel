import React, { useEffect } from 'react';
import { useState } from 'react';
import PaginatedTable from '../../components/PaginatedTable';
import { deleteDiscountService, getDiscountsService } from '../../services/discountsServices';
import AddDiscount from './AddDiscount';
import Actions from './additionFields/Actions';
import ForAll from './additionFields/ForAll';
import { convertDateToJalali } from '../../utils/convertDate';
import { Alert, Confirm } from '../../utils/Alerts';



const DiscountsTable = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);

    const dataInfo = [
        { field: "id", title: "#" },
        { field: "title", title: "عنوان" },
        { field: "code", title: "کد" },
        { field: "percent", title: "درصد تخفیف" },
    ]
    
    const additionFields = [
        {
            title: "تا تاریخ",
            elements: (rowData) => convertDateToJalali(rowData.expire_at)
        },
        {
            title: "برای",
            elements: (rowData) => <ForAll rowData={rowData} />
        },
        {
            title: "عملیات",
            elements: (rowData) => <Actions rowData={rowData} handleDeleteDiscount={handleDeleteDiscount} />
        }
    ]
    
    const searchParams = {
        searchField: "title",
        title: "جستجو",
        placeHolder: "عنوان تخفیف را وارد کنید"
    }

    const handleGetDiscounts = async () => {
        setLoading(true);
        try {
            const response = await getDiscountsService();
            if(response.status === 200) {
                setData(response.data.data);
                console.log(response);
            }
        } catch (error) {
            
        } finally {
            setLoading(false);
        }
    }

    const handleDeleteDiscount = async (discountData) => {
        const res = await Confirm("حذف تخفیف", `آیا از حذف تخفیف ${discountData.title} مطمئن هستید؟`, "warning");
        if(res) {
            try {
                const response = await deleteDiscountService(discountData.id);
                if(response.status === 200) {
                    Alert("حذف تخفیف", response.data.message, "success");
                    setData(prevData => prevData.filter(d => d.id !== discountData.id));
                }
            } catch (error) {
                
            }
        } else {
            Alert("لغو عملیات", "شما عملیات حذف تخفیف را لغو کردید", "info");
        }
    }

    useEffect(() => {
        handleGetDiscounts();
    }, []);


    return (
        <PaginatedTable
            data={data}
            dataInfo={dataInfo}
            additionFields={additionFields}
            numOfItems={8}
            searchParams={searchParams}
            loading={loading}
        >
            <AddDiscount />
        </PaginatedTable>
    );
}

export default DiscountsTable;
