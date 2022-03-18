const dotenv = require("dotenv");
dotenv.config({
  path: "./.env",
});

const database = require("./src/config/database.config");
const app = require("./app");
const port = process.env.PORT;

database.connect();
app.listen(port, () => console.log(`Server is running on port : ${port}`));
