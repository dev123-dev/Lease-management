const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  userfullName: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  useremail: {
    type: String,
    required: true,
  },
  usergroup: {
    type: String,
    required: true,
  },
  useraddr: {
    type: String,
    required: true,
  },
  userphone: {
    type: Number,
    required: true,
  },
  userStatus: {
    type: String,
    required: true,
    default: "Active",
  },
  userDate: {
    type: Date,
    default: Date.now(),
  },
  genaratedOtp: {
    type: String,
    default: "0",
  },
});

module.exports = UserDetails = mongoose.model("userdetails", UserSchema);
