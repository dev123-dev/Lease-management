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
  cpassword: {
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
  OrganizationName: {
    type: String,
    required: true,
  },
  enter_by_id: {
    type: ObjectId,
    required: true,
  },
  enter_by_name: {
    type: String,
    required: true,
  },
  enter_by_dateTime: {
    type: Date,
    default: Date.now(),
  },
  enter_by_date: {
    type: String,
    required: true,
  },
  edit_by_id: {
    type: ObjectId,
    required: true,
  },
  edit_by_name: {
    type: String,
    required: true,
  },
  edit_by_dateTime: {
    type: Date,
    default: Date.now(),
  },
  edit_by_date: {
    type: String,
    required: true,
  },
  deactive_by_id: {
    type: ObjectId,
    required: true,
  },
  deactive_by_name: {
    type: String,
    required: true,
  },
  deactive_by_dateTime: {
    type: Date,
    default: Date.now(),
  },
  deactive_by_date: {
    type: String,
    required: true,
  },
  deactive_reason: {
    type: String,
    required: true,
  },
});

module.exports = UserDetails = mongoose.model("userdetails", UserSchema);
