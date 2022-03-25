const express = require("express");
const router = express.Router();
const serviceController = require("../controller/servicesController");
const { validateID, validateServiceData } = require("../validation/validator");

router.post("/", validateServiceData, serviceController.create_newService);

router.get("/", serviceController.show_allServices);

router.patch("/:service_id", validateID, serviceController.update_serviceById);

router.delete("/:service_id", validateID, serviceController.delete_serviceById);

router.get("/:service_name", serviceController.search_serviceByName);

module.exports = router;
