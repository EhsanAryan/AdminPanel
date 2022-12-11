import React, { useEffect, useState } from 'react';


const PaginatedTable = ({ children, data, dataInfo, additionField, numOfItems, searchParams}) => {
    const [initData , setInitData] = useState(data);
    const [tableData, setTableData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [pages, setPages] = useState([]);
    const [searchValue , setSearchValue] = useState("");

    useEffect(() => {
        const pagesCount = Math.ceil(initData.length / numOfItems);
        let allPages = [];
        for (let p = 1; p <= pagesCount; p++) {
            allPages = [...allPages, p];
        }
        setPages(allPages);
    }, [initData]);

    useEffect(() => {
        const startIndex = (currentPage - 1) * numOfItems;
        const endIndex = currentPage * numOfItems;
        const currentData = initData.slice(startIndex, endIndex);
        setTableData(currentData);
    }, [currentPage , initData]);

    useEffect(() => {
        setInitData(data.filter(d => d[searchParams.searchField].toLowerCase().includes(searchValue.toLowerCase())));
        setCurrentPage(1);
    } , [searchValue]);


    return (
        <>
            <div className="row justify-content-between">
                <div className="col-10 col-md-6 col-lg-4">
                    <div className="input-group mb-3 dir_ltr">
                        <input type="text" className="form-control"
                        placeholder={searchParams.placeHolder}
                        value={searchValue} onChange={(event) => setSearchValue(event.target.value)} />
                        <span className="input-group-text" >{searchParams.title}</span>
                    </div>
                </div>
                <div className="col-2 col-md-6 col-lg-4 d-flex flex-column align-items-end">
                    {children}
                </div>
            </div>

            <table className="table table-responsive text-center table-hover table-bordered">
                <thead className="table-secondary">
                    <tr>
                        {dataInfo.map(i => {
                            return (
                                <th key={i.field}>{i.title}</th>
                            )
                        })}
                        {
                            additionField ? (
                                <th>
                                    {additionField.title}
                                </th>
                            ) : null
                        }
                    </tr>
                </thead>
                <tbody>
                    {tableData.map(d => {
                        return (
                            <tr key={`item_${d.id}`}>
                                {dataInfo.map(i => {
                                    return (
                                        <td key={`cell_${d.id}_${i.field}`}>{d[i.field]}</td>
                                    )
                                })}
                                {
                                    additionField ? (
                                        <td>{additionField.elements(d.id)}</td>
                                    ) : null
                                }
                            </tr>
                        )
                    })}
                </tbody>
            </table>
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
                            {pages.map(page => {
                                return (
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
    );
}

export default PaginatedTable;
