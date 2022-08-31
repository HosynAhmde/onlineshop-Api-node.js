const { default: mongoose } = require("mongoose");

const userSchema = new mongoose.Schema({
  first_name: { type: String },
  last_name: { type: String },
  username: { type: String, lowercase: true },
  mobile: { type: String, required: true },
  email: { type: String, lowercase: true },
  password: { type: String },
  otp: {
    type: Object,
    default: {
      code: 0,
      expiresIn: 0,
    },
  },
  bills: { type: [], default: [] },
  discount_code: { type: Number, default: 0 },
  birthday: { type: String },
  Roles: { type: [String], default: ["USER"] },
  courses: { type: [mongoose.Types.ObjectId], default: [], ref: "Course" },
});
module.exports = { UserModel: mongoose.model("User", userSchema) };
