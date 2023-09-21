<template>
    <section id="section">
        <div class="app_width">
            <div class="container" v-if="!loading">
                <div class="transactions_rect">
                    <div class="transactions_rect_toolbar">
                        <p>Transactions</p>
                        <div class="sort">
                            <p>Sort by</p>
                            <SortIcon />
                        </div>
                    </div>

                    <div class="transactions_rect_box">
                        <div class="transaction_table">
                            <table>
                                <div class="thead">
                                    <thead>
                                        <tr>
                                            <td>Bridged asset</td>
                                            <td>Time Created</td>
                                            <td>Status</td>
                                            <td>Source Chain</td>
                                            <td>Destination Chain</td>
                                        </tr>
                                    </thead>
                                </div>
                            </table>
                            <div class="tbody" v-for="transaction, i in transactions" :key="i">
                                <tbody>
                                    <tr></tr>
                                </tbody>
                            </div>
                            <div class="empty" v-if="transactions.length == 0">
                                <img src="/images/empty.png" alt="">
                            </div>
                        </div>

                        <div class="transaction_navigation">
                            <div class="back" @click="back" :style="{ opacity: currentPage == 1 ? '0.3' : '1' }">
                                <ArrowLeftIcon />
                                <p>Back</p>
                            </div>

                            <div class="pages">
                                <div v-for="index in totalPages" @click="getMessages(index)"
                                    :class="currentPage == index ? 'page page_active' : 'page'" :key="index">
                                    {{ index }}
                                </div>
                            </div>

                            <div class="next" @click="next" :style="{ opacity: currentPage == totalPages ? '0.3' : '1' }">
                                <p>Next</p>
                                <ArrowRightIcon />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <Loadingbox v-if="loading" />
    </section>
</template>

<script setup>
import Loadingbox from '../components/LoadingBox.vue'
import SortIcon from '../components/icons/SortIcon.vue'
import ArrowRightIcon from '../components/icons/ArrowRightIcon.vue'
import ArrowLeftIcon from '../components/icons/ArrowLeftIcon.vue'
</script>

<script>
import { fetchTransactions } from '../scripts/scan'

export default {
    data() {
        return {
            transactions: [],
            currentPage: 1,
            totalPages: 1,
            loading: false
        }
    },
    methods: {
        back: function () {
            if (this.currentPage > 1) {
                this.getMessages(Number(this.currentPage) - 1)
            }
        },
        next: function () {
            if (this.currentPage < this.totalPages) {
                this.getMessages(Number(this.currentPage) + 1)
            }
        },
        getMessages: async function (page) {
            try {
                if (this.$store.state.wallet != '') {
                    // eslint-disable-next-line no-undef
                    const response = await fetctTransactions(this.$store.state.wallet.address, page)
                    this.transactions = response.data
                    this.currentPage = response.currentPage
                    this.totalPages = response.totalPages
                }
            } catch (error) {
                console.error(error);
            }
        }
    },
    async mounted() {
        this.loading = true
        await this.getMessages(this.currentPage)
        this.loading = false
    }
}
</script>

<style scoped>
.container {
    display: flex;
    justify-content: center;
    padding: 150px 0;
}

.transactions_rect {
    width: 900px;
    flex-shrink: 0;
}

