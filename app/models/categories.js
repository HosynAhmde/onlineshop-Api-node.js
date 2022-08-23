const { default: mongoose, Schema } = require("mongoose");

const categorySchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    parent: {
      type: mongoose.Types.ObjectId,
      ref: "Category",
      default: undefined,
    },
  },
  {
    id: false,
    toJSON: {
      virtuals: true,
    },
  }
);
categorySchema.virtual("children", {
  ref: "Category",
  localField: "_id",
  foreignField: "parent",
});
function autopuplate(next) {
  this.populate([{ path: "children", select: { __v: 0, id: 0 } }]);
  next();
}
categorySchema.pre("findOne", autopuplate).pre("find", autopuplate);
module.exports = { CategoryModel: mongoose.model("Category", categorySchema) };
