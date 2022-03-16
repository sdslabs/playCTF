<template>
  <div class="adminFooter">
    <div class="platformName">
      <p class="adminFooterTitle">playCTF</p>
      <div class="adminFooterContact">
        <p class="adminFooterMessage">
          Wondering how to host a CTF using playCTF?
        </p>
        <a class="adminFooterLink" href="https://chat.sdslabs.co/">Reach us</a>
      </div>
    </div>
    <div class="adminFooterLogos">
      <a href="https://sdslabs.co"><img :src="sdslabsLogo"/></a>
      <div class="adminFooterContactInfo">
        <a href="https://www.facebook.com/SDSLabs"><img :src="fbLogo"/></a>
        <a href="https://twitter.com/sdslabs"><img :src="twitterLogo"/></a>
        <a href="https://github.com/sdslabs/"><img :src="githubLogo"/></a>
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
  name: "Footer",
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
