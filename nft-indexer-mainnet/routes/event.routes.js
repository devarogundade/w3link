module.exports = app => {
    const controller = require("../controllers/event.controller.js")
    const router = require("express").Router()

    // read events
    router.get("/:address/nfts", controller.findAll)

    app.use("/", router);
};