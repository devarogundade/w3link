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
                                    <tr>
                                        <td>
                                            <div class="bridge_asset">
                                                <img class="bridge_asset_image"
                                                    :src="JSON.parse(decode(transaction.data).tokenUri).image" />
                                                <div class="bridge_asset_name">
                                                    <p>{{ JSON.parse(decode(transaction.data).tokenUri).name }}</p>
                                                    <p class="bridge_asset_name_id">{{ decode(transaction.data).tokenId }}
                                                        <OutIcon />
                                                    </p>
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <div class="time_created">
                                                <p>{{ $toDate(transaction.dispatchTimestamp) }}</p>
                                                <p>12:33:43 PM</p>
                                            </div>
                                        </td>
                                        <td>
                                            <div class="asset_status" v-if="transaction.status == 'DELIVERED'">
                                                <SuccessfulIcon />
                                                <p>Success</p>
                                            </div>
                                            <div class="asset_status" v-else-if="transaction.status == 'FAILED'">
                                                <FailedfulIcon />
                                                <p>Failed</p>
                                            </div>
                                            <div class="asset_status" v-else>
                                                <OngoingIcon />
                                                <p>Ongoing</p>
                                            </div>
                                        </td>
                                        <td>
                                            <div class="source_chain">
                                                <div class="chain">
                                                    <img :src="$chain(transaction.fromChainId).image" alt="">
                                                    <p>{{ $chain(transaction.fromChainId).name }}</p>
                                                </div>
                                                <a :href="`${$chain(transaction.fromChainId).scan}/tx/${transaction.fromHash}`"
                                                    target="_blank">
                                                    <p class="view_trx">
                                                        <OutIcon /> View Txn
                                                    </p>
                                                </a>
                                            </div>
                                        </td>
                                        <td>
                                            <div class="l_chain">
                                                <div class="dest_chain">
                                                    <div class="chain">
                                                        <p>{{ $chain(transaction.destChainId).name }}</p>
                                                        <img :src="$chain(transaction.destChainId).image" alt="">
                                                    </div>
                                                    <a :href="`${$chain(transaction.destChainId).scan}/tx/${transaction.toHash}`"
                                                        target="_blank">
                                                        <p class="view_trx">
                                                            View Txn
                                                            <OutIcon />
                                                        </p>
                                                    </a>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
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
import OngoingIcon from '../components/icons/OngoingIcon.vue'
import SuccessfulIcon from '../components/icons/SuccessfulIcon.vue'
import FailedfulIcon from '../components/icons/FailedfulIcon.vue'
</script>

<script>
import { fetchTransactions } from '../scripts/scan'
import { tryDecode } from '../scripts/token'
import OutIcon from '../components/icons/OutIcon.vue'

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
        decode: tryDecode,
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
                    const response = await fetchTransactions(this.$store.state.wallet.address, page)
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
    padding: 60px 0;
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
    padding: 30px 24px;
}

td:first-child {
    width: 340px;
}

td:nth-child(2) {
    width: 180px;
}

td:nth-child(3) {
    width: 180px;
}

td:nth-child(4) {
    width: 150px;
}

td:nth-child(5) {
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

.l_chain {
    display: flex;
    justify-content: flex-end;
}

.tbody {
    padding: 0 26px;
    height: 102px;
    width: 100%;
    margin-bottom: 3px;
    background: var(--bg-light, #050C17);
    display: flex;
    align-items: center;
}

.bridge_asset {
    display: flex;
    align-items: center;
    gap: 18px;
}

.bridge_asset_name p:first-child {
    color: var(--tx-normal, #EEF1F8);
    font-family: Matter;
    font-size: 14px;
    font-style: normal;
    font-weight: 600;
    line-height: 100%;
    /* 14px */
    letter-spacing: 0.28px;
}

.bridge_asset_name p:last-child {
    color: var(--tx-semi, #95979D);
    font-family: Matter;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 100%;
    /* 14px */
    letter-spacing: 0.28px;
    margin-top: 14px;
    display: flex;
    align-items: center;
    gap: 8px;
}

.time_created p:first-child {
    color: var(--tx-normal, #EEF1F8);
    font-family: Matter;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 100%;
    /* 14px */
    letter-spacing: 0.28px;
}

.asset_status {
    display: flex;
    align-items: center;
    gap: 10px;
    color: var(--tx-normal, #EEF1F8);
    font-family: Matter;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 100%;
    /* 14px */
    letter-spacing: 0.28px;
}

.view_trx {
    margin-top: 14px;
    color: var(--tx-semi, #8B909E);
    font-family: Matter;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 100%;
    /* 14px */
    letter-spacing: 0.28px;
    display: flex;
    align-items: center;
    gap: 8px;
}

.time_created p:last-child {
    color: var(--text-semi-d, #95979D);
    font-family: Matter;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 100%;
    /* 14px */
    letter-spacing: 0.28px;
    margin-top: 14px;
}

.bridge_asset_image {
    width: 54px;
    height: 54px;
    object-fit: cover;
}

.chain {
    display: flex;
    align-items: center;
    gap: 8px;
}

.chain p {
    color: var(--tx-normal, #EEF1F8);
    font-family: Matter;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 100%;
    /* 14px */
    letter-spacing: 0.28px;
}

.chain img {
    width: 14px;
    height: 14px;
    border-radius: 7px;
}
</style>