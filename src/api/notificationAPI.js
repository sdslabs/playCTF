import axiosInstance from "@/api/axiosInstance.js";

export default {
  async getNotifications() {
    let response = await axiosInstance.get(`/api/notification/available`);
    return response.data;
  }
};
