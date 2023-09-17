<template>
    <section id="section">
        <div class="app_width">
            <div class="explore">
                <div class="explore_title">
                    <h3>Explore W3link Messages</h3>
                    <p>Track all cross-chain messages passed by W3link across PEGO, Polygon, BNB Chain, Fantom and more.</p>
                </div>

                <div class="explore_stat">
                    <div class="explore_stat_title">
                        <p>Latest Messages</p>
                        <p>Latest 10 out of <span>148,486</span></p>
                    </div>

                    <div class="search">
                        <input type="text" v-model="search" placeholder="Search by Msg Id or Transaction hash">
                        <div @click="goSearch" class="search_action">
                            <SearchIcon />
                        </div>
                    </div>
                </div>

                <div class="explore_table"></div>
            </div>
        </div>
    </section>
</template>

<script setup>
import SearchIcon from '../components/icons/SearchIcon.vue'
</script >

<script>
// import { fetchMessages, fineHash } from '../scripts/explorer';
// import { notify } from '../reactives/notify'
// import { format } from 'timeago.js';
export default {
    data() {
        return {
            search: '',
            loading: false,
            messages: [],
            total: 0
        }
    },
    mounted() {
        // this.getMessages()
    },
    methods: {
        // getMessages: async function () {
        //     this.loading = true
        //     const response = await fetchMessages()
        //     this.messages = response.data
        //     this.total = response.total
        //     this.loading = false
        // },
        // goSearch: function () {
        //     if (this.search == '') {
        //         notify.push({
        //             title: 'Enter Msg Id or Txn Id',
        //             description: 'Field is required!',
        //             category: 'error'
        //         })
        //         return
        //     }

        //     this.$router.push(`/messages/${this.search}`)
        // }
    }
}
</script>

<style scoped>
.explore {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 170px;
    padding-bottom: 50px;
}

.explore_title {
    text-align: center;
    width: 560px;
}

.explore_title h3 {
    color: var(--tx-normal, #EEF1F8);
    
    font-size: 34px;
    font-style: normal;
    font-weight: 600;
    line-height: 120%;
    /* 40.8px */
    letter-spacing: 0.68px;
}

.explore_title p {
    margin-top: 26px;
    color: var(--tx-semi, #8B909E);
    text-align: center;
    
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 160%;
    /* 25.6px */
}

.explore_stat {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    margin-top: 120px;
}

.explore_stat_title p:first-child {
    color: var(--tx-normal, #EEF1F8);
    
    font-size: 20px;
    font-style: normal;
    font-weight: 600;
    line-height: 120%;
    /* 24px */
    letter-spacing: 0.4px;
}

.explore_stat_title p:last-child {
    margin-top: 8px;
    color: var(--tx-dimmed, #5C5E66);
    
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 120%;
    /* 16.8px */
}

.explore_stat_title p:last-child span {
    color: var(--pr-dimmed, #C0B477);
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
</style>