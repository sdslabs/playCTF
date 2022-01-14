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
  },

  async fetchAsCSV(sortFilter, statusFilter) {
    if (sortFilter == "User Name") {
      sortFilter = "username";
    } else if (sortFilter == "Score") {
      sortFilter = "score";
    }

    if (statusFilter == "Active") {
      statusFilter = "active";
    } else if (statusFilter == "Banned") {
      statusFilter = "banned";
    }

    return await axiosInstance({
      method: "get",
      responseType: "blob",
      url: `/api/info/users?sort=${sortFilter}&filter=${statusFilter}&format=csv`
    });
  }
};
