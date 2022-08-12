const express = require("express");
const { HomeRoutes } = require("./api");
const router = express.Router();
router.use("/", HomeRoutes);
module.exports = { AllRoutes: router };
