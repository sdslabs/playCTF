import axiosInstance from "../axiosInstance.js";

export default {
  async sendOTP(email) {
    let bodyFormData = new FormData();
    bodyFormData.append("email", email);
    
    const response = await axiosInstance({
      method: "post",
      url: `/auth/send-otp`,
      data: bodyFormData
    });

    return response;
},

async verifyOTP(email,otp) {
    let bodyFormData = new FormData();
    bodyFormData.append("email", email);
    bodyFormData.append("otp", otp);
    
    const response = await axiosInstance({
      method: "post",
      url: `/auth/verify-otp`,
      data: bodyFormData
    });

    return response;
}

};
