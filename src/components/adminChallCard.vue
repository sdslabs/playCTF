<template>
  <router-link
    :to="'/admin/challenges/' + challenge.name"
    :class="[
      {
        deployedLink: challenge.status === 'Deployed',
        undeployedLink: challenge.status === 'Undeployed',
        purgedLink: challenge.status === 'Purged'
      },
      'adminChalLink'
    ]"
  >
    <div class="adminChallItem" @click="redirect(challenge.name)">
      <div class="adminChallDetails">
        <span class="adminChallName">{{ challenge.name }}</span>
        <span class="adminChallCategory">{{ challenge.category }}</span>
        <span class="adminChallStatus">{{ challenge.status }}</span>
      </div>
      <div class="adminChallStats">
        <span class="adminChallPoints">{{ challenge.points }} Points</span>
        <span class="adminChallSolves"
          >{{ challenge.solvesNumber }} Solves</span
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
