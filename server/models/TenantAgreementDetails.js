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
});

module.exports = tenantAgreementSettings = mongoose.model(
  "tenantAgreementSettings",
  TenantAgreementDetails
);
