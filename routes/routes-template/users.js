const express = require("express");

const {
  createUser,
  getUsers,
  getUserById,
} = require("../../controllers/User/index");

let router = express.Router();

router.get("/", (req, res) => {
  getUsers(req, res);
});

router.get("/:id", (req, res) => {
  getUserById(req, res);
});

router.post("/", (req, res) => {
  createUser(req, res);
});

module.exports = router;
