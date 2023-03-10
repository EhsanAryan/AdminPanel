import React, { useState } from 'react';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import PaginatedTable from '../../../components/PaginatedTable';
import PrevButton from '../../../components/PrevButton';
import { deleteCategoryAttrSerivce, getCategoryAttrsSerivce, getSingleAttrSerivce } from '../../../services/categoryAttrsServices';
import { Alert, Confirm } from '../../../utils/Alerts';
import AddAttrForm from './AddAttrForm';
import AttrActions from './AttrActions';
import ShowInFilter from './ShowInFilter';


const Attributes = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [reinitializeValues, setReinitializeValues] = useState(null);
    const [editAttrId, setEditAttrId] = useState(null);
    const [editAttr, setEditAttr] = useState(null);

    const location = useLocation();

    const dataInfo = [
        { field: "id", title: "#" },
        { field: "title", title: "عنوان ویژگی" },
        { field: "unit", title: "واحد" },
        {
            field: null,
            title: "نمایش در منو",
            elements: (rowData) => <ShowInFilter rowData={rowData} />
        },
        {
            field: null,
            title: "عملیات",
            elements: (rowData) => <AttrActions rowData={rowData}
                handleDeleteCategoryAttr={handleDeleteCategoryAttr}
                editAttrId={editAttrId} setEditAttrId={setEditAttrId} />
        }
    ]
    const searchParams = {
        searchField: "title",
        title: "جستجو",
        placeHolder: "عنوان محصول را وارد کنید"
    }

    const handleDeleteCategoryAttr = async (rowData) => {
        const res = await Confirm("تایید", `آیا از حذف  ویژگی ${rowData.title} مطمئن هستید؟`, "warning");
        if (res) {
            try {
                const response = await deleteCategoryAttrSerivce(rowData.id);
                if (response.status === 200) {
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

    const handleGetCategoryAttrs = async () => {
        setLoading(true);
        try {
            const response = await getCategoryAttrsSerivce(location.state.categoryData.id);
            if (response.status === 200) {
                setData(response.data.data);
            }
        } catch (error) {

        } finally {
            setLoading(false);
        }
    }

    const handleGetSingleAttr = async () => {
        try {
            const response = await getSingleAttrSerivce(editAttrId);
            if (response.status === 200) {
                setEditAttr(response.data.data);
            } else {
                setEditAttr(null);
            }
        } catch (error) {
            setEditAttr(null);
        }
    }

    useEffect(() => {
        handleGetCategoryAttrs();
    }, []);

    useEffect(() => {
        if (editAttrId) {
            handleGetSingleAttr();
        } else {
            setEditAttr(null);
        }
    }, [editAttrId]);

    useEffect(() => {
        if (editAttr) {
            setReinitializeValues({
                ...editAttr,
                in_filter: editAttr.in_filter ? true : false
            })
        } else {
            setReinitializeValues(null);
        }
    }, [editAttr]);


    return (
        <>
            <h3 className="text-center mt-4">مدیریت ویژگی های دسته بندی</h3>
            <h4 className="text-center mb-4">
                ویژگی های:
                <span className="text-primary mx-2">{location.state.categoryData.title}</span>
            </h4>

            <div className="container">
                <AddAttrForm
                    reinitializeValues={reinitializeValues}
                    location={location}
                    setData={setData}
                    editAttrId={editAttrId}
                    setEditAttrId={setEditAttrId}
                    editAttr={editAttr}
                />

                <hr />

                <PaginatedTable
                    data={data}
                    dataInfo={dataInfo}
                    numOfItems={6}
                    searchParams={searchParams}
                    loading={loading}
                >
                    <PrevButton />
                </PaginatedTable>
            </div>

        </>
    );
}

export default Attributes;
