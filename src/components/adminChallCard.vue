<template>
  <router-link :to="'/admin/challenges/' + challenge.id" class="link">
    <div class="challenge" @click="redirect(challenge.id)">
      <div class="details">
        <span class="name">{{ challenge.name }}</span>
        <span class="category">{{ challenge.category }}</span>
        <span class="status">{{ challenge.status }}</span>
      </div>
      <div class="stats">
        <span class="points">{{ challenge.points }} Points</span>
        <span class="solves">{{ challenge.solves }} Solves</span>
      </div>
    </div>
  </router-link>
</template>

<script>
export default {
  name: "adminChallCard",
  props: ["challenge"],
  methods: {
    redirect(id) {
      console.log(id);
    }
  }
};
</script>

<style scoped lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Nunito+Sans:wght@600&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Open+Sans:wght@600&display=swap");
$screenRatio: 1;
.link {
  width: 44%;
  text-decoration: none;
  height: 60px * $screenRatio;
  border-radius: 3px;
  border-left: 5px * $screenRatio solid red;
  padding: 10px 10px;
  box-shadow: 0px 2px 10px rgba(57, 57, 57, 0.1);
  margin-bottom: 12px * $screenRatio;
}
.challenge {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  .details {
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-bottom: 10px * $screenRatio;
    .name {
      font-family: "Nunito Sans";
      font-style: normal;
      font-weight: 600;
      font-size: 16px;
      line-height: 18px;
      color: #191919;
    }

    .category {
      text-align: center;
      vertical-align: middle;
      background: #593c8f;
      border-radius: 2px;
      font-family: "Open Sans";
      font-style: normal;
      font-weight: bold;
      font-size: 12px;
      line-height: 16px;
      color: #ffffff;
      padding: 4px 10px;
      margin-left: 10px;
    }

    .status {
      font-family: "Nunito Sans";
      font-style: normal;
      font-weight: 300;
      font-size: 14px;
      line-height: 14px;
      text-align: right;
      color: #575757;
      margin-left: auto;
    }
  }

  .stats {
    display: flex;
    flex-direction: row;
    font-family: "Nunito Sans";
    font-style: normal;
    font-weight: normal;
    font-size: 16px;
    line-height: 18px;
    color: rgba(57, 57, 57, 0.57);

    .points {
      border-right: 2px solid rgba(57, 57, 57, 0.57);
      padding-right: 5px * $screenRatio;
    }
    .solves {
      padding-left: 5px * $screenRatio;
    }
  }
}
</style>
