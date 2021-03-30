const express = require("express");
const { validateToken } = require("../../middlewares/token");
const { authenticate, logOff } = require("../../controllers/User");

let router = express.Router();

router.post("/", (req, res) => {
  authenticate(req, res);
});

router.post("/signout", validateToken, (req, res) => {
  logOff(req, res);
});

module.exports = router;
