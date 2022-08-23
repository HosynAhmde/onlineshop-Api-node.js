const express = require("express");
const { AdminRoutes } = require("./admin/admin.routes");
const { HomeRoutes } = require("./api");
const { DeveloperRoutes } = require("./developer.routes");
const { UserAuthRoutes } = require("./user/auth");

const router = express.Router();
router.use("/developer", DeveloperRoutes);
router.use("/", HomeRoutes);
router.use("/user", UserAuthRoutes);
router.use("/admin", AdminRoutes);

module.exports = { AllRoutes: router };
