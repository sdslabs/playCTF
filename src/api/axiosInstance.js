import { CONFIG } from "@/config/config";
import axios from "axios";
import router from "../router/index";
import LoginUser from "../api/admin/authAPI.js";
const axiosInstance = axios.create({
  headers: {
    "Content-Type": "multipart/form-data"
  },
  baseURL: CONFIG.beastRoot
});

axiosInstance.interceptors.request.use(
  function(config) {
    let userInfo = LoginUser.getUserInfo();
    if (userInfo && userInfo.token) {
      config.headers["Authorization"] = "Bearer " + userInfo.token;
    }
    return config;
  },
  function(error) {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  function(response) {
    return response;
  },
  function(error) {
    let ignoreErrorPagesPath = [
      "/auth/login",
      "/auth/register",
      "/api/submit/challenge"
    ];
    if (!error.response) {
      router.push("/error/networkerror");
    } else if (ignoreErrorPagesPath.includes(error.response.config.url)) {
      return error.response;
    } else if (error.response.config.url.includes("/api/info/logo")) {
      return error;
    } else {
      switch (error.response.status) {
        case 401:
          router.push("/error/401");
          break;
        case 404:
          router.push("/error/404");
          break;
        default:
          return error;
      }

      Promise.reject(error);
    }
  }
);
export default axiosInstance;
