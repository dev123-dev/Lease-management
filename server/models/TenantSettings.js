var mongoose = require("mongoose");
require("mongoose-double")(mongoose);

var SchemaTypes = mongoose.Schema.Types;

const TenantSettings = new mongoose.Schema({
  userId: {
    type: String,
  },
  userName: {
    type: String,
  },
  hike: {
    type: Number,
  },
  OrganizationId: {
    type: String,
  },
  OrganizationName: {
    type: String,
  },
  stampDuty: {
    type: SchemaTypes.Double,
  },
  leaseTimePeriod: {
    type: Number,
  },
});

module.exports = mongoose.model("tenantSettings", TenantSettings);
