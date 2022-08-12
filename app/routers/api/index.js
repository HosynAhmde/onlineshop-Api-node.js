const express = require("express");
const HomeController = require("../../controllers/api/home.controller");
const router = express.Router();

router.get("/", HomeController.indexPage);
module.exports = {
  HomeRoutes: router,
};
