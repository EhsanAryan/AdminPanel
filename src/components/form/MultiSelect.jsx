import { ErrorMessage, Field } from 'formik'
import React, { useEffect, useState } from 'react'
import FormShowError from './FormShowError';

// resultType === "string" ? "1-2-3" : [1, 2, 3];

const MultiSelect = ({formikOptions, resultType, name, label, options, className, headerText }) => {
    const [selectedItems, setSelectedItems] = useState([]);

    const handleSetSelectedItems = (selectedId, formik) => {
        if(selectedId && selectedItems.findIndex(item => item.id == selectedId) === -1) {
            const newData = [...selectedItems, options.filter(o => o.id == selectedId)[0]];
            setSelectedItems(newData);

            const selectedIds = newData.map(nd => nd.id);
            const fieldValue = resultType === "string" ? selectedIds.join("-") : selectedIds;
            formik.setFieldValue(name, fieldValue);

        }
    }

    const handleRemoveFromSelectedItems = (selectedId, formik) => {
        const newData = selectedItems.filter(item => item.id != selectedId);
        setSelectedItems(newData);

        const selectedIds = newData.map(nd => nd.id);
        const fieldValue = resultType === "string" ? selectedIds.join("-") : selectedIds;
        formik.setFieldValue(name, fieldValue);
    }

    useEffect(() => {
        if(formikOptions.values[name] === formikOptions.initialValues[name]) {
            setSelectedItems([]);
        }
    }, [formikOptions.isSubmitting]);

    return (
        <div className={`col-12 ${className}`}>
            <Field>
                {({ form }) => {
                    return (
                        <>
                            <div className="input-group mb-2 dir_ltr">
                                <Field as="select" id={name} name={name} className="form-select"
                                    onChange={(ev) => handleSetSelectedItems(ev.target.value, form)}>
                                    <option value="">{headerText}</option>
                                    {options.map(opt => {
                                        return (
                                            <option key={`option-${opt.id}`} value={opt.id}>{opt.value}</option>
                                        );
                                    })}
                                </Field>
                                <span className="input-group-text w_6rem justify-content-center">{label}</span>
                            </div>
                            <div className="pt-1 mb-2">
                                {
                                    selectedItems.map(item => {
                                        return (
                                            <span className="chips_elem" key={`product_chips_${item.id}`}>
                                                <i className="fas fa-times text-danger me-1 ms-2"
                                                    onClick={() => handleRemoveFromSelectedItems(item.id, form)}>
                                                </i>
                                                {item.value}
                                            </span>
                                        );
                                    })
                                }
                            </div>
                        </>
                    );
                }}
            </Field>
            <ErrorMessage name={name} component={FormShowError} />
        </div>
    )
}

export default MultiSelect;

