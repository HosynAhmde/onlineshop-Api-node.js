const jwt = require("jsonwebtoken");
const { UserModel } = require("../models/users");
const createError = require("http-errors");
function generateRandomNuber() {
  return Math.floor(Math.random() * 90000 + 10000);
}
async function SignAccesToken(userId) {
  const user = await UserModel.findById(userId);
  const payload = {
    mobile: user.mobile,
    userID: user._id,
  };
  options = {
    expiresIn: "10d",
  };
  const token = jwt.sign(payload, process.env.ACCES_TOKEN_SECRET_KEY, options);
  return token;
}
module.exports = { generateRandomNuber, SignAccesToken };
