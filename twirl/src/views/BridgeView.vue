<template>
    <div class="bridge_container">
        <div class="bridge_box">
            <div class="bridge_header">
                <h3>Bridge NFT</h3>

                <div class="powered">
                    <p>Powered by</p>
                    <W3LinkIcon />
                </div>
            </div>

            <div class="bridge_rect">
                <div class="progress">
                    <div class="labels">
                        <p class="labels_active">Select</p>
                        <p>Review</p>
                        <p>Bridge</p>
                    </div>
                    <div class="icons">
                        <ActiveIcon />
                        <div class="line"></div>
                        <InActiveIcon />
                        <UnBridgedIcon />
                    </div>
                </div>

                <div class="picker">
                    <p class="picker_title">Select a NFT</p>
                    <div class="picker_nft">
                        <div class="image">
                            <ImageIcon />
                        </div>

                        <div class="pick_nft">
                            <p>No NFT selected</p>
                            <div class="select" @click="pickingNft = true">
                                <PlusIcon />
                                <p>Select</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="route_picker">
                    <p class="picker_title">Select bridge route</p>
                    <div class="chains">
                        <div class="source">
                            <img src="/images/none.png" alt="">
                            <p>Source chain</p>
                        </div>

                        <InterChangeIcon />

                        <div class="source">
                            <p>Source chain</p>
                            <img src="/images/none.png" alt="">
                            <WalletDownIcon />
                        </div>
                    </div>
                </div>

                <div class="bridge_action">
                    <PrimaryButton :text="'Review'" :state="'disable'" />
                </div>
            </div>
        </div>
    </div>

    <SelectNftPop v-if="pickingNft" @close="pickingNft = false" />
</template>

<script setup>
import W3LinkIcon from '../components/icons/W3LinkIcon.vue'
import ActiveIcon from '../components/icons/ActiveIcon.vue'
import InActiveIcon from '../components/icons/InActiveIcon.vue'
import UnBridgedIcon from '../components/icons/UnBridgedIcon.vue'
import ImageIcon from '../components/icons/ImageIcon.vue'
import PlusIcon from '../components/icons/PlusIcon.vue'
import PrimaryButton from '../components/PrimaryButton.vue'
import WalletDownIcon from '../components/icons/WalletDownIcon.vue'
import InterChangeIcon from '../components/icons/InterChangeIcon.vue'
import SelectNftPop from '../pops/SelectNftPop.vue'
</script>

<script>
export default {
    data() {
        return {
            pickingNft: false
        }
    }
}
</script>

<style scoped>
.bridge_container {
    display: flex;
    justify-content: center;
    padding-top: 150px;
    padding-bottom: 50px;
}

.bridge_box {
    width: 566px;
    max-width: 100%;
}

.bridge_header {
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.bridge_header h3 {
    color: var(--text-normal, #EEF1F8);
    font-family: Matter;
    font-size: 20px;
    font-style: normal;
    font-weight: 700;
    line-height: 120%;
    /* 24px */
    letter-spacing: 0.4px;
}

.bridge_header .powered {
    display: flex;
    align-items: center;
    gap: 20px;
}

.powered p {
    color: var(--text-semi, #8B909E);
    font-family: Matter;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 120%;
    /* 16.8px */
    letter-spacing: 0.28px;
}

.bridge_rect {
    margin-top: 26px;
    border-radius: 15px;
    border: 2px solid var(--bg-lighter, #091121);
    background: var(--bg-dark, #04080D);
    overflow: hidden;
}


.progress {
    padding: 24px;
}

.progress .labels {
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.labels p {
    color: var(--tx-dimmed, #5C5E66);
    font-family: Matter;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 120%;
    /* 19.2px */
    letter-spacing: 0.32px;
}

.labels .labels_active {
    color: var(--tx-normal);
}

.progress .icons {
    position: relative;
    margin-top: 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.icons svg {
    z-index: 1;
    border-left: 6px var(--bg-dark) solid;
    border-right: 6px var(--bg-dark) solid;
    width: 30px;
}

.icons svg:first-child {
    margin-left: -6px;
}

.icons svg:last-child {
    margin-right: -6px;
}

.icons .line {
    position: absolute;
    height: 4px;
    width: 100%;
    background: var(--bg-lighter, #091121);
}

.picker {
    padding: 30px 26px;
    background: var(--bg-light, #050C17);
}

.picker_title {
    color: var(--tx-semi, #8B909E);
    font-family: Matter;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 120%;
    /* 19.2px */
    letter-spacing: 0.32px;
}

.picker_nft {
    margin-top: 28px;
    display: flex;
    align-items: center;
    background: var(--bg-lighter, #091121);
    border-radius: 6px;
}

.picker_nft .image {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 172px;
    height: 172px;
    border-right: 2px var(--bg-light) solid;
}

.pick_nft {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    width: calc(100% - 174px);
}

.pick_nft>p {
    color: var(--tx-semi, #8B909E);
    font-family: Matter;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 120%;
    /* 19.2px */
    letter-spacing: 0.32px;
}

.pick_nft .select {
    margin-top: 30px;
    height: 40px;
    display: flex;
    padding: 0 42px;
    justify-content: center;
    align-items: center;
    gap: 10px;
    color: var(--text-normal, #EEF1F8);
    font-family: Matter;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 120%;
    /* 19.2px */
    letter-spacing: 0.32px;
    border-radius: 4px;
    background: var(--background-lightest, #0C1A33);
}

.route_picker {
    margin-top: 3px;
    padding: 30px 26px;
    background: var(--bg-light, #050C17);
}

.route_picker .chains {
    display: flex;
    align-items: center;
    margin-top: 20px;
    position: relative;
    justify-content: space-between;
}

.route_picker .source {
    border-radius: 6px;
    background: var(--bg-lighter, #091121);
    height: 92px;
    padding: 0 26px;
    width: calc(50% - 1px);
    display: flex;
    align-items: center;
    gap: 16px;
    position: relative;
}

.route_picker .chains>svg {
    position: absolute;
    left: 50%;
    z-index: 1;
    transform: translate(-50%, 0);
    background: var(--bg-light);
    border-radius: 50%;
    padding: 10px;
    width: 40px;
    height: 40px;
}

.route_picker .source:last-child {
    justify-content: flex-end;
}

.route_picker .source p {
    color: var(--tx-normal, #EEF1F8);
    font-family: Matter;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 100%;
    /* 14px */
    letter-spacing: 0.28px;
}

.route_picker .source svg {
    position: absolute;
    bottom: 24px;
}

.route_picker img {
    width: 36px;
    height: 36px;
    background: var(--bg-light);
    border-radius: 18px;
}

.bridge_action {
    margin-top: 3px;
    padding: 26px;
    background: var(--bg-lighter, #091121);
}
</style>