const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const speakeasy = require("speakeasy");
const mongoose = require("mongoose");
const user = require("../Models/UsersModel");
const dotenv = require("dotenv").config();

class ForgetPasswordController {
  constructor(User) {
    this.User = User;
    this.sendOTP = this.sendOTP.bind(this);
    this.verifyOTP = this.verifyOTP.bind(this);
    this.resetPassword = this.resetPassword.bind(this);
  }

  async sendOTP(req, res) {
    try {
      const email = req.body.email;
      console.log(req.body);
      // Check if the user with the given email exists
      const userr = await user.findOne({ email: email }).exec();

      let OTP_SECRET = speakeasy.generateSecret().base32;

      if (userr) {
        userr.otp = OTP_SECRET;
        await userr.save();
      }
      if (!userr) {
        throw new Error("User not found");
      }

      // Generate an OTP and save it to the user's record in the database
      const otp = speakeasy.time({
        secret: OTP_SECRET,
        step: 600,
        window: 0,
        encoding: "base32",
      });

      //userr.otp = otp;
      //await userr.save();

      // Send the OTP to the user's email address
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.EMAIL_USERNAME,
          pass: process.env.EMAIL_PASSWORD
        },
      });

      const mailOptions = {
        from: process.env.EMAIL_USERNAME,
        to: email,
        subject: "Your OTP for password reset",
        text: `Your one-time password is: ${otp}`,
      };

      await transporter.sendMail(mailOptions);

      res.status(200).json({ message: "OTP sent successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Something went wrong" });
    }
  }

  async verifyOTP(req, res) {
    try {
      const otp = req.body.otp;
      const email = req.body.email;
        console.log("this is the email",email);
      // Check if the user with the given email exists
      const userverify = await user.findOne({ email: email }).exec();
      if (!userverify) {
        throw new Error("User not found");
      }

      // Verify the OTP

      const isOTPValid = speakeasy.time.verify({
        secret: userverify.otp,
        token: otp,
        step: 600,
        window: 0,
        encoding: "base32",
      });

      if (!isOTPValid) {
        throw new Error("Invalid OTP");
      }

      // Generate a reset token and save it to the user's record in the database
      const resetToken = jwt.sign(
        { userId: userverify._id },
        process.env.JWT_SECRET,
        { expiresIn: "15m" }
      );

      userverify.resetToken = resetToken;
      await userverify.save();

      res.status(200).json({ resetToken: resetToken });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Something went wrong" });
    }
  }

  async resetPassword(req, res) {
    try {
      const resetToken = req.body.resetToken;
      const newPassword = req.body.newPassword;
      // Verify the reset token
      const decodedToken = jwt.verify(resetToken, process.env.JWT_SECRET);

      console.log(decodedToken);
      // Find the user by ID and reset their password
      const userpass = await user.findById(decodedToken.userId);
      if (!userpass) {
        throw new Error("User not found");
      }

      var salt = await bcrypt.genSalt(10);
      var hashedPassword = await bcrypt.hash(newPassword, salt);
      userpass.password = hashedPassword;
      userpass.resetToken = null;

      await userpass.save();

      res.status(200).json({ message: "Password reset successful" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Something went wrong" });
    }
  }
}

module.exports = new ForgetPasswordController();
