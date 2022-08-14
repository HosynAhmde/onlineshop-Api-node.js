const createErorr = require("http-errors");
const jwt = require("jsonwebtoken");
const { UserModel } = require("../models/users");
async function VerifyToken(req, res, next) {
  const authorization = req.headers.authorization;
  if (!authorization) throw createErorr.Unauthorized("No Authorization Header");
  try {
    const token = authorization.split("Bearer ")[1];
    if (!token)
      throw createErorr.Unauthorized("لطفا وارد حساب کاربری خود شوید.");

    jwt.verify(
      token,
      process.env.ACCES_TOKEN_SECRET_KEY,
      async (error, payload) => {
        console.log(token);

        if (error)
          throw createErorr.Unauthorized("لطفا وارد حساب کاربری خود شوید.");
        const { mobile } = payload || {};
        const user = await UserModel.findOne(
          { mobile },
          { password: 0 },
          { otp: 0 }
        );
        if (!user) throw createErorr.Unauthorized("حساب کاربری یافت نشد");
        req.user = user;
        console.log(req.user);
      }
    );
    next();
  } catch (error) {
    next(error);
  }
}

module.exports = VerifyToken;
