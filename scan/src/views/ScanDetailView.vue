<template>
    <section id="section">
        <div class="app_width">
            <div class="title">
                <h3>Message Details</h3>
                <div class="hash">
                    <p>{{ bridgeHash }}</p>
                    <CopyIcon />
                </div>
            </div>

            <LoadingBox v-if="loading" />

            <div class="event" v-else-if="event != null">
                <table>
                    <div class="tbody">
                        <tbody>
                            <tr>
                                <td>Message hash:</td>
                                <td class="nonce">{{ event.hash }}</td>
                            </tr>
                        </tbody>
                    </div>
                    <div class="tbody">
                        <tbody>
                            <tr>
                                <td>Status:</td>
                                <td>
                                    <div class="status" v-if="event.status == 'DISPATCHED'">
                                        <OngoingIcon />
                                        <p>Pending</p>
                                    </div>
                                    <div class="status" v-if="event.status == 'PROCESSING'">
                                        <OngoingIcon />
                                        <p>Processing</p>
                                    </div>
                                    <div class="status" v-if="event.status == 'DELIVERED'">
                                        <SuccessfulIcon />
                                        <p>Successful</p>
                                    </div>
                                    <div class="status" v-if="event.status == 'FAILED'">
                                        <FailedfulIcon />
                                        <p>Failed</p>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </div>
                    <div class="tbody">
                        <tbody>
                            <tr>
                                <td>Source transaction hash:</td>
                                <td>
                                    <a v-if="event.fromHash"
                                        :href="`${$chain(event.fromChainId).scan}/tx/${event.fromHash}`" target="_blank">
                                        <div class="hash">
                                            <div class="img"><img :src="$chain(event.fromChainId).image" alt=""></div>
                                            <p>{{ event.fromHash }}</p>
                                            <OutIcon v-if="event.fromHash != ''" />
                                        </div>
                                    </a>
                                    <div class="hash" v-else>
                                        <div class="img"><img :src="$chain(event.fromChainId).image" alt=""></div>
                                        <p>--------</p>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </div>
                    <div class="tbody">
                        <tbody>
                            <tr>
                                <td>Destination transaction hash:</td>
                                <td>
                                    <a v-if="event.toHash" :href="`${$chain(event.destChainId).scan}/tx/${event.toHash}`"
                                        target="_blank">
                                        <div class="hash">
                                            <div class="img"><img :src="$chain(event.destChainId).image" alt=""></div>
                                            <p>{{ event.toHash }}</p>
                                            <OutIcon v-if="event.toHash != ''" />
                                        </div>
                                    </a>
                                    <div class="hash" v-else>
                                        <div class="img"><img :src="$chain(event.destChainId).image" alt=""></div>
                                        <p>--------</p>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </div>
                    <div class="tbody">
                        <tbody>
                            <tr>
                                <td>Source user application:</td>
                                <td>
                                    <a :href="`${$chain(event.fromChainId).scan}/address/${event.fromContractId}`"
                                        target="_blank">
                                        <div class="hash">
                                            <div class="img"><img :src="$chain(event.fromChainId).image" alt=""></div>
                                            <p>{{ event.fromContractId }}</p>
                                            <OutIcon />
                                        </div>
                                    </a>
                                </td>
                            </tr>
                        </tbody>
                    </div>
                    <div class="tbody">
                        <tbody>
                            <tr>
                                <td>Destination user application:</td>
                                <td>
                                    <a :href="`${$chain(event.destChainId).scan}/address/${event.destContractId}`"
                                        target="_blank">
                                        <div class="hash">
                                            <div class="img"><img :src="$chain(event.destChainId).image" alt=""></div>
                                            <p>{{ event.destContractId }}</p>
                                            <OutIcon />
                                        </div>
                                    </a>
                                </td>
                            </tr>
                        </tbody>
                    </div>
                    <div class="tbody">
                        <tbody>
                            <tr>
                                <td>Message fee:</td>
                                <td>
                                    <div class="token">
                                        <div class="img"><img :src="$chain(event.fromChainId).image" alt=""></div>
                                        <p v-if="$chain(event.fromChainId).id == 0">{{ $fromWei(event.bridgeFee *
                                            1_000_000_000) }} <span>{{ $chain(event.fromChainId).symbol }}</span></p>
                                        <p v-else>{{ $fromWei(event.bridgeFee) }} <span>{{
                                            $chain(event.fromChainId).symbol }}</span></p>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </div>
                    <div class="tbody">
                        <tbody>
                            <tr>
                                <td>Message Id:</td>
                                <td>
                                    <div class="hash">
                                        <p>{{ event.bridgeHash }}</p>
                                        <CopyIcon />
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </div>
                    <div class="tbody">
                        <tbody>
                            <tr>
                                <td>Created:</td>
                                <td class="time">{{ format(event.dispatchTimestamp) }}, {{
                                    $toDate(event.dispatchTimestamp).replace(',', '') }}</td>
                            </tr>
                        </tbody>
                    </div>
                    <div class="tbody">
                        <tbody>
                            <tr>
                                <td>Payload:</td>
                                <td>
                                    <div class="payload">
                                        <p>{{ event.data }}</p>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </div>
                </table>
            </div>
        </div>
    </section>
