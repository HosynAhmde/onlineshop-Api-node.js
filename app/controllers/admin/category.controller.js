const createError = require("http-errors");
const { CategoryModel } = require("../../models/categories");
const {
  addCategorySchema,
  editCategorySchema,
} = require("../../validators/admin/category.schema");
const Controller = require("../controller");
const mongoose = require("mongoose");
class CategoryController extends Controller {
  
  async checkExistCategory(id) {
    const category = await CategoryModel.find({ id });
    if (!category) throw createError.NotFound("دسته بندی وجود ندارد");
    return category;
  }
  async addCategory(req, res, next) {
    try {
      await addCategorySchema.validateAsync(req.body);
      const { title, parent } = req.body;
      const category = await CategoryModel.create({ title, parent });
      if (!category) throw createError.InternalServerError("خطای سرور");
      res.status(201).json({
        data: {
          statusCode: 201,
          message: "دسته بندی با موفقیت اضافه شد.",
        },
      });
    } catch (error) {
      next(error);
    }
  }

  async removeCategory(req, res, next) {
    try {
      const { id } = req.params;
      const category = await this.checkExistCategory(id);
      const deleteResult = await CategoryModel.deleteMany({
        $or: [
          {
            _id: category._id,
          },
          {
            parent: category._id,
          },
        ],
      });
      if (deleteResult.deletedCount == 0)
        throw createError.InternalServerError("حذف دسته بندی انجام نشد");
      return res.status(200).json({
        data: {
          statusCode: 200,
          message: "حذف دسته بندی با موفقیت انجام شد",
        },
      });
    } catch (error) {
      next(error);
    }
  }

  async editCategory(req, res, next) {
    try {
      const { id } = req.params;
      const { title } = req.body;
      const category = await this.checkExistCategory(id);
      await editCategorySchema.validateAsync(req.body);
      const update = await CategoryModel.updateOne(
        { _id: id },
        { $set: { title } }
      );
      if (update.modifiedCount == 0)
        throw createError.InternalServerError("بروزرسانی انجام نشد");
      return res.status(200).json({
        data: {
          statusCode: 200,
          message: "برروز رسانی با موفقیت انجام شد.",
        },
      });
    } catch (error) {
      next(error);
    }
  }
  async getAllCategoryParents(req, res, next) {
    try {
      const parents = await CategoryModel.find(
        { parent: undefined },
        { __v: 0 }
      );
      return res.status(200).json({
        data: {
          statusCode: 200,
          parents,
        },
      });
    } catch (error) {
      next(error);
    }
  }
  async getChildOfParents(req, res, next) {
    try {
      const { parent } = req.params;

      const childOfParent = await CategoryModel.find(
        { parent },
        { __v: 0, parent: 0 }
      );
      return res.status(200).json({
        data: {
          childOfParent,
        },
      });
    } catch (error) {
      next(error);
    }
  }

  async getAllCategory(req, res, next) {
    try {
      // const category = await CategoryModel.aggregate([
      //   {
      //     $graphLookup: {
      //       from: "categories",
      //       startWith: "$_id",
      //       connectFromField: "_id",
      //       connectToField: "parent",
      //       maxDepth: 5,
      //       depthField: "depth",
      //       as: "children",
      //     },
      //   },
      //   {
      //     $project: {
      //       __v: 0,
      //       "children.__v": 0,
      //       "children.parent": 0,
      //     },
      //   },
      //   {
      //     $match: {
      //       parent: undefined,
      //     },
      //   },
      // ]);
      const categories = await CategoryModel.find(
        { parent: undefined },
        { __v: 0 }
      );
      return res.status(200).json({
        data: {
          statusCode: 200,
          categories,
        },
      });
    } catch (error) {
      next(error);
    }
  }
  async getCategoryById(req, res, next) {
    try {
      const { id } = req.params;
      const category = await CategoryModel.aggregate([
        {
          $match: {
            _id: mongoose.Types.ObjectId(id),
          },
        },
        {
          $lookup: {
            from: "categories",
            localField: "_id",
            foreignField: "parent",
            as: "children",
          },
        },
        {
          $project: {
            __v: 0,
            "children.__v": 0,
            "children.parent": 0,
          },
        },
      ]);
      return res.status(200).json({
        data: {
          statusCode: 200,
          category,
        },
      });
    } catch (error) {
      next(error);
    }
  }
}
module.exports = { CategoryController: new CategoryController() };
