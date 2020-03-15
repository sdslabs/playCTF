<template>
  <div class="challCard">
    <div class="firstLine">
      <div class="challName">{{ challName }}</div>
      <div class="tag">{{ tag }}</div>
      <div v-if="marked" class="marked">
        <img src="marked.svg" />
        <p class="review">Marked for review</p>
      </div>
      <div v-else class="unmarked">
        <img src="unmarked.svg" />
        <p class="review">Mark for review</p>
      </div>
    </div>
    <div class="solves">{{ challPoints }} | {{ challSolves }}</div>
    <div class="challDescription">{{ challDescription }}</div>
    <form class="flag" action="#">
      <input type="text" name="flag" placeholder="Start typing flag here..." />
      <input type="submit" value="Submit Flag" />
    </form>
  </div>
</template>

<script>
export default {
  name: "ChallCard",
  data() {
    return {
      chall: [
        {
          challName: "Mindbl0wn",
          challPoints: "115"
        }
      ]
    };
  }
};
</script>
