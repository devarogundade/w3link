<template>
    <div class="bridge_container">
        <div class="bridge_box">
            <div class="bridge_header">
                <h3>Bridge NFT</h3>

                <a target="_blank" href="https://w3-link.site">
                    <div class="powered">
                        <p>Powered by</p>
                        <W3LinkIcon />
                    </div>
                </a>
            </div>

            <div class="bridge_rect">
                <div class="progress">
                    <div class="labels">
                        <p :class="step > 0 ? 'labels_active' : ''">Select</p>
                        <p :class="step > 1 ? 'labels_active' : ''">Review</p>
                        <p :class="step > 2 ? 'labels_active' : ''">Bridge</p>
                    </div>
                    <div class="icons">
                        <ActiveIcon style="cursor: pointer;" @click="step = 1" />
                        <div class="line"></div>

                        <PassiveIcon v-if="step <= 1" />
                        <ActiveIcon style="cursor: pointer;" @click="step = 2" v-else />

                        <UnBridgedIcon v-if="step <= 2" />
                        <BridgedIcon v-else />
                    </div>
                </div>

                <div class="step1" v-show="step == 1">
                    <!--  -->

                    <div class="picker" v-if="selectedNft == null">
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

                    <div class="picker" v-else>
                        <p class="picker_title">Select a NFT</p>
                        <div class="picked_nft">
                            <div class="image">
                                <img :src="selectedNft.uri" alt="">
                            </div>

                            <div class="nft">
                                <div class="name">
                                    <p>{{ selectedNft.name }}</p>
                                    <WalletDownIcon @click="pickingNft = true" />
                                </div>
                                <div class="token_standard">
                                    <p>Token Standard</p>
                                    <p>ERC-721</p>
                                </div>
                                <div class="token_id">
                                    <p>Token ID</p>
                                    <p>{{ selectedNft.tokenId }}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!--  -->

                    <div class="route_picker" v-if="selectedNft == null">
                        <p class="picker_title">Select bridge route</p>
                        <div class="chains">
                            <div class="chain">
                                <img src="/images/none.png" alt="">
                                <p>Source chain</p>
                            </div>

                            <ArrowRightIcon />

                            <div class="chain">
                                <p>Destination chain</p>
                                <img src="/images/none.png" alt="">
                                <WalletDownIcon />
                            </div>
                        </div>
                    </div>

                    <div class="route_picker" v-else>
                        <p class="picker_title">Select bridge route</p>
                        <div class="chains">
                            <div class="chain">
                                <img :src="$chain(selectedNft.chainId).image" alt="">
                                <p>{{ $chain(selectedNft.chainId).name }}</p>
                            </div>

                            <ArrowRightIcon />

                            <div class="chain" @click="pickingDestChain = !pickingDestChain">
                                <p>{{ destChainId == null ? 'Destination chain' : $chain(destChainId).name }}</p>
                                <img :src="destChainId == null ? '/images/none.png' : $chain(destChainId).image" alt="">
                                <WalletDownIcon />

                                <div class="dest_chains" v-if="pickingDestChain">
                                    <div class="dest_chain"
                                        v-for="chain, i in $chains.filter(c => c.id != selectedNft.chainId)" :key="i"
                                        @click="destChainId = chain.id">
                                        <img :src="chain.image" :alt="chain.symbol">
                                        <p>{{ chain.name }}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!--  -->

                <div class="step2" v-show="step == 2" v-if="selectedNft && destChainId">
                    <div class="review_tokens">
                        <div class="review_token">
                            <div class="review_image">
                                <img :src="selectedNft.uri" :alt="selectedNft.symbol">
                            </div>
                            <div class="review_name">
                                <img :src="$chain(selectedNft.chainId).image" :alt="$chain(selectedNft.chainId).symbol">

                                <div class="review_token_name">
                                    <p>{{ selectedNft.name }}</p>
                                    <p>{{ $chain(selectedNft.chainId).name }}</p>
                                </div>
                            </div>
                        </div>

                        <ArrowRightIcon />

                        <div class="review_token">
                            <div class="review_image">
                                <img :src="selectedNft.uri" :alt="selectedNft.symbol">
                            </div>
                            <div class="review_name">
                                <div class="review_token_name">
                                    <p>{{ selectedNft.name }}</p>
                                    <p>{{ $chain(destChainId).name }}</p>
                                </div>

                                <img :src="$chain(destChainId).image" :alt="$chain(destChainId).symbol">
                            </div>
                        </div>
                    </div>

                    <div class="est">
                        <p>Estimated Time</p>
                        <div>
                            <TimeIcon />
                            <p>2 - 4 mins</p>
                        </div>
                    </div>

                    <div class="est">
                        <p>Bridge Fee</p>
                        <div>
                            <img :src="$chain(selectedNft.chainId).image" :alt="$chain(selectedNft.chainId).symbol">
                            <p>1.25 {{ $chain(selectedNft.chainId).symbol }}</p>
                        </div>
                    </div>
                </div>

                <!--  -->

                <div class="step3" v-show="step == 3">
                    <div class="success_image">
                        <img src="/images/success.png" alt="">
                    </div>

                    <div class="success_msg">
                        <p>Asset Bridged Successfully</p>
                        <p>Transaction completed, view or track your transactions on the <RouterLink to="/transactions">
                                transaction history</RouterLink> page.</p>
                    </div>
                </div>

                <div class="bridge_action">
                    <PrimaryButton @click="step = 2" v-if="step == 1" :text="'Review'"
                        :state="destChainId == null ? 'disable' : ''" />

                    <PrimaryButton @click="bridgeNft" v-if="step == 2" :text="'Bridge'" :progress="bridging" />

                    <div class="view_trx" v-if="step == 3" @click="step = 1; destChainId = null; selectedNft = null">
                        <AddIcon />
                        <p>New Transaction</p>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <SelectNftPop v-if="pickingNft" @close="pickingNft = false" @nft="selectedNft = $event; pickingNft = false" />
