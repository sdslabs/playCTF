function getImage(imagename) {
  return require(`../assets/${imagename}.svg`);
}

export const sdslabsLogo = getImage("sdslabs-logo");
export const fbLogo = getImage("fb-logo");
export const twitterLogo = getImage("twitter-logo");
export const githubLogo = getImage("github-logo");
export const ctfLogo = getImage("ctf-logo");
export const dropdown = getImage("dropdown");
export const edit = getImage("edit");
export const purge = getImage("purge");
export const play = getImage("play");
export const undeploy = getImage("undeploy");
export const add = getImage("add");
export const preview = getImage("preview");
export const upload = getImage("upload");
export const leaderboard = getImage("leaderboard");
export const search = getImage("search");
export const notifAdded = getImage("notif-added");
export const notifFailed = getImage("notif-failed");
export const mail = getImage("mail");
export const ban = getImage("ban");
export const unban = getImage("unban");
export const userPanel = getImage("userPanel");
export const configFail = getImage("config-fail");
export const configSuccess = getImage("config-success");
