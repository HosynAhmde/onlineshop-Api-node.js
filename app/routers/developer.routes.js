const router = require("express").Router();
const bcrypt = require("bcrypt");
const { generateRandomNuber } = require("../utils/functions");

/**
 * @swagger
 *  tags:
 *       name: Developer-Routes
 *       description: developer routes...
 *
 */

/**
 * @swagger
 *  /developer/hash-password/{password}:
 *      get:
 *          tags: [Developer-Routes]
 *          summary: hash password
 *          parameters:
 *          -         name: password
 *                    type: string
 *                    required: true
 *                    in: path
 *          responses:
 *                   200:
 *                       description: success
 *
 */

router.get("/hash-password/:password", (req, res, next) => {
  const { password } = req.params;
  const salt = bcrypt.genSaltSync(10);
  return res.send(bcrypt.hashSync(password, salt));
});

/**
 * @swagger
 *  /developer/random-number:
 *      get:
 *          tags: [Developer-Routes]
 *          summary: rendom number
 *
 *          responses:
 *                   200:
 *                       description: success
 *
 */

router.get("/random-number", (req, res, next) => {
  return res.send(generateRandomNuber().toString());
});
module.exports = { DeveloperRoutes: router };
