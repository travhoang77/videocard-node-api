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
  setDefaultShippingAddressById,
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

router.get("/:id/getAddresses", validateToken, (req, res) => {
  listAddresses(req, res);
});

router.post("/:id/createAddress", validateToken, (req, res) => {
  createAddress(req, res);
});

router.delete("/:userid/deleteAddressById/:id", validateToken, (req, res) => {
  deleteAddressById(req, res);
});

router.put(
  "/:userid/updateAddressById/:id",
  validateToken,
  rejectObId,
  (req, res) => {
    updateAddressById(req, res);
  }
);

router.put("/:userid/setPrimaryAddressById/:id", validateToken, (req, res) => {
  setPrimaryAddressById(req, res);
});

router.put(
  "/:userid/setDefaultShippingAddressById/:id",
  validateToken,
  (req, res) => {
    setDefaultShippingAddressById(req, res);
  }
);

module.exports = router;
