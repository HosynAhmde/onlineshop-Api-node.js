const express = require("express");
const HomeController = require("../../controllers/api/home.controller");
const { VerifyToken } = require("../../middlewares/verifyToken");
const router = express.Router();
/**
 * @swagger
 * tags:
 *    name: indexpage
 *    description: indexpage routes
 */
/**
 * @swagger
 * tag: indexpage
 * /:
 *  get:
 *    summary : index of routes
 *    description : index page
 *    parameters:
 *    -         in: header
 *              name: authorization
 *              example: Bearer Yor token
 *    tags: [indexpage]
 *    responses:
 *         200:
 *              description : succes
 *         404:
 *              description : not found
 */
router.get("/", VerifyToken, HomeController.indexPage);
module.exports = {
  HomeRoutes: router,
};
