<template>
  <router-link
    :to="'/admin/challenges/' + challenge.name"
    :class="[
      {
        deployedLink: challenge.status === 'Deployed',
        undeployedLink: challenge.status === 'Undeployed',
        purgedLink: challenge.status === 'Purged',
        inProgressLink:
          challenge.status === 'Queued' ||
          challenge.status === 'Building' ||
          challenge.status === 'Deploying' ||
          challenge.status === 'Commiting' ||
          challenge.status === 'Staging'
      },
      'adminChalLink'
    ]"
  >
    <div class="adminChallItem" @click="redirect(challenge.name)">
      <div class="adminChallDetails">
        <span class="adminChallName">{{ challenge.name }}</span>
        <span class="adminChallStatus">{{ challenge.status }}</span>
      </div>
      <div class="adminTags">
        <span
          v-for="tag in challenge.tags"
          :key="tag"
          class="adminChallCategory"
          >{{ tag }}</span
        >
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
