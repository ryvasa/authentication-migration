const express = require("express");
const {
  findAll,
  deleteUser,
  updateUser,
  findOne,
  findMe,
  updateRole,
} = require("../controller/userController");
const { checkUserId } = require("../middleware/verifyUser");
const { verifyToken, isAdmin } = require("../middleware/verifyJwtToken");

const router = express.Router();

router.get("/users/get", verifyToken, isAdmin, findAll);
router.get("/users/get/:id", checkUserId, findOne);
router.get("/users/findme", verifyToken, checkUserId, findMe);
router.put("/users/update/:id", verifyToken, checkUserId, updateUser);
router.delete(
  "/users/delete/:id",
  verifyToken,
  isAdmin,
  checkUserId,
  deleteUser
);

module.exports = router;
