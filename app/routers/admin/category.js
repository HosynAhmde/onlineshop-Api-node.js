const {
  CategoryController,
} = require("../../controllers/admin/category.controller");

const router = require("express").Router();

/**
 * @swagger
 *  /admin/category/add:
 *      post:
 *          tags: [Admin-Panel]
 *          summary: Create new category
 *          parameters:
 *          -          in: formData
 *                     type: string
 *                     required: true
 *                     name: title
 *          -          in: formData
 *                     type: string
 *                     required: false
 *                     name: parent
 *          responses:
 *                   201:
 *                      description: succes
 */

router.post("/add", CategoryController.addCategory);

/**
 * @swagger
 *  /admin/category/parents:
 *      get:
 *          tags: [Admin-Panel]
 *          summary: Get All Parents Of Category
 *
 *          responses:
 *                   200:
 *                      description: succes
 */
router.get("/parents", CategoryController.getAllCategoryParents);

/**
 * @swagger
 *  /admin/category/all:
 *      get:
 *          tags: [Admin-Panel]
 *          summary: Get All  Category
 *
 *          responses:
 *                   200:
 *                      description: succes
 */
router.get("/all", CategoryController.getAllCategory);

/**
 * @swagger
 *  /admin/category/{id}:
 *      get:
 *          tags: [Admin-Panel]
 *          summary: Find category by id
 *          parameters:
 *          -          in: path
 *                     name: id
 *                     type: string
 *                     required: true
 *          responses:
 *                   200:
 *                      description: succes
 */
router.get("/:id", CategoryController.getCategoryById);

/**
 * @swagger
 *  /admin/category/child-of-parent/{parent}:
 *      get:
 *          tags: [Admin-Panel]
 *          summary: Get All child of parent
 *          parameters:
 *          -          in: path
 *                     name: parent
 *                     type: string
 *                     required: true
 *          responses:
 *                   200:
 *                      description: succes
 */
router.get("/child-of-parent/:parent", CategoryController.getChildOfParents);

/**
 * @swagger
 *  /admin/category/remove/{id}:
 *      delete:
 *          tags: [Admin-Panel]
 *          summary: Delete category
 *          parameters:
 *          -          in: path
 *                     name: id
 *                     type: string
 *                     required: true
 *          responses:
 *                   200:
 *                      description: succes
 */
router.delete("/remove/:id", CategoryController.removeCategory);

module.exports = { CategoryRoutes: router };
