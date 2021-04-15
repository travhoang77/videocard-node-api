const express = require("express");
const { validateToken } = require("../../middlewares/token");

const {
  createUser,
  getUsers,
  getUserById,
  getUserByEmail,
  deleteUserById,
} = require("../../controllers/User/index");

let router = express.Router();

router.get("/", validateToken, (req, res) => {
  getUsers(req, res);
});

router.get("/:id", validateToken, (req, res) => {
  getUserById(req, res);
});

router.get("/email/:email", validateToken, (req, res) => {
  getUserByEmail(req, res);
});

router.post("/", (req, res) => {
  createUser(req, res);
});

router.delete("/:id", validateToken, (req, res) => {
  deleteUserById(req, res);
});

module.exports = router;
