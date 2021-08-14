import axiosInstance from "../axiosInstance.js";
import store from "../../store/index";
import router from "../../router/index.js";

export default {
  async loginUser(username, password) {
    let bodyFormData = new FormData();
    bodyFormData.append("username", username);
    bodyFormData.append("password", password);
    return await axiosInstance({
      method: "post",
      url: `/auth/login`,
      data: bodyFormData
    }).catch(err => {
      // console.log(err);
    });
  },

  async loggedInUser(username, password) {
    const response = await this.loginUser(username, password);
    if (response.status === 200) {
      const { token, role } = response.data;
      store.commit("updateUserAuth", { username, token, role });
      if (response.data.role === "admin") {
        router.push("/admin/");
      } else {
        router.push("/about");
      }
    } else {
      if (response.message.includes("400")) {
        return 400;
      } else if (response.message.includes("401")) {
        return 401;
      } else if (response.message.includes("403")) {
        return 403;
      }
    }
  },

  async registerUser(name, username, college, email, password, futureUpdates) {
    let bodyFormData = new FormData();
    bodyFormData.append("name", name);
    bodyFormData.append("username", username);
    bodyFormData.append("college", college);
    bodyFormData.append("password", password);
    bodyFormData.append("email", email);
    bodyFormData.append("subscribe", futureUpdates);
    return await axiosInstance({
      method: "post",
      url: `/auth/register`,
      data: bodyFormData
    }).catch(err => {
      // console.log(err);
    });
  },

  async registeredUser(name, username, college, email, password, futureUpdates) {
    const response = await this.registerUser(name, username, college, email, password, futureUpdates);
    // console.log(response);
    if (response.status === 200) {
      return 200;
    } else {
      // console.log(response.message);
      // console.log(response);
      if (response.message.includes("400")) {
        return 400;
      } else if (response.message.includes("406")) {
        return 401;
      } else {
        return 403;
      }
    }
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
  }
};
