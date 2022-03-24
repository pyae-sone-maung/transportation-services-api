const service = require("../models/transportation_serveces");

const { param, body } = require("express-validator");

const checkID = [param("service_id").isMongoId().withMessage("Invalid ID")];

const checkServiceData = [
    body("name").not().isEmpty().trim().withMessage("Name is required."),
    body("service")
        .not()
        .isEmpty()
        .trim()
        .withMessage("What kind of service is required"),
    body("routes").not().isEmpty().withMessage("Transport route is required."),
    body("vehical_type")
        .not()
        .isEmpty()
        .trim()
        .withMessage("What kind of vehical is required."),
    body("phone").not().isEmpty().withMessage("Phone number is required."),
    body("address").not().isEmpty().withMessage("Address is required."),
];

module.exports = { checkID, checkServiceData };
