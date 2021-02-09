import { axiosInstance } from "../axiosInstance.js";

export default {
  async updateConfigs(configs) {
    let bodyFormData = new FormData();
    bodyFormData.append("name", configs.name);
    bodyFormData.append("about", configs.about);
    bodyFormData.append("prizes", configs.prizes);
    bodyFormData.append("starting_time", configs.startingTime);
    bodyFormData.append("ending_time", configs.endingTime);
    bodyFormData.append("timezone", configs.timezone);
    return await axiosInstance({
      method: "post",
      url: `/api/config/competition-info`,
      data: bodyFormData
    });
  },
  async getConfigs() {
    return await axiosInstance.get(`/api/info/competition-info`);
  }
};
