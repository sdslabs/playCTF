<template>
  <div class="challengeContainer">
    <div class="challengeInfo">
      <div class="details">
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
            undeployed: status === 'Undeployed'
          }"
          >{{ status }}</span
        >
      </div>
      <div class="stats">
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
          <button class="changeButton">
            <img src="@/assets/undeploy.svg" /><span>Undeploy</span>
          </button>
          <button class="changeButton">
            <img src="@/assets/purge.svg" /><span>Purge</span>
          </button>
        </div>
        <div v-if="status === 'Undeployed'" class="changeChallengeStatus">
          <button class="changeButton">
            <img src="@/assets/play.svg" /><span>Deploy</span>
          </button>
          <button class="changeButton">
            <img src="@/assets/purge.svg" /><span>Purge</span>
          </button>
        </div>
        <div v-if="status === 'Purged'" class="changeChallengeStatus">
          <button class="changeButton">
            <img src="@/assets/play.svg" /><span>Deploy</span>
          </button>
        </div>
      </div>
      <div class="aboutChallenge aboutText">
        {{ about }}
      </div>
      <div class="port aboutText">Port : {{ port }}</div>
      <div class="host aboutText">{{ host }}</div>
      <button class="changeButton testRun">
        <img src="@/assets/play.svg" /><span>Test Run</span>
      </button>
    </div>
  </div>
</template>
<script>
export default {
  name: "AdminChallenge",
  data() {
    return {
      name: "Mindbl0wn",
      category: "PWN",
      status: "Purged",
      points: 25,
      solves: 320,
      about: `Mindbl0wn has a safe repository of files. The filename is signed using
          mindbl0wn's private key (using the PKCS-1 standard). Anyone willing to
          read a file, has to ask for a signature fro mindbl0wn. But mindbl0wn
          is currently unavailable. Can you still access a file named "flag" on
          mindbl0wn's repository?`,
      port: 11003,
      host: "http://challanges.beast.com:11003"
    };
  }
};
</script>
