const service = require("../models/transportation_serveces");

const { param, check } = require("express-validator");

const validateID = [param("id").isMongoId().withMessage("Invalid ID")];

const validateServiceData = [
    check("name").not().isEmpty().trim().withMessage("Name is required."),
    check("service")
        .not()
        .isEmpty()
        .trim()
        .withMessage("What kind of service is required"),
    check("routes").not().isEmpty().withMessage("Transport route is required."),
    check("vehical_type")
        .not()
        .isEmpty()
        .trim()
        .withMessage("What kind of vehical is required."),
    check("phone").not().isEmpty().withMessage("Phone number is required."),
    check("address").not().isEmpty().withMessage("Address is required."),
];

module.exports = { validateID, validateServiceData };
