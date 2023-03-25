const express = require("express");
const router = express.Router();

const TenantSettings = require("../../models/TenantSettings");

//364
router.post("/add-tenant-settings", async (req, res) => {
  let data = req.body;
  try {
    let tenantSettings = new TenantSettings(data);
    output = await tenantSettings.save();
    res.send(output);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Internal Server Error.");
  }
});

//update
router.post("/update-tenant-settings", async (req, res) => {
  try {
    let data = req.body;
    const updateagreementdetails = await TenantSettings.updateOne(
      { OrganizationId: data.OrganizationId, userId: data.userId },
      {
        $set: {
          hikePercentage: data.hikePercentage,
          stampDuty: data.stampDuty,
          leaseTimePeriod: data.leaseTimePeriod,
        },
      }
    ).then((ele) => console.log(ele));

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
    const tenanatSettingData = await TenantSettings.findOne({
      OrganizationId: data.OrganizationId,
      userId: data.userId,
    });
    res.json(tenanatSettingData);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Internal Server Error.");
  }
});

module.exports = router;
