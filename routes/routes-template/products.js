const express = require("express");
const Joi = require("joi");
const Product = require("../../models/Product");
const asyncHandler = require("../../middlewares/async");
const {
  createProduct,
  getProducts,
  getProductById
} = require("../../controllers/Product/index");

let router = express.Router();

// const products = [
//   {
//     id: 1,
//     name: "MSI GeForce RTX 3080 VENTUS 3X",
//     subtitle:
//       "10G OC 10GB 320-Bit GDDR6X PCI Express 4.0 HDCP Ready Video Card",
//     type: "GPU",
//     chipset: "3080",
//     maker: "Nvidia",
//     brand: "MSI",
//     quantity: 10,
//     price: 699.99,
//     imgUrl: "public/images/14-137-598-V33.jpg",
//     tags: ["GPU", "Graphic Card", "NVIDIA", "RTX", "3080", "MSI"],
//   },
//   {
//     id: 2,
//     name: "GIGABYTE GeForce RTX 3080 OC-10GD",
//     subtitle: "320-Bit GDDR6X PCI Express 4.0 x16 ATX Video Card",
//     type: "GPU",
//     chipset: "3080",
//     maker: "Nvidia",
//     brand: "GIGABYTE",
//     quantity: 5,
//     price: 749.99,
//     imgUrl: "public/images/14-932-409-01.jpg",
//     tags: ["GPU", "Graphic Card", "NVIDIA", "RTX", "3080", "GIGABYTE"],
//   },
//   {
//     id: 3,
//     name: "EVGA GeForce RTX 3070 XC3 ULTRA",
//     subtitle:
//       "Video Card, 08G-P5-3755-KR, 8GB GDDR6, iCX3 Cooling, ARGB LED, Metal",
//     type: "GPU",
//     chipset: "3070",
//     maker: "Nvidia",
//     brand: "EVGA",
//     quantity: 5,
//     price: 699.99,
//     imgUrl: "public/images/14-487-530-01.jpg",
//     tags: ["GPU", "Graphic Card", "NVIDIA", "RTX", "3070", "EVGA"],
//   },
// ];

router.get("/", (req, res) => {
  getProducts(req, res);
});

router.get("/:id", (req, res) => {
  getProductById(req, res);
});

router.post("/", (req, res) => {
  createProduct(req, res);
});

router.put(
  "/:id",
  asyncHandler(async (req, res) => {
    const product = products.find((p) => p.id === parseInt(req.params.id));
    if (!product) {
      res.status(404).send("The product with the given ID was not found");
      return;
    }

    const result = validateProduct(req.body);

    if (result.error) {
      res.status(400).send(result.error);
      return;
    }

    product.name = req.body.name;
    product.subtitle = req.body.subtitle;
    product.type = req.body.type;
    product.chipset = req.body.chipset;
    product.maker = req.body.maker;
    product.brand = req.body.brand;
    product.quantity = req.body.quantity;
    tags = req.body.tags;

    res.send(product);
  })
);

router.delete(
  "/:id",
  asyncHandler(async (req, res) => {
    const product = products.find((p) => p.id === parseInt(req.params.id));
    if (!product) {
      res.status(404).send("The product with the given ID was not found");
      return;
    }

    const index = products.indexOf(product);
    products.splice(index, 1);

    res.send(products);
  })
);

function validateProduct(product) {
  const productSchema = Joi.object({
    name: Joi.string().min(3).max(50).required(),
    subtitle: Joi.string(),
    type: Joi.string(),
    chipset: Joi.string(),
    maker: Joi.string(),
    brand: Joi.string(),
    quantity: Joi.number().integer(),
    tags: Joi.array().items(Joi.string()),
  });

  return productSchema.validate(product);
}

module.exports = router;
