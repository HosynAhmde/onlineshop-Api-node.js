const createError = require("http-errors");
const {
  generateRandomNuber,
  SignAccesToken,
  VerifyRefreshToken,
  SignRefreshToken,
} = require("../../../utils/functions");
const { UserModel } = require("../../../models/users");
const { EXPIRES_IN, USER_ROLE } = require("../../../utils/constans");
const Controller = require("../../controller");
const {
  getOtpSchema,
  chekOtpSchema,
} = require("../../../validators/user/auth.Schema");
class UserAuthController extends Controller {
  async getOtp(req, res, next) {
    try {
      await getOtpSchema.validateAsync(req.body);
      const { mobile } = req.body;
      const otpCode = generateRandomNuber();
      const result = await this.saveUser(mobile, otpCode);
      if (!result) throw createError.Unauthorized("شما وارد نشدید!!");
      return res.status(200).send({
        data: {
          statusCode: 200,
          otpCode,
          mobile,
          // Roles,
        },
        message: "کد اعتبار سنجی برای شما ارسال شد.",
      });
    } catch (error) {
      next(error);
    }
  }

  async saveUser(mobile, otpCode) {
    let otp = {
      code: otpCode,
      expiresIn: EXPIRES_IN,
    };
    const result = await this.chekExistUser(mobile);

    if (result) {
      return await this.updateUser(mobile, { otp });
    }
    return !!(await UserModel.create({
      mobile,
      otp,
      Roles: [USER_ROLE],
    }));
  }

  async chekExistUser(mobile) {
    const user = await UserModel.findOne({ mobile });
    return !!user;
  }
  async updateUser(mobile, data = {}) {
    Object.keys(data).forEach((key) => {
      if ([0, "0", null, undefined, NaN, "", " "].includes(data[key]))
        delete data[key];
      console.log(data);
    });
    const updateUser = await UserModel.updateOne({ mobile }, { $set: data });
    return !!updateUser.modifiedCount;
  }

  async chekOtp(req, res, next) {
    try {
      await chekOtpSchema.validateAsync(req.body);
      const { mobile, code } = req.body;
      const user = await UserModel.findOne({ mobile });
      if (!user)
        throw createError.NotFound("کابری با این شماره موبایل وجود ندارد!");
      if (user.otp.code != code)
        throw createError.NotFound("کد ارسال شده صحیح نمیباشد!");
      const now = Date.now();
      if (+user.otp.expiresIn < now)
        throw createError.NotFound("کد شما منقضی شده است!");
      const accesToken = await SignAccesToken(user._id);
      const refreshToken = await SignRefreshToken(user._id);
      return res.send({
        data: {
          accesToken,
          refreshToken,
        },
      });
    } catch (error) {
      next(error);
    }
  }

  async refreshToken(req, res, next) {
    try {
      const { refreshToken } = req.body;
      const mobile = await VerifyRefreshToken(refreshToken);
      const user = await UserModel.findOne(mobile);
      const accessToken = await SignAccesToken(user._id);
      const newRefreshToken = await SignRefreshToken(user._id);
      return res.json({
        data: {
          accessToken,
          refrechToken: newRefreshToken,
        },
      });
    } catch (error) {
      next(error);
    }
  }
}
module.exports = new UserAuthController();
