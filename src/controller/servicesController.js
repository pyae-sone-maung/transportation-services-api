const transportation_services = require("../models/transportation_serveces");
const { validationResult } = require("express-validator");
const { paginateLinks } = require("../utils/pagination.js");
const { fileValidate } = require("../validation/file-validator");
const cloudinary = require("cloudinary").v2;
const path = require("path");

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET_KEY,
});

// Add new service
const createNewService = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ Errors: errors.array() });
    } else {
        const file = req.file;
        let serviceData = {
            name: req.body.name,
            service: req.body.service,
            routes: req.body.routes.split(","),
            vehical_type: req.body.vehical_type,
            phone: req.body.phone.split(",") || null,
            address: req.body.address,
            note: req.body.note,
        };
        if (!file) {
            serviceData.image = {
                image_id: process.env.DEFAULT_IMAGE_ID,
                image_url: process.env.DEFAULT_IMAGE_URL,
            };
            try {
                const data = await transportation_services.insertMany(
                    serviceData
                );
                res.append(
                    "Location",
                    req.originalUrl + "service-id/" + data[0]._id
                );
                return res.status(201).json({
                    meta: { message: "create succefully" },
                    data,
                });
            } catch (error) {
                return res.status(500).json({ Error: error });
            }
        } else {
            const checkFile = fileValidate(file); // upload file validation
            if (checkFile !== true) {
                return res.status(400).json({ Error: checkFile });
            } else {
                cloudinary.uploader.upload(
                    file.path,
                    {
                        folder: "Taungup-City",
                        resource_type: "image",
                        quality: "auto",
                        width: 1280,
                        height: 720,
                    },
                    async (err, result) => {
                        if (err) {
                            return res.status(500).json({ Error: err });
                        } else {
                            serviceData.image = {
                                image_id: result.public_id,
                                image_url: result.url,
                            };
                            try {
                                const data =
                                    await transportation_services.insertMany(
                                        serviceData
                                    );
                                res.append(
                                    "Location",
                                    req.originalUrl +
                                        "service-id/" +
                                        data[0]._id
                                );
                                return res.status(201).json({
                                    meta: { message: "create successfully" },
                                    data,
                                });
                            } catch (error) {
                                return res.status(500).json({ Error: error });
                            }
                        }
                    }
                );
            }
        }
    }
};

// show all resources from database
// allow filter, sort, page
const showAllServices = async (req, res, next) => {
    const options = req.query;
    const filter = options.filter || {};
    const sort = options.sort || {};
    const limit = 10;
    const page = parseInt(options.page) || 1;
    const skip = (page - 1) * limit;
    for (i in sort) {
        sort[i] = parseInt(sort[i]);
    }

    const paginateUrl = req.baseUrl + "?page=";
    const host = req.headers.host;
    try {
        const data = await transportation_services
            .find(filter)
            .sort(sort)
            .skip(skip)
            .limit(limit);
        return res.status(200).json({
            meta: { filter, sort, skip, limit },
            data,
            links: paginateLinks(host, limit, data.length, page, paginateUrl),
        });
    } catch (error) {
        return res.status(500).json({ Errors: error });
        next();
    }
};

// update service by ID
const updateServiceById = async (req, res, next) => {
    const id = req.params.id;
    const file = req.file;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ Errors: errors });
    } else {
        try {
            const result = await transportation_services.findById(id);
            if (result === null) {
                return res.status(404).json({ Errors: "Id is not found" });
            } else {
                // Existance data or user want to update data
                const existRoutes = result.routes.toString();
                const existPhone = result.phone.toString();
                let updateData = {
                    name: req.body.name || result.name,
                    service: req.body.service || result.service,
                    routes: (req.body.routes || existRoutes).split(","),
                    vehical_type: req.body.vehical_type || result.vehical_type,
                    phone: (req.body.phone || existPhone).split(","),
                    address: req.body.address || result.address,
                    note: req.body.note || result.note,
                };
                if (!file) {
                    try {
                        const data =
                            await transportation_services.findByIdAndUpdate(
                                id,
                                { $set: updateData },
                                { multi: false, returnDocument: "after" }
                            );
                        return res.status(200).json({
                            meta: { message: "update successfully" },
                            data,
                            links: { self: req.originalUrl },
                        });
                    } catch (error) {
                        return res.status(500).json({ Error: error });
                    }
                } else {
                    const checkFile = fileValidate(file); // upload file validation
                    if (checkFile !== true) {
                        return res.status(400).json({ Error: checkFile });
                    } else {
                        cloudinary.uploader.upload(
                            file.path,
                            {
                                folder: "Taungup-City",
                                resource_type: "image",
                                quality: "auto",
                                width: 1280,
                                height: 720,
                            },
                            async (err, result) => {
                                if (err) {
                                    return res.status(500).json({ Error: err });
                                } else {
                                    updateData.image = {
                                        image_id: result.public_id,
                                        image_url: result.url,
                                    };
                                    const data =
                                        await transportation_services.findByIdAndUpdate(
                                            id,
                                            { $set: updateData },
                                            {
                                                multi: false,
                                                returnDocument: "after",
                                            }
                                        );
                                    return res.status(200).json({
                                        meta: {
                                            message: "update successfully",
                                        },
                                        data,
                                        links: {
                                            self:
                                                req.headers.host +
                                                req.originalUrl,
                                        },
                                    });
                                }
                            }
                        );
                    }
                }
            }
        } catch (error) {
            return res.status(500).json({ Errors: error });
            next();
        }
    }
};

// delete service by ID
const deleteServiceById = async (req, res, next) => {
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
                await cloudinary.uploader.destroy(data.image.image_id);
                return res.sendStatus(204);
            }
        } catch (error) {
            return res.status(500).json({ Errors: error });
            next();
        }
    }
};

// search service by ID

const getServiceById = async (req, res, next) => {
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
                    .json({
                        data,
                        links: { self: req.headers.host + req.originalUrl },
                    });
            }
        } catch (error) {
            return res.status(500).json({ Errors: error });
        }
    }
};

// advance search
const searchServices = async (req, res, next) => {
    const searchWords = req.query.q;
    const limit = 10;
    const page = parseInt(req.query.page) || 1;
    const skip = (page - 1) * limit;
    const paginateUrl = req.baseUrl + "/search?q=" + searchWords + "&page=";
    const host = req.headers.host;

    try {
        const data = await transportation_services.aggregate([
            {
                $search: {
                    index: "custom_search",
                    text: {
                        query: searchWords,
                        path: ["name", "routes", "service", "vehical_type"],
                    },
                },
            },
            { $skip: skip },
            { $limit: limit },
        ]);
        return res.status(200).json({
            meta: { search: searchWords, limit, skip, page },
            data,
            links: paginateLinks(host, limit, data.length, page, paginateUrl),
        });
    } catch (error) {
        return res.status(500).json({ Errors: error });
    }
};

module.exports = {
    createNewService,
    showAllServices,
    updateServiceById,
    deleteServiceById,
    getServiceById,
    searchServices,
};
