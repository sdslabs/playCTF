<template>
  <router-link
    :to="'/admin/challenges/' + challenge.Name"
    :class="[
      {
        deployedLink: challenge.Status === 'Deployed',
        undeployedLink: challenge.Status === 'Undeployed',
        purgedLink: challenge.Status === 'Purged'
      },
      'adminChalLink'
    ]"
  >
    <div class="adminChallItem" @click="redirect(challenge.Name)">
      <div class="adminChallDetails">
        <span class="adminChallName">{{ challenge.Name }}</span>
        <span class="adminChallCategory">{{ challenge.Category }}</span>
        <span class="adminChallStatus">{{ challenge.Status }}</span>
      </div>
      <div class="adminChallStats">
        <span class="adminChallPoints">{{ challenge.Points }} Points</span>
        <span class="adminChallSolves"
          >{{ challenge.SolvesNumber }} Solves</span
        >
      </div>
    </div>
  </router-link>
</template>

<script>
export default {
  name: "adminChallCard",
  props: ["challenge"]
};
</script>
