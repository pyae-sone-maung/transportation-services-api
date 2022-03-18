const service = require("../models/transportation_serveces");

const { param, body } = require("express-validator");

const checkServiceData = [
  body("name").not().isEmpty().trim().withMessage("Name is require"),
  body("service")
    .not()
    .isEmpty()
    .trim()
    .withMessage("What kind of service is require"),
];
