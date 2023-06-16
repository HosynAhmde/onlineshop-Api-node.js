require("dotenv").config();
const Application = require("./app/server");
new Application(5000, "mongodb://0.0.0.0:27017/onlineshop");
