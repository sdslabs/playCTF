import axiosInstance from "../axiosInstance.js";
import moment from "moment";
export default {
  async getSubmissions() {
    const response = await axiosInstance.get(`/api/info/submissions`);
    let submissions = [];
    response.data.forEach(element => {
      // solvedTime is solved time is given format
      element.solvedTime = moment(element.solvedAt).format(
        "h:mm:ss; MMMM Do, YYYY"
      );
      submissions.push(element);
    });
    return submissions;
  },
  async getUserSubs(username) {
    const response = await this.getSubmissions();
    let data = response.filter(el => {
      return el.username === username;
    });
    return data;
  }
};
