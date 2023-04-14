const express = require("express");
const router = express.Router();
const TenantSettings = require("../../models/TenantSettings");
const OrganizationDetails = require("../../models/OrganizationDetails");

//364
router.post("/add-tenant-settings", async (req, res) => {
  let data = req.body;
  try {
    let tenantsetting = await OrganizationDetails.updateOne(
      { _id: OrganizationId },
      {
        $set: {
          hike: data.hike,
          stampDuty: data.StampDuty,
          leaseTimePeriod: data.LeaseTimePeriod,
        },
      }
    );
    // let tenantSettings = new TenantSettings(data);
    // output = await tenantSettings.save();
    //res.json(output);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Internal Server Error.");
  }
});

//update
router.post("/update-tenant-settings", async (req, res) => {
  try {
    let data = req.body;
    const updateagreementdetails = await OrganizationDetails.updateOne(
      { _id: data.OrganizationId },
      {
        $set: {
          hike: data.hike,
          stampDuty: data.stampDuty,
          leaseTimePeriod: data.leaseTimePeriod,
        },
      }
    ).then(data);

    res.json(updateagreementdetails);
  } catch (error) {
    res.status(500).json({ errors: [{ msg: "Server Error" }] });
  }
});

//get all setings
//953
router.post("/get-all-settings", async (req, res) => {
  let data = req.body;
  try {
    const tenanatSettingData = await OrganizationDetails.find(
      {
        _id: data.OrganizationId,
      },
      {
        hike: 1,
        stampDuty: 1,
        leaseTimePeriod: 1,
      }
    ).then(data);
    res.json(tenanatSettingData);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Internal Server Error.");
  }
});

module.exports = router;
