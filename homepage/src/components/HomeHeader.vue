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
                            <p>Docs</p>
                        </div>
                    </a>
                    <a target="_blank" href="https://github.com/devarogundade/w3link">
                        <div :class="'tab_item'">
                            <p>Github</p>
                        </div>
                    </a>
                    <a target="_blank" href="https://scan.w3-link.site">
                        <div :class="'tab_item'">
                            <p>Scan</p>
                            <OutIcon />
                        </div>
                    </a>
                    <a target="_blank" href="https://whirl.w3-link.site">
                        <div :class="'tab_item'">
                            <p>NFT Bridge</p>
                            <OutIcon />
                        </div>
                    </a>
                </div>
                <div class="connection">
                    <a href="https://docs.w3-link.site" target="_blank">
                        <div class="connection_action">
                            Start building
                        </div>
                    </a>
                </div>
            </header>
        </div>
    </section>
</template>

<script setup>
import OutIcon from './icons/OutIcon.vue';
import W3LinkLogo from './icons/W3LinkLogo.vue';
</script >

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
</style>