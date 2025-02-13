import UserService from "./usersAPI";
import axiosInstance from "../axiosInstance.js";
import { cacheRequest } from "@/utils/cacheUtils";

export default {
  async fetchAllChallenges() {
    try {
      const request = new Request(`${axiosInstance.defaults.baseURL}/api/info/challenges`);
      const response = await cacheRequest(request);
      const data = await response.json();
      return { data };
    } catch (error) {
      console.error('Cache fetch failed, falling back to direct API call:', error);
      // Fall back to axios which already handles auth
      return await axiosInstance.get(`/api/info/challenges`);
    }
  },
  async fetchChallengeByName(name) {
    try {
      return await axiosInstance({
        method: "get",
        url: `/api/info/challenge/${name}`
        // data: postData
      });
    } catch (error) {
      console.error('Failed to fetch challenge by name:', error);
      throw error;
    }
  },
  async fetchAllTags() {
    try {
      return await axiosInstance.get(`/api/info/tags`);
    } catch (error) {
      console.error('Failed to fetch all tags:', error);
      throw error;
    }
  },
  async manageChalAction(name, action) {
    try {
      let postData = new FormData();
      postData.append("name", name);
      postData.append("action", action);
      return await axiosInstance({
        method: "post",
        url: `/api/manage/challenge/`,
        data: postData
      });
    } catch (error) {
      console.error('Failed to manage challenge action:', error);
      throw error;
    }
  },

  async manageMultipleChalAction(name, action) {
    try {
      let postData = new FormData();
      postData.append("names", name);
      postData.append("action", action);
      return await axiosInstance({
        method: "post",
        url: `/api/manage/challenge/multiple/`,
        data: postData
      });
    } catch (error) {
      console.error('Failed to manage multiple challenge action:', error);
      throw error;
    }
  },

  async createChallenge(file) {
    try {
      let bodyFormData = new FormData();
      bodyFormData.append("file", file);
      const response = await axiosInstance({
        method: "post",
        url: `/api/manage/challenge/upload`,
        data: bodyFormData,
        headers: { "Content-Type": "multipart/form-data" }
      });
      return response.data;
    } catch (error) {
      console.error('Failed to create challenge:', error);
      throw error;
    }
  }
};
