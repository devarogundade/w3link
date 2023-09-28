<template>
  <div class="app">
    <HomeHeader />
    <RouterView />
      <SnackbarPop />
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
import SnackbarPop from './pops/SnackbarPop.vue';
</script>

<script>
import axios from 'axios'
export default {
  mounted() {
    // warm node servers
    axios.get('https://node1.w3-link.site')
    axios.get('https://nft.w3-link.site')

    axios.get('https://node1-mainnet.w3-link.site')
    axios.get('https://nft-mainnet.w3-link.site')
  }
}
</script>
