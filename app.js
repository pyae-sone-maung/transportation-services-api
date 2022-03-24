const express = require("express");
const cors = require("cors");
const app = express();
const serviceRoutes = require("./src/routes/serviceRoutes");

app.use(express.json());
app.use(cors());
app.use("/api/v1/transportation-services", serviceRoutes);

module.exports = app;
