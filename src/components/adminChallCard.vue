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
      'adminChalLink'
    ]"
  >
    <div class="adminChallItem" @click="redirect(challenge.name)">
      <div class="adminChallDetails">
        <span class="adminChallName">{{ challenge.name }}</span>
        <span class="adminChallStatus">{{ challenge.status }}</span>
      </div>
      <div class="adminChallStats">
        <span class="adminChallCategory">{{ challenge.category }}</span>
        <span class="adminChallPoints">{{ challenge.points }} Points</span>
        <span class="adminChallSolves"
          >{{ challenge.solvesNumber }} Solves</span
        >
      </div>
      <div class="adminTags">
        <div v-for="tag in challenge.tags" :key="tag" class="adminChallTags">
          {{ tag }}
        </div>
        <span class="challengesCheckBox">
          <input
            @click="handleCheckboxClick"
            type="checkbox"
            v-model="checkedChallenge"
          />
        </span>
      </div>
    </div>
  </router-link>
</template>

<script>
import { challStatus } from "@/constants/constants";
export default {
  name: "adminChallCard",
  props: ["challenge", "checkedChallenge"],
  reload: true,
  data() {
    return {
      challStatus
    };
  },
  methods: {
    handleCheckboxClick(e) {
      this.checkedChallenge = !this.checkedChallenge;
      e.stopPropagation();
      if (this.challenge.checked === undefined) {
        this.challenge.checked = true;
      } else {
        this.challenge.checked = !this.challenge.checked;
      }
      this.$parent.reloadFunc();
    }
  }
};
</script>
