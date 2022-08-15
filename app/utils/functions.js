const jwt = require("jsonwebtoken");
const { UserModel } = require("../models/users");
const createError = require("http-errors");
const redisClient = require("./redis_init");
// const packageName = require('packageName');
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
  redisClient.SETEX(userId, 365 * 24 * 60 * 60, token);
  return token;
}

function VerifyRefreshToken(token) {
  try {
    jwt.verify(
      token,
      process.env.REFRESH_TOKEN_SECRET_KEY,
      async (error, payload) => {
        if (error) return createError.Unauthorized("حساب کاربری یافت نشد");
        console.log(payload);

        const { mobile } = payload || {};
        const user = await UserModel.findOne(
          { mobile },
          { password: 0 },
          { otp: 0 }
        );
        if (!user) return createError.Unauthorized("حساب کاربری یافت نشد");
        const refreshtoken = await redisClient.get(user._id);
        if (token === refreshtoken) return mobile;
        return createError.Unauthorized("ورود مجدد به حساب کاربری انجام نشد.");
      }
    );
  } catch (error) {
    next(error);
  }
}
module.exports = {
  generateRandomNuber,
  SignAccesToken,
  SignRefreshToken,
  VerifyRefreshToken,
};
