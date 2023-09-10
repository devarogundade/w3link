import Utils from '../scripts/utils'
import Converter from '../scripts/converter'
import Countdown from '../scripts/countdown'

export default {
    // eslint-disable-next-line no-unused-vars
    install: (app, options) => {
        app.config.globalProperties.$chains = Utils.chains,
        app.config.globalProperties.$chain = (id) => {
            return Utils.chain(id)
        },
        app.config.globalProperties.$toMoney = (value, max) => {
            return Converter.toMoney(value, max);
        },
        app.config.globalProperties.$nFormat = (value, digits = 2) => {
            return Converter.nFormatter(value, digits)
        },
        app.config.globalProperties.$fromWei = (value) => {
            return Converter.fromWei(value)
        },
        app.config.globalProperties.$toWei = (value) => {
            return Converter.toWei(value)
        },
        app.config.globalProperties.$toDate = (value) => {
            return Countdown.toDate(value)
        }
    }
  }