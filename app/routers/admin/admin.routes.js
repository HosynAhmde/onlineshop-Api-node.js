const { VerifyToken } = require("../../middlewares/verifyToken");
const { BlogAdminRouter } = require("./blog");
const { CategoryRoutes } = require("./category");
const { ProductRouter } = require("./produc");

const router = require("express").Router();
/**
 * @swagger
 *  tags:
 *      -    name:  Product(AdminPanel)
 *           description: Product Routes
 *      -    name: Admin-Panel
 *           description: action of admin(add,remove,edit)
 *      -    name: Category(AdminPanel)
 *           description: all method in route about category section
 *      -    name:  Blog(AdminPanel)
 *           description: made blog management

 */
router.use("/category", CategoryRoutes);
router.use("/blog", BlogAdminRouter);
router.use("/product", ProductRouter);

module.exports = { AdminRoutes: router };
