import axiosInstance from "../axiosInstance.js";
import { parseUserData } from "@/utils/users.js";
export default {
  async getUsers() {
    const fetchedUserData = await axiosInstance.get(`/api/info/users`);
    return parseUserData(fetchedUserData.data);
  },

  async getUserByUsername(username) {
    return await axiosInstance({
      method: "get",
      url: `/api/info/user/${username}`
    });
  },

  async getUserStats() {
    return await axiosInstance.get(`/api/admin/statistics`);
  },

  async manageUser(userId, action) {
    return await axiosInstance({
      method: "post",
      url: `/api/admin/users/${action}/${userId}`
    });
  }
};
