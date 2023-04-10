const mongoose = require("mongoose");
ObjectId = mongoose.Schema.ObjectId;

const LoginHistorySchema = new mongoose.Schema({
  userId: {
    type: ObjectId,
    
  },
  userName: {
    type: String,
    
  },
  useremail: {
    type: String,
    
  },
  loginDate: {
    type: String,
    
  },
  loginDateTime: {
    type: Date,
    default: Date.now(),
  },
  ipAddress: {
    type: String,
  },
});

module.exports = loginhistories = mongoose.model(
  "loginhistories",
  LoginHistorySchema
);
