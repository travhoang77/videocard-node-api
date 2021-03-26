const UserService = require("../../services/UserService");
const UserServiceInstance = new UserService();
const { findById } = require("../../models/User");
const _ = require("lodash");
const bcrpyt = require("bcrypt");

module.exports = {
  createUser,
  getUsers,
  getUserById,
  getUserByEmail,
  authenticate,
  deleteUserById,
};

/**
 * @param  {} req
 * @param  {} res
 */
async function createUser(req, res) {
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
  try {
    const result = await UserServiceInstance.findByEmail(req.body.email);
    return result.success
      ? res.send({ success: result.success, body: omitPassword(result.body) })
      : res.send(user);
  } catch (err) {
    res.status(500).send(err);
  }
}

async function authenticate(req, res) {
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
function omitPassword(user) {
  user = _.pick(user, [
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
