const transportation_services = require("../models/transportation_serveces");
const { validationResult } = require("express-validator");

//Add new service
const create_newService = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    } else {
        try {
            const service = req.body;
            const data = await transportation_services.insertMany(service);
            console.log(data);
            res.append("Location", req.originalUrl + data[0]._id);
            return res.status(201).json({
                meta: { message: "create successfully", id: data[0]._id },
                data,
            });
        } catch (error) {
            return res.status(500);
            next();
        }
    }
};

// Get all resources from database
const show_allServices = async (req, res, next) => {
    const options = req.query;
    const filter = options.filter || {};
    const sort = options.sort || {};
    const limit = 15;
    const page = parseInt(options.page) || 1;
    const skip = (page - 1) * limit;
    for (i in sort) {
        sort[i] = parseInt(sort[i]);
    }

    try {
        const data = await transportation_services
            .find(filter)
            .sort(sort)
            .skip(skip)
            .limit(limit);
        return res.status(200).json({
            meta: { filter, sort, skip, limit, total: data.length },
            data,
            links: { self: req.originalUrl },
        });
    } catch (error) {
        return res.status(500).json({ errors: error.array() });
        next();
    }
};

// update by id
const update_serviceById = async (req, res, next) => {
    const id = req.params.service_id;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors });
    } else {
        try {
            const data = await transportation_services.findById(id);
            if (data === null) {
                return res.status(404).json({ errors: "Id is not found" });
            } else {
                transportation_services.findByIdAndUpdate(
                    id,
                    { $set: req.body },
                    { multi: false, returnDocument: "after" },
                    (err, result) => {
                        if (err) {
                            return res.status(500).json({ errors: err });
                        } else {
                            return res.status(200).json({
                                result,
                                links: { self: req.originalUrl },
                            });
                        }
                    }
                );
            }
        } catch (error) {
            return res.status(500).json({ errors: error });
            next();
        }
    }
};

module.exports = { create_newService, show_allServices, update_serviceById };
