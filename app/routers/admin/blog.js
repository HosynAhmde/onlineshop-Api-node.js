const { BlogController } = require("../../controllers/admin/blog.controller");
const { stringToArray } = require("../../middlewares/stringToArray");
const { uplodFile } = require("../../utils/multer");

const router = require("express").Router();
/**
 * @swagger
 *    /admin/blog:
 *          get:
 *              tags: [Blog(AdminPanel)]
 *              summary: get All Blog
 *              responses:
 *                       200:
 *                          description: succes
 */
router.get("/", BlogController.getListOfBlog);

/**
 * @swagger
 *    /admin/blog/add:
 *          post:
 *              tags: [Blog(AdminPanel)]
 *              summary: create blog document
 *              consumes:
 *                       - multipart/form-data
 *              parameters :
 *              -          name: title
 *                         in: formData
 *                         required: true
 *                         type: string
 *              -          name: text
 *                         in: formData
 *                         required: true
 *                         type: string
 *              -          name: short_text
 *                         in: formData
 *                         required: true
 *                         type: string
 *              -          name: tags
 *                         example: tag1#tag2#tag3_foo#
 *                         in: formData
 *                         type: string
 *              -          name: category
 *                         in: formData
 *                         required: true
 *                         type: string
 *              -          name: image
 *                         in: formData
 *                         required: true
 *                         type: file
 *              responses:
 *                       201:
 *                          description: succes
 */
router.post(
  "/add",
  uplodFile.single("image"),
  stringToArray("tags"),
  BlogController.createBlog
);

module.exports = { BlogAdminRouter: router };
