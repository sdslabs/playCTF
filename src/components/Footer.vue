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
      <a href="https://sdslabs.co">
        <!-- <img v-if="this.isDarkTheme == 'true'" :src="sdslabsLogoDark" />
        <img v-else :src="sdslabsLogo" /> -->
        <img :src="sdslabsLogoDark" />
      </a>
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
  sdslabsLogoDark,
  twitterLogo,
  githubLogo,
  fbLogo
} from "../constants/images";
import variables from "../styles/main.scss";
console.log(variables.isDarkTheme);
export default {
  name: "Footer",
  data() {
    return {
      isDarkTheme: variables.isDarkTheme,
      sdslabsLogo,
      sdslabsLogoDark,
      twitterLogo,
      githubLogo,
      fbLogo
    };
  }
};
</script>
