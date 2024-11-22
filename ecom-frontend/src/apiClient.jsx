import axios from "axios";
let BASE_URL = import.meta.env.VITE_BASE_URL

const apiClient = axios.create({
    baseURL:BASE_URL
})
export default apiClient