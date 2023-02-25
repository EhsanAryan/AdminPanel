import { ErrorMessage, Field } from 'formik'
import React, { useEffect, useState } from 'react'
import FormShowError from './FormShowError';

// resultType === "string" ? "1-2-3" : [1, 2, 3];

const SearchableSelect = ({
    formikOptions,
    resultType,
    name,
    label,
    options,
    className,
    headerText,
    placeHolder,
    initialItems
}) => {
    const [selectedItems, setSelectedItems] = useState([]);
    const [showItems, setShowItems] = useState(false);
    const [initOptions, setInitOptions] = useState(options);

    const handleSetSelectedItems = (selectedId, formik) => {
        if (selectedId && selectedItems.findIndex(item => item.id == selectedId) === -1) {
            const newData = [...selectedItems, options.filter(o => o.id == selectedId)[0]];
            setSelectedItems(newData);

            const selectedIds = newData.map(nd => nd.id);
            const fieldValue = resultType === "string" ? selectedIds.join("-") : selectedIds;
            formik.setFieldValue(name, fieldValue);
        }
    }

    const handleRemoveFromSelectedItems = (ev, selectedId, formik) => {
        ev.stopPropagation();
        const newData = selectedItems.filter(item => item.id != selectedId);
        setSelectedItems(newData);

        const selectedIds = newData.map(nd => nd.id);
        const fieldValue = resultType === "string" ? selectedIds.join("-") : selectedIds;
        formik.setFieldValue(name, fieldValue);
    }

    const handleSearch = (text) => {
        setInitOptions(options.filter(o => o.value.toLowerCase().includes(text.toLowerCase())));
    }

    const handleShowItems = (ev) => {
        ev.stopPropagation();
        setShowItems(!showItems);
    }

    useEffect(() => {
        document.body.addEventListener("click", () => {
            setShowItems(false);
        });
    }, []);

    useEffect(() => {
        setInitOptions(options);
    }, [options]);

    useEffect(() => {
        if (formikOptions.values[name] === formikOptions.initialValues[name]) {
            setSelectedItems([]);
        }
    }, [formikOptions.isSubmitting]);

    useEffect(() => {
       initialItems && setSelectedItems(initialItems);
    }, [initialItems]);


    return (
        <div className={`col-12 ${className}`}>
            <Field>
                {({ form }) => {
                    return (
                        <>
                            <div className="input-group mb-2 dir_ltr">
                                <div className="searchable-select form-select 
                                d-flex justify-content-start align-items-center"
                                    onClick={(ev) => handleShowItems(ev)}>
                                    {
                                        selectedItems.length > 0 ? (
                                            selectedItems.map(item => {
                                                return (
                                                    <span className="chips_elem" key={`product_chips_${item.id}`}>
                                                        <i className="fas fa-times text-danger me-1 ms-2"
                                                            onClick={(ev) => handleRemoveFromSelectedItems(ev, item.id, form)}>
                                                        </i>
                                                        {item.value}
                                                    </span>
                                                );
                                            })
                                        ) : <span className="text-muted">{headerText}</span>
                                    }
                                    <div className={`hidden-menu ${!showItems ? "d-none" : ""}`}
                                        onClick={(ev) => ev.stopPropagation()}>
                                        <input type="text" className="form-control hidden-input border-0"
                                            placeholder={placeHolder + "..."}
                                            onChange={(ev) => handleSearch(ev.target.value)} />
                                        <ul className="list-unstyled w-100 p-0 m-0 hidden-items-list">
                                            {initOptions.map(opt => {
                                                return (
                                                    <li className="hidden-items w-100" key={`option_${opt.id}_${Math.random()}`}
                                                        onClick={() => handleSetSelectedItems(opt.id, form)}>
                                                        {opt.value}
                                                    </li>
                                                );
                                            })}
                                        </ul>
                                    </div>
                                </div>
                                <span className="input-group-text w_6rem justify-content-center">{label}</span>
                            </div>
                        </>
                    );
                }}
            </Field>
            <ErrorMessage name={name} component={FormShowError} />
        </div>
    )
}

export default SearchableSelect;

