<template>
  <div class="adminChalInfoContainer">
    <div class="adminChalInfo">
      <div class="infoDetails">
        <span class="name">{{ name }}</span>
        <span class="category">{{ category }}</span>
        <button class="changeButton">
          <img src="@/assets/edit.svg" /><span>Edit</span>
        </button>
        <span
          class="status"
          :class="{
            deployed: status === 'Deployed',
            purged: status === 'Purged',
            undeployed: status === 'Undeployed',
          }"
          >{{ status }}</span
        >
      </div>
      <div class="infoStats">
        <div class="pointSolves">
          <div class="point">
            <span class="value">{{ points }}</span>
            <span class="field">Points</span>
          </div>
          <div class="solves">
            <span class="value">{{ solves }}</span>
            <span class="field">Solves</span>
          </div>
        </div>
        <div v-if="status === 'Deployed'" class="changeChallengeStatus">
          <button class="changeButton" @click="manageChallenge(name,'undeploy')">
            <img src="@/assets/undeploy.svg" /><span>Undeploy</span>
          </button>
          <button class="changeButton" @click="manageChallenge(name,'purge')">
            <img src="@/assets/purge.svg"/><span>Purge</span>
          </button>
        </div>
        <div v-if="status === 'Undeployed'" class="changeChallengeStatus">
          <button class="changeButton" @click="manageChallenge(name,'deploy')">
            <img src="@/assets/play.svg" /><span>Deploy</span>
          </button>
          <button class="changeButton" @click="manageChallenge(name,'purge')">
            <img src="@/assets/purge.svg" /><span>Purge</span>
          </button>
        </div>
        <div v-if="status === 'Purged'" class="changeChallengeStatus">
          <button class="changeButton" @click="manageChallenge(name,'deploy')">
            <img src="@/assets/play.svg" /><span>Deploy</span>
          </button>
        </div>
      </div>
      <div class="aboutChallenge aboutText">
        {{ about }}
      </div>
      <div class="port aboutText">Port : {{ port }}</div>
      <div class="host aboutText">
        {{ `${this.$store.getters.challengeHostUrl}:${this.port}` }}
      </div>
      <button class="changeButton testRun">
        <img src="@/assets/play.svg" /><span>Test Run</span>
      </button>
    </div>
  </div>
</template>
<script>
import axios from "axios";
export default {
  name: "AdminChallenge",
  data() {
    return {
      name: "",
      category: "",
      status: "",
      points: "",
      solves: "",
      about: "",
      port: "",
      loaded: false,
    };
  },
  methods: {
    manageChallenge(name,action){
      var postData = new FormData();
      postData.append("name", name);
      postData.append("action",action)
      axios({
        method: "post",
        url: `${this.$store.getters.hostUrl}/api/manage/challenge/`,
        data: postData,
        headers: { "Content-Type": "multipart/form-data" },
      }).then((response) => {
        if (response.status !== 200) {
          console.log(response.data);
        } else {
          if(action==="purge"){
            this.$router.push('adminChallenges');
          }else{
          this.$router.go();
          }
        }
      });
    }
  },
  mounted() {
    var postData = new FormData();
    postData.append("name", this.$route.params.id);
    axios({
      method: "post",
      url: `${this.$store.getters.hostUrl}/api/info/challenge/info`,
      data: postData,
      headers: { "Content-Type": "multipart/form-data" },
    }).then((response) => {
      if (response.status !== 200) {
        console.log(response.data);
      } else {
        this.loaded = true;
        var data = response.data;
        this.name = data.Name;
        this.category = data.Category;
        this.status = data.Status;
        this.points = data.Points;
        this.solves = data.SolvesNumber;
        this.about = data.Desc;
        if (data.Ports !== null) {
          this.port = data.Ports[0];
        }
      }
    });
  },
};
</script>
