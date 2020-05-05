<template>
  <div class="notification">
    <b-notification
      :active.sync="isActive"
      v-bind:class="type"
      aria-close-label="Close notification"
      {{
      notification
      }}
    />
  </div>
</template>

<script>
export default {
  name: "Notification",
  props: {
    isActive: Boolean,
    notification: String,
    type: String
  }
};
</script>

<style></style>
