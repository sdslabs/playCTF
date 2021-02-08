import { axiosInstance } from "./axiosInstance.js";

export default {
  async getConfigs() {
    let response = await axiosInstance.get(`api/info/competitionInfo`);
    return response.data;
  }
};
