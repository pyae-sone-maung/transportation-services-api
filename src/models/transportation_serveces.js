const mongoose = require("mongoose");

// Transportation Services Model
const imageSchema = mongoose.Schema(
    {
        image_id: { type: String },
        image_url: { type: String },
    },
    { _id: false }
);

const transportation_services_Schema = mongoose.Schema(
    {
        name: { type: String },
        service: { type: String },
        routes: { type: Array },
        vehical_type: { type: String },
        phone: [{ type: String }],
        address: { type: String },
        note: { type: String },
        image: imageSchema,
    },
    { timestamps: true, versionKey: false }
);

module.exports = mongoose.model(
    "transportation_services",
    transportation_services_Schema
);
