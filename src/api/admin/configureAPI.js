import axiosInstance from "../axiosInstance.js";

export default {
  async updateConfigs(configs) {
    let bodyFormData = new FormData();
    bodyFormData.append("name", configs.name);
    bodyFormData.append("about", configs.about);
    bodyFormData.append("prizes", configs.prizes);
    bodyFormData.append("starting_time", configs.startingTime);
    bodyFormData.append("ending_time", configs.endingTime);
    bodyFormData.append("timezone", configs.timezone);
    bodyFormData.append("logo", configs.logo);
    return await axiosInstance({
      method: "post",
      url: `/api/config/competition-info`,
      data: bodyFormData,
      headers: { "Content-Type": "multipart/form-data" }
    });
  },
  async getConfigs() {
    return await axiosInstance.get(`/api/info/competition-info`);
  },

  async getLogo(imgUrl) {
    return await axiosInstance.get(imgUrl);
  }
};
