<template>
  <div class="app">
      <BridgeHeader />
      <div class="scroll_y">
        <RouterView />
      </div>
      <SnackbarPop />
    </div>
</template>

<style scoped>
.app {
  background-image: url('/images/bg.png');
  background-repeat: no-repeat;
  background-position: center center;
  background-size: 100%;
  height: 100vh;
  width: 100vw;
}

.scroll_y {
  overflow-y: auto;
}
</style>

<script setup>
import BridgeHeader from '../src/components/BridgeHeader.vue'
import SnackbarPop from './pops/SnackbarPop.vue';
</script>

<script>
import WalletConnection from './scripts/connection'
export default {
  created() {
    WalletConnection.initialize()
  },
  async mounted() {
    await WalletConnection.getWallet((wallet) => {
      this.$store.commit('setWallet', wallet)
    })
  },
}
</script>
