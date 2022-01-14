<template>
  <div class="clickToAddListContainer">
    <transition name="fade" appear v-for="(item, index) in list" :key="index">
      <div class="clickToAddListItem">
        <input
          class="editChallAssetLinkInput"
          :value="item"
          ref="link"
          @keyup="$emit('valueChanged', $event.target.value, index)"
        />
        <img :src="cross" @click="$emit('deleteItem', index)" />
      </div>
    </transition>
    <p class="addListItem" @click="addNewItem">+ Add another link</p>
  </div>
</template>
<script>
import { cross } from "../constants/images";
export default {
  name: "ClickToAddList",
  props: ["list"],
  data() {
    return {
      cross,
      isCreated: false,
    };
  },
  methods: {
    addNewItem() {
      this.list.push("");
    },
  },
  updated() {
    if (this.isCreated) this.$refs.link[this.list.length - 1].focus();
    this.isCreated = true;
  },
};
</script>
