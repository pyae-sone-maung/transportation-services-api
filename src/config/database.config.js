const mongoose = require("mongoose");

const database = process.env.DATABASE_URL;

exports.connect = () => {
    mongoose
        .connect(database, { useNewUrlParser: true })
        .then(() => console.log("Database connected successfully."))
        .catch((err) => {
            console.log("Database connection fail.");
            console.log(err);
        });
};
