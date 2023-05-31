const express = require("express");
const {
  findAllBuses,
  addBus,
  findOneBus,
  updateBus,
  deleteBus,
} = require("../controller/busController");
const { isAdmin, verifyToken } = require("../middleware/verifyJwtToken");

const router = express.Router();

router.get("/buses/get", findAllBuses);
router.get("/buses/get/:id", findOneBus);
router.post("/buses/add", verifyToken, isAdmin, addBus);
router.put("/buses/update/:id", verifyToken, isAdmin, updateBus);
router.delete("/buses/delete/:id", verifyToken, isAdmin, deleteBus);

module.exports = router;
