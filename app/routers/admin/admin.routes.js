const { BlogAdminRouter } = require("./blog");
const { CategoryRoutes } = require("./category");

const router = require("express").Router();
/**
 * @swagger
 *  tags:
 *      -    name: Admin-Panel
 *           description: action of admin(add,remove,edit)
 *      -    name: Category(AdminPanel)
 *           description: all method in route about category section
 *      -    name:  Blog(AdminPanel)
 *           description: made blog management
 */
router.use("/category", CategoryRoutes);
router.use("/blog", BlogAdminRouter);

module.exports = { AdminRoutes: router };
