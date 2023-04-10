const mongoose = require("mongoose");
ObjectId = mongoose.Schema.ObjectId;

const TenantAgreementHistory = new mongoose.Schema({
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
  },
  AgreementStatus: {
    type: String,
    default: "Active", //Active,Expired, Renewed
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

module.exports = TenantAgreementHistory = mongoose.model(
  "TenantAgreementHistories",
  TenantAgreementHistory
);