</template>

<script setup>
import FailedfulIcon from '../../../whirl/src/components/icons/FailedfulIcon.vue';
import OngoingIcon from '../../../whirl/src/components/icons/OngoingIcon.vue';
import SuccessfulIcon from '../../../whirl/src/components/icons/SuccessfulIcon.vue';
import CopyIcon from '../components/icons/CopyIcon.vue'
import LoadingBox from '../components/LoadingBox.vue';
import OutIcon from '../components/icons/OutIcon.vue'
</script>

<script>
import { fetchTransaction } from '../scripts/scan';
import { format } from 'timeago.js';
export default {
    data() {
        return {
            loading: true,
            event: null,
            bridgeHash: this.$route.params.id
        }
    },
    mounted() {
        this.getEvent()
    },
    methods: {
        format: format,
        getEvent: async function () {
            this.loading = true
            this.event = await fetchTransaction(this.bridgeHash)
            this.loading = false
        }
    }
}
</script>

<style scoped>
#section {
    margin-top: 150px;
    padding-bottom: 60px;
}

.title {
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.title h3 {
    color: var(--tx-normal, #EEF1F8);
    font-size: 20px;
    font-style: normal;
    font-weight: 600;
    line-height: 120%;
    /* 24px */
    letter-spacing: 0.4px;
}

.title .hash {
    display: flex;
    align-items: center;
    gap: 16px;
}

.title .hash p {
    color: var(--tx-semi, #8B909E);
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 100%;
    /* 14px */
    letter-spacing: 0.28px;
}

.title .hash svg {
    border-radius: 4px;
    background: var(--bg-lighter, #091121);
    padding: 10px;
    width: 40px;
    height: 40px;
}


.event {
    border-radius: 8px;
    border: 2px solid var(--bg-lighter, #0C171A);
    background: var(--bg-light, #0C171A);
    width: 100%;
    margin-top: 30px;
}

table {
    width: 100%;
}

.tbody {
    border-bottom: 2px solid var(--bg);
    padding: 0 26px;
}

tbody {
    height: 70px;
}

td:first-child {
    width: 325px;
    color: var(--text-semi-d, #95979D);
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: 100%;
    /* 14px */
    letter-spacing: 0.28px;
}

.tbody .hash {
    display: flex;
    align-items: center;
    gap: 10px;
}

.tbody .hash .img {
    border-radius: 4px;
    background: var(--bg-lightest, #11282E);
    width: 22px;
    height: 22px;
    display: flex;
    align-items: center;
    justify-content: center;
}

.tbody .hash img {
    width: 16px;
    height: 16px;
    border-radius: 8px;
}

.tbody .hash p {
    color: var(--tx-normal, #EEF1F8);
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: 100%;
    /* 14px */
    letter-spacing: 0.28px;
}


.token {
    display: flex;
    align-items: center;
    gap: 10px;
}

.token .img {
    border-radius: 4px;
    background: var(--bg-lightest, #11282E);
    width: 22px;
    height: 22px;
    display: flex;
    align-items: center;
    justify-content: center;
}

.token img {
    width: 16px;
    height: 16px;
    border-radius: 8px;
}

.token p {
    color: var(--tx-normal, #EEF1F8);
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: 100%;
    /* 14px */
    letter-spacing: 0.28px;
}

.tbody p span {
    color: var(--text-semi-d, #95979D);
}

.hash svg {
    width: 16px;
    height: 16px;
}

.nonce,
.time {
    color: var(--tx-normal, #EEF1F8);
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: 100%;
    /* 14px */
    letter-spacing: 0.28px;
}


.status {
    display: flex;
    align-items: center;
    gap: 8px;
}

.status p {
    color: var(--tx-normal, #EEF1F8);
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 100%;
    /* 14px */
    letter-spacing: 0.28px;
}


.payload {
    border-radius: 4px;
    border: 1px solid var(--bg-lightest, #11282E);
    background: var(--bg-light, #0D1112);
    padding: 16px 150px 16px 20px;
    margin: 28px 0;
    width: 900px;
}

.payload p {
    color: var(--text-semi-d, #95979D);
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: 150%;
    /* 21px */
    letter-spacing: 0.28px;
    word-wrap: break-word;
}
</style>