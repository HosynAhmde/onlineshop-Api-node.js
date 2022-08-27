const jwt = require("jsonwebtoken");
const { UserModel } = require("../models/users");
const createError = require("http-errors");
const redisClient = require("./redis_init");
const fs = require("fs");
const path = require("path");
function generateRandomNuber() {
  return Math.floor(Math.random() * 90000 + 10000);
}
async function SignAccesToken(userId) {
  const user = await UserModel.findById(userId);
  const payload = {
    mobile: user.mobile,
  };
  options = {
    expiresIn: "10d",
  };
  const token = jwt.sign(payload, process.env.ACCES_TOKEN_SECRET_KEY, options);
  return token;
}

async function SignRefreshToken(userId) {
  const user = await UserModel.findById(userId);
  const payload = {
    mobile: user.mobile,
  };
  options = {
    expiresIn: "1y",
  };
  const token = jwt.sign(
    payload,
    process.env.REFRESH_TOKEN_SECRET_KEY,
    options
  );
  const userid = JSON.stringify(userId);
  redisClient.SETEX(userid, 365 * 24 * 60 * 60, token);
  return token;
}

async function VerifyRefreshToken(token) {
  try {
    jwt.verify(
      token,
      process.env.REFRESH_TOKEN_SECRET_KEY,
      async (error, payload) => {
        // if (error) return createError.Unauthorized("حساب کاربری یافت نشد");

        const { mobile } = payload || {};

        const user = await UserModel.findOne(
          { mobile },
          { password: 0, otp: 0 }
        );
        if (!user) return createError.Unauthorized("حساب کاربری یافت نشد");
        const refreshtoken = await redisClient.get(JSON.stringify(user._id));
        console.log(refreshtoken);
        if (token === refreshtoken) return mobile;
        return createError.Unauthorized("ورود مجدد به حساب کاربری انجام نشد.");
      }
    );
  } catch (error) {
    console.log(error);
  }
}

function deleteFile(fileAddress) {
  const filePath = path.join(__dirname, "..", "..", "public", fileAddress);
  fs.unlinkSync(filePath);
}
module.exports = {
  generateRandomNuber,
  SignAccesToken,
  SignRefreshToken,
  VerifyRefreshToken,
  deleteFile,
};
