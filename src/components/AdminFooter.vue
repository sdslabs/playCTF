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
      <img :src="sdslabsLogo" />
      <div class="adminFooterContactInfo">
        <a><img :src="fbLogo"/></a>
        <a><img :src="twitterLogo"/></a>
        <a><img :src="githubLogo"/></a>
      </div>
    </div>
  </div>
</template>

<script>
import {
  sdslabsLogo,
  twitterLogo,
  githubLogo,
  fbLogo
} from "../constants/images";
export default {
  name: "AdminFooter",
  data() {
    return {
      sdslabsLogo,
      twitterLogo,
      githubLogo,
      fbLogo
    };
  }
};
</script>
