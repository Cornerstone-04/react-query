import axios from "axios";
import { baseURL } from "./baseURL";

const axiosApi = axios.create({
    baseURL: baseURL,
    headers: {
        "Content-Type": "application/json"
    }
})

export default axiosApi