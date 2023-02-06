import moment from "moment-jalaali"

export const convertDateToJalali = (date) => {
    return moment(date).format("jYYYY/jMM/jDD");
}
