const joi = require("joi");
const addCategorySchema = joi.object({
  title: joi.string().error(new Error("عنوان دسته بندی صحیح نمیباشد.")),
  parent: joi

    .string()
    .allow("")
    .error(new Error("شناسه ارسال شده صحیح نمیباشد")),
});
const editCategorySchema = joi.object({
  title: joi.string().error(new Error("عنوان دسته بندی صحیح نمیباشد.")),
});
module.exports = { addCategorySchema, editCategorySchema };
