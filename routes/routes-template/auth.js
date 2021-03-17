const express = require("express");
const bcrpyt = require("bcrypt");

const { getUserByEmail } = require("../../controllers/User/index");

let router = express.Router();
router.get("/", (req, res) => {
  getUserByEmail(req, res);
});

router.post("/", (req, res) => {});

module.exports = router;
