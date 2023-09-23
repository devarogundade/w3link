const express = require("express")
const cors = require("cors")

const app = express()

var corsOptions = {
    // origin: "http://localhost:8081"
}

app.use(cors(corsOptions))

// parse requests of content-type - application/json
app.use(express.json())

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }))

const db = require("./models")
db.mongoose
    .connect(db.url, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {
        console.log("Connected to the database!")
        require("./jobs/transaction")
        require("./jobs/indexer")
    })
    .catch(err => {
        console.log("Cannot connect to the database!", err)
        process.exit()
    })
    
    app.get("/", (req, res) => {
        res.json({ message: "W3Link RPC Node V1" })
    })
    
    require("./routes/event.routes")(app)

// set port, listen for requests
const PORT = process.env.PORT || 8081
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`)
})