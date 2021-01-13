<template>
  <div class="mainAdminContainer">
    <div class="heading">
      CONFIGURE
      <button class="preview-button">
        <div class="preview">
          <img :src="preview" />
          Landing Page
        </div>
      </button>
    </div>
    <div class="form">
      <p class="fields">Competition Name<span class="important">*</span></p>
      <input v-model="title" placeholder="noobCTF" class="title" />
      <p class="fields">Content</p>
      <p class="subfields">About<span class="important">*</span></p>
      <textarea
        v-model="description"
        placeholder="Get ready for action."
      ></textarea>
      <p class="subfields">Prizes<span class="important">*</span></p>
      <textarea
        v-model="description"
        placeholder="Prizes worth Rs. 10000"
      ></textarea>
      <p class="fields">
        Date and Time Settings <span class="important">*</span>
      </p>
      <p class="subfields">Time Zone</p>
      <input
        v-model="title"
        placeholder="UTC + 5:30; Indian Standard Time (IST)"
        class="title"
      />
      <div class="time">
        <div class="timeSub">
          <div>
            <p class="subfields">Start date</p>
            <input
              v-model="title"
              placeholder="UTC + 5:30; Indian Standard Time (IST)"
              class="title"
              type="date"
            />
          </div>
          <div>
            <p class="subfields">Start time (24 hr format)</p>
            <input
              v-model="title"
              placeholder="UTC + 5:30; Indian Standard Time (IST)"
              class="title"
              type="time"
            />
          </div>
        </div>
        <div class="timeSub">
          <div>
            <p class="subfields">End date</p>
            <input
              v-model="title"
              placeholder="UTC + 5:30; Indian Standard Time (IST)"
              class="title"
              type="date"
            />
          </div>
          <div>
            <p class="subfields">End time (24 hr format)</p>
            <input
              v-model="title"
              placeholder="UTC + 5:30; Indian Standard Time (IST)"
              class="title"
              type="time"
            />
          </div>
        </div>
      </div>
      <p class="subfields">Competition logo</p>
      <!-- eslint-disable-next-line -->
      <input type="file" id="actual-button" hidden />
      <label for="actual-button"> <img :src="upload" />Upload file </label>
      <p class="subfields">Themes</p>
      <div class="themes">
        <div class="sub-themes">
          <button class="block"></button>
          <p class="theme-name">Default</p>
        </div>
        <div class="sub-themes">
          <button class="block"></button>
          <p class="theme-name">Red</p>
        </div>
        <div class="sub-themes">
          <button class="block"></button>
          <p class="theme-name">Blue</p>
        </div>
        <div class="sub-themes">
          <button class="block"></button>
          <p class="theme-name">Dark</p>
        </div>
        <div class="sub-themes">
          <button class="block"></button>
          <p class="theme-name">Green</p>
        </div>
      </div>
      <button class="submitButton">Submit</button>
    </div>
  </div>
</template>
<script>
import { preview, upload } from "../constants/images";
export default {
  name: "AdminConfigure",
  data() {
    return {
      preview,
      upload
    };
  }
};
</script>

<style scoped lang="scss">
@import "@/assets/scss/adminConfigure.scss";
</style>
