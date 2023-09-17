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
                    <p><span>5</span> NFTs</p>
                </div>

                <div class="network" @click="switching = !switching">
                    <BoxMenuIcon v-if="network == 0" />
                    <img v-else :src="$chain(network).image" :alt="$chain(network).symbol">

                    <p v-if="network == 0">All</p>
                    <p v-else>{{ $chain(network).name }}</p>
                    <ArrowDownIcon />

                    <div class="networks" v-if="switching">
                        <div class="network" @click="network = 0">
                            <BoxMenuIcon />
                            <p>All</p>
                        </div>
                        <div class="network" v-for="chain, i in $chains" :key="i" @click="network = chain.id">
                            <img :src="chain.image" :alt="chain.symbol">
                            <p>{{ chain.name }}</p>
                        </div>
                    </div>
                </div>
            </div>

            <div class="loader" v-if="loading">
                <LoadingBox />
            </div>

            <div class="scroll_y" v-else>
                <div class="items">
                    <div class="item" v-for="nft, i in nfts" :key="i" @click="$emit('nft', nft)">
                        <img :src="nft.uri" :alt="nft.symbol">
                        <div class="item_detail">
                            <div class="item_text">
                                <p>{{ nft.name }}</p>
                                <p>{{ nft.tokenId }}</p>
                            </div>
                            <img :src="$chain(nft.chainId).image" :alt="$chain(nft.chainId).name">
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
import LoadingBox from '../components/LoadingBox.vue'
</script>

<script>
import { tryGetNfts } from '../scripts/token'
export default {
    data() {
        return {
            loading: true,
            switching: false,
            network: 0,
            nfts: [
                { name: 'Bored Ape', symbol: 'APE', tokenId: 1, address: '', uri: 'https://img.freepik.com/premium-photo/girl-with-vr-glasses-metaverse-concept-generated-ai_802770-148.jpg?w=1380', chainId: 97 },
                { name: 'Dark Knight OSX 420', symbol: 'OSX', tokenId: 2, address: '', uri: 'https://img.freepik.com/premium-photo/girl-with-vr-glasses-metaverse-concept-generated-ai_802770-148.jpg?w=1380', chainId: 80001 },
                { name: 'Fist Fight', symbol: 'FFT', tokenId: 3, address: '', uri: 'https://img.freepik.com/premium-photo/girl-with-vr-glasses-metaverse-concept-generated-ai_802770-148.jpg?w=1380', chainId: 97 },
                { name: 'Wolf Safe Poor Girl', symbol: 'WSPG', tokenId: 4, address: '', uri: 'https://img.freepik.com/premium-photo/girl-with-vr-glasses-metaverse-concept-generated-ai_802770-148.jpg?w=1380', chainId: 11155111 },
                { name: 'Lazy Designers', symbol: 'LDX', tokenId: 5, address: '', uri: 'https://img.freepik.com/premium-photo/girl-with-vr-glasses-metaverse-concept-generated-ai_802770-148.jpg?w=1380', chainId: 123456 }
            ]
        }
    },
    mounted() {
        // this.getNfts()
    },
    methods: {
        getNfts: async function () {
            this.loading = true
            this.nfts = await tryGetNfts(this.$store.state.wallet.addres)
            this.loading = false
        }
    }
}
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
    animation: fade_in .2s ease-in-out;
}

.box {
    width: 748px;
    max-width: 100%;
    border-radius: 16px;
    border: 2px solid var(--bg-lighter, #091121);
    background: var(--bg-dark, #04080D);
    overflow: hidden;
    animation: slide_in_up .2s ease-in-out;
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
    gap: 8px;

    color: var(--tx-normal, #EEF1F8);
    
    font-size: 16px;
    font-style: normal;
    font-weight: 500;
    line-height: 120%;
    /* 19.2px */
    letter-spacing: 0.32px;
    cursor: pointer;
    user-select: none;

    position: relative;
}

.networks {
    position: absolute;
    top: 60px;
    width: 180px;
    right: 0;
    border-radius: 4px;
    overflow: hidden;
    z-index: 1;
    border: 1px solid var(--bg-lighter);
    animation: fade_in .1s ease-in-out;
}

.network img {
    width: 24px;
    height: 24px;
    border-radius: 12px;
}

.networks .network {
    border-radius: 0;
    height: 55px;
    border-bottom: 1px solid var(--bg-lighter);
    background: var(--bg-light, #091121);
}

.networks .network:last-child {
    border: none;
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
    background: var(--bg-lighter, #0C1A33);
    border-radius: 6px;
    overflow: hidden;
    cursor: pointer;
    user-select: none;
}

.item:hover {
    background: var(--bg-lightest, #0C1A33);
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