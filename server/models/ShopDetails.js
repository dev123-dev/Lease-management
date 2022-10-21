const mongoose = require("mongoose");

const ShopDetails = new mongoose.Schema({
  shopFileNo: {
    type: String,
    required: true,
  },
  shopDoorNo: {
    type: String,
    required: true,
  },
  shopStatus: {
    type: String,
    required: true,
  },
  tdId: {
    type: ObjectId,
  },
});

module.exports = shopDetails = mongoose.model("shopDetails", ShopDetails);
