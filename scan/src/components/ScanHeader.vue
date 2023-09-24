<template>
    <section id="section">
        <div class="app_width">
            <header>
                <div class="tabs" :style="$route.name == 'scan' ? { width: '100%', justifyContent: 'space-between' } : {}">
                    <div class="logo">
                        <ScanLogo />
                    </div>

                    <div class="items" :style="{ display: 'flex', gap: '60px' }">
                        <RouterLink to="/">
                            <div class="tab_item">
                                <p>Home</p>
                            </div>
                        </RouterLink>
                        <a target="_blank" href="https://docs.w3-link.site">
                            <div :class="'tab_item'">
                                <p>Docs</p>
                            </div>
                        </a>
                        <a target="_blank" href="https://testnet-whirl.w3-link.site">
                            <div :class="'tab_item'">
                                <p>NFT Bridge</p>
                                <OutIcon />
                            </div>
                        </a>
                    </div>

                    <div class="connection" style="width: 190px;" v-if="$route.name == 'scan'">
                        <div class="theme">
                            <SunIcon />
                        </div>
                    </div>
                </div>
                <div class="connection" v-if="$route.name == 'scan-detail'">
                    <div class="search">
                        <input type="text" v-model="search" placeholder="Search by Msg Id or Transaction hash">
                        <div @click="goSearch" class="search_action">
                            <SearchIcon />
                        </div>
                    </div>

                    <div class="theme">
                        <SunIcon />
                    </div>
                </div>
            </header>
        </div>
    </section>
</template>

<script setup>
import ScanLogo from '../components/icons/ScanLogo.vue'
import SearchIcon from '../components/icons/SearchIcon.vue'
import SunIcon from '../components/icons/SunIcon.vue'
import OutIcon from './icons/OutIcon.vue';
</script >

<script>
import { notify } from '../reactives/notify'
export default {
    data() {
        return {
            search: ''
        }
    },
    methods: {
        goSearch: function () {
            if (this.search == '') {
                notify.push({
                    title: 'Enter Msg Id or Txn Hash',
                    description: 'Field is required!',
                    category: 'error'
                })
                return
            }

            this.$router.push(`/${this.search}`)
            this.search = ''
        }
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
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.logo {
    width: 190px;
}

.connection {
    display: flex;
    align-items: center;
    gap: 20px;
    justify-content: flex-end;
}


.search {
    display: flex;
    align-items: center;
    border-radius: 4px;
    border: 1px solid var(--bg-lightest, #0C1A33);
    background: var(--bg-dark, #04080D);
    overflow: hidden;
}

.search input {
    background: none;
    border: none;
    width: 320px;
    height: 40px;
    padding: 0 16px;
    align-items: center;
    flex-shrink: 0;
    outline: none;
    color: var(--tx-normal);
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: 100%;
    /* 14px */
    letter-spacing: 0.28px;
}

.search_action {
    background: var(--bg-lightest, #B1CC8F);
    height: 40px;
    width: 40px;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
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
    line-height: 16px;
}

.tab_item_active p {
    color: var(--text-normal, #EEF1F8);
}


a .tab_item {
    display: flex;
    align-items: center;
    gap: 12px;
}

a .tab_item svg {
    margin-top: 2px;
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