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
    <div class="adChalItem" @click="redirect(challenge.Name)">
      <div class="adChalDetails">
        <span class="adChalName">{{ challenge.Name }}</span>
        <span class="adChalCategory">{{ challenge.Category }}</span>
        <span class="adChalStatus">{{ challenge.Status }}</span>
      </div>
      <div class="adChalStats">
        <span class="adChalPoints">{{ challenge.Points }} Points</span>
        <span class="adChalSolves">{{ challenge.SolvesNumber }} Solves</span>
      </div>
    </div>
  </router-link>
</template>

<script>
export default {
  name: "adminChallCard",
  props: ["challenge"],
};
</script>
