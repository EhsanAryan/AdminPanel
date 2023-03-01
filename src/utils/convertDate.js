import moment from "moment-jalaali"

export const convertDateToJalali = (date) => {
    return moment(date).format("jYYYY/jMM/jDD");
}

export const convertDateToGregorian = (date, inputFormat="jYYYY/jMM/jDD", outputformat="YYYY-MM-DD") => {
    return moment(date, inputFormat).format(outputformat);
}
