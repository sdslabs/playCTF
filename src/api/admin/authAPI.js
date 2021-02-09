import { axiosInstance } from "../axiosInstance.js";
import store from "../loginToken.js";
import router from "../../router/index.js";

export default {
    async loginUser(username, password) {
        let bodyFormData = new FormData();
        bodyFormData.append("username", username);
        bodyFormData.append("password", password);
        let response = await axiosInstance({
            method: "post",
            url: `/auth/login`,
            data: bodyFormData
        });
        return Promise.resolve(response);
    },

    async loggedInUser(username, password) {
        const response = await this.loginUser(username, password);
        if (response.status === 200) {
            store.commit('update', response.data.token);
            router.push("/");
        }
        else {
            alert("Login attempt failed: " + response.data.message);
        }
        return
    },

    async registerUser(name, username, email, password, ssh) {
        let bodyFormData = new FormData();
        bodyFormData.append("name", name);
        bodyFormData.append("username", username);
        bodyFormData.append("password", password);
        bodyFormData.append("email", email);
        bodyFormData.append("ssh-key", ssh);
        let response = await axiosInstance({
            method: "post",
            url: `/auth/register`,
            data: bodyFormData
        });
        return Promise.resolve(response);
    },

    async registeredUser(name, username, email, password, ssh) {
        const response = await this.registerUser(name, username, email, password, ssh);
        if (response.status === 200) {
            store.commit('update', response.data.token);
            router.push("/");
        }
        else {
            alert("Registration attempt failed: " + response.data.message);
        }
        return
    }
};
