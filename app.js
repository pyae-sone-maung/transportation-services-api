const express = require("express");
const cors = require("cors");
const app = express();
const serviceRoute = require("./src/routes/serviceRoute");

app.use(express.json());
app.use(cors());
app.use("/api/v1/services", serviceRoute);

module.exports = app;
