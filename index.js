const express = require('express')
const app = express()
const port = 8080
const data = require('./data.json');
const bodyParser = require('body-parser');

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.get('/list', (req, res) => {
  res.json(data);
})

app.post('/add', (req, res) => {

  const body = req.body;
  data.push(body);

  res.send("Added Successfully.");
});

app.listen(port, () => {
  console.log(`listening on port ${port}`)
})