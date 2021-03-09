const { string } = require("joi");
const mongoose = require("mongoose");

const ProductSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  subtitle: {
    type: String,
  },

  type: {
    type: String,
  },

  chipset: {
    type: String,
  },

  maker: {
    type: String,
  },

  brand: {
    type: String,
  },

  quantity: {
    type: Number,
  },

  price: {
    type: Number,
  },

  imgUrl: {
    type: String,
  },

  rating: {
    type: Number,
    default: 0,
  },

  tags: [String],

  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Products", ProductSchema);
