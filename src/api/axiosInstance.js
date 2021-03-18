import { CONFIG } from "@/config/config";
import axios from "axios";
import store from "../store/index";
import router from "../router/index";
const axiosInstance = axios.create({
  headers: {
    "Content-Type": "multipart/form-data"
  },
  baseURL: CONFIG.beastRoot
});

axiosInstance.interceptors.request.use(
  function(config) {
    const token = store.state.userInfo.token;
    if (token) {
      config.headers["Authorization"] = "Bearer " + token;
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
    let ignoreErrorPagesPath = ["/auth/login", "/auth/register"];
    let catchInternalPagesPath = ["/api/manage/challenge/upload"];
    if (ignoreErrorPagesPath.includes(error.response.config.url)) {
      return error;
    } else if (catchInternalPagesPath.includes(error.response.config.url)) {
      return Promise.reject(error);
    } else if (error.response.config.url.includes("/api/info/logo")) {
      return error;
    } else {
      if (!error.response) {
        router.push("/error/networkerror");
      } else {
        switch (error.response.status) {
          case 401:
            router.push("/error/401");
            break;
          case 404:
            router.push("/error/404");
            break;
          default:
            router.push("/error/500");
            break;
        }
      }

      Promise.reject(error);
    }
  }
);
export default axiosInstance;
