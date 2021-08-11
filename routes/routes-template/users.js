const express = require("express");
const { validateToken } = require("../../middlewares/token");

const {
  createUser,
  getUsers,
  getUserById,
  getUserByEmail,
  deleteUserById,
  updatePassword,
} = require("../../controllers/User/index");

let router = express.Router();

router.get("/listUsers", validateToken, (req, res) => {
  getUsers(req, res);
});

router.get("/:id", validateToken, (req, res) => {
  getUserById(req, res);
});

router.get("/getUser/:email", validateToken, (req, res) => {
  getUserByEmail(req, res);
});

router.post("/addUser", (req, res) => {
  createUser(req, res);
});

router.post("/updatePassword", validateToken, (req, res) => {
  updatePassword(req, res);
});

router.delete("/deleteUser/:id", validateToken, (req, res) => {
  deleteUserById(req, res);
});

module.exports = router;
