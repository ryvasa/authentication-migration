const express = require("express");
const { signUp, signIn } = require("../controller/authController");
const { checkUserEmail } = require("../middleware/verifyUser");
const {
  verifyDataSignIn,
  verifyDataSignUp,
} = require("../middleware/verifySign");

const router = express.Router();

router.post("/auth/signup", verifyDataSignUp, checkUserEmail, signUp);
router.post("/auth/signin", verifyDataSignIn, signIn);

module.exports = router;
