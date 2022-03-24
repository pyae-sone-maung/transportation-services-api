const express = require("express");
const router = express.Router();
const serviceController = require("../controller/servicesController");
const { checkID, checkServiceData } = require("../validation/validator");

router.post("/", checkServiceData, serviceController.create_newService);

router.get("/", serviceController.show_allServices);

router.patch("/:service_id", checkID, serviceController.update_serviceById);

module.exports = router;
