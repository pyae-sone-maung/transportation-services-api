const res = require("express/lib/response");
const multer = require("multer");
const Storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./uploads");
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname + "-" + Date.now());
    },
});

const upload = multer({
    storage: Storage,
    limits: { fileSize: 1 * 1024 * 1024 },
    fileFilter: (req, file, cb) => {
        if (!file.originalname.match(/\.(jpg|png|jpeg)$/)) {
            cb(
                new Error(
                    "Invalid file type.Only jpg, png, and jpeg format are allowed"
                )
            );
        } else {
            cb(null, true);
        }
    },
}).single("image"); // image is field name

const imageUpload = (req, res, next) => {
    upload(req, res, (err) => {
        if (err) {
            return res.status(400).json({ Error: err.message });
        }
    });
    next();
};

module.exports = { imageUpload };
