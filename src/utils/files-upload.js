const multer = require("multer");

const Storage = multer.diskStorage({
    destination: "./uploads",
    filename: (req, file, cb) => {
        cb(null, file.originalname + "-" + Date.now());
    },
});
const upload = multer({ storage: Storage });

module.exports = { upload };
