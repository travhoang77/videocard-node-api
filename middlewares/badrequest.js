const Messages = require("../config/messages");
const resUtil = require("./response");
const config = require("../config");
const logger = require("../services/Logger");

module.exports = { rejectObId };

/**
 * @description Disallow _id inside body of request
 * @param req {object} Express object
 * @param res {object} Express object
 * @param next {function} Express MW
 * @returns {*}
 */
function rejectObId(req, res, next) {
  logger.info(`${req.method}-${req.originalUrl}-rejectObId:${req.body}`);

  const id = req.body._id;

  if (id) {
    return res
      .status(400)
      .send(resUtil.sendError(Messages.responses.bodyNotProvided));
  } else next();
}
