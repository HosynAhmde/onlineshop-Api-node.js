const express = require("express");
const authController = require("../../controllers/user/auth/auth.controller");
const router = express.Router();
router.post("/login", authController.login);
module.exports = {
  UserAuthRoutes: router,
};
