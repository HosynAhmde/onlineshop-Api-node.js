const joi = require("joi");

const blogSchema = joi.object({
  title: joi
    .string()
    .min(3)
    .max(30)
    .error(new Error("عنوان دسته بندی صحیح نمیباشد.")),
  text: joi.string().error(new Error("متن ارسال شده صحیح نمیباشد.")),
  short_text: joi.string().error(new Error("متن ارسال شده صحیح نمیباشد.")),
  filename: joi
    .string()
    .pattern(/(\.png|\.jpg|\.webp|\.jpeg)/)
    .error(new Error("فرمت بارگزاری شده صحیح نمیباشد")),
  tags: joi
    .string()
    .min(0)
    .max(30)
    .error(new Error("(برچسب ها نمیتواند بیشتر از 20 ایتم باشند")),
  category: joi.string().error(new Error("دسته بندی یافت نشد")),
  fileuploudpath: joi.allow(),
});

module.exports = { blogSchema };
