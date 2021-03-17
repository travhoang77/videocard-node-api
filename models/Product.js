const { string } = require("joi");
const mongoose = require("mongoose");
const Joigoose = require("joigoose")(mongoose);
const Product = require("../middlewares/validators/Product");

//Schema and Model is derived from Validator
const ProductSchema = new mongoose.Schema(Joigoose.convert(Product.validator));

module.exports = mongoose.model("Products", ProductSchema);
