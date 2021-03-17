const { string } = require("joi");
const mongoose = require("mongoose");
const Joigoose = require("joigoose")(mongoose);
const User = require("../middlewares/validators/User");

//Schema and Model is derived from Validator
const UserSchema = new mongoose.Schema(Joigoose.convert(User.validator));

module.exports = mongoose.model("Users", UserSchema);
