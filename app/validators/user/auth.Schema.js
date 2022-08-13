const joi = require("joi");

const getOtpSchema = joi.object({
  mobile: joi
    .string()
    .length(11)
    .pattern(/^09[0-9]{9}$/)
    .error(new Error("شماره موبایل صحیح نمیباشد")),
});

const chekOtpSchema = joi.object({
  mobile: joi
    .string()
    .length(11)
    .pattern(/^09[0-9]{9}$/)
    .error(new Error("شماره موبایل صحیح نمیباشد")),
  code: joi.string().length(5).error(new Error("کد ارسال شده صحیح نمیباشد.")),
});
module.exports = { getOtpSchema, chekOtpSchema };
