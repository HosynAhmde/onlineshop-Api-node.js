const express = require("express");
const authController = require("../../controllers/user/auth/auth.controller");
const router = express.Router();

/**
 * @swagger
 *  tags:
 *      name: User Authentication
 *      description: user auth section
 */

/**
 * @swagger
 *  /user/get-otp:
 *        post:
 *            summary: login user in userpanel with phone number
 *            tags: [User Authentication]
 *            description: on time password (otp) login
 *            parameters:
 *            -         name: mobile
 *                      description: fa-IR phonenumber
 *                      in: formData
 *                      required: true
 *                      type: string
 *            responses:
 *                  201:
 *                     description: Succes
 *                  400:
 *                     description: Bad Request
 *                  401:
 *                     description: UnAuthorization
 *                  500:
 *                     description: Intenal Server Error
 *
 */
router.post("/get-otp", authController.getOtp);

/**
 * @swagger
 *  /user/chek-otp:
 *        post:
 *            summary: chek-otp value in user controller
 *            tags: [User Authentication]
 *            description: chek otp and expire data
 *            parameters:
 *            -         name: mobile
 *                      description: fa-IR phonenumber
 *                      in: formData
 *                      required: true
 *                      type: string
 *
 *            -         name: code
 *                      description: enter sms code
 *                      in: formData
 *                      required: true
 *                      type: string
 *            responses:
 *                  201:
 *                     description: Succes
 *                  400:
 *                     description: Bad Request
 *                  401:
 *                     description: UnAuthorization
 *                  500:
 *                     description: Intenal Server Error
 *
 */
router.post("/chek-otp", authController.chekOtp);

module.exports = {
  UserAuthRoutes: router,
};
