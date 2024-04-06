const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const userDetails = require("../../models/UserDetails");
const propertydetails = require("../../models/PropertyDetails");

router.post("/getPropertyReport", auth, async (req, res) => {
  try {
    let {OrganizationId,LocationName } = req.body;
    const user = await userDetails.findById(req.user.id);
    let BuildingReportStages = [
      {
        $match: {
          OrganizationId:user.OrganizationId,
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
          OrganizationId: OrganizationId,
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

module.exports = router;
