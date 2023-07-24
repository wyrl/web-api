const express = require("express");
const app = express();
const hostname = "0.0.0.0";
const port = 8080;
const data = require("./data.json");
const bodyParser = require("body-parser");
const cors = require("cors");
const { exec } = require("child_process");

const fakeAuthorization = "dGVzdDpzZWNyZXQ=";

const CODE_UNAUTHORIZED = 401;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(
  cors({
    origin: "*",
    methods: "GET,POST",
  })
);

app.get("/movies", (req, res) => {
  res.json(data);
});

app.post("/add-movie", (req, res) => {
  const request_header = req.headers["authorization"];

  const body = req.body;

  if (request_header == fakeAuthorization) {
    data.push(body);
    res.json(body);
  } else {
    res.status(CODE_UNAUTHORIZED);
    res.send("Unauthorized");
  }
});

app.post("/add-encrypted-movie", async (req, res) => {
  const request_header = req.headers["authorization"];

  if (request_header == fakeAuthorization) {
    //data.push(body);
    //res.json(body);
    const {key, encryptedMovie} = req.body
    console.log({key, encryptedMovie});
    const decryptedData = await decrypt("secret", encryptedMovie)
    res.json(JSON.parse(decryptedData))
  } else {
    res.status(CODE_UNAUTHORIZED);
    res.send("Unauthorized");
  }
});

app.get("/execute-test", async (req, res) => {
  // decrypt("secret", "AI8mVvCIsj1hYeD3SEJZ8Q==")
  //   .then((result) => {
  //     console.log("Decrypted: " + result);
  //     res.status = 200
  //     res.send("success")
  //   }).catch((reason) => {
  //     res.status = 400
  //     res.send(reason)
  //   })
  
  const result = await decrypt("secret", "AI8mVvCIsj1hYeD3SEJZ8Q==123")

  console.log(result)
  res.send()
  
});

function decrypt(key, encryptedString) {
  return new Promise((resolve, reject) => {
    exec(
      `java util.Program ${key} ${encryptedString}`,
      (err, stdout, stderr) => {
        if (err) {
          console.log(`error: ${err.message}`);
          reject("invalid_decrypt");
          return;
        }

        if (stderr) {
          console.log(`stderr: ${stderr}`);
          reject("invalid_decrypt");
          return;
        }
        console.log(`stdout: ${stdout}`);
        resolve(stdout);
      }
    );
  });
}

app.listen(port, hostname, () => {
  console.log(`listening on port ${hostname}:${port}`);
});
