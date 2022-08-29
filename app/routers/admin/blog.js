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
 *              parameters :
 *              -          name: Authorization
 *                         type: string
 *                         in: header
 *                         example: bearer token
 *                         value: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtb2JpbGUiOiIwOTEwMDA4NDAyMSIsImlhdCI6MTY2MTY2MDc1MywiZXhwIjoxNjYyNTI0NzUzfQ.Tp118EEqtGVkFne7s7fxbJP3TqHOzxCg77boSIS7Yko
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
 *              -          name: Authorization
 *                         type: string
 *                         in: header
 *                         example: bearer token
 *                         value: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtb2JpbGUiOiIwOTEwMDA4NDAyMSIsImlhdCI6MTY2MTY2MDc1MywiZXhwIjoxNjYyNTI0NzUzfQ.Tp118EEqtGVkFne7s7fxbJP3TqHOzxCg77boSIS7Yko
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

/**
 * @swagger
 *    /admin/blog/{id}:
 *          get:
 *              tags: [Blog(AdminPanel)]
 *              summary: get one Blog by id
 *              parameters :
 *              -          name: Authorization
 *                         type: string
 *                         in: header
 *                         example: bearer token
 *                         value: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtb2JpbGUiOiIwOTEwMDA4NDAyMSIsImlhdCI6MTY2MTY2MDc1MywiZXhwIjoxNjYyNTI0NzUzfQ.Tp118EEqtGVkFne7s7fxbJP3TqHOzxCg77boSIS7Yko
 *              -          name: id
 *                         in: path
 *                         type: string
 *                         reqired: true
 *              responses:
 *                       200:
 *                          description: succes
 */
router.get("/:id", BlogController.getOneBlogById);

/**
 * @swagger
 *    /admin/blog/update/{id}:
 *          patch:
 *              tags: [Blog(AdminPanel)]
 *              summary: Update blog document
 *              consumes:
 *                       - multipart/form-data
 *              parameters :
 *              -          name: Authorization
 *                         type: string
 *                         in: header
 *                         example: bearer token
 *                         value: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtb2JpbGUiOiIwOTEwMDA4NDAyMSIsImlhdCI6MTY2MTY2MDc1MywiZXhwIjoxNjYyNTI0NzUzfQ.Tp118EEqtGVkFne7s7fxbJP3TqHOzxCg77boSIS7Yko
 *              -          name: id
 *                         in: path
 *                         type: string
 *              -          name: title
 *                         in: formData
 *                         type: string
 *              -          name: text
 *                         in: formData
 *                         type: string
 *              -          name: short_text
 *                         in: formData
 *                         type: string
 *              -          name: tags
 *                         example: tag1#tag2#tag3_foo#
 *                         in: formData
 *                         type: string
 *              -          name: category
 *                         in: formData
 *                         type: string
 *              -          name: image
 *                         in: formData
 *
 *                         type: file
 *              responses:
 *                       201:
 *                          description: succes
 */
router.patch(
  "/update/:id",
  uplodFile.single("image"),
  stringToArray("tags"),
  BlogController.updateBlog
);

/**
 * @swagger
 *    /admin/blog/{id}:
 *           delete:
 *              tags: [Blog(AdminPanel)]
 *              summary: delete Blog by id
 *              parameters :
 *              -          name: Authorization
 *                         type: string
 *                         in: header
 *                         example: bearer token
 *                         value: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtb2JpbGUiOiIwOTEwMDA4NDAyMSIsImlhdCI6MTY2MTY2MDc1MywiZXhwIjoxNjYyNTI0NzUzfQ.Tp118EEqtGVkFne7s7fxbJP3TqHOzxCg77boSIS7Yko
 *              -          name: id
 *                         in: path
 *                         type: string
 *                         reqired: true
 *              responses:
 *                       200:
 *                          description: succes
 */
router.delete("/:id", BlogController.deleteBlog);

module.exports = { BlogAdminRouter: router };
