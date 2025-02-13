import axiosInstance from "../axiosInstance.js";
import moment from "moment";
export default {
  async getSubmissions() {
    const response = await axiosInstance.get(`/api/info/submissions`);
    let submissions = [];
    response.data.forEach(element => {
      // solvedTime is solved time is given format
      element.solvedTime = moment(element.solvedAt).format(
        "HH:mm:ss; MMMM Do, YYYY"
      );
      submissions.push(element);
    });
    return submissions;
  },

  // Group submissions by username for efficient processing
  groupSubmissionsByUsers(submissions, usernames) {
    const userSubmissions = {};
    usernames.forEach(username => {
      userSubmissions[username] = submissions.filter(sub => sub.username === username);
    });
    return userSubmissions;
  },

  async fetchAsCSV() {
    return await axiosInstance({
      method: "get",
      responseType: "blob",
      url: `/api/info/submissions?format=csv`
    });
  }
};
