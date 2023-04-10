const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const auth = require("../../middleware/auth");
const jwt = require("jsonwebtoken");
//const config = require('config');
const { check, validationResult } = require("express-validator");
const UserDetails = require("../../models/UserDetails");
const LoginHistory = require("../../models/LoginHistory");
var nodemailer = require("nodemailer");
const { networkInterfaces } = require("os");
const nets = networkInterfaces();
const mongoose = require("mongoose");
const {
  SERVER_ERROR,
  EMAIL_REQUIRED_INVALID,
  PASSWORD_INVALID,
  EMAIL,
  PASSWORD,
  USER_EXISTS,
  INVALID_CREDENTIALS,
  JWT_SECRET,
  STATUS_CODE_200,
  STATUS_CODE_400,
  STATUS_CODE_500,

  EXPIRES_IN,
} = require("../../common/constant/constants");

const {
  LOGIN,
  LOAD_USER,
  GET_ALL_USERS,
  FILTER_USERS,
  CHANGE_PWD,
} = require("../../common/constant/api-constants");

// @route    POST api/auth
// @desc     Authenticate user & get token
// @access   Public
router.post(
  "/login",

  [
    check(EMAIL, EMAIL_REQUIRED_INVALID).exists(),
    check(PASSWORD, PASSWORD_INVALID).exists(),
  ],

  async (req, res) => {
    // const errors = validationResult(req);
    // if (!errors.isEmpty()) {
    //   return res.status(STATUS_CODE_400).json({ errors: errors.array() });
    // }

    //retriving Data
    const { useremail, password } = req.body;

    try {
      //userEmail Check In DB
      let userDetails = await UserDetails.findOne({
        useremail: useremail,
        userStatus: "Active",
      });

      if (!userDetails) {
        return res.status(STATUS_CODE_400).json({
          errors: [{ msg: INVALID_CREDENTIALS }],
        });
      }

      //Match The Passwords
      const isMatch = (await password) == userDetails.password ? true : false; //bcrypt.compare(password, userDetails.password);

      if (!isMatch) {
        return res
          .status(STATUS_CODE_400)
          .json({ errors: [{ msg: INVALID_CREDENTIALS }] });
      }

      if (true) {
        //Create Payload
        const payload = {
          user: {
            id: userDetails._id,
          },
        };

        jwt.sign(
          payload,
          JWT_SECRET,
          { expiresIn: EXPIRES_IN },
          (err, token) => {
            if (err) {
              throw err;
            }

            res.json({ token });
          }
        );

        let ipAddress = "";
        for (const name of Object.keys(nets)) {
          for (const net of nets[name]) {
            if (net.family === "IPv4" && !net.internal) {
              ipAddress = net.address;
            }
          }
        }
        var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth() + 1;
        var yyyy = today.getFullYear();
        if (dd < 10) {
          dd = "0" + dd;
        }
        if (mm < 10) {
          mm = "0" + mm;
        }
        var todayDateymd = yyyy + "-" + mm + "-" + dd;
        const loginData = {
          userId: userDetails._id,
          userName: userDetails.userfullName,
          useremail: userDetails.useremail,
          loginDate: todayDateymd,
          ipAddress: ipAddress,
        };
        let LoginHistorySave = new LoginHistory(loginData);
        await LoginHistorySave.save();
      } else {
        return res
          .status(STATUS_CODE_400)
          .json({ errors: [{ msg: "Invalid OTP" }] });
      }
    } catch (err) {
      console.error(err.message);
      res.status(STATUS_CODE_500).json({ errors: [{ msg: "Server Error" }] });
    }
  }
);

// @route    GET api/auth
// @desc     Get Authenticated User
// @access   Private
router.get("/load-user", auth, async (req, res) => {
  try {
    // const user = await UserDetails.findById(req.user.id);
    // res.json(user);

    const id = mongoose.Types.ObjectId(req.user.id);

    await UserDetails.aggregate([
      {
        $match: {
          _id: id,
        },
      },
      {
        $lookup: {
          from: "organizationdetails",
          localField: "OrganizationId",
          foreignField: "_id",
          as: "output",
        },
      },
      { $unwind: "$output" },
    ]).then((data) => res.json(data[0]));
    // res.json(data));
  } catch (err) {
    res.status(STATUS_CODE_500).send(SERVER_ERROR);
  }
});

// @route    GET api/auth
// @desc     Get All Users
// @access   Private
router.get(GET_ALL_USERS, auth, async (req, res) => {
  try {
    const user = await UserDetails.find(); /*.select("-password");*/ //.select('-password');
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(STATUS_CODE_500).send(SERVER_ERROR);
  }
});

// @route    POST api/auth
// @desc     POST Filtered Users Based on Search
// @access   Private
router.post(FILTER_USERS, auth, async (req, res) => {
  const { alphaSearch } = req.body;

  try {
    let query = {};
    if (alphaSearch !== "") {
      query = {
        fullName: {
          $regex: new RegExp("^" + alphaSearch, "i"),
        },
      };
    }
    userDetails = await UserDetails.find(query); /*.select("-password");*/

    res.json(userDetails);
  } catch (err) {
    console.error(err.message);
    res.status(STATUS_CODE_500).send(SERVER_ERROR);
  }
});

// @route    POST api/users
// @desc     Change Password
// @access   Private
router.post(
  CHANGE_PWD,
  auth,
  [check("password", "Invalid Request").not().isEmpty()],
  async (req, res) => {
    //validating the Request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(STATUS_CODE_400).json({ errors: errors.array() });
    }
    //assigning the data from body
    let data = req.body;
    try {
      //Preparing The Salt
      // const salt = await bcrypt.genSalt(10);
      //Hashing the Password
      // const password = await bcrypt.hash(data.password, salt);

      await UserDetails.findOneAndUpdate(
        { _id: req.user.id },
        { password: data.password }
      );
      res.json({ msg: "Password changed succesfully" });
    } catch (err) {
      console.error(err.message);
      res.status(STATUS_CODE_500).send(SERVER_ERROR);
    }
  }
);

// suraksha code
// @route    POST api/users
// @desc      User Registration
// @access   Private
router.post(
  "/add-user-details",
  auth,
  [
    // check(NAME, "Invalid Request").not().isEmpty(),
    // check(EMAIL, "Invalid Request").not().isEmpty().isEmail().normalizeEmail(),
    // check("password", "Invalid Request").not().isEmpty(),
  ],
  async (req, res) => {
    //assigning the data from body
    let data = req.body;
    // data.activCode = shortid.generate();
    try {
      //checking the User Existance
      let userExists = await UserDetails.findOne({ useremail: data.useremail });
      if (userExists) {
        return res
          .status(STATUS_CODE_400)
          .json({ errors: [{ msg: USER_EXISTS }] });
      }
      // Assigning the Data To User Model as The data is already Structured
      let userDetails = new UserDetails(data);
      //preparing The Salt
      const salt = await bcrypt.genSalt(10);
      //hashing the Password
      userDetails.password = await bcrypt.hash(data.password, salt);
      //save the Data to db
      await userDetails.save();

      return res.status(STATUS_CODE_200).json({
        msg: "User Added Successfull",
      });
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Internal Server Error.");
    }
  }
);

module.exports = router;
