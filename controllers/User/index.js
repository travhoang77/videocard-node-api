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
};

/**
 * @param  {} req
 * @param  {} res
 */
async function createUser(req, res) {
  try {
    const salt = await bcrpyt.genSaltSync(10);
    req.body.password = await bcrpyt.hashSync(req.body.password, salt);
    const user = await UserServiceInstance.create(req.body);

    return res.send(omitPassword(user));
  } catch (err) {
    res.status(500).send(err);
  }
}

async function getUsers(req, res) {
  try {
    const users = await UserServiceInstance.get();
    return res.send(users);
  } catch (err) {
    res.status(500).send(err);
  }
}

async function getUserById(req, res) {
  try {
    const user = await UserServiceInstance.find(req.params.id);
    return res.send(omitPassword(user));
  } catch (err) {
    res.status(500).send(err);
  }
}

async function getUserByEmail(req, res) {
  try {
    const user = await UserServiceInstance.findByEmail(req.body.email);
    return user.success ? res.send(omitPassword(user)) : res.send(user);
  } catch (err) {
    res.status(500).send(err);
  }
}

async function authenticate(req, res) {
  try {
    const user = await UserServiceInstance.findByEmail(req.body.email);
    if (user.success) {
      const authenticated = await bcrpyt.compareSync(
        req.body.password,
        user.body.password
      );

      return authenticated
        ? res.send(omitPassword(user))
        : res.status(401).send("Unauthorized user");
    }
    return res.send(user);
  } catch (err) {
    res.status(500).send(err);
  }
}

function omitPassword(user) {
  user.body = _.pick(user.body, [
    "email",
    "firstname",
    "lastname",
    "date",
    "access_token",
    "birth_year",
    "_id",
    "__v",
  ]);
  return user;
}
