const { default: mongoose } = require("mongoose");

const userSchema = new mongoose.Schema({
  first_name: { type: String },
  last_name: { type: String },
  username: { type: String },
  phone: { type: String },
  email: { type: String },
  password: { type: String },
  otp: {
    type: Object,
    default: {
      code: 0,
      expires: 0,
    },
    bills: { type: [], default: [] },
    discount_code: { type: Number, default: 0 },
    birthday: { type: String },
    Roles: { type: [String], default: ["User"] },
  },
});
module.exports = { UserModel: mongoose.model("User", userSchema) };
