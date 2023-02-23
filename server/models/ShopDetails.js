const mongoose = require("mongoose");

const ShopDetails = new mongoose.Schema({
  shopFileNo: {
    type: String,
    
  },
  shopDoorNo: {
    type: String,
    
  },
  shopStatus: {
    type: String,
    
  },
  tdId: {
    type: ObjectId,
  },
});

module.exports =  mongoose.model("shopDetails", ShopDetails);
