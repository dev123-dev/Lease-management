const mongoose = require("mongoose");
ObjectId = mongoose.Schema.ObjectId;

const TenantDetails = new mongoose.Schema({
  tenantName: {
    type: String,
  },
  OrganizationName: {
    type: String,
  },
  OrganizationId: {
    type: String,
  },
  tenantLeaseEndDate: {
    type: String,
  },
  tenantLeaseStartDate: {
    type: String,
  },
  tenantPhone: {
    type: Number,
    //  required: false,
  },
  tenantFirmName: {
    type: String,
  },
  tenantAddr: {
    type: String,
  },
  tenantAdharNo: {
    type: String,
    // required: true,
  },
  tenantPanNo: {
    type: String,
    // required: true,
  },
  tenantRentAmount: {
    type: Number,
  },
  tenantDepositAmt: {
    type: Number,
  },
  generatordepoAmt: {
    type: Number,
  },
  tenantPaymentMode: {
    type: String,
  },
  tenantChequenoOrDdno: {
    type: String,
  },
  tenantBankName: {
    type: String,
  },
  tenantchequeDate: {
    type: String,
  },
  tenantstatus: {
    type: String,

    default: "Active", //Active,Deactive
  },
  BuildingName: {
    type: String,
  },
  BuildingId: {
    type: String,
  },
  Location: {
    type: String,
  },
  shopDoorNo: {
    type: String,
  },
  DoorId: {
    type: String,
  },
  shopId: {
    type: ObjectId,
  },
  tenantEnteredBy: {
    type: ObjectId,
  },
  tenantDate: {
    type: String,
  },
  tenantDateTime: {
    type: Date,
    default: Date.now(),
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

module.exports = mongoose.model("tenantDetails", TenantDetails);
