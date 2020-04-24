const express = require('express')
const bodyParser = require("body-parser")
const path = require("path")
const app = express()


app.use(express.static(path.join(__dirname, "../build")))
app.use("/rocketman", express.static(path.join(__dirname, 'game')))

app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "../build", "index.html"))
})

app.listen(process.env.PORT || 80, () => {console.log(`Listening on port: 80`)})