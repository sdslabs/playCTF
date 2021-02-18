import axiosInstance from "./axiosInstance.js";

export default {
  async getNotifications() {
    let response = await axiosInstance.post(`/api/notification/available`);
    return response.data;
  }
};
