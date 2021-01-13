import { axiosInstance } from "../axiosInstance.js";
import moment from "moment";
export default {
  async getSubmissions() {
    const response = await axiosInstance.post(`/api/info/submissions`);
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
  async getSubStats(tags, user) {
    const response = await this.getSubmissions();
    let submissions = {};
    let totalChal = 0;
    tags.forEach(el => {
      submissions[el.name] = 0;
    });
    let subs;
    if (user === null) {
      subs = response;
    } else {
      subs = response.filter(el => {
        return el.username === user;
      });
    }
    subs.forEach(el => {
      submissions[el.category]++;
      totalChal++;
    });
    return { totalChal: totalChal, category: submissions };
  },

  async getUserSubs(username) {
    const response = await this.getSubmissions();
    let data = response.filter(el => {
      return el.username === username;
    });
    return data;
  }
};
