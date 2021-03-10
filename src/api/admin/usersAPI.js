import axiosInstance from "../axiosInstance.js";

export default {
  async getUsers() {
    let allUsers = [];
    const response = await axiosInstance.get(`/api/info/users`);
    let users = response.data;
    users = users.filter((el) => {
      return el.role === "contestant";
    });
    users = users.sort((a, b) => {
      if (a.score === b.score) {
        return a.username > b.username ? 1 : -1;
      } else {
        return b.score - a.score;
      }
    });
    let rank = 0;
    users.forEach((el) => {
      rank++;
      allUsers.push({
        rank: rank,
        username: el.username,
        email: el.email,
        score: el.score,
        status: el.status === 0 ? "Active" : "Banned",
      });
    });
    return allUsers;
  },

  async getUserByUsername(username) {
    return await axiosInstance({
      method: "get",
      url: `/api/info/user/${username}`,
    });
  },
  async getUserStats() {
    return await axiosInstance.get(`/api/admin/statistics`);
  },

  async manageUser(userId, action) {
    return await axiosInstance({
      method: "post",
      url: `/api/admin/users/${action}/${userId}`,
    });
  },
};
