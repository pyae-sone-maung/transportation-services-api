const express = require("express");
const cors = require("cors");
const app = express();
const serviceRoutes = require("./src/routes/serviceRoutes");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use("/", serviceRoutes);

module.exports = app;
