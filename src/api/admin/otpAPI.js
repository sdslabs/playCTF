import axiosInstance from "../axiosInstance.js";

export default {
  async sendOTP(email) {
    let bodyFormData = new FormData();
    bodyFormData.append("email", email);

    try {      
      const response = await axiosInstance({
        method: "post",
        url: `/auth/send-otp`,
        data: bodyFormData
      });
  
      return response;
    } catch (error) {
      throw error;
    }
  },

  async verifyOTP(email, otp) {
    let bodyFormData = new FormData();
    bodyFormData.append("email", email);
    bodyFormData.append("otp", otp);

    try {
      const response = await axiosInstance({
        method: "post",
        url: `/auth/verify-otp`,
        data: bodyFormData,
      });

      return response;
    } catch (error) {
      throw error;
    }
  },

  async verifyOTPForForget(email, otp) {
    let bodyFormData = new FormData();
    bodyFormData.append("email", email);
    bodyFormData.append("otp", otp);
    
    try {
      const response = await axiosInstance({
        method: "post",
        url: `/auth/verify-otp-forget`,
        data: bodyFormData,
      });
      return response;
    } catch (error) {
      throw error;
    }
  }
};
