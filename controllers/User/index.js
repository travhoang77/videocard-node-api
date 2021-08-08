const UserService = require("../../services/UserService");
const UserServiceInstance = new UserService();
const logger = require("../../services/Logger");
const { findById } = require("../../models/User");
const { pick, remove } = require("lodash");
const bcrpyt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("../../config");

module.exports = {
  createUser,
  getUsers,
  getUserById,
  getUserByEmail,
  checkEmailExists,
  validatePassword,
  authenticate,
  deleteUserById,
  logOff,
};

/**
 * @param  {} req
 * @param  {} res
 */
async function createUser(req, res) {
  logger.info(`${req.method}-${req.originalUrl}-createUsers-${req.body}`);
  try {
    const salt = await bcrpyt.genSaltSync(10);
    req.body.password = await bcrpyt.hashSync(req.body.password, salt);
    const result = await UserServiceInstance.create(req.body);

    return res.send({
      success: result.success,
      body: omitPassword(result.body),
    });
  } catch (err) {
    res.status(500).send(err);
  }
}

async function getUsers(req, res) {
  logger.info(`${req.method}-${req.originalUrl}-getUsers`);
  try {
    const users = await UserServiceInstance.get();
    let results = { success: true, body: [] };
    users.body.map((b) => {
      results.body.push(omitPassword(b));
    });
    return res.send(results);
  } catch (err) {
    res.status(500).send(err);
  }
}

async function getUserById(req, res) {
  logger.info(`${req.method}-${req.originalUrl}-getUsersById:${req.params.id}`);
  try {
    const result = await UserServiceInstance.find(req.params.id);
    return result.success
      ? res.send({ success: result.success, body: omitPassword(result.body) })
      : res.send({ success: false, error: "User not found" });
  } catch (err) {
    res.status(500).send(err);
  }
}

async function getUserByEmail(req, res) {
  logger.info(
    `${req.method}-${req.originalUrl}-getUserByEmail:${req.params.email}`
  );
  try {
    const result = await UserServiceInstance.findByEmail(req.params.email);
    return result.success
      ? res.send({ success: result.success, body: omitPassword(result.body) })
      : res.send(user);
  } catch (err) {
    res.status(500).send(err);
  }
}

async function checkEmailExists(req, res) {
  try {
    logger.info(
      `${req.method}-${req.originalUrl}-checkEmailExistsc:${req.params.email}`
    );
    const result = await UserServiceInstance.findByEmail(req.params.email);
    return result.success
      ? res.send({
          success: result.success,
          message: "Email has already been registered",
        })
      : res.send({ success: result.success, message: "Email not found" });
  } catch (err) {
    res.status(500).send(err);
  }
}

async function validatePassword(req, res) {
  logger.info(
    `${req.method}-${req.originalUrl}-validatePassword:${req.body.id}`
  );
  try {
    const result = await UserServiceInstance.find(req.body.id);
    if (result.success) {
      const validated = await bcrpyt.compareSync(
        req.body.password,
        result.body.password
      );
      return validated
        ? res.send({ success: true, message: "Valid Password" })
        : res.send({ success: false, message: "Invalid Password" });
    } else
      return res
        .status(404)
        .send({ success: false, message: "Invalid User id" });
  } catch (err) {
    res.status(500).send(err);
  }
}

async function authenticate(req, res) {
  logger.info(
    `${req.method}-${req.originalUrl}-authenticate:${req.body.email}`
  );
  try {
    const result = await UserServiceInstance.findByEmail(req.body.email);

    if (result.success) {
      const authenticated = await bcrpyt.compareSync(
        req.body.password,
        result.body.password
      );

      if (authenticated) {
        const user = await UserServiceInstance.asignToken(result.body);
        user.body = omitPassword(user.body);
        return res
          .header("authorization", user.body.access_tokens[0])
          .send(user);
      } else
        return res
          .status(401)
          .send({ success: false, error: "Unauthorized user" });
    }
    return res.send(result);
  } catch (err) {
    res.status(500).send(err);
  }
}

async function deleteUserById(req, res) {
  try {
    const result = await UserServiceInstance.delete(req.params.id);
    result.success
      ? res.send({ success: result.success, body: omitPassword(result.body) })
      : res.send(result);
  } catch (err) {
    res.status(500).send(err);
  }
}
// Need to wrap in Transaction
// Log off user by removing its token and then updating it
async function logOff(req, res) {
  try {
    const token =
      req.headers && req.headers.authorization !== undefined
        ? req.headers.authorization
        : req.query.appToken || req.params.appToken || req.body.appToken;

    const decode = jwt.verify(token, config.secret);

    const result = await UserServiceInstance.find(decode._id);

    result.body.access_tokens = removeItemOnce(
      result.body.access_tokens,
      token
    );

    const updated_result = await UserServiceInstance.update(
      result.body._id,
      result.body
    );

    updated_result.success
      ? res.send({
          success: updated_result.success,
          body: omitPassword(updated_result.body),
        })
      : res.send(update_result);
  } catch (err) {
    res.status(500).send(err);
  }
}

function removeItemOnce(arr, value) {
  var index = arr.indexOf(value);
  if (index > -1) {
    arr.splice(index, 1);
  }
  return arr;
}

function omitPassword(user) {
  user = pick(user, [
    "email",
    "firstname",
    "lastname",
    "date",
    "access_tokens",
    "birth_year",
    "_id",
    "__v",
  ]);
  return user;
}
