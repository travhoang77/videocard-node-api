const UserService = require("../../services/UserService");
const UserServiceInstance = new UserService();
const logger = require("../../services/Logger");
const { findById } = require("../../models/User");
const _ = require("lodash");
const bcrpyt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {
  removeItemOnce,
  updateObject,
  omitPassword,
  moveItemToFront,
} = require("../../util/ObjectUtil");
const config = require("../../config");

module.exports = {
  createUser,
  getUsers,
  getUserById,
  getUserByEmail,
  checkEmailExists,
  validatePassword,
  updatePassword,
  authenticate,
  deleteUserById,
  logOff,
  listAddresses,
  createAddress,
  deleteAddressById,
  updateAddressById,
  setPrimaryAddressById,
  setDefaultShippingAddressById,
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

async function updatePassword(req, res) {
  logger.info(`${req.method}-${req.originalUrl}-updatePassword:${req.body.id}`);

  try {
    console.log(req.body.id);
    const result = await UserServiceInstance.find(req.body.id);
    console.log(req.body.id);
    if (result.success) {
      const salt = await bcrpyt.genSaltSync(10);
      result.body.password = await bcrpyt.hashSync(req.body.password, salt);
      const updatedresult = await UserServiceInstance.update(
        req.body.id,
        result.body
      );

      updatedresult.success
        ? res.send({ success: true, message: "Password successfully updated" })
        : res.send({ success: false, message: "Password update failed" });
    } else res.send({ success: false, message: "Invalid User id" });
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
      : res.send(updated_result);
  } catch (err) {
    res.status(500).send(err);
  }
}

async function listAddresses(req, res) {
  logger.info(`${req.method}-${req.originalUrl}-listAddresses-`);
  try {
    const id = req.params.id;
    const result = await UserServiceInstance.find(id);

    res.send({ success: true, addresses: result.body.addresses });
  } catch (err) {
    res.status(500).send(err);
  }
}

async function createAddress(req, res) {
  logger.info(`${req.method}-${req.originalUrl}-createAddress-${req.body}`);
  try {
    const result = await UserServiceInstance.find(req.params.id);
    result.body.addresses !== undefined
      ? result.body.addresses.push(req.body)
      : (result.body.addresses = [req.body]);

    const updated_result = await UserServiceInstance.update(
      req.params.id,
      result.body
    );

    updated_result.success
      ? res.send({
          success: updated_result.success,
          addresses: updated_result.body.addresses,
        })
      : res.send({
          success: updated_result.success,
          message: "Address could not be created",
        });
  } catch (err) {
    res.status(500).send(err);
  }
}

async function deleteAddressById(req, res) {
  logger.info(
    `${req.method}-${req.originalUrl}-deleteAddressBy-${req.params.id}`
  );
  try {
    const result = await UserServiceInstance.find(req.params.userid);

    addressesAreNullorEmpty(result.body.addresses, req, res);

    const removed = _.remove(result.body.addresses, function (n) {
      return n._id == req.params.id;
    });

    if (_.isEmpty(removed))
      res.status(404).send({ success: false, message: "Address not found" });

    const updated_result = await UserServiceInstance.update(
      req.params.userid,
      result.body
    );

    updated_result.success
      ? res.send({
          success: updated_result.success,
          addresses: updated_result.body.addresses,
        })
      : res.send({
          success: updated_result.success,
          message: "Address could not be removed",
        });
  } catch (err) {
    res.status(500).send(err);
  }
}

async function updateAddressById(req, res) {
  logger.info(
    `${req.method}-${req.originalUrl}-updateAddressById-${req.params.id}`
  );
  try {
    const result = await UserServiceInstance.find(req.params.userid);

    addressesAreNullorEmpty(result.body.addresses, req, res);

    const index = result.body.addresses.findIndex(
      (x) => x._id == req.params.id
    );

    if (index === -1)
      res.status(404).send({ success: false, message: "Address not found" });

    const updated = updateObject(result.body.addresses[index], req.body);

    result.body.addresses[index] = updated;

    const updated_result = await UserServiceInstance.update(
      req.params.userid,
      result.body
    );

    updated_result.success
      ? res.send({
          success: updated_result.success,
          address: updated_result.body.addresses[index],
        })
      : res.send({
          success: updated_result.success,
          message: "Address could not be updated",
        });
  } catch (err) {
    res.status(500).send(err);
  }
}

//First address is always the primary address
async function setPrimaryAddressById(req, res) {
  logger.info(
    `${req.method}-${req.originalUrl}-setPrimaryAddressById-${req.params.id}`
  );
  try {
    const result = await UserServiceInstance.find(req.params.userid);

    addressesAreNullorEmpty(result.body.addresses, req, res);

    const index = result.body.addresses.findIndex(
      (x) => x._id == req.params.id
    );

    if (index === -1)
      res.status(404).send({ success: false, message: "Address not found" });

    if (result.body.addresses.length > 1) {
      moveItemToFront("_id", req.params.id, result.body.addresses);

      const updated_result = await UserServiceInstance.update(
        req.params.userid,
        result.body
      );

      updated_result
        ? res.send({
            success: updated_result.success,
            addresses: updated_result.body.addresses,
          })
        : res.send({
            success: updated_result.success,
            message: "Primary address could not be set",
          });
    } else
      res.send({
        success: false,
        message:
          "There is only one address and it is already the primary address",
      });
  } catch (err) {
    res.status(500).send(err);
  }
}

async function setDefaultShippingAddressById(req, res) {
  logger.info(
    `${req.method}-${req.originalUrl}-setDefaultShippingAddressById-${req.params.id}`
  );
  try {
    const result = await UserServiceInstance.find(req.params.userid);

    addressesAreNullorEmpty(result.body.addresses, req, res);
    const index = result.body.addresses.findIndex(
      (x) => x._id == req.params.id
    );

    if (index === -1 || index === 0)
      res.status(404).send({ success: false, message: "Address not found" });

    if (index === 1)
      res.send({
        success: false,
        message:
          "There is only one shipping address and it is already the default shipping address",
      });

    const subarray = result.body.addresses.slice(1);
    moveItemToFront("_id", req.params.id, subarray);
    result.body.addresses = [result.body.addresses[0]].concat(subarray);

    const updated_result = await UserServiceInstance.update(
      req.params.userid,
      result.body
    );

    updated_result
      ? res.send({
          success: updated_result.success,
          addresses: updated_result.body.addresses,
        })
      : res.send({
          success: updated_result.success,
          message: "Default shipping address could not be set",
        });
  } catch (err) {
    res.status(500).send(err);
  }
}

function addressesAreNullorEmpty(addresses, req, res) {
  if (_.isNull(addresses) || _.isEmpty(addresses))
    res.status(404).send({ success: false, message: "Address not found" });
}
