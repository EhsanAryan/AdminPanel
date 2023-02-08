import React, { useEffect, useState } from 'react';
import SpinnerLoader from './SpinnerLoader';


const PaginatedTable = ({
    children,
    tableData,
    dataInfo,
    itemsCount,
    setItemsCount,
    pagesCount,
    currentPage,
    setCurrentPage,
    searchParams,
    handleSearch,
    loading,
}) => {
    const [pages, setPages] = useState([]);
    const [pagination, setPagination] = useState(pages);

    useEffect(() => {
        let allPages = [];
        for (let p = 1; p <= pagesCount; p++) {
            allPages = [...allPages, p];
        }
        setPages(allPages);
    }, [pagesCount]);

    useEffect(() => {
        // Pagination format: first page ... x-3 x-2 x-1 x x+1 x+2 x+3 ... last page
        const startIndex = (currentPage - 4 < 0) ? 0 : currentPage - 4;
        const endIndex = currentPage + 3;
        const paginationCount = pages.slice(startIndex, endIndex);

        let paginationArray = [1, ...paginationCount, pages.length];
        if ((currentPage > 5) && (currentPage < (pages.length - 4))) {
            paginationArray = [1, "...1", ...paginationCount, "...2", pages.length];
        }
        else if (currentPage > 5) {
            paginationArray = [1, "...1", ...paginationCount, pages.length];
        }
        else if (currentPage < (pages.length - 4)) {
            paginationArray = [1, ...paginationCount, "...2", pages.length];
        }
        paginationArray = [...new Set(paginationArray)];
        setPagination(paginationArray);
    }, [currentPage, pages]);

    const handleChangeItemsCount = (event) => {
        const cnt = Number(Math.ceil(event.target.value));
        if (cnt <= 0) {
            setItemsCount(5);
        }
        else if (cnt > 20) {
            setItemsCount(20);
        }
        else {
            setItemsCount(cnt);
        }
        setCurrentPage(1);
    }

    let timeout;

    const handleSetSearchChar = (char) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => {
            handleSearch(char);
        }, 1000);
    }

    return (
        <>
            <div className="row justify-content-between mb-2">
                <div className="col-9 col-md-6 col-lg-4">
                    <div className="input-group mb-3 dir_ltr">
                        <input type="text" className="form-control"
                            placeholder={searchParams.placeHolder}
                            onChange={(ev) => handleSetSearchChar(ev.target.value)} />
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
                ) : tableData.length > 0 ? (
                    <>
                        <div className="table-responsive">
                            <table className="table text-center table-hover table-bordered">
                                <thead className="table-secondary">
                                    <tr>
                                        {dataInfo.map((i, index) => {
                                            return (
                                                <th key={i.field || `tableHeader_${index}`}>
                                                    {i.title}
                                                </th>
                                            )
                                        })}
                                    </tr>
                                </thead>
                                <tbody>
                                    {tableData.map(d => {
                                        return (
                                            <tr key={`item_${d.id}`}>
                                                {dataInfo.map((i, index) => {
                                                    if (i.field) {
                                                        return (
                                                            <td key={`cell_${d.id}_${i.field}`}>
                                                                {d[i.field]}
                                                            </td>
                                                        )
                                                    }
                                                    return (
                                                        <td key={`cell_${d.id}_${index}}`}>
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
                                        {pagination.map(page => {
                                            return typeof page === "string" && page.includes("...") ? (
                                                <li key={`page_${page}`}
                                                    className="page-item">
                                                    <span className="page-link text-dark disabled-page">
                                                        ...
                                                    </span>
                                                </li>
                                            ) : (
                                                <li key={`page_${page}`}
                                                    className="page-item">
                                                    <span className={`page-link text-dark ${currentPage === page ? "active-page" : null}`}
                                                        onClick={() => setCurrentPage(page)}>
                                                        {page}
                                                    </span>
                                                </li>
                                            )
                                        })}
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
