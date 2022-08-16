const router = require("express").Router();
const bcrypt = require("bcrypt");

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

module.exports = { DeveloperRoutes: router };
