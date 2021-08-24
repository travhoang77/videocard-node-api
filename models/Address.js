const { string } = require("joi");
const mongoose = require("mongoose");
const Joigoose = require("joigoose")(mongoose);
const Address = require("../middlewares/validators/Address");

//Schema and Model is derived from Validator
const AddressSchema = new mongoose.Schema(Joigoose.convert(Address.validator));

module.exports = mongoose.model("Addresses", AddressSchema);
