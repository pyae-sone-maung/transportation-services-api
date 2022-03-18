const mongoose = require("mongoose");

const database = process.env.DATABASE.replace(
  "<password>",
  process.env.DATABASE_PASSWORD
);

exports.connect = () => {
  mongoose
    .connect(database, { useNewUrlParser: true })
    .then(() => console.log("Database connected successfully."))
    .catch((err) => {
      console.log("Database connection fail.");
      console.log(err);
    });
};
