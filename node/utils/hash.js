module.exports = {
    newHash: function () {
        const seed0 = (Math.random() + 1).toString(12).replace('.', '')
        const seed1 = (Math.random() + 1).toString(24).replace('.', '')
        const seed2 = (Math.random() + 1).toString(36).replace('.', '')
        return `msg_${seed0}${seed1}${seed2}`
    }
}