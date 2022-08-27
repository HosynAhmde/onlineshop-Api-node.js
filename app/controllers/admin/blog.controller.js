const { blogSchema } = require("../../validators/admin/blog.schema");
const Controller = require("../controller");
const { BlogModel } = require("../../models/blogs");
const path = require("path");
const { deleteFile } = require("../../utils/functions");
class BlogController extends Controller {
  async createBlog(req, res, next) {
    try {
      const blogDataBody = await blogSchema.validateAsync(req.body);
      req.body.image = path
        .join(blogDataBody.fileuploudpath, blogDataBody.filename)
        .replace(/\\/gi, "/");
      const { title, short_text, category, tags } = blogDataBody;
      const { image } = req.body.image;
      const blog = await BlogModel.create({
        title,
        short_text,
        category,
        tags,
        image,
      });
      return res.status(200).json({
        // statusCode: 200,

        // data: {
        //   blogDataBody,
        // },
        blog,
      });
    } catch (error) {
      deleteFile(req.body.image);
      next(error);
    }
  }

  async getOneBlogById(req, res, next) {
    try {
    } catch (error) {
      next(error);
    }
  }

  async getListOfBlog(req, res, next) {
    try {
      return res.status(200).json({
        statusCode: 200,
        data: {
          blog: [],
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
    } catch (error) {
      next(error);
    }
  }
  async updateBlog(req, res, next) {
    try {
    } catch (error) {
      next(error);
    }
  }
}
module.exports = { BlogController: new BlogController() };
