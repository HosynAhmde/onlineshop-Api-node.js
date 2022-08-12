const { default: mongoose } = require("mongoose");

const productSchema = new mongoose.Schema({
  title: { type: String, required: true },
  short_desc: { type: String, required: true },
  image: { type: [String], required: true },
  tags: { type: [String], default: [] },
  category: { type: mongoose.Types.ObjectId, required: true },
  comments: { type: [], default: [] },
  like: { type: [mongoose.Types.ObjectId], default: [] },
  dislike: { type: [mongoose.Types.ObjectId], default: [] },
  bookmark: { type: [mongoose.Types.ObjectId], default: [] },
  price: { type: Number, required: true },
  discount: { type: Number, default: 0 },
  count: { type: Number, required: true },
  type: { type: Number, required: true },
  time: { type: Number },
  format: { type: Number },
  teacher: { type: mongoose.Types.ObjectId, required: true },
});
module.exports = { ProductModel: mongoose.model("Product", productSchema) };
