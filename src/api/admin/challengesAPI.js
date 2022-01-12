import UserService from "./usersAPI";
import axiosInstance from "../axiosInstance.js";
export default {
  async fetchAllChallenges() {
    return await axiosInstance.get(`/api/info/challenges`);
  },
  async fetchChallengeByName(name) {
    return await axiosInstance({
      method: "get",
      url: `/api/info/challenge/${name}`
      // data: postData
    });
  },
  async manageChalAction(name, action) {
    let postData = new FormData();
    postData.append("name", name);
    postData.append("action", action);
    return await axiosInstance({
      method: "post",
      url: `/api/manage/challenge/`,
      data: postData
    });
  },

  async manageMultipleChalAction(name, action) {
    let postData = new FormData();
    postData.append("names", name);
    postData.append("action", action);
    return await axiosInstance({
      method: "post",
      url: `/api/manage/challenge/multiple/`,
      data: postData
    });
  },

  async createChallenge(file) {
    let bodyFormData = new FormData();
    bodyFormData.append("file", file);
    const response = await axiosInstance({
      method: "post",
      url: `/api/manage/challenge/upload`,
      data: bodyFormData,
      headers: { "Content-Type": "multipart/form-data" }
    });
    return response.data;
  }
};
