const mongoose = require("mongoose");

// Transportation Services Model
const transportation_services_Schema = mongoose.Schema({
  name: { type: String },
  service: { type: String },
  route: { type: Array },
  vehical_type: { type: String },
  phone: { type: String },
  address: { type: String },
  Note: { type: String },
  image: [{ image_id: String, image_url: String }],
});

module.exports = mongoose.model(
  "transportation_services",
  transportation_services_Schema
);
