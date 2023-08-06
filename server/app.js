const express = require("express");
const request = require("request");
const cors = require("cors");
const app = express();

app.use(cors());

const port = process.env.port || 3001;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

// app.get("/geo", (req, res) => {
//   res.send("Going Geo");
// });
//4600 Silver Hill Rd Washington DC 20233
// TODO: rename these
app.get("/api/:address", (req, res, next) => {
  //   let temp =
  //     "https://geocoding.geo.census.gov/geocoder/locations/onelineaddress?";
  const address = req.params.address;
  let temp =
    // "https://geocoding.geo.census.gov/geocoder/locations/onelineaddress?address=4600+Silver+Hill+Rd%2C+Washington%2C+DC+20233&benchmark=2020&format=json";
    // `https://geocoding.geo.census.gov/geocoder/locations/onelineaddress?
    // address=4600+Silver+Hill+Rd+Washington+DC+20233&benchmark=2020&format=json`;
    `https://geocoding.geo.census.gov/geocoder/locations/onelineaddress?${address}&benchmark=2020&format=json`;

  request(temp, function (error, response, body) {
    res.send(body);
  });
});

app.get("/weather", (req, res, next) => {
  let url = "https://api.weather.gov/points/39.7456,-97.0892";
  request(url, function (error, response, body) {
    res.send(body);
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
