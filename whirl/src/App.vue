<template>
  <div class="app">
    <div class="banner" v-show="banner">
      <section id="section">
        <div class="app_width">
          <div class="text">
            <p>Whirl also live on Mainnet</p>
            <a href="https://whirl.w3-link.site">
              <button>Try it now
                <ArrowRight2Icon />
              </button>
            </a>
          </div>
          <div class="close" @click="banner = false">
            <Close2Icon />
          </div>
        </div>
      </section>
    </div>
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
  background-size: 1920px;
  height: 100vh;
  width: 100vw;
}

.banner {
  height: 50px;
  width: 100%;
  background-image: url('/images/ann_banner.png');
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;
  display: flex;
  align-items: center;
  justify-content: center;
}

.banner .app_width {
  position: relative;
  width: 1460px;
}

.banner .text {
  justify-content: center;
  display: flex;
  align-items: center;
  gap: 32px;
}

.banner button {
  border-radius: 12px;
  background: var(--tx-normal, #EEF1F8);
  height: 24px;
  width: 118px;
  color: var(--bg-lightest, #0C1A33);
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 100%;
  /* 14px */
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  border: none;
  cursor: pointer;
}

.banner p {
  color: var(--tx-normal, #EEF1F8);
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: 100%;
  /* 16px */
}

.banner .close {
  position: absolute;
  right: 0;
  top: 50%;
  transform: translate(0, -50%);
  cursor: pointer;
}

.scroll_y {
  overflow-y: auto;
}
</style>

<script setup>
import BridgeHeader from '../src/components/BridgeHeader.vue'
import Close2Icon from './components/icons/Close2Icon.vue'
import SnackbarPop from './pops/SnackbarPop.vue'
import ArrowRight2Icon from './components/icons/ArrowRight2Icon.vue'
</script>

<script>
import Moralis from 'moralis'
import WalletConnection from './scripts/connection'
import axios from 'axios'
export default {
  data() {
    return {
      banner: true
    }
  },
  created() {
    WalletConnection.initialize()
  },
  async mounted() {
    await Moralis.start({ apiKey: "7276f8x2XPAFLXaLZZMT1JFWCgBzbQ3WPyaKjA8zEEVs23OQzD79J9z7KSeyawWC" })
    await WalletConnection.getWallet((wallet) => {
      this.$store.commit('setWallet', wallet)
    })

    // warm node servers
    // axios.get('https://node1.w3-link.site')
    // axios.get('https://nft.w3-link.site')
  },
}
</script>
