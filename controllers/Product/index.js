const ProductService = require("../../services/ProductService");
const ProductServiceInstance = new ProductService();
const logger = require("../../services/Logger");

const url = require("url");
const querystring = require("querystring");

module.exports = { createProduct, getProducts, getProductsByChipset };

async function createProduct(req, res) {
  logger.info(
    `${req.method}-${req.originalUrl}-createProducts-${JSON.stringify(
      req.body
    )}`
  );
  try {
    const product = await ProductServiceInstance.create(req.body);
    return res.send(product);
  } catch (err) {
    res.status(500).send(err);
  }
}

async function getProducts(req, res) {
  logger.info(`${req.method}-${req.originalUrl}-getProducts`);
  try {
    const products = await ProductServiceInstance.get();
    return res.send(products);
  } catch (err) {
    res.status(500).send(err);
  }
}

async function getProductsByChipset(req, res) {
  logger.info(
    `${req.method}-${req.originalUrl}-getProductsByChipset ${req.query.chipset}`
  );
  try {
    const query = url.parse(req.url, true).query;
    const products = await ProductServiceInstance.getBy(query["chipset"]);
    return res.send(products);
  } catch (err) {
    res.statue(500).send(err);
  }
}
// try {
//   const products = await ProductServiceInstance.getProductsByChipset(
//     req.query.chipset
//   );
//   return res.send(products);
// } catch (err) {
//   res.status(500).send(err);
// }
