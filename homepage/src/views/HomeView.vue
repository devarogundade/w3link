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
            <a href="https://docs.w3-link.site" target="_blank">
              <div class="button">Build with W3Link</div>
            </a>
            <a href="https://docs.w3-link.site/ecosystem-dapps" target="_blank">
              <div class="button">Ecosystem DApps</div>
            </a>
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

        <a href="https://docs.w3-link.site" target="_blank">
          <button class="what_learn">Learn more</button>
        </a>
      </div>
    </div>
  </section>

  <section id="section" class="features_container">
    <div class="app_width">
      <div class="features">
        <h3>See W3link in Action? <span>Meet Whirl.</span></h3>
        <p>Harnessing the crosschain interoperability provided by W3link, Whirl moves NFT assets across PEGO and other
          blockchains.</p>
        <a href="https://testnet-whirl.w3-link.site" target="_blank">
          <button>Try it Out</button>
        </a>
        <img src="/images/whirl.png" alt="">
      </div>
    </div>
  </section>

  <section id="section" class="services_container">
    <div class="app_width">
      <div class="service_container">
        <div class="service_info">
          <h3>Provided Cross-chain Services</h3>
          <p>To provide for the needs of the existing and next big Web3 dApps on PEGO, W3link eases their access to
            services available on other blockchains.</p>
          <button>See Docs</button>
        </div>

        <table class="service_table">
          <div class="thead">
            <thead>
              <tr>
                <td>
                  <p>Service Name</p>
                </td>
                <td>
                  <p>Uses</p>
                </td>
                <td>
                  <p>Provider</p>
                </td>
              </tr>
            </thead>
          </div>
          <a href="https://docs.w3-link.site/services" target="_blank">
            <div class="tbody">
              <tbody>
                <tr>
                  <td>
                    <div class="service_name">
                      <h4>W3Link VRF</h4>
                      <div>
                        <p>Info</p>
                        <OutIcon />
                      </div>
                    </div>
                  </td>
                  <td>
                    <p class="service_uses">Access verified randomness without compromising security or usability.</p>
                  </td>
                  <td>
                    <div class="service_provider">
                      <ChainLinkIcon />
                      <p>Chainlink</p>
                    </div>
                  </td>
                </tr>
              </tbody>
            </div>
          </a>

          <a href="https://docs.w3-link.site/product-guides/services" target="_blank">
            <div class="tbody">
              <tbody>
                <tr>
                  <td>
                    <div class="service_name">
                      <h4>W3Link API</h4>
                      <div>
                        <p>Info</p>
                        <OutIcon />
                      </div>
                    </div>
                  </td>
                  <td>
                    <p class="service_uses">Enables you to access external data sources like weather forecast, and sport
                      prediction on chain.</p>
                  </td>
                  <td>
                    <div class="service_provider">
                      <ChainLinkIcon />
                      <p>Chainlink</p>
                    </div>
                  </td>
                </tr>
              </tbody>
            </div>
          </a>
        </table>
      </div>
    </div>
  </section>
</template>

<script setup>
import MouseIcon from '../components/icons/MouseIcon.vue'
import TransferIcon from '../components/icons/TransferIcon.vue'
import KeyIcon from '../components/icons/KeyIcon.vue'
import NewBlockIcon from '../components/icons/NewBlockIcon.vue'
import OutIcon from '../components/icons/OutIcon.vue'
import ChainLinkIcon from '../components/icons/ChainLinkIcon.vue'
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
  max-width: 100%;
}

.hero_text_content .title {
  color: var(--tx-normal, #EEF1F8);
  text-align: center;

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

  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: 100%;
  /* 16px */
  letter-spacing: 0.64px;
}

.buttons a:first-child .button {
  color: var(--bg-lightest, #0C1A33);
  background: var(--primary-primary, #E5C82E);
}

.buttons a:last-child .button {
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
  margin-bottom: 100px;

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

  color: #0C1A33;
  text-align: center;

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
  color: #ABADAE;
  text-align: center;

  font-size: 20px;
  font-style: normal;
  font-weight: 500;
  line-height: 150%;
  /* 30px */
  letter-spacing: 0.4px;
  margin-bottom: 40px;

}

.features button {
  border-radius: 4px;
  background: #D6B509;
  width: 182px;
  height: 46px;
  border: none;
  color: #293A59;
  text-align: center;

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

/*  */

.services_container {
  padding: 200px 0;
  background: var(--tx-normal);
}

.service_container {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 60px;
}

.service_info {
  width: 450px;
  max-width: 100%;
}

.service_info h3 {
  color: #293A59;

  font-size: 30px;
  font-style: normal;
  font-weight: 600;
  line-height: 150%;
  /* 45px */
  letter-spacing: 0.6px;
}

.service_info p {
  margin-top: 24px;
  margin-bottom: 114px;
  color: #ABADAE;

  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: 150%;
  /* 24px */
  letter-spacing: 0.32px;
}

.service_info button {
  border-radius: 4px;
  background: #D6B509;

  color: #293A59;
  text-align: center;

  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: 100%;
  /* 16px */
  letter-spacing: 0.64px;

  height: 46px;
  width: 180px;

  border: none;
}

td:first-child {
  width: 175px;
}

td:nth-child(2) {
  width: 230px;
}

thead td:nth-child(2) {
  text-align: center;
}

thead td:nth-child(3) {
  text-align: right;
}

td:nth-child(3) {
  width: 160px;
}

thead td p {
  color: #ABADAE;

  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 100%;
  /* 14px */
  letter-spacing: 0.28px;
}

.service_name h4 {
  color: #293A59;

  font-size: 14px;
  font-style: normal;
  font-weight: 600;
  line-height: 100%;
  /* 14px */
  letter-spacing: 0.28px;
}

.service_name div {
  margin-top: 14px;
  display: flex;
  gap: 8px;
  align-items: center;
}

.service_name svg {
  margin-top: 2px;
}

.service_name div p {
  color: #ABADAE;

  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 100%;
  /* 14px */
  letter-spacing: 0.28px;
}

.service_uses {
  color: #ABADAE;

  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 150%;
  /* 21px */
  letter-spacing: 0.28px;
}

.service_provider {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 10px;
}

.service_provider p {
  color: #293A59;

  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 100%;
  /* 14px */
  letter-spacing: 0.28px;
}

.service_table {
  width: 635px;
  height: fit-content;
  overflow: hidden;
  max-width: 100%;
  border-radius: 15px;
  border: 2px solid #EDF0F5;
  background: #F6F8FB;
  table-layout: auto;
}

.service_table .thead {
  padding: 30px 26px;

}

.service_table .tbody {
  padding: 30px 26px;
  background: #FCFDFF;
  border-bottom: 2px solid #EDF0F5;
}

.service_table .tbody:last-child {
  border-bottom: none;
}
</style>
