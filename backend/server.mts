const express = require('express')
const bodyParser = require("body-parser")
const path = require("path")
const app = express()

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, "RocketMan", "index.html"))
})

app.use(express.static(path.join(__dirname, "../build")))
app.get("/app", function (req, res) {
  res.sendFile(path.join(__dirname, "../build", "index.html"))
})

app.listen(process.env.PORT || 8080, () => {console.log(`Listening on port: 8080`)})