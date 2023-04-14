const mongoose = require("mongoose");
var SchemaTypes = mongoose.Schema.Types;

const OrganizationSchema = new mongoose.Schema({
  OrganizationName: {
    type: String,
  },
  // OrganizationId: {
  //   type: String,
  // },
  hike: {
    type: Number,
  },
  stampDuty: {
    type: Number,
  },
  leaseTimePeriod: {
    type: Number,
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
  Logo: {
    type: String,
  },
  Location: [],
  enter_by_id: {
    type: ObjectId,
  },
  date: {
    type: String,
  },

  AgreementStatus: {
    type: String,
    default: "Active",
  },
  enddate: {
    type: String,
  },
  enter_by_name: {
    type: String,
  },
  org_status: {
    type: String,
    default: "Active",
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
    // required: true,
  },
});
module.exports = mongoose.model("OrganizationDetails", OrganizationSchema);
