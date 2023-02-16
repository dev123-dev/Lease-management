const mongoose = require("mongoose");
ObjectId = mongoose.Schema.ObjectId;

const TenantAgreementDetails = new mongoose.Schema({
  tdId: {
    type: ObjectId,
    // required: true,
  },
  tenantRentAmount: {
    type: Number,
    required: true,
  },
  tenantLeaseStartDate: {
    type: String,
    required: true,
  },
  tenantLeaseEndDate: {
    type: String,
    // required: true,
  },
  tenantAgreementEntredBy: {
    type: ObjectId,
  },
  tenantAgreementDate: {
    type: String,
  },
  tenantAgreementDateTime: {
    type: Date,
    default: Date.now(),
  },
  tenantFileNo: {
    type: String,
  },
  tenantDoorNo: {
    type: String,
    required: true,
  },
  AgreementStatus: {
    type: String,
    default: "Active", //Active,Expired, Renewed
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

module.exports = tenantAgreementSettings = mongoose.model(
  "tenantAgreementSettings",
  TenantAgreementDetails
);
