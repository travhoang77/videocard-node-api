const express = require("express");

const {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} = require("../../controllers/Product/index");

const { validateToken } = require("../../middlewares/token");

let router = express.Router();

const products = [
  {
    id: 1,
    name: "MSI GeForce RTX 3080 VENTUS 3X",
    subtitle:
      "10G OC 10GB 320-Bit GDDR6X PCI Express 4.0 HDCP Ready Video Card",
    type: "GPU",
    chipset: "3080",
    maker: "Nvidia",
    brand: "MSI",
    quantity: 10,
    price: 699.99,
    imgUrl: "public/images/14-137-598-V33.jpg",
    tags: ["GPU", "Graphic Card", "NVIDIA", "RTX", "3080", "MSI"],
  },
  {
    id: 2,
    name: "GIGABYTE GeForce RTX 3080 OC-10GD",
    subtitle: "320-Bit GDDR6X PCI Express 4.0 x16 ATX Video Card",
    type: "GPU",
    chipset: "3080",
    maker: "Nvidia",
    brand: "GIGABYTE",
    quantity: 5,
    price: 749.99,
    imgUrl: "public/images/14-932-409-01.jpg",
    tags: ["GPU", "Graphic Card", "NVIDIA", "RTX", "3080", "GIGABYTE"],
  },
  {
    id: 3,
    name: "EVGA GeForce RTX 3070 XC3 ULTRA",
    subtitle:
      "Video Card, 08G-P5-3755-KR, 8GB GDDR6, iCX3 Cooling, ARGB LED, Metal",
    type: "GPU",
    chipset: "3070",
    maker: "Nvidia",
    brand: "EVGA",
    quantity: 5,
    price: 699.99,
    imgUrl: "public/images/14-487-530-01.jpg",
    tags: ["GPU", "Graphic Card", "NVIDIA", "RTX", "3070", "EVGA"],
  },
];

router.get("/", (req, res) => {
  getProducts(req, res);
});

router.get("/:id", (req, res) => {
  getProductById(req, res);
});

router.post("/", validateToken, (req, res) => {
  console.log("post product---->", req);
  createProduct(req, res);
});

router.put("/:id", validateToken, (req, res) => {
  updateProduct(req, res);
});

router.delete("/:id", validateToken, (req, res) => {
  deleteProduct(req, res);
});

module.exports = router;
