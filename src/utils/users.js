export const parseUserData = userData => {
  let allUsers = [];
  userData = userData.filter(el => {
    return el.role === "contestant";
  });
  userData = userData.sort((a, b) => {
    if (a.score === b.score) {
      return a.username > b.username ? 1 : -1;
    } else {
      return b.score - a.score;
    }
  });
  let rank = 0;
  userData.forEach(el => {
    rank++;
    allUsers.push({
      rank: rank,
      username: el.username,
      email: el.email,
      score: el.score,
      status: el.status === 0 ? "Active" : "Banned"
    });
  });
  return allUsers;
};
