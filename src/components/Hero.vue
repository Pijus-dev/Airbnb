<template>
  <section class="hero text">
    <div class="hero-body">
      <div class="container">
        <h1 class="animate__animated animate__bounceInRight">
          {{ text }}
        </h1>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "Hero",
  props: {
    text: String
  }
};
</script>

<style></style>
