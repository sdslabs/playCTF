import { axiosInstance } from "../axiosInstance.js";

export default {
  async submitNotif(title, description) {
    let bodyFormData = new FormData();
    bodyFormData.append("title", title);
    bodyFormData.append("desc", description);
    return await axiosInstance({
      method: "post",
      url: `/api/notification/add`,
      data: bodyFormData
    });
  },

  async getAllNotifs() {
    return await axiosInstance.post(`/api/notification/available`);
  }
};
