const {
  ProductController,
} = require("../../controllers/admin/produc.controller");
const { uplodFile } = require("../../utils/multer");
const router = require("express").Router();

/**
 * @swagger
 *    /admin/product/create:
 *          post:
 *              tags: [Product(AdminPanel)]
 *              summary: create product document
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
 *              -          name: short_text
 *                         in: formData
 *                         required: true
 *                         type: string
 *              -          name: text
 *                         in: formData
 *                         required: true
 *                         type: string
 *              -          name: image
 *                         in: formData
 *                         required: true
 *                         type: file
 *              -          name: tags
 *                         in: formData
 *                         type: string
 *              -          name: category
 *                         in: formData
 *                         required: true
 *                         type: string
 *              -          name: price
 *                         in: formData
 *                         required: true
 *                         type: string
 *              -          name: discount
 *                         in: formData
 *                         type: string
 *              -          name: format
 *                         in: formData
 *                         type: string
 *              -          name: height
 *                         in: formData
 *                         type: string
 *              -          name: weight
 *                         in: formData
 *                         type: string
 *              -          name: width
 *                         in: formData
 *                         type: string
 *              -          name: length
 *                         in: formData
 *                         type: string
 *
 *
 *
 *
 *              responses:
 *                       201:
 *                          description: succes
 */

router.post(
  "/create",
  uplodFile.array("image", 10),
  ProductController.addProduct
);

/**
 * @swagger
 *    /admin/product/list:
 *          get:
 *              tags: [Product(AdminPanel)]
 *              summary: list of product by id
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
router.get("/list", ProductController.getAllProduct);

/**
 * @swagger
 *    /admin/product/{id}:
 *          get:
 *              tags: [Product(AdminPanel)]
 *              summary: get one product by id
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
router.get("/:id", ProductController.getOneProduct);

/**
 * @swagger
 *    /admin/product/update/{id}:
 *          patch:
 *              tags: [Product(AdminPanel)]
 *              summary: create product document
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
 *                         type: string
 *              -          name: short_text
 *                         in: formData
 *                         type: string
 *              -          name: text
 *                         in: formData
 *                         type: string
 *              -          name: image
 *                         in: formData
 *                         type: file
 *              -          name: tags
 *                         in: formData
 *                         type: string
 *              -          name: category
 *                         in: formData
 *                         type: string
 *              -          name: price
 *                         in: formData
 *                         type: string
 *              -          name: discount
 *                         in: formData
 *                         type: string
 *              -          name: type
 *                         in: formData
 *                         type: string
 *              -          name: format
 *                         in: formData
 *                         type: string
 *              responses:
 *                       201:
 *                          description: succes
 */
router.patch("/update/:id", ProductController.updateProduct);

/**
 * @swagger
 *    /admin/product/{id}:
 *           delete:
 *              tags: [Product(AdminPanel)]
 *              summary: delete Product by id
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
router.delete("/:id", ProductController.removeProduct);
module.exports = { ProductRouter: router };
