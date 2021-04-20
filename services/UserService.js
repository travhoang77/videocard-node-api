const MongooseService = require("./MongooseService");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const asyncHandler = require("../middlewares/asyncService");
const _ = require("lodash");
const config = require("../config");

/**
 * @description Create an instance of UserService with basic CRUD services
 */
class UserService {
  /**
   * Create instance of Data Access Layer using User Model.
   */
  constructor() {
    this.MongooseServiceInstance = new MongooseService(User);
  }

  /**
   * @param  {} user
   * create user and insert into DB.
   * @return success value and result
   */
  create(user) {
    const result = asyncHandler(this.MongooseServiceInstance.create(user));
    return result;
  }
  /**
   * Get all users
   */
  get() {
    const results = asyncHandler(this.MongooseServiceInstance.find());
    return results;
  }
  /**
   * Get single user by id.
   */
  find(id) {
    const result = asyncHandler(this.MongooseServiceInstance.findById(id));
    return result;
  }
  /**
   * Get user by email.
   * @param  {} email
   */
  findByEmail(email) {
    const result = asyncHandler(
      this.MongooseServiceInstance.findOne({ email: email })
    );
    return result;
  }
  /**
   * @param  {} user
   * update exisiting user in DB
   * @return success value and result
   */
  update(id, user) {
    const result = asyncHandler(this.MongooseServiceInstance.update(id, user));
    return result;
  }
  /**
   * @param  {} id
   * Delete user with given id
   * @return the deleted user
   */
  delete(id) {
    const result = asyncHandler(this.MongooseServiceInstance.delete(id));
    return result;
  }

  asignToken(user) {
    const token = jwt.sign(this.#createPayload(user), config.secret);

    user.access_tokens != null
      ? user.access_tokens.push(token)
      : (user.access_tokens = [token]);

    return asyncHandler(this.MongooseServiceInstance.update(user._id, user));
  }

  #createPayload = (user) => {
    user = _.pick(user, ["_id", "email", "firstname"]);
    user.timestamp = Date.now();
    return user;
  };
}
module.exports = UserService;
