const express = require("express");
const asyncHandler = require("../../middlewares/async");
const logger = require("../../services/Logger");

let router = express.Router();

router.all(
  "/",
  asyncHandler(async (req, res) => {
    res.send({ message: "Hello from Express!" });
  })
);

module.exports = router;
