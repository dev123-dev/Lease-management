const mongoose = require("mongoose");
ObjectId = mongoose.Schema.ObjectId;

const TenantHistory = new mongoose.Schema({
  tdId: {
    type: ObjectId,
  },
  thFileNo: {
    type: String,
  },
  thDoorNo: {
    type: String,
  },
  thName: {
    type: String,
  },
  thPhone: {
    type: Number,
  },
  thFirmName: {
    type: String,
  },
  thAddr: {
    type: String,
  },
  thAdharNo: {
    type: String,
  },
  thPanNo: {
    type: String,
  },
  thDepositAmt: {
    type: Number,
  },
  thgeneratordepoAmt: {
    type: Number,
  },
  thshopId: {
    type: ObjectId,
  },
  thStatus: {
    type: String,
  },
  thChequenoOrDdno: {
    type: String,
  },
  thBankName: {
    type: String,
  },
  thPaymentMode: {
    type: String,
  },
  thEnteredBy: {
    type: ObjectId,
  },
  thRentAmount: {
    type: Number,
  },
  thLeaseStartDate: {
    type: String,
  },
  thLeaseEndDate: {
    type: String,
  },
  thDate: {
    type: String,
  },
  thDateTime: {
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

module.exports = tenantHistories = mongoose.model(
  "tenantHistories",
  TenantHistory
);
