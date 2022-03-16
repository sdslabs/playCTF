import axiosInstance from "../axiosInstance.js";
import router from "../../router/index.js";

export default {
  async loginUser(username, password) {
    let bodyFormData = new FormData();
    bodyFormData.append("username", username);
    bodyFormData.append("password", password);
    const response = await axiosInstance({
      method: "post",
      url: `/auth/login`,
      data: bodyFormData
    });
    return response;
  },

  async loggedInUser(username, password) {
    const response = await this.loginUser(username, password);
    if (response.status === 200) {
      const { token, role } = response.data;
      var userInfo = {
        userName: username,
        Score: "",
        token: token,
        login: true,
        access: true,
        role: role
      };
      localStorage.setItem("userInfo", JSON.stringify(userInfo));
      if (response.data.role === "admin") {
        router.push("/admin/");
      } else {
        router.push("/challenges");
      }
    } else {
      return response.data.message;
    }
  },

  async registerUser(name, username, email, password) {
    let bodyFormData = new FormData();
    bodyFormData.append("name", name);
    bodyFormData.append("username", username);
    bodyFormData.append("password", password);
    bodyFormData.append("email", email);
    const response = await axiosInstance({
      method: "post",
      url: `/auth/register`,
      data: bodyFormData
    });
<<<<<<< HEAD
    return response;
=======
    return response.response;
>>>>>>> 4d9a53ef9fcda03d3f33ba3d4e1e20d454405430
  },

  async resetPass(newPassword) {
    let bodyFormData = new FormData();
    bodyFormData.append("new_pass", newPassword);
    try {
      let response = await axiosInstance({
        method: "post",
        url: `/auth/reset-password`,
        data: bodyFormData
      });
      return Promise.resolve(response);
    } catch (err) {
      return err;
    }
  },

  async resetPassword(newPassword) {
    const response = await this.resetPass(newPassword);
    if (response.status === 200) {
      return true;
    }
    return false;
  },

  getUserInfo() {
    const userInfo = localStorage.getItem("userInfo");
    return JSON.parse(userInfo);
  },

  logout() {
    localStorage.removeItem("userInfo");
  }
};
