<template>
    <section id="section">
        <div class="app_width">
            <header>
                <div class="logo">
                    <W3LinkLogo />
                </div>
                <div class="tabs">
                    <a target="_blank" href="https://docs.w3-link.site">
                        <div :class="'tab_item'">
                            <p>{{ $t("header.docs") }}</p>
                        </div>
                    </a>
                    <a target="_blank" href="https://github.com/devarogundade/w3link">
                        <div :class="'tab_item'">
                            <p>{{ $t("header.github") }}</p>
                        </div>
                    </a>
                    <a target="_blank" href="https://scan.w3-link.site">
                        <div :class="'tab_item'">
                            <p>{{ $t("header.scan") }}</p>
                            <OutIcon />
                        </div>
                    </a>
                    <a target="_blank" href="https://whirl.w3-link.site">
                        <div :class="'tab_item'">
                            <p>{{ $t("header.nftBridge") }}</p>
                            <OutIcon />
                        </div>
                    </a>
                </div>
                <div class="connection">
                    <a href="https://docs.w3-link.site" target="_blank">
                        <div class="connection_action">
                            <p>{{ $t("header.startBuilding") }}</p>
                        </div>
                    </a>

                    <div class="current_lang" @click="switching = !switching">
                        <img :src="`/images/${aciveCode}.png`" alt="">
                        <WalletDownIcon />

                        <div class="langs" v-if="switching">
                            <div class="lang" v-for="lang, i in languages" :key="i" @click="switchLanguage(lang)">
                                <img :src="`/images/${lang.code}.png`" alt="">
                                <p>{{ lang.name }}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
        </div>
    </section>
</template>

<script setup>
import WalletDownIcon from './icons/WalletDownIcon.vue';
import OutIcon from './icons/OutIcon.vue';
import W3LinkLogo from './icons/W3LinkLogo.vue';
</script >

<script>
import i18n from "@/i18n"
import { notify } from '../reactives/notify';
export default {
    data() {
        return {
            switching: false,
            aciveCode: i18n.global.locale.value,
            languages: [
                {
                    name: 'English',
                    code: 'en',
                    active: true
                },
                {
                    name: 'Chinese',
                    code: 'ch',
                    active: true
                },
                {
                    name: 'Korean',
                    code: 'kr',
                    active: false
                },
                {
                    name: 'Thai',
                    code: 'th',
                    active: false
                }
            ]
        }
    },
    methods: {
        switchLanguage(lang) {
            if (!lang.active) {
                notify.push({
                    title: "Language support coming soon.",
                    description: "We are working to make W3Link accessible for you!",
                    category: "error"
                })
                return
            }

            i18n.global.locale.value = lang.code
            this.aciveCode = lang.code
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
    flex-shrink: 0;
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

.connection_action {
    border-radius: 4px;
    border: 2px solid var(--background-lightest, #0C1A33);
    background: var(--background-lighter, #091121);
    width: 186px;
    height: 46px;
    display: flex;
    justify-content: center;
    align-items: center;

    color: var(--tx-normal, #EEF1F8);
    text-align: center;

    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 100%;
    /* 16px */
    letter-spacing: 0.64px;

    user-select: none;
    cursor: pointer;
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

.current_lang {
    width: 46px;
    height: 46px;
    border-radius: 4px;
    background: var(--bg-lightest, #0C1A33);
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    cursor: pointer;
}

.current_lang svg {
    position: absolute;
    bottom: 2px;
    right: 2px;
}

.langs {
    border-radius: 4px;
    border: 2px solid var(--bg-lighter, #091121);
    background: var(--bg-light, #050C17);
    overflow: hidden;
    width: 184px;
    position: absolute;
    top: 56px;
    right: 0;
    z-index: 1;
}

.lang {
    display: flex;
    align-items: center;
    gap: 8px;
    height: 64px;
    border-bottom: 2px solid var(--bg-lighter, #091121);
    padding: 0 20px;
    cursor: pointer;
}

.lang:hover {
    background: var(--bg-lighter, #050C17);
}

.lang:last-child {
    border: none;
}

.lang p {
    color: var(--tx-normal, #EEF1F8);
    font-size: 16px;
    font-style: normal;
    font-weight: 500;
    line-height: 100%;
    /* 16px */
    letter-spacing: 0.32px;
}
</style>