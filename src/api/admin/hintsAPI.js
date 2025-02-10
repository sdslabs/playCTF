import axiosInstance from "../axiosInstance.js";

export default {
  async getHintStatus(hintId) {
    return await axiosInstance({
      method: "get",
      url: `/api/info/hint/${hintId}`
    });
  },

  async takeHint(hintId) {
    return await axiosInstance({
      method: "post",
      url: `/api/info/hint/${hintId}`
    });
  }
};
