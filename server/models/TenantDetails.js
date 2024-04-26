const mongoose = require("mongoose");
ObjectId = mongoose.Schema.ObjectId;

const TenantDetails = new mongoose.Schema({
  tenantName: {
    type: String,
  },
  tenantFileNo: {
    type: String,
  },
  AgreementStatus: {
    type: String,
    default: "Active",
  },
  OrganizationName: {
    type: String,
  },
  OrganizationId: {
    type: ObjectId,
  },
  tenantLeaseEndDate: {
    type: String,
  },
  tenantLeaseStartDate: {
    type: String,
  },
  tenantPhone: {
    type: Number,
  },
  tenantLandLine:{
 type: String,
  },
  tenantFirmName: {
    type: String,
  },
  tenantAddr: {
    type: String,
  },
  tenantAdharNo: {
    type: String,
  },
  tenantPanNo: {
    type: String,
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
  tenantCardType: {
    type: String,
  },
  tenantTransId: {
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
    type: ObjectId,
  },
  Location: {
    type: String,
  },
  shopDoorNo: [],

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
  //for tenant recipt
  tenantsubTotal: {
    type: Number,
  },
  tenantDiscount: {
    type: Number,
  },
  tenantOtherCharges: {
    type: Number,
  },
  tenantGst: {
    type: Number,
  },
  tenantGrandTotal: {
    type: Number,
  },
  tenantReceiptNotes: {
    type: String,
  },
  tenantReceiptDateTime: {
    type: Date,
  },
  tenantPaymentMode: {
    type: String,
  },
  tenantReceiptEnteredBy: {
    type: ObjectId,
  },
  tenantReceiptNo: {
    type: String,
  },
  tenantRenewedDate: {
    type: String,
  },
});

module.exports = mongoose.model("tenantDetails", TenantDetails);
