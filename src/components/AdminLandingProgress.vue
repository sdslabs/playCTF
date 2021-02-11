<template>
  <div class="adminLandingProgress">
    <div
      v-for="index in this.totalSteps"
      :key="index"
      :class="[
        'progress',
        { current: currentStep === index, completed: currentStep > index }
      ]"
    />
  </div>
</template>
<script>
export default {
  name: "AdminLandingProgress",
  props: ["totalSteps", "currentStep"]
};
</script>
