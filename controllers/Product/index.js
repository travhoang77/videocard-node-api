const ProductService = require("../../services/ProductService");
const ProductServiceInstance = new ProductService();
const logger = require("../../services/Logger");

const url = require("url");
const querystring = require("querystring");

module.exports = {
  createProduct,
  getProducts,
  getProductById,
  getProductsByChipset,
  // Commenting out update and delete until user roles are defined.
  // updateProduct,
  // deleteProduct,
};

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

async function getProductById(req, res) {
  logger.info(
    `${req.method}-${req.originalUrl}-getProductById ${req.params.id}`
  );
  try {
    const product = await ProductServiceInstance.find(req.params.id);
    return res.send(product);
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
    res.status(500).send(err);
  }
}

async function updateProduct(req, res) {
  logger.info(
    `${req.method}-${req.originalUrl}-updateProduct-${JSON.stringify(req.body)}`
  );
  try {
    const product = await ProductServiceInstance.update(
      req.params.id,
      req.body
    );
    return res.send(product);
  } catch (err) {
    res.status(500).send(err);
  }
}

async function deleteProduct(req, res) {
  logger.info(
    `${req.method}-${req.originalUrl}-deleteProduct ${req.params.id}`
  );
  try {
    const result = await ProductServiceInstance.delete(req.params.id);
    result.success
      ? res.send({ success: result.success, body: result.body })
      : res.send(result);
  } catch (err) {
    res.status(500).send(err);
  }
}
