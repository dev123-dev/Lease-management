const mongoose = require("mongoose");

const PropertySchema = new mongoose.Schema({
  buildingname: {
    type: String,
  },
  buildingid: {
    type: String,
  },
  shopDoorNo: {
    type: [],
  },
  DoorId: {
    type: String,
  },
  shopAddress: {
    type: String,
  },
  hikePercentage: {
    type: Number,
  },
  stampDuty: {
    type: Number,
  },
  leaseTimePeriod: {
    type: String,
  },
  OrganizationName: {
    type: String,
  },
  OrganizationId: {
    type: String,
  },
  shopStatus: {
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
  Location: {
    type: String,
  },
  tdId: {
    type: ObjectId,
  },
});

module.exports = mongoose.model("PropertyDetails", PropertySchema);
