const express = require("express");
const { HomeRoutes } = require("./api");
const { DeveloperRoutes } = require("./developer.routes");
const { UserAuthRoutes } = require("./user/auth");

const router = express.Router();
router.use("/developer", DeveloperRoutes);
router.use("/", HomeRoutes);
router.use("/user", UserAuthRoutes);

module.exports = { AllRoutes: router };
