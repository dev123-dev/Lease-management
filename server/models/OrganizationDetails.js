const mongoose = require("mongoose");

const OrganizationSchema = new mongoose.Schema({
  OrganizationName: {
    type: String,
    required: true,
  },
  OrganizationEmail: {
    type: String,
    required: true,
  },
  OrganizationNumber: {
    type: Number,
    required: true,
  },
  OrganizationAddress: {
    type: String,
  },
  NumberOfUser: {
    type: number,
  },
  logo: {
    data: Buffer,
    contentType: String,
  },
  Location: [],
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
module.exports = OrganizationSchema = mongoose.model(
  "OrganizationDetails",
  OrganizationSchema
);
