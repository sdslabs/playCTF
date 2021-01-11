import { CONFIG } from "@/config/config";
import axios from "axios";

export const axiosInstance = axios.create({
  headers: { "Content-Type": "multipart/form-data" },
  baseURL: CONFIG.beastRoot
});