.transactions_rect_toolbar {
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.transactions_rect_box {
    background: var(--bg-dark);
    overflow: hidden;
    border-radius: 16px;
    margin-top: 20px;
    border: 2px var(--bg-lighter, #091121) solid;
}

.transactions_rect_toolbar>p {
    color: var(--text-normal, #EEF1F8);
    font-size: 20px;
    font-style: normal;
    font-weight: 800;
    line-height: 120%;
    /* 24px */
    letter-spacing: 0.4px;
}

.transactions_rect_toolbar .sort {
    display: inline-flex;
    padding: 9px 16px;
    justify-content: center;
    align-items: center;
    gap: 10px;
    border-radius: 4px;
    background: var(--bg-lighter, #0C171A);
}

.transactions_rect_toolbar .sort p {
    color: var(--tx-semi, #95979D);
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: 100%;
    /* 14px */
    letter-spacing: 0.28px;
}

table {
    width: 100%;
}

.thead {
    padding: 26px 30px;
}

thead td:first-child,
tbody td:first-child {
    width: 340px;
}

thead td:nth-child(2),
tbody td:nth-child(2) {
    width: 180px;
}

thead td:nth-child(3),
tbody td:nth-child(3) {
    width: 180px;
}

thead td:nth-child(4),
tbody td:nth-child(4) {
    width: 150px;
}

thead td:nth-child(5),
tbody td:nth-child(5) {
    width: 150px;
    text-align: right;
}


thead td {
    color: var(--tx-semi, #95979D);
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: 100%;
    /* 14px */
    letter-spacing: 0.28px;
}

.transaction_navigation {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 26px;
    background: var(--bg-lighter, #091121);
}

.transaction_navigation .pages {
    width: 240px;
    gap: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
}

.transaction_navigation .page {
    width: 30px;
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--tx-semi, #8B909E);
    text-align: center;
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: 100%;
    /* 14px */
    letter-spacing: 0.28px;
    cursor: pointer;
    background: var(--bg-lightest, #0C171A);
}


.transaction_navigation .page_active {
    border-radius: 2px;
    background: var(--bg-light, #0C171A);
    color: var(--tx-normal, #EEF1F8);
}

.transaction_navigation .next,
.transaction_navigation .back {
    display: flex;
    align-items: center;
    color: var(--tx-semi, #8B909E);
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: 100%;
    /* 14px */
    gap: 10px;
    letter-spacing: 0.28px;
    padding: 0 16px;
    cursor: pointer;
    background: var(--bg-lightest, #0C1A33);
    height: 38px;
    border-radius: 4px;
}

.tbody {
    padding: 30px 0;
    width: 100%;
    border-image: linear-gradient(to right, var(--pr-light) 3%, var(--bg-lighter) 3%, var(--bg-lighter) 97%, var(--pr-light) 97%) 1;
    border-bottom-width: 1px;
    border-bottom-style: solid;
}


.tbody:last-child {
    border-bottom: 1px solid var(--bg-lighter, #0C171A);
}


tbody {
    width: 100%;
}

.route {
    display: flex;
    align-items: center;
    gap: 16px;
}

.route .images {
    display: flex;
    padding: 8px;
    justify-content: center;
    align-items: center;
    gap: 6px;
    border-radius: 4px;
    background: var(--bg-lighter, #0C171A);
    width: 92px;
}

.route .name {
    color: var(--text-normal, #EEF1F8);
    font-size: 14px;
    font-style: normal;
    font-weight: 800;
    line-height: 100%;
    /* 14px */
    letter-spacing: 0.28px;
}

.route .timestamp {
    display: flex;
    align-items: center;
    margin-top: 6px;
    gap: 8px;
    color: var(--text-semi-d, #95979D);
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: 100%;
    /* 14px */
    letter-spacing: 0.28px;
}

.route .images img {
    width: 24px;
    height: 24px;
    border-radius: 12px;
}

.status {
    display: flex;
    align-items: center;
    gap: 8px;
}

.status p {
    color: var(--text-normal, #EEF1F8);
    font-size: 12px;
    font-style: normal;
    font-weight: 500;
    line-height: 100%;
    /* 12px */
    letter-spacing: 0.24px;
}

.processing_dot {
    background: rgba(188, 254, 47, 0.06);
}


.dot {
    border-radius: 4px;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 8px;
    width: 22px;
    height: 22px;
}

.chain {
    display: flex;
    align-items: center;
    gap: 6px;
    margin-top: 12px;
}

.chain p {
    color: var(--text-dimmed, #66676C);
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: 100%;
    /* 14px */
    letter-spacing: 0.28px;
}

.chain img {
    width: 12px;
    height: 12px;
    border-radius: 6px;
}

.chain>svg {
    margin-left: 2px;
}

.source_txn>p,
.destination_txn>p {
    color: var(--text-normal, #EEF1F8);
    font-size: 14px;
    font-style: normal;
    font-weight: 800;
    line-height: 100%;
    /* 14px */
    letter-spacing: 0.28px;
}

.source_txn>p span,
.destination_txn>p span {
    color: var(--text-dimmed, #66676C);
}
</style>