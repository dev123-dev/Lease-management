const mongoose = require("mongoose");
ObjectId = mongoose.Schema.ObjectId;

const UserActivity = new mongoose.Schema({
  userId: {
    type: ObjectId,
  },

  userName: {
    type: String,
  },

  Menu: {
    type: String,
  },
  Operation: {
    type: String,
  },
  Name: {
    type: String,
  },
  NameId: {
    type: ObjectId,
  },
  DateTime: {
    type: Date,
    default: Date.now,
  },
  OrganizationId: {
    type: ObjectId,
  },
  Dno: [],
  expireAt: {
    type: Date,
  },
});
UserActivity.index({ expireAt: 1 }, { expireAfterSeconds: 2592000 }); //30 days
module.exports = mongoose.model("UserActivity", UserActivity);
