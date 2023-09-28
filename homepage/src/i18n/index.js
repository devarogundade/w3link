import { createI18n } from "vue-i18n";

const messages = {
    en: {
        header: {
            docs: "Docs",
            github: "Github",
            scan: "Scan",
            nftBridge: "NFT Bridge",
            startBuilding: "Start Building"
        },
        hero: {
            title: "Cross-chain interoperability protocol for PEGO.",
            description: "W3link is enabling Web3 applications on PEGO go cross-chain, by powering seamless transfer of data from other blockchains and vice versa.",
            button1: "Build with W3Link",
            button2: "Ecosystem DApps",
            scroll: "Scroll"
        },
        what: {
            title: "What w3link offers",
            items: [
                {
                    title: "Seamlessly Transfer data",
                    description: "By making relaying of arbitrary data across multiple blockchains effortless, Dapps on PEGO can easily maximize their functionalities by going cross-chain."
                },
                {
                    title: "Access services interoperably",
                    description: "Easily integrate and access yet available blockchain services on PEGO, in an interoperable way through our list of provided cross-chain accessible services."
                },
                {
                    title: "One integration for multiple chain support",
                    description: "Integrating your Dapp with w3link readily unlock it's support for other blockchain i.e BNB chain, Polygon, Fantom, avalanche and more."
                }                
            ],
            learnMore: "Learn more"
        },
        features: {
            titleA: "See W3link in Action?",
            titleB: "Meet Whirl.",
            description: "Harnessing the crosschain interoperability provided by W3link, Whirl moves NFT assets across PEGO and other blockchains.",
            tryItOut: "Try it Out"
        },
        services: {
            title: "Provided Cross-chain Services",
            description: "To provide for the needs of the existing and next big Web3 dApps on PEGO, W3link eases their access to services available on other blockchains.",
            button: "See Docs",
            serviceName: "Service Name",
            uses: "Uses",
            provider: "Provider",
            info: "Info",
            items: [
                {
                    name: "W3Link VRF",
                    description: "Access verified randomness without compromising security or usability.",
                    provider: "ChainLink"
                },
                {
                    name: "W3Link API",
                    description: "Enables you to access external data sources like weather forecast, and sport prediction on chain.",
                    provider: "ChainLink"
                }
            ]
        }
    },
    ch: {
        header: {
            docs: "Docs",
            github: "Github",
            scan: "Scan",
            nftBridge: "NFT Bridge",
            startBuilding: "开始建造"
        },
        hero: {
            title: "跨链互操作性 PEGO 协议",
            description: "W3link 通过支持来自其他区块链的数据无缝传输（反之亦然），使 PEGO go 上的 Web3 应用程序能够跨链",
            button1: "使用 W3link 构建",
            button2: "生态系统 DApp",
            scroll: "滚动"
        },
        what: {
            title: "w3link 提供什么",
            items: [
                {
                    title: "无缝传输数据",
                    description: "通过轻松跨多个区块链中继任意数据，PEGO 上的 Dapp 可以通过跨链轻松最大化其功能"
                },
                {
                    title: "以互操作方式访问服务",
                    description: "通过我们提供的跨链可访问服务列表，以可互操作的方式轻松集成和访问 PEGO 上可用的区块链服务"
                },
                {
                    title: "一次集成即可支持多链",
                    description: "将您的 Dapp 与 w3link 集成可以轻松解锁其对其他区块链的支持，即 BNB 链、Polygon、Fantom、avalanche 等"
                }                
            ],
            learnMore: "了解更多"
        },
        features: {
            titleA: "看到 W3link 的实际应用吗",
            titleB: "认识惠尔",
            description: "Whirl 利用 W3link 提供的跨链互操作性，在 PEGO 和其他区块链之间移动 NFT 资产",
            tryItOut: "试试看"
        },
        services: {
            title: "提供跨链服务",
            description: "为了满足 PEGO 上现有和下一个大型 Web3 dApp 的需求，W3link 简化了他们对其他区块链上可用服务的访问",
            button: "查看文档",
            serviceName: "Service Name",
            uses: "Uses",
            provider: "Provider",
            info: "Info",
            items: [
                {
                    name: "W3Link VRF",
                    description: "访问经过验证的随机性，而不影响安全性或可用性",
                    provider: "ChainLink"
                },
                {
                    name: "W3Link API",
                    description: "使您能够访问 Chainlink 预言机网络提供的任何外部数据源",
                    provider: "ChainLink"
                }
            ]
        }
    }
}

export default createI18n({
    locale: import.meta.env.VITE_DEFAULT_LOCALE,
    fallbackLocale: import.meta.env.VITE_FALLBACK_LOCALE,
    legacy: false,
    globalInjection: true,
    messages
})