module.exports = mongoose => {
    const schema = mongoose.Schema({
        bridgeHash: String,
        status: String,
        fromHash: String,
        toHash: String,
        dispatchTimestamp: Number,
        deliveredTimestamp: Number,
        validator: String,
        sncAddress: String,
        bridgeFee: String,
        bridgeNumber: String,
        hash: String,
        fromChainId: Number,
        fromContractId: String,
        destChainId: String,
        destContractId: String,
        data: String,
        extra: String
    }, { timestamps: false });

    return mongoose.model("events-mainnet", schema);
};