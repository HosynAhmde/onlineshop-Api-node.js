const createError = require("http-errors");
const authSchema = require("../../../validators/user/auth.Schema");
class UserAuthController {
  async login(req, res, next) {
    try {
      const result = await authSchema.validateAsync(req.body);
      return res.status(200).send({ message: "ورود شما با موفقیت انجام شد." });
    } catch (error) {
      next(createError.BadRequest(error.message));
    }
  }
}
module.exports = new UserAuthController();
