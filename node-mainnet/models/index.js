const dbConfig = require("../configs/db.config.js");

const mongoose = require("mongoose");
mongoose.set('strictQuery', true);

mongoose.Promise = global.Promise;

const db = {}

db.mongoose = mongoose;
db.url = dbConfig.url;

db.event = require("./events.model.js")(mongoose);

module.exports = db;