<template>
  <div class="userContainer">
    <div class="user">
      <div class="userDetails">
        <div class="userName">
          <div class="name">{{ userDetails.name }}</div>
          <img src="@/assets/mail.svg" class="mailImg" />
          <div class="contact">Contact</div>
        </div>
        <div class="rankScore">
          <div class="rank">
            <span class="value">{{ userDetails.rank }}</span>
            <span class="field">Rank</span>
          </div>
          <div class="score">
            <span class="value">{{ userDetails.score }}</span>
            <span class="field">Score</span>
          </div>
        </div>
      </div>
      <div class="userStatus" v-if="userDetails.active">
        <div class="status unbanned">Active</div>
        <button class="banButton">
          <img src="@/assets/ban.svg" class="banImg" />
          <div class="banText">Ban Player</div>
        </button>
      </div>
      <div class="userStatus" v-else>
        <div class="status banned">Banned</div>
        <button class="banButton">
          <img src="@/assets/unban.svg" class="banImg" />
          <div class="banText">Remove Ban</div>
        </button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "AdminUser",
  data() {
    return {
      userDetails: {
        name: "Pirates",
        rank: 1,
        score: 500,
        active: true
      }
    };
  },
  methods: {}
};
</script>
<style scoped lang="scss">
@import "@/assets/scss/adminUser.scss";
</style>
