const { default: mongoose } = require("mongoose");
const { CommentSchema } = require("./public.schema");

const productSchema = new mongoose.Schema({
  title: { type: String, required: true },
  short_text: { type: String, required: true },
  text: { type: String, required: true },
  image: { type: [String], required: true },
  tags: { type: [String], default: [] },
  category: { type: mongoose.Types.ObjectId, ref: "Category", required: true },
  comments: { type: [CommentSchema], default: [] },
  like: { type: [mongoose.Types.ObjectId], default: [] },
  dislike: { type: [mongoose.Types.ObjectId], default: [] },
  bookmark: { type: [mongoose.Types.ObjectId], default: [] },
  price: { type: Number, required: true },
  discount: { type: Number, default: 0 },
  count: { type: Number, default: 0 },
  format: { type: String },
  owner: { type: mongoose.Types.ObjectId, required: true },
  features: {
    type: Object,
    default: {
      length: "",
      height: "",
      width: "",
      weight: "",
    },
  },
});
module.exports = { ProductModel: mongoose.model("Product", productSchema) };
