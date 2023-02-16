const mongoose = require("mongoose");

const UserHistory = new mongoose.Schema({
  userfullName: {
    type: String,
  },
  password: {
    type: String,
  },
  cpassword: {
    type: String,
  },
  useremail: {
    type: String,
  },
  usergroup: {
    type: String,
  },
  useraddr: {
    type: String,
  },
  userphone: {
    type: Number,
  },
  userStatus: {
    type: String,

    default: "Active",
  },
  userDate: {
    type: Date,
    default: Date.now(),
  },
  OrganizationName: {
    type: String,
  },
  enter_by_id: {
    type: ObjectId,
  },
  enter_by_name: {
    type: String,
  },
  enter_by_dateTime: {
    type: Date,
    default: Date.now(),
  },
  enter_by_date: {
    type: String,
  },
  edit_by_id: {
    type: ObjectId,
  },
  edit_by_name: {
    type: String,
  },
  edit_by_dateTime: {
    type: Date,
    default: Date.now(),
  },
  edit_by_date: {
    type: String,
  },
  deactive_by_id: {
    type: ObjectId,
  },
  deactive_by_name: {
    type: String,
  },
  deactive_by_dateTime: {
    type: Date,
    default: Date.now(),
  },
  deactive_by_date: {
    type: String,
  },
  deactive_reason: {
    type: String,
  },
});

module.exports = UserHistory = mongoose.model(
  "UserDetailHistories",
  UserHistory
);
