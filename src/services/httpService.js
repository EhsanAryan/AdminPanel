import axios from "axios";
import api_config from "./api_config.json"


const httpService = (urlAddress, method, data=null) => {
    const loginToken = JSON.parse(localStorage.getItem("loginToken"));

    return axios({
        url: api_config.onlineAPI + urlAddress,
        method: method,
        data: data,
        headers: {
            "Authorization": loginToken ? `Bearer ${loginToken.token}` : null,
            "Content-Type": "application/json"
        }
    })
}

export default httpService;