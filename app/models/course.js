const { default: mongoose } = require("mongoose");
const { CommentSchema } = require("./public.schema");

const episodeSchema = mongoose.Schema({
  title: { type: String, required: true },
  text: { type: String, required: true },
  type: { type: String, default: "free" },
  time: { type: String, required: true },
});

const chapterSchema = new mongoose.Schema({
  title: { type: String, required: true },
  text: { type: String, default: "" },
  episode: { type: [episodeSchema], default: [] },
});

const courseSchema = new mongoose.Schema({
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
  type: { type: Number, required: true, default: "free" },
  time: { type: String, defualt: "00:00" },
  teacher: { type: mongoose.Types.ObjectId, ref: "User", required: true },
  chapter: { type: [chapterSchema], default: [] },
  students: { type: [mongoose.Types.ObjectId], default: [], ref: "User" },
});
module.exports = { CourseModel: mongoose.model("Course", courseSchema) };
