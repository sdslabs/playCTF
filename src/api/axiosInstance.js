import { CONFIG } from "@/config/config";
import axios from "axios";
import store from "../store/index";
export const axiosInstance = axios.create({
  headers: {
    "Content-Type": "multipart/form-data",
    Authorization: `Bearer ${store.state.userInfo.token}`
  },
  baseURL: CONFIG.beastRoot
});
