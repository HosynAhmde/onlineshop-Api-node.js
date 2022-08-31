const {
  CategoryController,
} = require("../../controllers/admin/category.controller");

const router = require("express").Router();

/**
 * @swagger
 *  /admin/category/add:
 *      post:
 *          tags: [Category(AdminPanel)]
 *          summary: Create new category
 *          parameters:
 *          -          name: Authorization
 *                     type: string
 *                     in: header
 *                     example: bearer token
 *                     value: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtb2JpbGUiOiIwOTEwMDA4NDAyMSIsImlhdCI6MTY2MTY2MDc1MywiZXhwIjoxNjYyNTI0NzUzfQ.Tp118EEqtGVkFne7s7fxbJP3TqHOzxCg77boSIS7Yko
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
 *          tags: [Category(AdminPanel)]
 *          summary: Get All Parents Of Category
 *          parameters :
 *          -          name: Authorization
 *                     type: string
 *                     in: header
 *                     example: bearer token
 *                     value: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtb2JpbGUiOiIwOTEwMDA4NDAyMSIsImlhdCI6MTY2MTY2MDc1MywiZXhwIjoxNjYyNTI0NzUzfQ.Tp118EEqtGVkFne7s7fxbJP3TqHOzxCg77boSIS7Yko
 *          responses:
 *                   200:
 *                      description: succes
 */
router.get("/parents", CategoryController.getAllCategoryParents);

/**
 * @swagger
 *  /admin/category/all:
 *      get:
 *          tags: [Category(AdminPanel)]
 *          summary: Get All  Category
 *          parameters :
 *          -          name: Authorization
 *                     type: string
 *                     in: header
 *                     example: bearer token
 *                     value: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtb2JpbGUiOiIwOTEwMDA4NDAyMSIsImlhdCI6MTY2MTY2MDc1MywiZXhwIjoxNjYyNTI0NzUzfQ.Tp118EEqtGVkFne7s7fxbJP3TqHOzxCg77boSIS7Yko
 *          responses:
 *                   200:
 *                      description: succes
 */
router.get("/all", CategoryController.getAllCategory);

/**
 * @swagger
 *  /admin/category/{id}:
 *      get:
 *          tags: [Category(AdminPanel)]
 *          summary: Find category by id
 *          parameters:
 *          -          name: Authorization
 *                     type: string
 *                     in: header
 *                     example: bearer token
 *                     value: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtb2JpbGUiOiIwOTEwMDA4NDAyMSIsImlhdCI6MTY2MTY2MDc1MywiZXhwIjoxNjYyNTI0NzUzfQ.Tp118EEqtGVkFne7s7fxbJP3TqHOzxCg77boSIS7Yko
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
 *  /admin/category/update/{id}:
 *      patch:
 *          tags: [Category(AdminPanel)]
 *          summary: update category title
 *          parameters:
 *          -          name: Authorization
 *                     type: string
 *                     in: header
 *                     example: bearer token
 *                     value: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtb2JpbGUiOiIwOTEwMDA4NDAyMSIsImlhdCI6MTY2MTY2MDc1MywiZXhwIjoxNjYyNTI0NzUzfQ.Tp118EEqtGVkFne7s7fxbJP3TqHOzxCg77boSIS7Yko
 *          -          in: path
 *                     name: id
 *                     type: string
 *                     required: true
 *          -          in: formData
 *                     name: title
 *                     required: true
 *                     type: string
 *          responses:
 *                   200:
 *                      description: succes
 *                   500:
 *                      description: internal server
 */
router.patch("/update/:id", CategoryController.editCategory);

/**
 * @swagger
 *  /admin/category/child-of-parent/{parent}:
 *      get:
 *          tags: [Category(AdminPanel)]
 *          summary: Get All child of parent
 *          parameters:
 *          -          name: Authorization
 *                     type: string
 *                     in: header
 *                     example: bearer token
 *                     value: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtb2JpbGUiOiIwOTEwMDA4NDAyMSIsImlhdCI6MTY2MTY2MDc1MywiZXhwIjoxNjYyNTI0NzUzfQ.Tp118EEqtGVkFne7s7fxbJP3TqHOzxCg77boSIS7Yko
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
 *          tags: [Category(AdminPanel)]
 *          summary: Delete category
 *          parameters:
 *          -          name: Authorization
 *                     type: string
 *                     in: header
 *                     example: bearer token
 *                     value: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtb2JpbGUiOiIwOTEwMDA4NDAyMSIsImlhdCI6MTY2MTY2MDc1MywiZXhwIjoxNjYyNTI0NzUzfQ.Tp118EEqtGVkFne7s7fxbJP3TqHOzxCg77boSIS7Yko
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
