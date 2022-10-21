var mongoose = require("mongoose");
require("mongoose-double")(mongoose);

var SchemaTypes = mongoose.Schema.Types;

const TenantSettings = new mongoose.Schema({
  hikePercentage: {
    type: Number,
    Required: true,
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

module.exports = tenantSettings = mongoose.model(
  "tenantSettings",
  TenantSettings
);
