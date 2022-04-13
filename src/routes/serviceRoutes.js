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
    serviceController.create_newService
);

router.get("/", serviceController.show_allServices);

router.patch(
    "/service-id/:id",
    auth,
    upload.single("image"),
    validateID,
    serviceController.update_serviceById
);

router.delete(
    "/service-id/:id",
    validateID,
    serviceController.delete_serviceById
);

router.get("/service-id/:id", validateID, serviceController.search_serviceById);

router.get("/search/:search_words", serviceController.advanceSearch);

module.exports = router;
