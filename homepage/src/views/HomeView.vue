<template>
  <section id="section" class="hero_container">
    <div class="app_width">
      <div class="hero">
        <div class="hero_text_content">
          <h3 class="title">Cross-chain interoperability protocol for PEGO.</h3>
          <p class="desc">W3link is enabling Web3 applications on PEGO go cross-chain, by powering seamless transfer of
            data from other
            blockchains and vice versa.</p>

          <div class="buttons">
            <div class="button">Build with W3Link</div>
            <div class="button">Try it Out</div>
          </div>
        </div>

        <div class="scroll">
          <MouseIcon />
          <p>Scroll</p>
        </div>
      </div>
    </div>
  </section>

  <section id="section" class="what_container">
    <div class="app_width">
      <div class="what">
        <h3 class="what_title">What w3link offers</h3>

        <div class="items">
          <div class="item">
            <TransferIcon />
            <h6>Seamlessly Transfer data</h6>
            <p>By making relaying of arbitrary data across multiple blockchains effortless, Dapps on PEGO can easily
              maximize their functionalities by going cross-chain.</p>
          </div>

          <div class="item">
            <KeyIcon />
            <h6>Access services interoperably</h6>
            <p>Easily integrate and access yet available blockchain services on PEGO, in an interoperable way through our
              list of provided cross-chain accessible services.</p>
          </div>

          <div class="item">
            <NewBlockIcon />
            <h6>One integration for multiple chain support</h6>
            <p>Integrating your Dapp with w3link readily unlock it's support for other blockchain i.e BNB chain, Polygon,
              Fantom, avalanche and more.</p>
          </div>
        </div>

        <button class="what_learn">Learn more</button>
      </div>
    </div>
  </section>

  <section id="section" class="features_container">
    <div class="app_width">
      <div class="features">
        <h3>See W3link in Action? <span>Meet Whirl.</span></h3>
        <p>Harnessing the crosschain interoperability provided by W3link, Whirl moves NFT assets across PEGO and other
          blockchains.</p>
        <button>Try it Out</button>
        <img src="/images/whirl.png" alt="">
      </div>
    </div>
  </section>
</template>

<script setup>
import MouseIcon from '../components/icons/MouseIcon.vue'
import TransferIcon from '../components/icons/TransferIcon.vue'
import KeyIcon from '../components/icons/KeyIcon.vue'
import NewBlockIcon from '../components/icons/NewBlockIcon.vue'
</script>

<style scoped>
.hero_container {
  background-image: url('/images/boxes.png');
  background-position: center center;
  background-repeat: no-repeat;
  background-size: 1920px 1080px;
}

.hero {
  display: flex;
  align-items: center;
  flex-direction: column;
  padding-top: 240px;
  padding-bottom: 80px;
}

.hero_text_content {
  width: 730px;
}

.hero_text_content .title {
  color: var(--tx-normal, #EEF1F8);
  text-align: center;
  font-family: Matter;
  font-size: 50px;
  font-style: normal;
  font-weight: 600;
  line-height: 150%;
  /* 75px */
  letter-spacing: 1px;
}

.hero_text_content .desc {
  margin-top: 40px;
  color: var(--tx-semi, #8B909E);
  text-align: center;
  font-family: Matter;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 160%;
  /* 25.6px */
  letter-spacing: 0.32px;
}

.buttons {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 40px;
  margin-top: 110px;
}

.button {
  border-radius: 4px;
  width: 312px;
  height: 54px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  font-family: Matter;
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: 100%;
  /* 16px */
  letter-spacing: 0.64px;
}

.button:first-child {
  color: var(--bg-lightest, #0C1A33);
  background: var(--primary-primary, #E5C82E);
}

.button:last-child {
  color: var(--tx-normal, #EEF1F8);
  border: 2px solid var(--bg-lightest, #0C1A33);
  background: var(--bg-lighter, #091121);
}

.scroll {
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: center;
  margin-top: 200px;
}

.scroll p {
  color: #EDF0F5;
  text-align: center;
  font-family: Axiforma;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 100%;
  /* 14px */
  letter-spacing: 0.56px;
}

/*  */

.what_container {
  background-image: url('/images/lines.png');
  background-position: center center;
  background-repeat: no-repeat;
  background-size: 1440px 1080px;
  background-color: #EDF0F5;
  padding: 200px 0;
}

.what {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.what_title {
  color: #293A59;
  text-align: center;
  font-family: Matter;
  font-size: 38px;
  font-style: normal;
  font-weight: 600;
  line-height: 150%;
  /* 57px */
  letter-spacing: 0.76px;
}

.items {
  display: flex;
  flex-wrap: wrap;
  gap: 30px;
  margin-top: 120px;
  justify-content: center;
}

.item {
  width: 380px;
  height: 378px;
  border-radius: 6px;
  background: #FCFDFF;
  padding: 50px 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
}


.item h6 {
  margin-top: 40px;
  color: #39375C;
  text-align: center;
  font-family: Matter;
  font-size: 24px;
  font-style: normal;
  font-weight: 600;
  line-height: 160%;
  /* 38.4px */
  letter-spacing: -0.24px;
  width: 260px;
}

.item p {
  margin-top: 26px;
  color: var(--tx-dimmed, #ABADAE);
  text-align: center;
  font-family: Matter;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: 150%;
  /* 24px */
  letter-spacing: -0.16px;
}

.what_learn {
  border-radius: 4px;
  border: 1px solid #EDF0F5;
  background: #FCFDFF;
  height: 46px;
  width: 195px;
  margin-top: 100px;

  color: #0C1A33;
  text-align: center;
  font-family: Matter;
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: 100%;
  /* 16px */
  letter-spacing: 0.64px;

  cursor: pointer;
  user-select: none;
}

/*  */

.features_container {
  background-image: url('/images/w3link.png');
  background-repeat: repeat;
  background-position-y: -20px;
  background-size: 500px;
  background-color: #FCFDFF;
  padding: 200px 0;
}

.features {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.features h3 {
  color: #293A59;
  text-align: center;
  font-family: Matter;
  font-size: 38px;
  font-style: normal;
  font-weight: 600;
  line-height: 150%;
  /* 57px */
  letter-spacing: 0.76px;
}

.features h3 span {
  color: #D6B509;
}

.features p {
  width: 743px;
  margin-top: 24px;
  color:  #ABADAE;
  text-align: center;
  font-family: Matter;
  font-size: 20px;
  font-style: normal;
  font-weight: 500;
  line-height: 150%;
  /* 30px */
  letter-spacing: 0.4px;
}

.features button {
  margin-top: 40px;
  border-radius: 4px;
  background: #D6B509;
  width: 182px;
  height: 46px;
  border: none;
  color: #293A59;
  text-align: center;
  font-family: Matter;
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: 100%;
  /* 16px */
  letter-spacing: 0.64px;
}

.features img {
  margin-top: 100px;
  width: 1000px;
  height: 684px;
}
</style>
