const express = require("express");
const logger = require("../../services/Logger");
const url = require("url");
const querystring = require("querystring");
const _ = require("lodash");
const {
  createProduct,
  getProducts,
  getProductById,
  getProductsByChipset,
  getProductsByCategory,
  updateProduct,
  deleteProduct,
} = require("../../controllers/Product/index");

const { validateToken } = require("../../middlewares/token");

let router = express.Router();

router.get("/", (req, res) => {
  const query = url.parse(req.url, true).query;

  if (_.isEmpty(query)) getProducts(req, res);
  else {
    if (query["chipset"]) {
      getProductsByChipset(req, res);
    } else if (query["category"]) {
      console.log(query["category"]);
      getProductsByCategory(req, res);
    }
  }
});

router.get("/:id", (req, res) => {
  getProductById(req, res);
});

router.post("/", validateToken, (req, res) => {
  createProduct(req, res);
});
// Commenting out PUT and DELETE Product until User Roles are defined
// router.put("/:id", validateToken, (req, res) => {
//   updateProduct(req, res);
// });

// router.delete("/:id", validateToken, (req, res) => {
//   deleteProduct(req, res);
// });

module.exports = router;
