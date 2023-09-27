import './assets/main.css'

import { createApp } from 'vue'
import { createStore } from 'vuex'

import App from './App.vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import router from './router'
import utils from './plugins/utils'

const store = createStore({
    state() {
        return {
            activeChainId: 20201022,
            wallet: { 
                isConnected: false, 
                isConnecting: false, 
                isDisconnected: true, 
                isReconnecting: false, 
                status: "disconnected"
            },
        }
    },
    mutations: {
        setWallet(state, wallet) {
            state.wallet = wallet;
        },
        setActiveChainId(state, chainId) {
            state.activeChainId = chainId
        }
    }
})

const app = createApp(App)

app.use(router)
app.use(VueAxios, axios)
app.use(utils)
app.use(store)

app.mount('#app')
