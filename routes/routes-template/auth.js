const express = require("express");
const { validateToken } = require("../../middlewares/token");
const {
  authenticate,
  logOff,
  checkEmailExists,
  validatePassword,
} = require("../../controllers/User");

let router = express.Router();

router.post("/authenticate", (req, res) => {
  authenticate(req, res);
});

router.get("/doesEmailExists/:email", (req, res) => {
  checkEmailExists(req, res);
});

router.post("/validatePassword", validateToken, (req, res) => {
  validatePassword(req, res);
});

router.post("/signOut", validateToken, (req, res) => {
  logOff(req, res);
});

module.exports = router;
