const mongoose = require("mongoose");

const PropertyHistory = new mongoose.Schema({
  buildingName: {
    type: String,
  },
  shopDoorNo: [],
  OrganizationName: {
    type: String,
  },
  OrganizationId: {
    type: String,
  },
  shopStatus: {
    type: String,
  },
  Location: [],

  deactive_by_id: {
    type: ObjectId,
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

module.exports = mongoose.model("PropertyDetailsHistories", PropertyHistory);