</template>

<script setup>
import AddIcon from '../components/icons/AddIcon.vue'
import W3LinkIcon from '../components/icons/W3LinkIcon.vue'
import ActiveIcon from '../components/icons/ActiveIcon.vue'
import PassiveIcon from '../components/icons/PassiveIcon.vue'
import UnBridgedIcon from '../components/icons/UnBridgedIcon.vue'
import BridgedIcon from '../components/icons/BridgedIcon.vue'
import ImageIcon from '../components/icons/ImageIcon.vue'
import PlusIcon from '../components/icons/PlusIcon.vue'
import PrimaryButton from '../components/PrimaryButton.vue'
import WalletDownIcon from '../components/icons/WalletDownIcon.vue'
import SelectNftPop from '../pops/SelectNftPop.vue'
import ArrowRightIcon from '../components/icons/ArrowRightIcon.vue'
import TimeIcon from '../components/icons/TimeIcon.vue'
</script>

<script>
import { tryEstimateFee, tryBridge, tryRevoke } from '../scripts/bridge'
import { notify } from '../reactives/notify'
export default {
    data() {
        return {
            step: 1,
            pickingNft: false,
            pickingDestChain: false,
            destChainId: null,
            selectedNft: null,
            estimatedFee: 0,
            bridging: false
        }
    },
    watch: {
        destChainId: function () {
            this.estFee()
        }
    },
    methods: {
        estFee: async function () {
            if (!this.selectedNft.chainId || !this.destChainId) return
            this.estimatedFee = await tryEstimateFee(this.selectedNft.chainId, this.destChainId)
        },
        bridgeNft: async function () {
            if (this.bridging) return
            this.bridging = true

            let transaction = null
            let condition = true
            
            if (condition) {
                transaction = await tryBridge(this.destChainId, this.selectedNft)
            } else {
                transaction = await tryRevoke(this.selectedNft)
            }

            if (transaction) {
                notify.push({
                    'title': 'Transaction sent',
                    'description': 'View transaction at the transactions page!',
                    'category': 'success',
                    'linkTitle': 'View Trx',
                    'linkUrl': '/transactions'
                })

                this.step = 3
            } else {
                notify.push({
                    'title': 'Transaction failed',
                    'description': 'Try again!',
                    'category': 'error'
                })
            }

            this.bridging = false
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
    
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 120%;
    /* 19.2px */
    letter-spacing: 0.32px;
    margin-bottom: 28px;
}

.picker_nft,
.picked_nft {
    display: flex;
    align-items: center;
    background: var(--bg-lighter, #091121);
    border-radius: 6px;
    overflow: hidden;
}

.picker_nft .image,
.picked_nft .image {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 172px;
    height: 172px;
    border-right: 2px var(--bg-light) solid;
}


.picked_nft {
    background: var(--bg-lighter, #091121);
}

.picked_nft .nft {
    height: 172px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: calc(100% - 172px);
}

.picked_nft .name,
.picked_nft .token_standard,
.picked_nft .token_id {
    display: flex;
    align-items: center;
    height: 56px;
    background: var(--bg-lightest);
    width: 100%;
    justify-content: space-between;
    padding: 0 20px;
}

.picked_nft .name svg {
    width: 45px;
    height: 45px;
    border-left: var(--bg-lighter) 2px solid;
    padding-left: 18px;
    cursor: pointer;
}

.picked_nft .name p {
    color: var(--tx-normal, #EEF1F8);
    
    font-size: 16px;
    font-style: normal;
    font-weight: 500;
    line-height: 120%;
    /* 19.2px */
    letter-spacing: 0.32px;
}

.picked_nft .token_standard p:first-child,
.picked_nft .token_id p:first-child {
    color: var(--tx-dimmed, #5C5E66);
    
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 120%;
    /* 16.8px */
    letter-spacing: 0.28px;
}

.picked_nft .token_standard p:last-child,
.picked_nft .token_id p:last-child {

    color: var(--tx-semi, #8B909E);
    text-align: right;
    
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 120%;
    /* 16.8px */
    letter-spacing: 0.28px;
}

.picked_nft .image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
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
    
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 120%;
    /* 19.2px */
    letter-spacing: 0.32px;
    border-radius: 4px;
    background: var(--background-lightest, #0C1A33);
    cursor: pointer;
    user-select: none;
}

.route_picker {
    margin-top: 3px;
    padding: 30px 26px;
    background: var(--bg-light, #050C17);
}

.route_picker .chains {
    display: flex;
    align-items: center;
    position: relative;
    justify-content: space-between;
}

.route_picker .chain {
    border-radius: 6px;
    background: var(--bg-lighter, #091121);
    height: 92px;
    padding: 0 26px;
    width: calc(50% - 1px);
    display: flex;
    align-items: center;
    gap: 16px;
    position: relative;
    cursor: pointer;
}

.dest_chains {
    position: absolute;
    right: 65px;
    top: 30px;
    z-index: 1;
    width: 200px;
    border: 2px solid var(--bg-lighter, #091121);
    border-radius: 4px;
    background: var(--bg-light, #050C17);
    animation: fade_in .1s ease-in-out;
}

.dest_chain {
    display: flex;
    padding: 0 20px;
    height: 64px;
    gap: 8px;
    align-items: center;
    border-bottom: 2px solid var(--bg-lighter, #091121);
    color: var(--tx-semi, #8B909E);
    
    font-size: 16px;
    font-style: normal;
    font-weight: 500;
    line-height: 100%;
    /* 16px */
    letter-spacing: 0.32px;
    cursor: pointer;
    user-select: none;
}

.dest_chain:last-child {
    border: none;
}

.dest_chain img {
    width: 24px !important;
    height: 24px !important;
    border-radius: 12px;
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

.route_picker .chain:last-child {
    justify-content: flex-end;
}

.route_picker .chain p {
    color: var(--tx-normal, #EEF1F8);
    
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 100%;
    /* 14px */
    letter-spacing: 0.28px;
}

.route_picker .chain svg {
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

/*  */


.review_tokens {
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: relative;
    padding: 32px 28px;
    background: var(--bg-light, #050C17);
}

.review_token {
    width: calc(50% - 1px);
    background: var(--bg-lighter, #091121);
    border-radius: 6px;
    overflow: hidden;
}

.review_name {
    display: flex;
    align-items: center;
    padding: 16px 20px;
    justify-content: space-between;
    gap: 20px;
    border-top: var(--bg-light, #050C17) 2px solid;
}

.review_token_name p:first-child {
    color: var(--tx-normal, #EEF1F8);
    
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: 120%;
    /* 16.8px */
    letter-spacing: 0.28px;
}

.review_tokens>svg {
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

.review_token_name p:last-child {
    margin-top: 4px;
    color: var(--tx-dimmed, #5C5E66);
    
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    line-height: 120%;
    /* 14.4px */
    letter-spacing: 0.24px;
}

.review_token_name:last-child p {
    text-align: right;
}

.review_name img {
    width: 28px;
    height: 28px;
    border-radius: 14px;
}

.review_token .review_image {
    display: flex;
    justify-content: center;
    padding: 8px 0;
}

.review_token .review_image img {
    width: 190px;
    height: 190px;
    object-fit: cover;
}

.est {
    height: 70px;
    background: var(--bg-light, #050C17);
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 3px;
    padding: 0 26px;
}

.est>p {
    color: var(--tx-semi, #8B909E);
    
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 120%;
    /* 19.2px */
    letter-spacing: 0.32px;
}

.est div {
    display: flex;
    align-items: center;
    gap: 10px;

    color: var(--tx-normal, #EEF1F8);
    
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 120%;
    /* 16.8px */
    letter-spacing: 0.28px;
}

.est img {
    width: 16px;
    height: 16px;
    border-radius: 8px;
}

/*  */

.success_image {
    display: flex;
    justify-content: center;
}

.view_trx {
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 6px;
    background: var(--pr-dimmed, #C0B477);
    height: 50px;
    cursor: pointer;
    user-select: none;
    width: 100%;
    border: none;
    gap: 12px;
}

.view_trx p {
    color: var(--bg-lightest, #0C1A33);
    
    font-size: 18px;
    font-style: normal;
    font-weight: 600;
    line-height: 120%;
    /* 21.6px */
    letter-spacing: 0.36px;
}

.step3 {
    display: flex;
    align-items: center;
    flex-direction: column;
    padding: 30px;
}

.success_image img {
    width: 300px;
    height: 300px;
    margin: -45px 0;
}

.success_msg {
    margin-top: 30px;
    width: 370px;
    text-align: center;
}

.success_msg p:first-child {
    color: var(--tx-normal, #EEF1F8);
    text-align: center;
    
    font-size: 16px;
    font-style: normal;
    font-weight: 600;
    line-height: 100%;
    /* 16px */
    letter-spacing: 0.32px;
}

.success_msg p:last-child {
    margin-top: 20px;
    color: var(--tx-semi, #8B909E);
    text-align: center;
    
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 150%;
    /* 21px */
    letter-spacing: 0.28px;
}

.success_msg p:last-child a {
    color: var(--pr-primary, #E5C82E);
}
</style>