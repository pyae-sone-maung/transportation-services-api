const transportation_services = require("../models/transportation_serveces");

const createNewService = async (req, res, next) => {
  const service = req.body;

  try {
    const data = await transportation_services.insertMany(service);
    res.append("Location", req.originalUrl + data[0]._id);
    return res.status(201).json({
      meta: { message: "create successfully", id: data[0]._id },
      data,
    });
  } catch (error) {
    return res.status(500);
    next();
  }
};

module.exports = { createNewService };
