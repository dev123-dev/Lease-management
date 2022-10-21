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
});

module.exports = tenantHistories = mongoose.model(
  "tenantHistories",
  TenantHistory
);
