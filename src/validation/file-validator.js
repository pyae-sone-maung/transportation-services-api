const path = require("path");

const fileValidate = (file) => {
    const extName = path.extname(file.originalname);
    const allowExtension = [".jpg", ".jpeg", ".png"];
    const fileLimit = 1 * 1024 * 1024;

    if (!allowExtension.includes(extName)) {
        return "Invalid file type. Only jpg, jpeg and png formats are allowed.";
    } else if (file.size > fileLimit) {
        return "The file size has exceeded the limit. Max allowed limit is 1 MB";
    } else {
        return true;
    }
};

module.exports = { fileValidate };
