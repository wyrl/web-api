const express = require('express')
const app = express()
const port = 8080
const data = require('./data.json');

app.get('/', (req, res) => {
  res.send(data)
})

app.listen(port, () => {
  console.log(`listening on port ${port}`)
})