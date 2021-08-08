const express = require("express");
const { validateToken } = require("../../middlewares/token");
const {
  authenticate,
  logOff,
  checkEmailExists,
  validatePassword,
} = require("../../controllers/User");

let router = express.Router();

router.post("/", (req, res) => {
  authenticate(req, res);
});

router.get("/:email", (req, res) => {
  checkEmailExists(req, res);
});

router.post("/validatepassword", validateToken, (req, res) => {
  validatePassword(req, res);
});

router.post("/signout", validateToken, (req, res) => {
  logOff(req, res);
});

module.exports = router;
