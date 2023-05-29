const express = require("express");
const { findAllBuses } = require("../controller/busController");

const router = express.Router();

router.get("/buses/get", findAllBuses);

module.exports = router;
