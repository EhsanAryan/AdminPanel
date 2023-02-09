export const convertDataToFormData = (data) => {
    let formdata = new FormData();
    for(let key in data) {
        formdata.append(key, data[key]);
    }
    return formdata;
}