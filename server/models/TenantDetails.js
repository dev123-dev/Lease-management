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
});

module.exports = tenantDetails = mongoose.model("tenantDetails", TenantDetails);
