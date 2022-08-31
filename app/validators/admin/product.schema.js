const joi = require("joi");

const productSchema = joi.object({
  title: joi
    .string()
    .min(3)
    .max(30)
    .error(new Error("عنوان دسته بندی صحیح نمیباشد.")),
  text: joi.string().error(new Error("متن ارسال شده صحیح نمیباشد.")),
  short_text: joi.string().error(new Error("متن ارسال شده صحیح نمیباشد.")),
  tags: joi
    .string()
    .min(0)
    .max(30)
    .error(new Error("(برچسب ها نمیتواند بیشتر از 20 ایتم باشند")),
  category: joi.string().error(new Error("دسته بندی یافت نشد")),
  price: joi.number().error(new Error("قیمت وارد شده صخیخ نمیباشد")),
  count: joi.number().error(new Error("تعداد وارد شده صحیح نمیباشد")),
  discount: joi
    .number()
    .allow("")
    .error(new Error("تخفیف وارد شده صحیح نمیباشد")),
  weight: joi
    .number()
    .allow("0", 0, null)
    .error(new Error("وزن وارد شده صحیح نمیباشد")),
  width: joi
    .number()
    .allow("0", 0, null)
    .error(new Error("عرض وارد شده صحیح نمیباشد")),
  length: joi
    .number()
    .allow("0", 0, null)
    .error(new Error("طول  وارد شده صحیح نمیباشد")),
  height: joi
    .number()
    .allow("0", 0, null)
    .error(new Error("طول  وارد شده صحیح نمیباشد")),

  filename: joi
    .string()
    .pattern(/(\.png|\.jpg|\.webp|\.jpeg)/)
    .error(new Error("فرمت بارگزاری شده صحیح نمیباشد")),
  fileuploudpath: joi.allow(),
});

module.exports = { productSchema };
