const createErorr = require("http-errors");
const jwt = require("jsonwebtoken");
const { UserModel } = require("../models/users");
function getToken(authorization) {
  if (!authorization) throw createErorr.Unauthorized("No Authorization Header");
  const token = authorization.split("Bearer ")[1];
  if (!token) throw createErorr.Unauthorized("لطفا وارد حساب کاربری خود شوید.");
  return token;
}

async function VerifyToken(req, res, next) {
  try {
    const token = getToken(req.headers.authorization);
    jwt.verify(
      token,
      process.env.ACCES_TOKEN_SECRET_KEY,
      async (error, payload) => {
        if (error)
          throw createErorr.Unauthorized("لطفا وارد حساب کاربری خود شوید.");
        const { mobile } = payload || {};
        const user = await UserModel.findOne(
          { mobile },
          { password: 0, otp: 0 }
        );
        if (!user) throw createErorr.Unauthorized("حساب کاربری یافت نشد");
        req.user = user;
        return next();
      }
    );
  } catch (error) {
    next(error);
  }
}

function chekRole(role) {
  return function (req, res, next) {
    try {
      const user = req.user;

      if (user.Roles.includes(role)) return next();
      throw createErorr.Forbidden("دسترسی شما مجاز نیست");
    } catch (error) {
      next(error);
    }
  };
}

module.exports = { VerifyToken, chekRole };
