const mongoose = require("mongoose");

const PropertySchema = new mongoose.Schema({
  buildingName: {
    type: String,
    required: true,
  },
  shopDoorNo: {
    type: String,
    required: true,
  },
  shopAddress: {
    type: String,
    required: true,
  },
  hikePercentage: {
    type: Number,
    Required: true,
  },
  stampDuty: {
    type: SchemaTypes.Double,
    required: true,
  },
  leaseTimePeriod: {
    type: Number,
    required: true,
  },
  OrganizationName: {
    type: String,
    required: true,
  },
  shopStatus: {
    type: String,
    required: true,
  },
  Location: [],
  tdId: {
    type: ObjectId,
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

module.exports = PropertyDetails = mongoose.model(
  "PropertyDetails",
  PropertySchema
);
