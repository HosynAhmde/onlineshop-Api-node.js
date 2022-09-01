const { ProductModel } = require("../../models/products");
const { productSchema } = require("../../validators/admin/product.schema");
const Controller = require("../controller");
const createError = require("http-errors");
const { deleteFile, listOfImages } = require("../../utils/functions");
const path = require("path");
class ProductController extends Controller {
  async addProduct(req, res, next) {
    try {
      const productBody = await productSchema.validateAsync(req.body);
      const image = listOfImages(req.files || [], req.body.fileuploudpath);

      const {
        title,
        short_text,
        category,
        tags,
        text,
        count,
        price,
        discount,
        width,
        height,
        length,
        weight,
      } = productBody;

      const owner = req.user._id;
      console.log(image);
      const product = await ProductModel.create({
        title,
        short_text,
        category,
        tags,
        text,
        count,
        price,
        discount,
        width,
        height,
        length,
        weight,
        image,
        owner,
      });
      if (!product) throw createError.InternalServerError("  محصول ثبت نشد");
      return res.status(201).json({
        data: {
          statusCode: 200,
          message: "ایجاد محصول با موفقیت انجام شد",
        },
      });
    } catch (error) {
      deleteFile(req.body.image);
      next(error);
    }
  }

  async updateProduct(req, res, next) {
    try {
    } catch (error) {
      next(error);
    }
  }

  async removeProduct(req, res, next) {
    try {
    } catch (error) {
      next(error);
    }
  }
  async getAllProduct(req, res, next) {
    try {
      const product = await ProductModel.find({});
      res.status(200).json({
        data: {
          statusCode: 200,
          product,
        },
      });
    } catch (error) {
      next(error);
    }
  }
  async getOneProduct(req, res, next) {
    try {
    } catch (error) {
      next(error);
    }
  }
}

module.exports = { ProductController: new ProductController() };
