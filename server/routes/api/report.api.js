const express = require("express");
const router = express.Router();

//middleware
const auth = require("../../middleware/auth");
//models
const userDetails = require("../../models/UserDetails");
const propertydetails = require("../../models/PropertyDetails");
const tenantDetails = require("../../models/TenantDetails");

router.post("/getPropertyReport", auth, async (req, res) => {
  try {
    let { OrganizationId, LocationName } = req.body;
    const user = await userDetails.findById(req.user.id);
    let BuildingReportStages = [
      {
        $match: {
          OrganizationId: user.OrganizationId,
        },
      },
      {
        $lookup: {
          from: "tenantdetails",
          localField: "OrganizationId",
          foreignField: "OrganizationId",
          as: "tenants",
        },
      },
      {
        $sort: {
          shopStatus: 1,
        },
      },
    ];

    if (LocationName) {
      BuildingReportStages.push({
        $match: {
          Location: LocationName,
          OrganizationId: user.OrganizationId,
        },
      });
    }

    let buildingReport = await propertydetails.aggregate(BuildingReportStages);

    res.json(buildingReport);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Internal Server Error.");
  }
});

router.post("/getRenewalReport", auth, async (req, res) => {
  try {
    const { tName } = req.body;

    const user = await userDetails.findById(req.user.id);

    let query = { OrganizationId: user.OrganizationId };
    if (tName) {
      query = {
        ...query,
        tenantName: { $regex: tName, $options: "i" }, //"i" does case insensitive srch
      };
    }
    const RenewalReportData = await tenantDetails.aggregate([
      {
        $match: query,
      },
      {
        $lookup: {
          from: "tenantagreementhistories",
          localField: "_id",
          foreignField: "tenantagreementhistories",
          as: "histroy",
        },
      },
    ]);

    res.json(RenewalReportData);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Internal Server Error.");
  }
});

module.exports = router;
