const mongoose = require("mongoose");
ObjectId = mongoose.Schema.ObjectId;

const TenantDetails = new mongoose.Schema({
  tenantName: {
    type: String,
    required: true,
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
    required: true,
  },
  tenantAdharNo: {
    type: String,
    // required: true,
  },
  tenantPanNo: {
    type: String,
    // required: true,
  },
  tenantDepositAmt: {
    type: Number,
    required: true,
  },
  generatordepoAmt: {
    type: Number,
  },
  tenantPaymentMode: {
    type: String,
    required: true,
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
    required: true,
    default: "Active", //Active,Deactive
  },
  buildingName: {
    type: String,
    required: true,
  },
  Location: [],
  shopDoorNo: {
    type: String,
    required: true,
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
  tenantdeactivereason: {
    type: String,
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

module.exports = tenantDetails = mongoose.model("tenantDetails", TenantDetails);
