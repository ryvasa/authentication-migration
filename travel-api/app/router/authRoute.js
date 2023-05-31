const express = require("express");
const { signUp, signIn } = require("../controller/authController");
const { checkUserEmail } = require("../middleware/verifyUser");

const router = express.Router();

router.post("/auth/signup", checkUserEmail, signUp);
router.post("/auth/signin", signIn);

module.exports = router;
