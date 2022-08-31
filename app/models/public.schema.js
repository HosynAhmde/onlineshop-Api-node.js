const mongoose = require("mongoose");
const CommentSchema = new mongoose.Schema({
  user: { type: mongoose.Types.ObjectId, ref: "User", required: true },
  commnet: { type: String, required: true },
  createdAd: { type: Date, default: new Date().getTime() },
  parent: { type: mongoose.Types.ObjectId, ref: "comment" },
});

module.exports = { CommentSchema };
