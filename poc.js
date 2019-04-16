const express = require('express')
const app = express()
const path = require('path')
const unirest = require('unirest')

unirest.get('https://listen-api.listennotes.com/api/v2/genres')
  .header('X-ListenAPI-Key', 'df334dfd2a89476ab03f913386fc05c2')
  .end(function (response) {
    console.log(response.body);
})

app.use(express.static(path.join(__dirname, 'dist')))
app.use(express.static(path.join(__dirname, 'node_modules')))

const port = 2100
app.listen(port, function () {
    console.log(`Server running on ${port}`)
})
