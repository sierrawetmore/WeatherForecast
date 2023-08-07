const express = require("express");
const request = require("request");
const cors = require("cors");
const app = express();

app.use(cors());

const port = process.env.port || 3001;

app.get("/geo/:address", (req, res, next) => {
  const address = req.params.address;
  let temp = `https://geocoding.geo.census.gov/geocoder/locations/onelineaddress?${address}&benchmark=2020&format=json`;

  request(temp, function (error, response, body) {
    res.send(body);
  });
});

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
