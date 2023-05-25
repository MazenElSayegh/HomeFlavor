const express = require('express');
const router = express.Router();
const ForgetPasswordController = require("../Controllers/ForgetPasswordController");

router.post('/send-otp', ForgetPasswordController.sendOTP);
router.post('/verify-otp', ForgetPasswordController.verifyOTP);
router.post('/reset-password', ForgetPasswordController.resetPassword);

module.exports = router;