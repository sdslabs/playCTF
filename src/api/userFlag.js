import axiosInstance from "./axiosInstance.js";

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
  }
};
