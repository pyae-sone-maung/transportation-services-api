const express = require("express");
const router = express.Router();
const serviceController = require("../controller/servicesController");
const { validateID, validateServiceData } = require("../validation/validator");
const { upload } = require("../utils/file-upload");
const res = require("express/lib/response");

router.post(
    "/",
    upload.single("image"),
    validateServiceData,
    serviceController.create_newService
);

router.get("/", serviceController.show_allServices);

router.patch(
    "/service-id/:id",
    validateID,
    serviceController.update_serviceById
);

router.delete(
    "/service-id/:id",
    validateID,
    serviceController.delete_serviceById
);

router.get("/service-id/:id", validateID, serviceController.search_serviceById);

router.get("/name/:service_name", serviceController.search_serviceByName);

router.get("/route/:route_name", serviceController.search_serviceByRoute);

module.exports = router;
