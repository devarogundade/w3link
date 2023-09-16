<template>
  <div class="app">
    <HomeHeader />
    <RouterView />
  </div>
</template>

<style scoped>
.app {
  /* background-image: url('/images/bg.png');
  background-repeat: no-repeat;
  background-position: center center;
  background-size: 1920px;
  height: 100vh;
  width: 100vw; */
}
</style>

<script setup>
import HomeHeader from '../src/components/HomeHeader.vue'
</script>
