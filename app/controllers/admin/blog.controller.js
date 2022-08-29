const { blogSchema } = require("../../validators/admin/blog.schema");
const Controller = require("../controller");
const { BlogModel } = require("../../models/blogs");
const path = require("path");
const { deleteFile } = require("../../utils/functions");
const createError = require("http-errors");
class BlogController extends Controller {
  async findBlog(query = {}) {
    const blog = await BlogModel.findOne(query).populate([
      { path: "category", select: ["title", "first_name", "username"] },
      { path: "author", select: ["mobile"] },
    ]);
    if (!blog) return createError.NotFound("مقاله ای یافت نشد");
    return blog;
  }
  async createBlog(req, res, next) {
    try {
      const blogDataBody = await blogSchema.validateAsync(req.body);
      req.body.image = path
        .join(blogDataBody.fileuploudpath, blogDataBody.filename)
        .replace(/\\/g, "/");
      const image = req.body.image;
      const author = req.user._id;
      const { title, short_text, category, tags, text } = blogDataBody;
      console.log(image);
      const blog = await BlogModel.create({
        title,
        text,
        image,
        short_text,
        category,
        tags,
        author,
      });
      return res.status(201).json({
        data: {
          statusCode: 200,
          message: "ایجاد بلاگ با موفقیت انجام شد",
        },
      });
    } catch (error) {
      deleteFile(req.body.image);
      next(error);
    }
  }

  async getOneBlogById(req, res, next) {
    try {
      const { id } = req.params;
      const blog = await this.findBlog({ _id: id });
      return res.status(200).json({
        data: {
          statusCode: 200,
          blog,
        },
      });
    } catch (error) {
      next(error);
    }
  }

  async getListOfBlog(req, res, next) {
    try {
      const blog = await BlogModel.aggregate([
        { $match: {} },
        {
          $lookup: {
            from: "users",
            foreignField: "_id",
            localField: "author",
            as: "author",
          },
        },
        {
          $unwind: "$author",
        },
        {
          $project: {
            "author.Roles": 0,
            "author.bills": 0,
            "author.otp": 0,
            "author.discount_code": 0,
            "author.__v": 0,
          },
        },
        // ----------------------------category--------------------------------------
        {
          $lookup: {
            from: "categories",
            foreignField: "_id",
            localField: "category",
            as: "category",
          },
        },
        {
          $unwind: "$category",
        },
        {
          $project: {
            "category.__v": 0,
          },
        },
      ]);
      return res.status(200).json({
        data: {
          statusCode: 200,
          blog,
        },
      });
    } catch (error) {
      next(error);
    }
  }

  async getCommentsOfBlog(req, res, next) {
    try {
    } catch (error) {
      next(error);
    }
  }
  async deleteBlog(req, res, next) {
    try {
      const { id } = req.params;

      await this.findBlog({ _id: id });
      const deleteBlog = await BlogModel.deleteOne({ id });
      if (deleteBlog.deletedCount == 0)
        throw createError.InternalServerError("حذف انجام نشد");
      return res.status(200).json({
        data: {
          statusCode: 200,
          message: "حذف بلاگ با موفقیت انجام شد",
        },
      });
    } catch (error) {
      next(error);
    }
  }
  async updateBlog(req, res, next) {
    try {
      const { id } = req.params;
      await this.findBlog({ id });

      if ((req?.body?.fileuploudpath, req?.body?.filename)) {
        req.body.image = path
          .join(req.body.fileuploudpath, req.body.filename)
          .replace(/\\/g, "/");
      }
      const data = req.body;
      let nullData = ["", " ", "0", 0, undefined, null];
      let blackListField = [
        "bookmark",
        "dislike",
        "comments",
        "like",
        "author",
      ];

      Object.keys(data).forEach((key) => {
        if (blackListField.includes(key)) delete data[key];
        if (typeof data[key] == "string") data[key] = data[key].trim();
        if (Array.isArray(data[key]) && Array.length > 0)
          data[key] = data[key].map((item) => item.trim());
        if (nullData.includes(data[key])) delete data[key];
      });

      const update = await BlogModel.updateOne({ _id: id }, { $set: data });
      if (update.modifiedCount == 0)
        throw createError.InternalServerError("بروزرسانی انجام نشد");
      return res.status(200).json({
        data: {
          statusCode: 200,
          message: "بروزرسانی بلاگ با موفقیت انجام شد",
        },
      });
    } catch (error) {
      deleteFile(req?.body?.image || "");
      next(error);
    }
  }
}
module.exports = { BlogController: new BlogController() };
