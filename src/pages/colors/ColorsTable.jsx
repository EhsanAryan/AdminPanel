import React, { useEffect, useState } from 'react';
import PaginatedTable from '../../components/PaginatedTable';
import { deleteColorService, getColorsServices } from '../../services/colorsServices';
import { Alert, Confirm } from '../../utils/Alerts';
import AddColor from './AddColor';
import Actions from './additionFields/Actions';
import ColorField from './additionFields/ColorField';


const ColorsTable = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [editColor, setEditColor] = useState(null);

    const dataInfo = [
        { field: "id", title: "#" },
        { field: "title", title: "نام رنگ" },
        { field: "code", title: "کد رنگ" }
    ]

    const additionFields = [
        {
            title: "رنگ",
            elements: (rowData) => <ColorField rowData={rowData} />
        },
        {
            title: "عملیات",
            elements: (rowData) => <Actions rowData={rowData} handleDeleteColor={handleDeleteColor}
                setEditColor={setEditColor} />
        }
    ]

    const searchParams = {
        searchField: "title",
        title: "جستجو",
        placeHolder: "عنوان محصول را وارد کنید"
    }

    const handleGetColors = async () => {
        setLoading(true);
        try {
            const response = await getColorsServices();
            if (response.status === 200) {
                setData(response.data.data);
            }
        } catch (error) {

        } finally {
            setLoading(false);
        }
    }

    const handleDeleteColor = async (colorData) => {
        const res = await Confirm("حذف رنگ", `آیا از حذف رنگ ${colorData.title} مطمئن هستید؟`, "warning");
        if (res) {
            try {
                const response = await deleteColorService(colorData.id);
                if (response.status === 200) {
                    Alert("حذف رنگ", response.data.message, "success");
                    setData(prevData => prevData.filter(d => d.id !== colorData.id));
                }
            } catch (error) {

            }
        } else {
            Alert("لغو عملیات", "شما عملیات حذف رنگ را لغو کردید", "info");
        }
    }

    useEffect(() => {
        handleGetColors();
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
            <AddColor setData={setData} editColor={editColor} setEditColor={setEditColor} />
        </PaginatedTable>
    );
}

export default ColorsTable;
