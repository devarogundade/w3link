module.exports = mongoose => {
    const schema = mongoose.Schema({
        tokenAddress: String,
        tokenId: Number,
        chainId: Number,
        tokenUri: String,
        owner: String
    }, { timestamps: false });

    return mongoose.model("nfts-mainnet", schema);
};