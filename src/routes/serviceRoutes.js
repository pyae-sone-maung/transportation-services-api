const express = require("express");
const router = express.Router();
const adminController = require("../controller/adminController");
const serviceController = require("../controller/servicesController");
const { auth } = require("../middleware/auth");
const {
    validateID,
    validateServiceData,
} = require("../validation/req-validator");
const { upload } = require("../utils/file-upload");

router.post("/login", adminController.adminLogin);

router.post(
    "/",
    auth,
    upload.single("image"),
    validateServiceData,
    serviceController.createNewService
);

router.get("/", serviceController.showAllServices);

router.patch(
    "/id/:id",
    auth,
    upload.single("image"),
    validateID,
    serviceController.updateServiceById
);

router.delete("/id/:id", auth, validateID, serviceController.deleteServiceById);

router.get("/id/:id", validateID, serviceController.getServiceById);

router.get("/search/", serviceController.searchServices);

module.exports = router;
