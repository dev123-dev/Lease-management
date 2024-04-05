const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const userDetails = require("../../models/UserDetails");
const propertydetails = require("../../models/PropertyDetails");
router.post("/getPropertyReport", auth, async (req, res) => {
  try {
    const user = await userDetails.findById(req.user.id);
    let buildingReport = await propertydetails.aggregate([
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
          as: "teanants",
        },
      },
    ]);

    res.json(buildingReport);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Internal Server Error.");
  }
});
module.exports = router;
