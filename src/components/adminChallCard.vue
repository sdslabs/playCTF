<template>
  <router-link
    :to="'/admin/challenges/' + challenge.name"
    :class="[
      {
        deployedLink: challenge.status === 'Deployed',
        undeployedLink: challenge.status === 'Undeployed',
        purgedLink: challenge.status === 'Purged',
        inProgressLink: challStatus.inProgressStatus.includes(challenge.status)
      },
      'adminChalLink',
    ]"
  >
    <div class="adminChallItem" @click="redirect(challenge.name)">
      <div class="adminChallDetails">
        <span class="adminChallName">{{ challenge.name }}</span>
        <span class="adminChallStatus">{{ challenge.status }}</span>
      </div>
      <div class="adminChallStats">
        <span class="adminChallPoints">{{ challenge.points }} Points</span>
        <span class="adminChallSolves"
          >{{ challenge.solvesNumber }} Solves</span
        >
        {{ challenge.checked }}
        <span class="challengesCheckBox"
          ><input @click="handleCheckboxClick" type="checkbox"
        /></span>
      </div>
      <div class="adminTags">
        <div
          v-for="tag in challenge.tags"
          :key="tag"
          class="adminChallCategory"
        >
          {{ tag }}
        </div>
      </div>
    </div>
  </router-link>
</template>

<script>
import { challStatus } from "../constants/constants";
export default {
  name: "adminChallCard",
  props: ["challenge"],
  data() {
    return {
      challStatus
    };
  },
  methods: {
    handleCheckboxClick(e) {
      e.stopPropagation()
      //console.log(e)
      if (this.challenge.checked === undefined) {
        this.challenge.checked = true
      } else {
        this.challenge.checked = !this.challenge.checked
      }

      this.$parent.canPurge()
      this.$parent.canDeploy()
      this.$parent.canUndeploy()
    },
  },
};
</script>
