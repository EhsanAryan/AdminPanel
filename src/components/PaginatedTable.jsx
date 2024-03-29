import React, { useEffect, useState } from 'react';
import SpinnerLoader from './SpinnerLoader';


const PaginatedTable = ({ children, data, dataInfo, numOfItems, searchParams, loading }) => {
    const [initData, setInitData] = useState(data);
    const [tableData, setTableData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [pages, setPages] = useState([]);
    const [searchValue, setSearchValue] = useState("");
    const [itemsCount, setItemsCount] = useState(numOfItems);

    const pageRange = 3;

    useEffect(() => {
        const pagesCount = Math.ceil(initData.length / itemsCount);
        let allPages = [];
        for (let p = 1; p <= pagesCount; p++) {
            allPages = [...allPages, p];
        }
        setPages(allPages);
    }, [initData, itemsCount]);

    useEffect(() => {
        const startIndex = (currentPage - 1) * itemsCount;
        const endIndex = currentPage * itemsCount;
        const currentData = initData.slice(startIndex, endIndex);
        setTableData(currentData);
    }, [currentPage, initData, itemsCount]);

    useEffect(() => {
        setInitData(data.filter(d => d[searchParams.searchField].toLowerCase().includes(searchValue.toLowerCase())));
        setCurrentPage(1);
    }, [searchValue, data]);



    const handleChangeItemsCount = (event) => {
        const cnt = Number(Math.ceil(event.target.value));
        if (cnt <= 0) {
            setItemsCount(numOfItems);
        }
        else if (cnt > 20) {
            setItemsCount(20);
        }
        else {
            setItemsCount(cnt);
        }
        setCurrentPage(1);
    }

    return (
        <>
            <div className="row justify-content-between mb-2">
                <div className="col-9 col-md-6 col-lg-4">
                    <div className="input-group mb-3 dir_ltr">
                        <input type="text" className="form-control"
                            placeholder={searchParams.placeHolder}
                            value={searchValue} onChange={(event) => setSearchValue(event.target.value)} />
                        <span className="input-group-text" >{searchParams.title}</span>
                    </div>
                </div>
                <div className="col-3 col-md-6 col-lg-4 d-flex flex-column align-items-end">
                    {children}
                </div>
            </div>
            {
                loading ? (
                    <SpinnerLoader colorClass={"text-success"} />
                ) : initData.length > 0 ? (
                    <>
                        <div className="table-responsive">
                            <table className="table text-center table-hover table-bordered 
                            align-middle">
                                <thead className="table-secondary">
                                    <tr>
                                        {dataInfo.map((i, index) => {
                                            return (
                                                <th key={i.field || `title_${index}`}>{i.title}</th>
                                            )
                                        })}
                                    </tr>
                                </thead>
                                <tbody>
                                    {tableData.map(d => {
                                        return (
                                            <tr key={`item_${d.id}`}>
                                                {dataInfo.map((i, index) => {
                                                    return i.field ? (
                                                        <td key={`cell_${d.id}_${i.field}`}>
                                                            {d[i.field]}
                                                        </td>
                                                    ) : (
                                                        <td key={`cell_${d.id}_${index}`}>
                                                            {i.elements(d)}
                                                        </td>
                                                    )
                                                })}
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </table>
                        </div>

                        <div className="row">
                            <div className="col-8 col-sm-5 col-md-5 col-lg-4 col-xl-3 mt-3 mt-md-1 mb-3">
                                <input type="number" className="form-control"
                                    min="1" max="20" title="تعداد آیتم های صفحه"
                                    placeholder="تعداد آیتم های صفحه" value={itemsCount}
                                    onChange={(event) => handleChangeItemsCount(event)} />
                            </div>
                        </div>

                        {
                            pages.length > 1 ? (
                                <nav aria-label="Page navigation example" className="d-flex justify-content-center">
                                    <ul className="pagination dir_ltr">
                                        <li className="page-item">
                                            <span className={`page-link ${currentPage === 1 ? "disabled" : null}`}
                                                aria-label="Previous" onClick={() => setCurrentPage(currentPage - 1)}>
                                                <span aria-hidden="true" className='text-dark'>&raquo;</span>
                                            </span>
                                        </li>
                                        {
                                            currentPage > 1 + pageRange ? (
                                                <>
                                                    <li className="page-item">
                                                        <span className="page-link text-dark"
                                                            onClick={() => setCurrentPage(1)}>
                                                            1
                                                        </span>
                                                    </li>
                                                    <li className="page-item">
                                                        <span className="page-link text-dark disabled">
                                                            ...
                                                        </span>
                                                    </li>
                                                </>
                                            ) : null
                                        }
                                        {pages.map(page => {
                                            return (page >= currentPage - pageRange) && (page <= currentPage + pageRange) ? (
                                                <li key={`page_${page}`} className="page-item">
                                                    <span className={`page-link text-dark ${currentPage === page ? "active-page" : null}`}
                                                        onClick={() => setCurrentPage(page)}>
                                                        {page}
                                                    </span>
                                                </li>
                                            ) : null
                                        })}
                                        {
                                            currentPage < pages.length - pageRange ? (
                                                <>
                                                    <li className="page-item">
                                                        <span className="page-link text-dark disabled">
                                                            ...
                                                        </span>
                                                    </li>
                                                    <li className="page-item">
                                                        <span className="page-link text-dark"
                                                            onClick={() => setCurrentPage(pages.length)}>
                                                            {pages.length}
                                                        </span>
                                                    </li>
                                                </>
                                            ) : null
                                        }
                                        <li className="page-item">
                                            <span className={`page-link ${currentPage === pages.length ? "disabled" : null}`}
                                                aria-label="Next" onClick={() => setCurrentPage(currentPage + 1)}>
                                                <span aria-hidden="true" className='text-dark'>&laquo;</span>
                                            </span>
                                        </li>
                                    </ul>
                                </nav>
                            ) : null
                        }
                    </>
                ) : (
                    <div className="text-center h1 my-5">
                        نتیجه ای یافت نشد!
                    </div>
                )
            }

        </>
    );
}

export default PaginatedTable;
