const express = require("express");
const HomeController = require("../../controllers/api/home.controller");
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
 *    tags: [indexpage]
 *    responses:
 *         200:
 *              description : succes
 *         404:
 *              description : not found
 */
router.get("/", HomeController.indexPage);
module.exports = {
  HomeRoutes: router,
};
