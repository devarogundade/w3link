<template>
    <section id="section">
        <div class="app_width">
            <header>
                <div class="tabs">
                    <div class="logo">
                        <TwirlLogo />
                    </div>

                    <RouterLink to="/">
                        <div :class="$route.name == 'bridge' ? 'tab_item_active tab_item' : 'tab_item'">
                            <p>Bridge NFT</p>
                        </div>
                    </RouterLink>
                    <RouterLink to="/transactions">
                        <div :class="$route.name == 'transactions' ? 'tab_item_active tab_item' : 'tab_item'">
                            <p>Transactions</p>
                        </div>
                    </RouterLink>
                    <RouterLink to="/faucet">
                        <div :class="$route.name == 'faucet' ? 'tab_item_active tab_item' : 'tab_item'">
                            <p>NFT Faucet</p>
                        </div>
                    </RouterLink>
                </div>
                <div class="connection">
                    <div class="chains">
                        <div class="active_chain" @click="switching = !switching">
                            <img :src="$chain($store.state.activeChainId).image" alt="">
                            <WalletDownIcon :style="{ rotate: switching ? '-180deg' : '0deg' }" />

                            <!-- dropdown -->
                            <div class="inactive_chain" v-show="switching">
                                <div class="chain" v-for="chain, index in $chains" :key="index" @click="switchChain(chain.id)">
                                    <img :src="chain.image" alt="">
                                    <p>{{ chain.name }}</p>
                                </div>
                            </div>
                        </div>

                        <div class="wallet" @click="connectWallet">
                            <WalletIcon v-if="!$store.state.wallet.address" />
                            <WalletProfile v-else />
                            <p v-if="!$store.state.wallet.address">Connect Wallet</p>
                            <p v-else>{{ fineAddress($store.state.wallet.address) }}</p>
                        </div>

                        <div class="theme">
                            <SunIcon />
                        </div>
                    </div>
                </div>
            </header>
        </div>
    </section>
</template>

<script setup>
import TwirlLogo from '../components/icons/TwirlLogo.vue'
import WalletIcon from '../components/icons/WalletIcon.vue'
import WalletProfile from '../components/icons/WalletProfile.vue'
import WalletDownIcon from '../components/icons/WalletDownIcon.vue'
import SunIcon from '../components/icons/SunIcon.vue'
</script >

<script>
import WalletConnection from '../scripts/connection'
export default {
    data() {
        return {
            switching: false
        }
    },
    methods: {
        fineAddress: WalletConnection.fineAddress,

        switchChain: async function (toChainId) {
            const result = await WalletConnection.switchNetwork(toChainId)
            this.$store.commit('setActiveChainId', toChainId)
            console.log(result);
        },

        connectWallet: async function () {
            if (!this.$store.state.wallet.address) {
                await WalletConnection.openModal((wallet) => {
                    this.$store.commit('setWallet', wallet)
                })
            }
        },
    }
}
</script>


<style scoped>
section {
    width: 100%;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 5;
}

header {
    width: 100%;
    height: 90px;
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.logo {
    width: 190px;
}

.connection {
    width: 400px;
    display: flex;
    align-items: center;
    gap: 20px;
}

.connection {
    justify-content: flex-end;
}

.connect_wallets {
    display: flex;
    align-items: center;
}

.connect_wallets p {
    height: 40px;
    width: 150px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 4px 0px 0px 4px;
    border-top: 1px solid var(--bg-lightest, #11282E);
    border-bottom: 1px solid var(--bg-lightest, #11282E);
    border-left: 1px solid var(--bg-lightest, #11282E);
    background: var(--bg-lighter, #0C171A);
    color: var(--tx-normal, #EEF1F8);
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: 120%;
    /* 16.8px */
    letter-spacing: 0.28px;
}

.connect_wallets svg {
    height: 40px;
    width: 40px;
    border-radius: 0px 20px 20px 0px;
    background: var(--primary-light, #B1CC8F);
    display: flex;
    align-items: center;
    padding: 10px;
    justify-content: center;
}

.logo svg {
    height: 34px;
}

.tabs {
    gap: 60px;
    display: flex;
    align-items: center;
}

.tab_item p {
    color: var(--text-dimmed, #6C6E73);
    font-size: 16px;
    font-style: normal;
    font-weight: 500;
    padding: 4px 0;
    line-height: normal;
}

.tab_item_active p {
    color: var(--text-normal, #EEF1F8);
}


a .tab_item {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
}

.chains {
    display: flex;
    align-items: center;
    gap: 20px;
}

.active_chain {
    width: 40px;
    height: 40px;
    cursor: pointer;
    user-select: none;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 4px;
    background: var(--bg-lightest, #11282E);
    position: relative;
}

.active_chain>svg {
    position: absolute;
    right: 0;
    bottom: 0;
}

.active_chain img {
    width: 24px;
    height: 24px;
    border-radius: 12px;
}

.inactive_chain {
    position: absolute;
    top: 60px;
    border-radius: 6px;
    border: 1px solid var(--bg-lighter);
    background: var(--bg-light);
    width: 220px;
    left: 0;
}

.inactive_chain .chain {
    padding: 20px;
    display: flex;
    align-items: center;
    gap: 8px;
    border-bottom: 1px solid var(--bg-lighter, #0D1112);
}

.inactive_chain .chain p {
    width: 130px;
}

.inactive_chain .chain:last-child {
    border-bottom: none;
}

.inactive_chain .chain p {
    color: var(--text-semi-d, #95979D);
    font-size: 16px;
    font-style: normal;
    font-weight: 800;
    line-height: 100%;
    /* 16px */
    letter-spacing: 0.32px;
}

.wallet {
    border-radius: 4px;
    border: 1px solid var(--bg-lightest, #11282E);
    background: var(--bg-lighter, #0C171A);
    display: flex;
    padding: 0 16px;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    user-select: none;
    height: 40px;
    gap: 10px;
}

.wallet p {
    color: var(--text-normal, #EEF1F8);
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: 120%;
    /* 16.8px */
    letter-spacing: 0.28px;
}

.theme {
    border-radius: 4px;
    background: var(--background-lighter, #091121);
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
}
</style>