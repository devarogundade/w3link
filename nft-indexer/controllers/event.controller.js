const db = require("../models");

const NFT = db.nft;

exports.insertOrUpdate = async (event) => {
    NFT.findOneAndUpdate(
        {
            tokenAddress: event.tokenAddress,
            tokenId: event.tokenId
        },
        { $setOnInsert: event },
        {
            upsert: true,
            returnNewDocument: true,
            returnDocument: "after"
        }
    ).then(data => {
        console.log(data)
    }).catch(err => {
        console.error(err)
    })
}

exports.delete = async (event) => {
    NFT.findOneAndDelete(
        {
            tokenAddress: event.tokenAddress,
            tokenId: event.tokenId
        }
    ).then(data => {
        console.log(data)
    }).catch(err => {
        console.error(err)
    })
}

// Retrieve all NFT from the database.
exports.findAll = async (req, res) => {
    const { page = 1, limit = 100 } = req.query
    const owner = req.params.address

    const count = await NFT.countDocuments()

    NFT.find({ owner: owner })
        .limit(limit * 1)
        .skip((page - 1) * limit)
        .sort({ nonce: 'desc' })
        .then(data => {
            res.json({
                data,
                totalPages: Math.ceil(count / limit),
                total: count,
                currentPage: page
            })
        })
        .catch(err => {
            res.status(500).send({
                message: err || "Some err occurred."
            })
        })
};