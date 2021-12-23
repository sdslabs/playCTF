import ChalService from "@/api/admin/challengesAPI";
import UserService from "@/api/admin/usersAPI";

export const getChallenges = async (getUserSolves, username) => {
  let challenges = await (await ChalService.fetchAllChallenges()).data;
  if (getUserSolves) {
    let userData = await UserService.getUserByUsername(username);
    challenges.forEach(challenge => {
      if (
        userData.data.challenges.find(el => {
          return el.id === challenge.id;
        })
      ) {
        challenge.isSolved = true;
      }
    });
  }
  let allTags = [];
  let tagFilterOptions = [];
  let displayChallenges = [];
  challenges.forEach(el => {
    allTags.push(el.tag);
  });

  // removing all duplicate tags
  allTags = allTags.filter((item, pos) => {
    return allTags.indexOf(item) == pos;
  });

  let id = 1;
  allTags.forEach(el => {
    tagFilterOptions.push({ id: id, name: el });
    id++;
  });
  displayChallenges = challenges.sort((a, b) => {
    return a.name > b.name ? 1 : -1;
  });
  return {
    challenges,
    allTags,
    tagFilterOptions,
    displayChallenges
  };
};

export const getChalStats = async () => {
  const response = await ChalService.fetchAllChallenges();
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
    response.data.forEach(el => {
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
          solves: leastSolves
        };
      }
      if (el.solvesNumber >= maxSolves) {
        maxSolves = el.solvesNumber;
        maxSolvedChal = {
          name: el.name,
          solves: maxSolves
        };
      }
    });
    return {
      deployedChal,
      undeployedChal,
      purgedChal,
      leastSolvedChal,
      maxSolvedChal
    };
  }
};

export const getChalCategory = async tags => {
  let submissionsCategory = {};
  const response = await ChalService.fetchAllChallenges();
  tags.forEach(tag => {
    let challenges = response.data.filter(challenge => {
      return challenge.tag === tag.name;
    });
    let totalChallenges = challenges.length;
    let userSolves = [];
    challenges.forEach(el => {
      if (el.solves !== null) {
        el.solves.forEach(solve => {
          if (
            userSolves.findIndex(el => {
              el.username === solve.username;
            }) === -1
          ) {
            userSolves.push({
              username: solve.username,
              solves: 1
            });
          } else {
            userSolves[
              userSolves.findIndex(el => {
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
};
