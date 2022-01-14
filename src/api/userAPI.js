import axiosInstance from "@/api/axiosInstance.js";

export default {
  async submitFlag(chall_id, flag) {
    let bodyFormData = new FormData();
    bodyFormData.append("chall_id", chall_id);
    bodyFormData.append("flag", flag);
    return await axiosInstance({
      method: "post",
      url: `/api/submit/challenge`,
      data: bodyFormData
    });
  },
  async resetPassword(newPass) {
    let bodyFormData = new FormData();
    bodyFormData.append("new_pass", newPass);
    return await axiosInstance({
      method: "post",
      url: `/auth/reset-password`,
      data: bodyFormData
    });
  }
};
