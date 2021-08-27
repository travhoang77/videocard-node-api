const express = require("express");
const { validateToken } = require("../../middlewares/token");
const { rejectObId } = require("../../middlewares/badrequest");

const {
  createUser,
  getUsers,
  getUserById,
  getUserByEmail,
  deleteUserById,
  updatePassword,
  createAddress,
  deleteAddressById,
  updateAddressById,
  listAddresses,
  setPrimaryAddressById,
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

router.get("/address/getAddresses", validateToken, (req, res) => {
  listAddresses(req, res);
});

router.post("/address/createAddress", validateToken, (req, res) => {
  createAddress(req, res);
});

router.delete("/address/deleteAddressById/:id", validateToken, (req, res) => {
  deleteAddressById(req, res);
});

router.put(
  "/address/updateAddressById/:id",
  validateToken,
  rejectObId,
  (req, res) => {
    updateAddressById(req, res);
  }
);

router.put("/address/setPrimaryAddressById/:id", validateToken, (req, res) => {
  setPrimaryAddressById(req, res);
});

module.exports = router;
