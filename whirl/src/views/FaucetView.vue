<template>
    <section id="section">
        <div class="app_width">
            <div class="container">
                <div class="faucet_rect">
                    <div class="faucet_rect_toolbar">
                        <h3>Beta Pass NFT</h3>
                        <p>Mint Whirl’s Beta Pass NFT for testing out the Dapp and as a Pass for Beta testing participation.
                        </p>
                    </div>

                    <div class="faucet_rect_box">
                        <div class="image">
                            <img src="/images/nft.png" alt="">
                        </div>

                        <div class="dest">
                            <p>Selected chain</p>

                            <div class="chain" @click="pickingDestChain = !pickingDestChain">
                                <p>{{ $chain(nft.chainId).name }}</p>
                                <img :src="nft.chainId == null ? '/images/none.png' : $chain(nft.chainId).image" alt="">
                                <WalletDownIcon />

                                <div class="dest_chains" v-if="pickingDestChain">
                                    <div class="dest_chain" v-for="chain, i in $chains.filter(c => c.id != nft.chainId)"
                                        :key="i" @click="nft.chainId = chain.id">
                                        <img :src="chain.image" :alt="chain.symbol">
                                        <p>{{ chain.name }}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="action">
                            <PrimaryButton :progress="minting" :text="'Mint'" @click="mint" />
                        </div>
                    </div>
                </div>
                <p class="faucet_link">
                    Get {{ $chain(nft.chainId).name }} tokens <a :href="faucets[nft.chainId]" target="_blank">here</a>
                    <OutIcon />
                </p>
            </div>
        </div>
    </section>
</template>

<script setup>
import PrimaryButton from '../components/PrimaryButton.vue';
import OutIcon from '../components/icons/OutIcon.vue'
import WalletDownIcon from '../components/icons/WalletDownIcon.vue'
import { notify } from '../reactives/notify';
</script>

<script>
import WalletConnection from '../scripts/connection';
import { tryMintNft } from '../scripts/faucet'
export default {
    data() {
        return {
            minting: false,
            nft: { chainId: 123456 },
            faucets: {
                123456: "https://faucet.pegotest.net/",
                97: "https://testnet.bnbchain.org/faucet-smart",
                80001: "https://faucet.polygon.technology/",
                11155111: "https://faucet.polygon.technology/"
            },
            pickingDestChain: false
        }
    },
    methods: {
        mint: async function () {
            if (this.minting) return
            this.minting = true

            try {
                await WalletConnection.switchNetwork(this.nft.chainId)
                this.$store.commit('setActiveChainId', this.nft.chainId)
            }
            catch (error) {
                notify.push({
                    'title': 'Wrong network',
                    'description': 'Switch to the correct network!',
                    'category': 'error'
                })
                return
            }

            const transaction = await tryMintNft(
                this.nft.chainId,
                JSON.stringify({
                    image: 'https://whirl.w3-link.site/images/nft.png',
                    name: 'Beta Pass NFT',
                    description: 'Mint Whirl’s Beta Pass NFT for testing out the Dapp and as a Pass for Beta testing participation.'
                })
            )

            if (transaction) {
                notify.push({
                    'title': 'Transaction sent',
                    'description': 'Faucet NFT Successfully minted!',
                    'category': 'success',
                    'linkTitle': 'View Trx',
                    'linkUrl': `${this.$chain(this.nft.chainId).scan}/tx/${transaction.transactionHash}`
                })

                this.step = 3
            } else {
                notify.push({
                    'title': 'Transaction failed',
                    'description': 'Note that you can\'t mint more than once!',
                    'category': 'error'
                })
            }

            this.minting = false
        }
    }
}
</script>

<style scoped>
.container {
    display: flex;
    align-items: center;
    flex-direction: column;
    padding: 60px 0;
}

.faucet_rect {
    width: 358px;
    flex-shrink: 0;
}

.faucet_rect_toolbar h3 {
    color: var(--tx-normal, #EEF1F8);
    font-size: 20px;
    font-style: normal;
    font-weight: 700;
    line-height: 120%;
    /* 24px */
    letter-spacing: 0.4px;
    text-align: center;
}


.faucet_rect_toolbar p {
    color: var(--tx-dimmed, #5C5E66);
    text-align: center;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 150%;
    /* 21px */
    letter-spacing: 0.28px;
    margin-top: 24px;
}

.faucet_rect_box {
    background: var(--bg-dark);
    overflow: hidden;
    border-radius: 16px;
    margin-top: 20px;
    border: 2px var(--bg-lighter, #091121) solid;
}


.faucet_rect .image img {
    width: 1005;
    height: 358px;
    object-fit: cover;
}

.dest {
    padding: 0 20px;
    height: 60px;
    display: flex;
    align-items: center;
    position: relative;
    justify-content: space-between;
    background: var(--bg-light);
    margin-bottom: 3px;
}

.dest>p {
    color: var(--tx-dimmed, #5C5E66);
    font-family: Matter;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 100%;
    /* 14px */
    letter-spacing: 0.28px;
}

.chain {
    display: flex;
    align-items: center;
    gap: 16px;
    position: relative;
    cursor: pointer;
}

.chain p {
    color: var(--tx-normal, #EEF1F8);
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 100%;
    /* 14px */
    letter-spacing: 0.28px;
}

.chain svg {
    position: absolute;
    bottom: 0;
    right: 0;
}

.chain img {
    width: 36px;
    height: 36px;
    background: var(--bg-light);
    border-radius: 18px;
}

.dest_chain img {
    width: 24px !important;
    height: 24px !important;
    border-radius: 12px;
}

.dest_chains {
    position: absolute;
    right: 45px;
    bottom: -20px;
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

.faucet_rect_toolbar .sort {
    display: inline-flex;
    padding: 9px 16px;
    justify-content: center;
    align-items: center;
    gap: 10px;
    border-radius: 4px;
    background: var(--bg-lighter, #0C171A);
    cursor: pointer;
    user-select: none;
}

.faucet_rect_toolbar .sort p {
    color: var(--tx-semi, #95979D);
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: 100%;
    /* 14px */
    letter-spacing: 0.28px;
}

.action {
    padding: 26px;
    background: var(--bg-lighter);
}

.faucet_link {
    text-align: center;
    display: flex;
    align-items: center;
    margin-top: 26px;
    color: var(--tx-semi, #8B909E);
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 150%;
    /* 21px */
    letter-spacing: 0.28px;
}

.faucet_link a {
    color: var(--pr-dimmed, #C0B477);
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 150%;
    letter-spacing: 0.28px;
    text-decoration-line: underline;
    margin-left: 4px;
}

.faucet_link svg {
    margin-left: 10px;
    margin-top: 2px;
}
</style>