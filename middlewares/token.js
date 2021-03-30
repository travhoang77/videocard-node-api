const UserService = require("../services/UserService");
const UserServiceInstance = new UserService();
const Messages = require("../config/messages");
const resUtil = require("./response");
const jwt = require("jsonwebtoken");
const config = require("../config");

module.exports = { validateToken };

/**
 * @description Validates that the application token was provided in the request except /api/auth
 * @param req {object} Express object
 * @param res {object} Express object
 * @param next {function} Express MW
 * @returns {*}
 */
async function validateToken(req, res, next) {
  const token =
    req.headers && req.headers.authorization !== undefined
      ? req.headers.authorization
      : req.query.appToken || req.params.appToken || req.body.appToken;

  if (token) {
    const validToken = await isValid(token);
    if (!validToken) {
      return res
        .status(401)
        .send(resUtil.sendError(Messages.responses.appTokenInvalid));
    }
    req.token = token;
    next();
  } else {
    return res
      .status(400)
      .send(resUtil.sendError(Messages.responses.appTokenNotProvided));
  }
}

async function isValid(token) {
  try {
    const decoded = jwt.verify(token, config.secret);
    const result = await UserServiceInstance.find(decoded._id);
    return result.success && result.body.access_tokens.includes(token);
  } catch (err) {
    return false;
  }
}
