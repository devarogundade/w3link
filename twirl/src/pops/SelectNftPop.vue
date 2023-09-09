<template>
    <div class="container">
        <div class="box">
            <div class="box_header">
                <h3>Select a NFT</h3>
                <div class="close" @click="$emit('close')">
                    <CloseIcon />
                    <p>Close</p>
                </div>
            </div>

            <div class="toolbar">
                <div class="text">
                    <p>Your assets on <span>All Networks</span></p>
                    <p><span>14</span> NFTs</p>
                </div>

                <div class="network">
                    <BoxMenuIcon />
                    <p>All</p>
                    <ArrowDownIcon />
                </div>
            </div>

            <div class="scroll_y">
                <div class="items">
                    <div class="item" v-for="i in 5" :key="i">
                        <img src="https://img.freepik.com/premium-photo/girl-with-vr-glasses-metaverse-concept-generated-ai_802770-148.jpg?w=1380" alt="">
                        <div class="item_detail">
                            <div class="item_text">
                                <p>Dark Knight OSX 420</p>
                                <p>442</p>
                            </div>
                            <img src="/images/pego.png" alt="">
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import CloseIcon from '../components/icons/CloseIcon.vue'
import ArrowDownIcon from '../components/icons/ArrowDownIcon.vue'
import BoxMenuIcon from '../components/icons/BoxMenuIcon.vue'
</script>

<style scoped>
.container {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 10;
    background: rgba(6, 10, 15, 0.70);
    backdrop-filter: blur(2px);
    display: flex;
    align-items: center;
    justify-content: center;
}

.box {
    width: 748px;
    max-width: 100%;
    border-radius: 16px;
    border: 2px solid var(--bg-lighter, #091121);
    background: var(--bg-dark, #04080D);
    overflow: hidden;
}

.box_header {
    padding: 26px;
    padding-top: 35px;
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.box_header h3 {
    color: var(--tx-normal, #EEF1F8);
    font-family: Matter;
    font-size: 16px;
    font-style: normal;
    font-weight: 600;
    line-height: 120%;
    /* 19.2px */
    letter-spacing: 0.32px;
}

.box_header .close {
    display: flex;
    align-items: center;
    gap: 12px;
    color: var(--tx-semi, #8B909E);
    font-family: Matter;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 120%;
    /* 16.8px */
    letter-spacing: 0.28px;
}

.toolbar {
    padding: 26px;
    background: var(--bg-light, #050C17);
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 3px;
}

.toolbar .text p:first-child {
    color: var(--tx-immed, #5C5E66);
    font-family: Matter;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 120%;
    /* 19.2px */
    letter-spacing: 0.32px;
}

.toolbar .text p:first-child span {
    color: var(--tx-normal, #EEF1F8);
}

.toolbar .text p:last-child {
    margin-top: 8px;
    color: var(--tx-semi, #8B909E);
    font-family: Matter;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 120%;
    /* 16.8px */
    letter-spacing: 0.28px;
}

.toolbar .text p:last-child span {
    color: var(--pr-dimmed, #C0B477);
}

.toolbar .network {
    border-radius: 4px;
    background: var(--bg-lighter, #091121);
    padding: 0 20px;
    height: 48px;
    display: flex;
    align-items: center;
    gap: 10px;

    color: var(--tx-normal, #EEF1F8);
    font-family: Matter;
    font-size: 16px;
    font-style: normal;
    font-weight: 500;
    line-height: 120%;
    /* 19.2px */
    letter-spacing: 0.32px;
}


.scroll_y {
    max-height: 60vh;
}

.items {
    background: var(--bg-light, #050C17);
    padding: 26px;
    gap: 16px;
    display: flex;
    flex-wrap: wrap;
}

.item {
    width: 220px;
    background: var(--bg-lightest, #0C1A33);
    border-radius: 6px;
    overflow: hidden;
}

.item img {
    width: 100%;
    height: 216px;
    object-fit: cover;
}

.item_detail {
    padding: 16px;
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.item_detail p:first-child {
    color: var(--tx-normal, #EEF1F8);
    font-family: Matter;
    font-size: 12px;
    font-style: normal;
    font-weight: 600;
    line-height: 120%;
    /* 14.4px */
    letter-spacing: 0.24px;
}

.item_detail p:last-child {
    margin-top: 6px;
    color: var(--tx-dimmed, #5C5E66);
    font-family: Matter;
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    line-height: 120%;
    /* 14.4px */
    letter-spacing: 0.24px;
}

.item_detail img {
    border-radius: 14px;
    width: 26px;
    height: 26px;
}
</style>