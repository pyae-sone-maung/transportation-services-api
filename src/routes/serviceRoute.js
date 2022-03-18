const express = require("express");
const router = express.Router();
const serviceController = require("../controller/servicesController");

router.post("/new-service", serviceController.createNewService);

module.exports = router;
