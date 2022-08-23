const joi = require("joi");
// Joi.objectId = require("joi-objectid")(Joi);
const addCategorySchema = joi.object({
  title: joi
    // .objectId()
    .string()
    .error(new Error("عنوان دسته بندی صحیح نمیباشد.")),
  parent: joi
    // .objectId()
    .string()
    .allow("")
    .error(new Error("شناسه ارسال شده صحیح نمیباشد")),
});
module.exports = addCategorySchema;
