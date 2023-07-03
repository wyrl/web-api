const express = require("express");
const app = express();
const port = 8080;
const data = require("./data.json");
const bodyParser = require("body-parser");

const fakeAuthorization = "dGVzdDpzZWNyZXQ=";

const CODE_UNAUTHORIZED = 401;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/list", (req, res) => {
  res.json(data);
});

app.post("/add", (req, res) => {
  const request_header = req.headers["authorization"];

  const body = req.body;

  if (request_header == fakeAuthorization) {
    data.push(body);
    res.send("Added Successfully.");
  } else {
    res.status(CODE_UNAUTHORIZED);
    res.send("Unauthorized");
  }
});

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
