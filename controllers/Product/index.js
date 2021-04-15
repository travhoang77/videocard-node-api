const ProductService = require("../../services/ProductService");
const ProductServiceInstance = new ProductService();
const logger = require("../../services/Logger");

module.exports = { createProduct, getProducts };

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
