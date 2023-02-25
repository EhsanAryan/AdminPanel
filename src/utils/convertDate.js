import moment from "moment-jalaali"

export const convertDateToJalali = (date) => {
    return moment(date).format("jYYYY/jMM/jDD");
}

export const convertDateToGregorian = (date) => {
    return moment(date, "jYYYY-jMM-jDD").format('YYYY/MM/DD');
}
