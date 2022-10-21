const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const { check, validationResult } = require("express-validator");

const mongoose = require("mongoose");
const User = require("../../models/UserDetails");

// @route    POST api/users
// @desc     Register User
// @access   Public
router.post(
  "/register",
  [
    check("name", "Invalid Request").not().isEmpty(),
    check("password", "Invalid Request").not().isEmpty(),
  ],
  async (req, res) => {
    //validating the Request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    //assigning the data from body
    let data = req.body;

    try {
      // Assigning the Data To User Model as The data is already Structured
      user = new User(data);
      //preparing The Salt
      const salt = await bcrypt.genSalt(10);
      //hashing the Password
      user.password = await bcrypt.hash(data.password, salt);
      //save the Data to db
      await user.save();
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Internal Server Error.");
    }
  }
);

module.exports = router;
