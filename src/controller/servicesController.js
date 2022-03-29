const transportation_services = require("../models/transportation_serveces");
const { validationResult, check } = require("express-validator");
const { upload } = require("../utils/files-upload");

//Add new service
const create_newService = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ Errors: errors.array() });
    } else {
        try {
            const service = req.body;
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
    }
};

// Get all resources from database
// Allow filter, sort, page
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
        return res.status(500).json({ Errors: error.array() });
        next();
    }
};

// update by ID
const update_serviceById = async (req, res, next) => {
    const id = req.params.id;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ Errors: errors });
    } else {
        try {
            const result = await transportation_services.findById(id);
            if (result === null) {
                return res.status(404).json({ Errors: "Id is not found" });
            } else {
                try {
                    const data =
                        await transportation_services.findByIdAndUpdate(
                            id,
                            { $set: req.body },
                            { multi: false, returnDocument: "after" }
                        );
                    return res.status(200).json({
                        meta: { message: "update successfully" },
                        data,
                        links: { self: req.originalUrl },
                    });
                } catch (error) {
                    return res.status(500).json({ Errors: error });
                }
            }
        } catch (error) {
            return res.status(500).json({ Errors: error });
            next();
        }
    }
};

// delete service by ID
const delete_serviceById = async (req, res, next) => {
    const id = req.params.id;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ Errors: errors });
    } else {
        try {
            const data = await transportation_services.findById(id);
            if (data === null) {
                return res.status(404).json({ Errors: "Id is not found" });
            } else {
                await transportation_services.findByIdAndDelete(id);
                return res.sendStatus(204);
            }
        } catch (error) {
            return res.status(500).json({ Errors: error });
            next();
        }
    }
};

// search service by ID

const search_serviceById = async (req, res, next) => {
    const id = req.params.id;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ Errors: errors });
    } else {
        try {
            const data = await transportation_services.findById(id);

            if (data === null) {
                return res.status(404).json({ Errors: "Id not found" });
            } else {
                return res
                    .status(200)
                    .json({ data, links: { self: req.originalUrl } });
            }
        } catch (error) {
            return res.status(500).json({ Errors: error });
        }
    }
};

// search services by name
// e.g: Anti Win, Mandalar, Myat Pyae Sone

const search_serviceByName = async (req, res, next) => {
    const searchName = req.params.service_name;
    try {
        const data = await transportation_services.find({ name: searchName });
        return res.status(200).json({
            meta: { name: searchName, total: data.length },
            data,
            links: { self: req.originalUrl },
        });
    } catch (error) {
        return res.status(500).json({ Errors: error });
        next();
    }
};

// search service by routes
// e.g: Thadwe, Mruk U, Sittway, Yangon, Mandalay

const search_serviceByRoute = async (req, res, next) => {
    const searchRoute = req.params.route_name;
    try {
        const data = await transportation_services.find({
            routes: { $in: [searchRoute] },
        });
        return res.status(200).json({
            meta: { route: searchRoute, total: data.length },
            data,
            links: { self: req.originalUrl },
        });
    } catch (error) {
        return res.status(500).json({ Errors: error });
    }
};

// image upload test
const imageupload = (req, res, next) => {
    console.log(req.file);
};

module.exports = {
    create_newService,
    show_allServices,
    update_serviceById,
    delete_serviceById,
    search_serviceById,
    search_serviceByName,
    search_serviceByRoute,
    imageupload,
};
