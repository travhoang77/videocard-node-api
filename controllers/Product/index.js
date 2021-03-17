const ProductService = require("../../services/ProductService");
const ProductServiceInstance = new ProductService();
const { findById } = require("../../models/Product");

module.exports = {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};
/**
 * @param  {} req
 * @param  {} res
 */
async function createProduct(req, res) {
  try {
    const product = await ProductServiceInstance.create(req.body);
    return res.send(product);
  } catch (err) {
    res.status(500).send(err);
  }
}

async function getProducts(req, res) {
  try {
    const products = await ProductServiceInstance.get();
    return res.send(products);
  } catch (err) {
    res.status(500).send(err);
  }
}

async function getProductById(req, res) {
  try {
    const product = await ProductServiceInstance.find(req.params.id);
    return res.send(product);
  } catch (err) {
    res.status(500).send(err);
  }
}

async function updateProduct(req, res) {
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
  try {
    const product = await ProductServiceInstance.delete(req.params.id);
    return res.send(product);
  } catch (err) {
    res.status(500).send(err);
  }
}
