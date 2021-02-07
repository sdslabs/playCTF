import { axiosInstance } from "../axiosInstance.js";
import Vuex from "vuex";
import { resolve } from "core-js/fn/promise";

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
        console.log(response.status);
        if (response.status === 200) {
            const store = new Vuex.Store({
                state: response.data.token,
                strict: true,
            });
            console.log(store.state);
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
        bodyFormData.append("email", email);
        bodyFormData.append("password", password);
        bodyFormData.append("sshKey", ssh);
        let response = await axiosInstance({
            method: "post",
            url: `/auth/login`,
            data: bodyFormData
        });
        return Promise.resolve(response);
    },

    async registeredUser(name, username, email, password, ssh) {
        const response = await this.loginUser(name, username, email, password, ssh);
        console.log(response.status);
        if (response.status === 200) {
            alert(response.data.message);
        }
        else {
            alert("Registration attempt failed: " + response.data.message);
        }
        return
    }
};
