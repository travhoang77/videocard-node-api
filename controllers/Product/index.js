const ProductService = require("../../services/ProductService");
const ProductServiceInstance = new ProductService();
const asyncControllerHandler = require("../../middlewares/asyncController");

module.exports = { createProduct, getProducts, getProductById };

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
  try{
    const product = await ProductServiceInstance.findById(req.params.id);
    console.log(product);
    return res.send(product);
  } catch(err) {
    res.status(500).send(err);
  }
}

async function updateProduct(req, res) {

}