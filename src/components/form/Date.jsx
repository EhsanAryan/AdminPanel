import { ErrorMessage, FastField } from 'formik';
import moment from 'moment-jalaali';
import React, { useEffect, useState } from 'react';
import FormShowError from './FormShowError';

const allDays = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30];
const allMonths = [
    { id: 1, value: "فروردین" },
    { id: 2, value: "اردیبهشت" },
    { id: 3, value: "خرداد" },
    { id: 4, value: "تیر" },
    { id: 5, value: "مرداد" },
    { id: 6, value: "شهریور" },
    { id: 7, value: "مهر" },
    { id: 8, value: "آبان" },
    { id: 9, value: "آذر" },
    { id: 10, value: "دی" },
    { id: 11, value: "بهمن" },
    { id: 12, value: "اسفند" }
]

const Date = ({ name, label, className, placeHolder, formik, yearRange, initialDate }) => {
    const [day, setDay] = useState("");
    const [month, setMonth] = useState("");
    const [year, setYear] = useState("");
    const [allYears, setAllYears] = useState([])
    const [showDatePicker, setShowDatePicker] = useState(false);

    useEffect(() => {
        const date = initialDate ? moment(initialDate) : moment();
        setYear(date.jYear());
        setMonth(date.jMonth() + 1);
        setDay(date.jDate());
    }, [initialDate]);

    const handleOpenDatePicker = () => {
        let years = [];
        for (let i = parseInt(year) - (yearRange?.from || 100); i <= parseInt(year) + (yearRange?.to || 0); i++) {
            years = [...years, i];
        }
        setAllYears(years);
        setShowDatePicker(true);
    }

    const handleCloseDatePicker = () => {
        const fieldValue = `${year}/${month}/${day}`;
        formik.setFieldValue(name, fieldValue);
        setShowDatePicker(false);
    }

    return (
        <>
            <div className={`col-12 ${className || ""} p-0 position-relative overflow-hidden mb-2`}
            style={{
                height: "39px"
            }}>
                <div className="input-group mb-2 dir_ltr"
                    onClick={() => handleOpenDatePicker()}>
                    <FastField id={name} name={name} className="form-control bgColor-fff pointer"
                        placeholder={placeHolder || "برای انتخاب تاریخ کلیک کنید"} disabled />
                    {label ? (
                        <span className="input-group-text w_6rem justify-content-center">{label}</span>
                    ) : null}
                </div>

                {
                    showDatePicker ? (
                        <div className='date-picker row m-0 p-0'>
                            <div className="col-3 d-flex justify-content-center align-items-center">
                                <select className="form-select date-select pointer" value={day}
                                    onChange={(ev) => setDay(ev.target.value)}>
                                    {allDays.map(d => {
                                        return (
                                            <option key={`day_${d}`} value={d}>{d}</option>
                                        );
                                    })}
                                </select>
                            </div>
                            <div className="col-3 d-flex justify-content-center align-items-center">
                                <select className="form-select date-select pointer" value={month}
                                    onChange={(ev) => setMonth(ev.target.value)}>
                                    {allMonths.map(m => {
                                        return (
                                            <option key={`month_${m.id}`} value={m.id}>{m.value}</option>
                                        );
                                    })}
                                </select>
                            </div>
                            <div className="col-3 d-flex justify-content-center align-items-center">
                                <select className="form-select date-select pointer" value={year}
                                    onChange={(ev) => setYear(ev.target.value)}>
                                    {allYears.map(y => {
                                        return (
                                            <option key={`year_${y}`} value={y}>{y}</option>
                                        );
                                    })}
                                </select>
                            </div>
                            <div className="col-3 d-flex justify-content-center align-items-center">
                                <i className="fas fa-check text-success pointer bg-white"
                                    onClick={() => handleCloseDatePicker()}></i>
                            </div>
                        </div>
                    ) : null
                }
            </div>
            <ErrorMessage name={name} component={FormShowError} />
        </>
    );
}

export default Date;
