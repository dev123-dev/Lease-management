const mongoose = require("mongoose");

const PropertyHistory = new mongoose.Schema({
  buildingName: {
    type: String,
  },
  shopDoorNo: {
    type: String,
  },
  shopAddress: {
    type: String,
  },
  hikePercentage: {
    type: Number,
  },
  stampDuty: {
    type: SchemaTypes.Double,
  },
  leaseTimePeriod: {
    type: Number,
  },
  OrganizationName: {
    type: String,
  },
  shopStatus: {
    type: String,
  },
  Location: [],
  tdId: {
    type: ObjectId,
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

module.exports = PropertyHistory = mongoose.model(
  "PropertyDetailsHistories",
  PropertyHistory
);
