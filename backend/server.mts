const express = require('express')
const bodyParser = require("body-parser")
const path = require("path")
const app = express()


app.use("/rocketman", express.static(path.join(__dirname, 'game', 'rocketman')))
app.use("/piggyattack", express.static(path.join(__dirname, 'game', 'piggyattack')))

app.use(express.static(path.join(__dirname, "../build")))
app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "../build", "index.html"))
})

app.listen(process.env.PORT || 8080)