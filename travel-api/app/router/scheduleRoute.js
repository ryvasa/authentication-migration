const express = require("express");
const { verifyToken, isAdmin } = require("../middleware/verifyJwtToken");
const {
  findAllSchedules,
  findOneSchedule,
  updateSchedule,
  deleteSchedule,
  addSchedule,
} = require("../controller/scheduleController");

const router = express.Router();

router.get("/schedules/get", findAllSchedules);
router.get("/schedules/get/:id", findOneSchedule);
router.post("/schedules/add", verifyToken, isAdmin, addSchedule);
router.put("/schedules/update/:id", verifyToken, isAdmin, updateSchedule);
router.delete("/schedules/delete/:id", verifyToken, isAdmin, deleteSchedule);

module.exports = router;
