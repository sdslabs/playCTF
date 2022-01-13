import SubmissionService from "@/api/admin/submissionsAPI";

export const getSubStats = async (tags, user) => {
  const response = await SubmissionService.getSubmissions();
  let submissions = {};
  let totalChal = 0;
  tags.forEach(tag => {
    submissions[tag.name] = 0;
  });
  let subs;
  if (user === null) {
    subs = response;
  } else {
    subs = response.filter(sub => {
      return sub.username === user;
    });
  }
  subs.forEach(sub => {
    sub.tags.forEach(tag => {
      submissions[tag]++;
      totalChal++;
    });
  });
  return { totalChal: totalChal, category: submissions };
};
