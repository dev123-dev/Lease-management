const mongoose = require("mongoose");
ObjectId = mongoose.Schema.ObjectId;

const TenantAgreementDetails = new mongoose.Schema({
  OrganizationId: {
    type: ObjectId,
  },
  OrganizationName: {
    type: String,
  },
  BuildingId: {
    type: ObjectId,
  },
  BuildingName: {
    type: String,
  },
  PropertyId: {
    type: String,
  },
  tdId: {
    type: ObjectId,
    // required: true,
  },
  tenantRentAmount: {
    type: Number,
  },
  tenantLeaseStartDate: {
    type: String,
  },
  tenantLeaseEndDate: {
    type: String,
    // required: true,
  },
  tenantDoorNumnber: [],
  tenantstatus: {
    type: String,
    default: "Active",
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
  tenantDoorNo: {},
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
  // //for tenant recipt
  // tenantsubTotal: {
  //   type: Number,
  // },
  // tenantDiscount: {
  //   type: Number,
  // },
  // tenantOtherCharges: {
  //   type: Number,
  // },
  // tenantGst: {
  //   type: Number,
  // },
  // tenantGrandTotal: {
  //   type: Number,
  // },
  // tenantReceiptNotes: {
  //   type: String,
  // },
  // tenantReceiptDateTime: {
  //   type: Date,
  // },
  // tenantPaymentMode: {
  //   type: String,
  // },
  // tenantReceiptEnteredBy: {
  //   type: ObjectId,
  // },
  // tenantReceiptNo: {
  //   type: String,
  // },
  // tenantRenewedDate: {
  //   type: String,
  // },
});

module.exports = mongoose.model(
  "tenantAgreementSettings",
  TenantAgreementDetails
);
