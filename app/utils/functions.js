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
        console.log(mobile);

        return mobile;
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
