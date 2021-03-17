const express = require("express");

const { authenticate } = require("../../controllers/User/index");

let router = express.Router();

router.post("/", (req, res) => {
  authenticate(req, res);
});

module.exports = router;
