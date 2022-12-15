<template>
  <div class="adminFooter">
    <div class="platformName">
      <p class="adminFooterTitle">BackdoorCTF</p>

    </div>
    <div class="adminFooterLogos">
      <a href="https://infoseciitr.in/">
        <img v-if="this.isDarkTheme == 'true'" :src="infosecLogo" />
        <img v-else :src="infosecLogo" />
      </a>
      <div class="adminFooterContactInfo">
        <a href="https://facebook.com/InfoSecIITR"><img :src="fbLogo"/></a>
        <a href="https://instagram.com/infoseciitr"><img :src="instaLogo"/></a>
        <a href="https://twitter.com/InfoSecIITR"><img :src="twitterLogo"/></a>
        <a href="https://github.com/InfoSecIITR"><img :src="githubLogo"/></a>
        <a href="https://discord.gg/BaZD6sKK"><img :src="discordLogo"/></a>
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
  fbLogo,
  instaLogo,
  discordLogo,
  infosecLogo
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
      fbLogo,
      instaLogo,
      discordLogo,
      infosecLogo
    };
  }
};
</script>
