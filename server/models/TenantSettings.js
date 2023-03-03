var mongoose = require("mongoose");
require("mongoose-double")(mongoose);

var SchemaTypes = mongoose.Schema.Types;

const TenantSettings = new mongoose.Schema({
  hikePercentage: {
    type: Number,
    Required: true,
  },
  OrganizationId : {
    type : String,
  },
  OrganizationName : {
    type : String,
  },
  stampDuty: {
    type: SchemaTypes.Double,
    required: true,
  },
  leaseTimePeriod: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("tenantSettings",TenantSettings);
