import axiosInstance from "../axiosInstance.js";
import UserService from "./usersAPI";
export default {
  async getChalCategory(tags) {
    let submissionsCategory = {};
    const response = await this.fetchAllChallenges();
    tags.forEach((tag) => {
      let challenges = response.data.filter((el) => {
        return el.category === tag.name;
      });
      let totalChallenges = challenges.length;
      let userSolves = [];
      challenges.forEach((el) => {
        if (el.solves !== null) {
          el.solves.forEach((solve) => {
            if (
              userSolves.findIndex((el) => {
                el.username === solve.username;
              }) === -1
            ) {
              userSolves.push({
                username: solve.username,
                solves: 1,
              });
            } else {
              userSolves[
                userSolves.findIndex((el) => {
                  el.username === solve.username;
                })
              ].solves++;
            }
          });
        }
      });
      userSolves = userSolves.sort((a, b) => {
        return a.solves < b.solves ? 1 : -1;
      });
      submissionsCategory[tag.name] = {};
      submissionsCategory[tag.name].solves = userSolves;
      submissionsCategory[tag.name].total = totalChallenges;
    });
    return submissionsCategory;
  },
  async getChalStats() {
    const response = await this.fetchAllChallenges();
    if (response.status !== 200) {
      return null;
    } else {
      let deployedChal = 0;
      let undeployedChal = 0;
      let purgedChal = 0;
      let maxSolves = 0;
      let leastSolves = Number.MAX_SAFE_INTEGER;
      let leastSolvedChal = { name: "-", solves: -1 };
      let maxSolvedChal = { name: "-", solves: -1 };
      response.data.forEach((el) => {
        switch (el.status) {
          case "Deployed":
            deployedChal++;
            break;
          case "Undeployed":
            undeployedChal++;
            break;
          case "Purged":
            purgedChal++;
        }
        if (el.solvesNumber <= leastSolves) {
          leastSolves = el.solvesNumber;
          leastSolvedChal = {
            name: el.name,
            solves: leastSolves,
          };
        }
        if (el.solvesNumber >= maxSolves) {
          maxSolves = el.solvesNumber;
          maxSolvedChal = {
            name: el.name,
            solves: maxSolves,
          };
        }
      });
      return {
        deployedChal,
        undeployedChal,
        purgedChal,
        leastSolvedChal,
        maxSolvedChal,
      };
    }
  },

  async getChallenges(getUserSolves, username) {
    const response = await this.fetchAllChallenges();
    let challenges = response.data;
    if (getUserSolves) {
      let userData = await await UserService.getUserByUsername(username);
      challenges.forEach((challenge) => {
        if (
          userData.data.challenges.find((el) => {
            return el.id === challenge.id;
          })
        ) {
          challenge.isSolved = true;
        }
      });
    }
    let allTags = [];
    let categoryFilterOptions = [];
    let displayChallenges = [];
    challenges.forEach((el) => {
      allTags.push(el.category);
    });
    allTags = allTags.filter((item, pos) => {
      return allTags.indexOf(item) == pos;
    });
    let id = 2;
    allTags.forEach((el) => {
      categoryFilterOptions.push({ id: id, name: el });
      id++;
    });
    displayChallenges = challenges.sort((a, b) => {
      return a.name > b.name ? 1 : -1;
    });
    return {
      challenges,
      allTags,
      categoryFilterOptions,
      displayChallenges,
    };
  },

  async fetchAllChallenges() {
    return await axiosInstance.post(`/api/info/available`);
  },
  async fetchChallengeByName(name) {
    let postData = new FormData();
    postData.append("name", name);
    return await axiosInstance({
      method: "post",
      url: `/api/info/challenge/info`,
      data: postData,
    });
  },

  async manageChalAction(name, action) {
    let postData = new FormData();
    postData.append("name", name);
    postData.append("action", action);
    return await axiosInstance({
      method: "post",
      url: `/api/manage/challenge/`,
      data: postData,
    });
  },

  async createChallenge(file) {
    let bodyFormData = new FormData();
    bodyFormData.append("file", file);
    const response = await axiosInstance({
      method: "post",
      url: `/api/manage/challenge/upload`,
      data: bodyFormData,
      headers: { "Content-Type": "multipart/form-data" },
    });
    console.log(response)
    return response.data;
  },
};
