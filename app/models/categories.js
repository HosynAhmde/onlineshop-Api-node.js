const { default: mongoose } = require("mongoose");

const categorySchema = new mongoose.Schema({
  title: { type: String, required: true },
});
module.exports = { CategoryModel: mongoose.model("Category", categorySchema) };
