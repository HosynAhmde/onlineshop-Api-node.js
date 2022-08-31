const { default: mongoose } = require("mongoose");
const { CommentSchema } = require("./public.schema");

const blogSchema = new mongoose.Schema(
  {
    author: { type: mongoose.Types.ObjectId, ref: "User", required: true },
    title: { type: String, required: true },
    short_text: { type: String, required: true },
    text: { type: String, required: true },
    image: { type: String, required: true },
    tags: { type: [String], default: [] },
    category: {
      type: [mongoose.Types.ObjectId],
      ref: "Category",
      required: true,
    },
    comments: { type: [CommentSchema], default: [] },
    like: { type: [mongoose.Types.ObjectId], ref: "User", default: [] },
    dislike: { type: [mongoose.Types.ObjectId], ref: "User", default: [] },
    bookmark: { type: [mongoose.Types.ObjectId], ref: "User", default: [] },
  },
  {
    timestamps: true,
    versionKey: false,
    toJSON: {
      virtuals: true,
    },
  }
);
blogSchema.virtual("user", {
  ref: "User",
  localField: "_id",
  foreignField: "author",
});
blogSchema.virtual("category_details", {
  ref: "Category",
  localField: "_id",
  foreignField: "category",
});
module.exports = { BlogModel: mongoose.model("Blog", blogSchema) };
