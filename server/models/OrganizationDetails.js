const mongoose = require("mongoose");

const OrganizationSchema = new mongoose.Schema({
  OrganizationName: {
    type: String,
    
  },
  OrganizationEmail: {
    type: String,
   
  },
  OrganizationNumber: {
    type: Number,
   
  },
  OrganizationAddress: {
    type: String,
  },
  NumberOfUser: {
    type: Number,
  },
  logo: {
    data: Buffer,
    contentType: String,
  },
  Location: [],
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
module.exports  = mongoose.model("OrganizationDetails",OrganizationSchema);
