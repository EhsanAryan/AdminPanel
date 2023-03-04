import axios from "axios";
import { Alert } from "../utils/Alerts";
import api_config from "./api_config.json"

export const apiPath = "https://ecomadminapi.azhadev.ir";


// Axios Interceptors
axios.interceptors.response.use((response) => {
    if(response.status !== 200 && response.status !== 201) {
        if(typeof (response.data) === "object") {
            let message = "";
            for(let key in response.data) {
                message = message + `${response.data[key]}\n`;
            }
            response.data.message = message;
        }
        Alert("مشکل!", response.data.message, "warning");
    }
    return response;
}, (error) => {
    Alert(`ارور ${error.response.status}` , "مشکلی رخ داده است.", "error");
    return Promise.reject(error);
})


// Axios Service
const httpService = (urlAddress, method, data=null, contentType="application/json") => {
    const loginToken = JSON.parse(localStorage.getItem("loginToken"));

    return axios({
        url: api_config.onlineAPI + urlAddress,
        method: method,
        data: data,
        headers: {
            "Authorization": loginToken ? `Bearer ${loginToken.token}` : null,
            "Content-Type": contentType
        }
    })
}

export default httpService;