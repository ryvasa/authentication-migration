const express = require("express");
const { verifyToken } = require("../middleware/verifyJwtToken");
const {
  findAllBooking,
  findOneBooking,
  addBooking,
  deleteBooking,
  updateBooking,
} = require("../controller/bookingController");

const router = express.Router();

router.get("/bookings/get", verifyToken, findAllBooking);
router.get("/bookings/get/:id", verifyToken, findOneBooking);
router.post("/bookings/add", verifyToken, addBooking);
router.put("/bookings/update/:id", verifyToken, updateBooking);
router.delete("/bookings/delete/:id", verifyToken, deleteBooking);

module.exports = router;
