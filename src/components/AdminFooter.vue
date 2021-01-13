<template>
  <div class="adminFooter">
    <div class="platformName">
      <p class="adminFooterTitle">playCTF</p>
      <div class="adminFooterContact">
        <p class="adminFooterMessage">
          Wondering how to host a CTF using playCTF?
        </p>
        <a class="adminFooterLink" href="www.sdslabs.co">Reach us</a>
      </div>
    </div>
    <div class="adminFooterLogos">
      <img :src="sdslabslogo" />
      <div class="adminFooterContactInfo">
        <a><img :src="fblogo"/></a>
        <a><img :src="twitterlogo"/></a>
        <a><img :src="githublogo"/></a>
      </div>
    </div>
  </div>
</template>

<script>
import { sdslabslogo,twitterlogo,githublogo,fblogo } from "../constants/images";
export default {
  name: "AdminFooter",
  data() {
    return {
      sdslabslogo,twitterlogo,githublogo,fblogo
    };
  }
};
</script>
