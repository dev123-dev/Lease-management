const express = require("express");
const router = express.Router();
const TenantDetails = require("../../models/TenantDetails");
const TenantSettings = require("../../models/TenantSettings");
const OrganizationDetails = require("../../models/OrganizationDetails");
const OrganizationDetailsHistories = require("../../models/OrganizationDetailsHistories");
const UserDetails = require("../../models/UserDetails");
const ShopDetails = require("../../models/ShopDetails");
const property = require("../../models/PropertyDetails");
const TenentAgreement = require("../../models/TenantAgreementDetails");
const TenentHistories = require("../../models/TenantHistories");

router.post("/add-tenant-details", async (req, res) => {
  let data = req.body;
  try {
    let tenantDetails = {
      OrganizationName: data.OrganizationName,
      OrganizationId: data.OrganizationId,
      BuildingName: data.BuildingName,
      BuildingId: data.BuildingId,
      Location: data.Location,
      tenantFileNo: data.tenantFileNo,
      shopDoorNo: data.tenantDoorNo,
      tenantName: data.tenantName,
      tenantPhone: data.tenantPhone,
      tenantFirmName: data.tenantFirmName,
      tenantAddr: data.tenantAddr,
      tenantAdharNo: data.tenantAdharNo,
      tenantPanNo: data.tenantPanNo,
      tenantDepositAmt: data.tenantDepositAmt,
      tenantPaymentMode: data.tenantPaymentMode,
      tenantChequenoOrDdno: data.tenantChequenoOrDdno,
      tenantBankName: data.tenantBankName,
      tenantchequeDate: data.startSelectedDate,
      tenantRentAmount: data.tenantRentAmount,
      tenantLeaseStartDate: data.tenantLeaseStartDate,
      tenantLeaseEndDate: data.tenantLeaseEndDate,
      generatordepoAmt: data.generatordepoAmt,
      tenantEnteredBy: data.tenantEnteredBy,
      tenantDate: data.todayDateymd,
      selectedY: data.selectedY,
      selectedVal: data.selectedVal,
    };
    let tenantdata = await new TenantDetails(tenantDetails);
    tenantdata.save();
    const finalData2 = {
      tdId: tenantdata._id,
      thName: data.tenantName,
      thPhone: data.tenantPhone,
      thFirmName: data.tenantFirmName,
      thAddr: data.tenantAddr,
      thAdharNo: data.tenantAdharNo,
      thPanNo: data.tenantPanNo,
      thDepositAmt: data.tenantDepositAmt,
      thgeneratordepoAmt: data.generatordepoAmt,
      thshopId: data.shopId,
      thStatus: "Add",
      thEnteredBy: data.tenantEnteredBy,
      thDate: data.tenantDate,
    };
    let tenantHistories = new TenentHistories(finalData2);
    output2 = await tenantHistories.save();

    tenantdata.shopDoorNo.map((eleDoor) => {
      property.updateOne(
        {
          OrganizationId: tenantdata.OrganizationId,
          _id: tenantdata.BuildingId,
          shopDoorNo: { $elemMatch: { doorNo: eleDoor.label } },
        },
        {
          $set: {
            "shopDoorNo.$.status": "Acquired",
          },
        }
      );
    });

    const finalData1 = {
      tdId: tenantdata._id,
      OrganizationName: data.OrganizationName,
      OrganizationId: data.OrganizationId,
      BuildingName: data.BuildingName,
      BuildingId: data.BuildingId,
      tenantstatus: "Active",
      tenantFileNo: data.tenantFileNo,
      tenantDoorNo: data.tenantDoorNo.label,
      tenantRentAmount: data.tenantRentAmount,
      tenantLeaseStartDate: data.tenantLeaseStartDate,
      tenantLeaseEndDate: data.tenantLeaseEndDate,
      tenantAgreementEntredBy: data.tenantEnteredBy,
      tenantAgreementDate: data.tenantDate,
    };
    let tenantAgreementDetails = new TenentAgreement(finalData1);
    output1 = await tenantAgreementDetails.save();
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Internal Server Error.");
  }
});

//add organization try
router.post("/add-Organization", async (req, res) => {
  let data = req.body;
  try {
    let orgd = {
      OrganizationName: data.OrganizationName,
      OrganizationEmail: data.OrganizationEmail,
      OrganizationNumber: data.OrganizationNumber,
      OrganizationAddress: data.OrganizationAddress,
      date: data.date,
      enddate: data.enddate,
      Location: data.Location,
      org_status: data.org_status,
      enter_by_dateTime: data.enter_by_dateTime,
    };

    let orgData = new OrganizationDetails(orgd);
    output = await orgData.save();
    const finalData2 = {
      OrganizationName: output.OrganizationName,
      OrganizationEmail: output.OrganizationEmail,
      OrganizationNumber: output.OrganizationNumber,
      OrganizationAddress: output.OrganizationAddress,
      date: output.date,
      enddate: output.enddate,
      Location: output.Location,
      org_status: output.org_status,
      enter_by_dateTime: output.enter_by_dateTime,
    };

    let output2 = new OrganizationDetailsHistories(finalData2);
    output2.save();
    res.send(output);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Internal Server Error.");
  }
});

//get all organization
router.get("/get-all-Organization", async (req, res) => {
  try {
    const data = await OrganizationDetails.find({}).sort({
      org_status: 1,
    });

    res.json(data);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Internal Server Error in get all orgainzation.");
  }
});
//get particular organization for displaying location in Add property page
router.post("/get-particular-org", async (req, res) => {
  let data = req.body;
  try {
    if (data.OrganizationId) {
      OrganizationDetails.find(
        { _id: data.OrganizationId },
        {
          Location: 1,
        }
      ).then((result) => {
        res.json(result);
      });
    }
  } catch (error) {
    console.log(error.message);
  }
});

//get particular user data for admin side
router.post("/get-particular-user", async (req, res) => {
  let data = req.body;

  try {
    const getuser = await UserDetails.find(
      {
        OrganizationId: data.orgid,
      },
      {
        username: 1,
        useremail: 1,
        usergroup: 1,
        userphone: 1,
        OrganizationName: 1,
        Location: 1,
      }
    ).sort({ userStatus: 1 });

    res.json(getuser);
  } catch (error) {
    console.log(error.message);
  }
});

//update all organization
router.post("/update-Organization", async (req, res) => {
  let data = req.body;
  try {
    const updateorg = await OrganizationDetails.updateOne(
      { _id: data.OrganizationId },
      {
        $set: {
          OrganizationName: data.OrganizationName,
          OrganizationEmail: data.OrganizationEmail,
          OrganizationNumber: data.OrganizationNumber,
          OrganizationAddress: data.OrganizationAddress,
          enddate: data.enddate,
          date: data.startdate,
          Location: data.Location,
        },
      }
    );
    res.json(updateorg);
  } catch (error) {
    res.status(500).json({ errors: [{ msg: "Server Error" }] });
  }
});
router.post("/update-Property", async (req, res) => {
  let data = req.body;
  let doornumber = data.shopDoorNo.map((ele) => {
    return {
      label: ele,
      status: "Acquired",
    };
  });
  try {
    const updateorg = await property.updateOne(
      { _id: data.Property_id, OrganizationId: data.Orgainzation_id },
      {
        $set: {
          buildingName: data.buildingName,
          shopDoorNo: doornumber,
          shopAddress: data.shopAddress,
          hikePercentage: data.hikePercentage,
          stampDuty: data.stampDuty,
          leaseTimePeriod: data.leaseTimePeriod,
          OrganizationName: data.OrganizationName,
          Organization_id: data.OrganizationId,
          shopStatus: "Acquired",
        },
      }
    );
    res.json(updateorg);
  } catch (error) {
    res.status(500).json({ errors: [{ msg: "Server Error" }] });
  }
});

//Super user adding
router.post("/add-SuperUser", async (req, res) => {
  let userdata = req.body;

  try {
    const adduser = {
      username: userdata.username,
      useremail: userdata.useremail,
      userphone: userdata.userphone,
      useraddress: userdata.useraddress,
      usergroup: userdata.usergroup.label,
      password: userdata.password,
      OrganizationName: userdata.OrganizationName.label,
      OrganizationId: userdata.OrganizationName.value,
    };

    let u_data = await new UserDetails(adduser);
    output = await u_data.save();
    res.send(u_data);
  } catch (err) {
    console.error(err);
  }
});

//Add admin user
router.post("/add-AdminUser", async (req, res) => {
  let userdata = req.body;
  try {
    const adduser = {
      username: userdata.username,
      useremail: userdata.useremail,
      userphone: userdata.userphone,
      useraddress: userdata.useraddress,
      usergroup: userdata.usergroup.label,
      password: userdata.password,
      OrganizationName: userdata.OrganizationName,
      OrganizationId: userdata.OrganizationId,
    };
    let u_data = new UserDetails(adduser);
    output = await u_data.save();
    res.send(u_data);
  } catch (err) {
    console.error(err);
  }
});

//super user displaying
router.get("/get-all-Superuser", async (req, res) => {
  try {
    const userdata = await UserDetails.aggregate([
      {
        $project: {
          username: "$username",
          useremail: "$useremail",
          userphone: "$userphone",
          usergroup: "$usergroup",
          userStatus: "$userStatus",
          useraddress: "$useraddress",
          password: "$password",
          OrganizationId: "$OrganizationId",
          OrganizationName: "$OrganizationName",
        },
      },
    ]).sort({ userStatus: 1 });

    res.json(userdata);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Internal Server Error.");
  }
});

//get particular organization user
router.post("/get-particular-org-user", async (req, res) => {
  let data = req.body;
  try {
    const ParticularOrg = await UserDetails.find({
      OrganizationId: data.OrganizationId,
    }); /*.sort({ userStatus: 1 })*/
    res.json(ParticularOrg);
  } catch (error) {
    console.log(error.message);
  }
});

//edit the super user
router.post("/Update-User", async (req, res) => {
  let data = req.body;
  try {
    await UserDetails.updateOne(
      { _id: data.userid },
      {
        $set: {
          username: data.username,
          userphone: data.userphone,
          useremail: data.useremail,
          usergroup: data.usergroup.label,
          useraddress: data.useraddress,
          OrganizationName: data.OrganizationName,
        },
      }
    );
  } catch (err) {
    console.error(err.message);
  }
});

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

//add property details
router.post("/add-Property-details", async (req, res) => {
  let data = req.body;
  try {
    let proper = new property(data);
    let output = await proper.save();
    res.send(output);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Internal Server Error.");
  }
});

//get particular property detaills based on organization details

router.post("/get-Particular-Property", async (req, res) => {
  let { OrganizationId, LocationName } = req.body;
  let query = { OrganizationId: OrganizationId };

  if (LocationName) {
    query = {
      ...query,
      Location: LocationName,
    };
  }

  try {
    let propertydata = await property.find(query).sort({ shopStatus: 1 });
    res.json(propertydata);
  } catch (error) {
    console.log(error.message);
  }
});

//deactive property
router.post("/deactive-property", async (req, res) => {
  let data = req.body;

  try {
    if (data.Dno.length === 0) {
      property.updateOne(
        {
          OrganizationId: data.OrganizationId,
          _id: data.PropertyId,
        },
        {
          $set: {
            shopStatus: "Deactive",
            deactive_reason: data.deactive_reason,
          },
        }
      );
    } else {
      data.Dno.map((eleDoor) => {
        property.updateOne(
          {
            OrganizationId: data.OrganizationId,
            _id: data.PropertyId,
            shopDoorNo: { $elemMatch: { doorNo: eleDoor } },
          },
          {
            $set: {
              "shopDoorNo.$.status": "Deleted the Door Number",
              deactive_reason: data.deactive_reason,
            },
          }
        ).then((data) => console.log(data));;
      });
    }

    // res.json(propertydata);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Internal Server Error.");
  }
});

//getting particular Tenant details based on Orgaination
router.post("/get-particular-Tenant", async (req, res) => {
  let { OrganizationId, LocationName } = req.body;

  let query = { OrganizationId: OrganizationId };
  if (LocationName) {
    query = {
      ...query,
      Location: LocationName,
    };
  }
  try {
    const tenantdata = await TenantDetails.find(query).sort({
      tenantstatus: 1,
    });
    res.json(tenantdata);
  } catch (error) {
    console.log(error.message);
  }
});

// Get Exp Month Count
router.get("/get-tenant-report", async (req, res) => {
  try {
    const tenantData = await TenantDetails.aggregate([
      {
        $group: {
          _id: "$sdId",
          tenantFileNo: { $first: "$tenantFileNo" },
          tenantDoorNo: { $first: "$tenantDoorNo" },
          tenantName: { $first: "$tenantName" },
          tenantPhone: { $first: "$tenantPhone" },
          tenantFirmName: { $first: "$tenantFirmName" },
          tenantAddr: { $first: "$output.tenantAddr" },
          tenantAdharNo: { $first: "$tenantAdharNo" },
          tenantPanNo: { $first: "$tenantPanNo" },
          tenantDepositAmt: { $first: "$tenantDepositAmt" },
        },
      },
    ]);
    res.json(tenantData);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Internal Server Error.");
  }
});
//deactivating the  user
router.post("/deactive-user", async (req, res) => {
  try {
    let data = req.body;
    let dltuser = await UserDetails.updateOne(
      { _id: data.userId },
      {
        $set: {
          userStatus: "Deactive",
          deactive_reason: data.deactive_reason,
        },
      }
    );

    res.json(dltuser);
  } catch (err) {}
});

//ddeactivating the organization
router.post("/deactive-Organization", async (req, res) => {
  try {
    let data = req.body;
    UserDetails.updateMany(
      {
        OrganizationId: data.Org_id,
      },
      {
        $set: {
          userStatus: "Deactive",
        },
      }
    );
    let dltOrg = await OrganizationDetails.updateOne(
      { _id: data.Org_id },
      {
        $set: {
          org_status: "Deactive",
          AgreementStatus: "Deactivated",
          deactive_reason: data.deactive_reason,
        },
      }
    );
    res.json(dltOrg);
  } catch (err) {}
});

router.post("/deactive-tenant", async (req, res) => {
  try {
    let data = req.body;
    if (data.Dno.length === 0) {
      data.Dno.map((ele) => {
        TenantDetails.updateOne(
          {
            _id: data.tid,
            shopDoorNo: { $elemMatch: { label: ele.label } },
          },
          {
            $set: {
              tenantstatus: "Deactive",
              deactive_reason: data.deactive_reason,
            },
          }
        ).then((data) => console.log("single tenant", data));
      });
    } else {
      data.Dno.map((ele) => {
        TenantDetails.updateOne(
          {
            _id: data.tid,
            shopDoorNo: { $elemMatch: { label: ele.label } },
          },
          {
            $set: {
              "shopDoorNo.$.status": "Deleted the Door Number",
              deactive_reason: data.deactive_reason,
            },
          }
        ).then((data) => console.log("else part", data));
      });
      data.Dno.map((ele) => {
        property
          .updateOne(
            {
              tdId: data.tid,
              shopDoorNo: {
                $elemMatch: {
                  doorNo: ele.label,
                },
              },
            },
            {
              $set: {
                "shopDoorNo.$.status": "Avaiable",
              },
            }
          )
          .then((data) => console.log(data));
      });
    }

    // }
  } catch (error) {
    res.status(500).json({ errors: [{ msg: "Server Error" }] });
  }
});

router.post("/update-tenant", async (req, res) => {
  try {
    let data = req.body;

    const updateagreementdetails = await TenantSettings.updateOne(
      { _id: data.recordId },
      {
        $set: {
          hikePercentage: data.hikePercentage,
          stampDuty: data.stampDuty,
          leaseTimePeriod: data.leaseTimePeriod,
        },
      }
    );

    res.json(updateagreementdetails);
  } catch (error) {
    res.status(500).json({ errors: [{ msg: "Server Error" }] });
  }
});

//get exp month count for Organization
router.post("/get-month-exp-org", async (req, res) => {
  const { selectedY } = req.body;

  var yearVal = new Date().getFullYear();
  if (selectedY) {
    yearVal = selectedY;
  }
  try {
    const orgexp = await OrganizationDetails.aggregate([
      {
        $match: {
          enddate: { $regex: new RegExp("^" + yearVal, "i") },
          AgreementStatus: { $eq: "Expired" },
          org_status: "Active",
        },
      },
      {
        $group: {
          _id: {
            year: {
              $year: { $dateFromString: { dateString: "$enddate" } },
            },
            month: {
              $month: {
                $dateFromString: { dateString: "$enddate" },
              },
            },
          },
          count: { $sum: 1 },
        },
      },
    ]);

    res.json(orgexp);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Internal Server Error.");
  }
});

// Get Exp Month Count
router.post("/get-month-exp-count", async (req, res) => {
  const { selectedY, OrganizationId } = req.body; //change
  var yearVal = new Date().getFullYear();
  if (selectedY) {
    //change
    yearVal = selectedY;
  }
  try {
    const MonthExpCntData = await TenentAgreement.aggregate([
      {
        $lookup: {
          from: "tenantdetails",
          localField: "tdId",
          foreignField: "_id",
          as: "output",
        },
      },
      {
        $match: {
          OrganizationId: OrganizationId,
          tenantLeaseEndDate: { $regex: new RegExp("^" + yearVal, "i") },
          AgreementStatus: { $ne: "Renewed" },
          output: { $elemMatch: { tenantstatus: { $eq: "Active" } } },
        },
      },
      {
        $group: {
          _id: {
            year: {
              $year: { $dateFromString: { dateString: "$tenantLeaseEndDate" } },
            },
            month: {
              $month: {
                $dateFromString: { dateString: "$tenantLeaseEndDate" },
              },
            },
          },
          count: { $sum: 1 },
        },
      },
    ]);
    res.json(MonthExpCntData);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Internal Server Error.");
  }
});

//Filter Exp Month Count filter
// router.post("/get-month-exp-count-filter", async (req, res) => {
//   const { selectedY } = req.body;
//   try {
//     const MonthExpCntData = await TenentAgreement.aggregate([
//       {
//         $lookup: {
//           from: "tenantdetails",
//           localField: "tdId",
//           foreignField: "_id",
//           as: "output",
//         },
//       },
//       {
//         $match: {
//           tenantLeaseEndDate: { $regex: new RegExp("^" + selectedY, "i") },
//           AgreementStatus: { $ne: "Renewed" },
//           output: { $elemMatch: { tenantstatus: { $eq: "Active" } } },
//         },
//       },
//       {
//         $group: {
//           _id: {
//             year: {
//               $year: { $dateFromString: { dateString: "$tenantLeaseEndDate" } },
//             },
//             month: {
//               $month: {
//                 $dateFromString: { dateString: "$tenantLeaseEndDate" },
//               },
//             },
//           },
//           count: { $sum: 1 },
//         },
//       },
//     ]);
//     res.json(MonthExpCntData);
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send("Internal Server Error.");
//   }
// });

router.post("/add-agreement-details", async (req, res) => {
  let data = req.body;

  try {
    let tenantAgreementDetails = new TenantAgreementDetails(data);
    output = await tenantAgreementDetails.save();
    res.send(output);
  } catch (err) {
    res.status(500).send("Internal Server Error.");
  }
});

router.post("/get-all-shops", async (req, res) => {
  let data = req.body;

  try {
    const ShopsData = await property
      .find({
        Organization_id: data.OrganizationId,
      })
      .sort({ shopStatus: -1 });

    res.json(ShopsData);
  } catch (err) {
    res.status(500).send("Internal Server Error.");
  }
});
//get year count for Organization
router.post("/get-previous-years-exp-Org", async (req, res) => {
  const { selectedVal } = req.body;

  var date = new Date(selectedVal);
  var firstDay = new Date(date.getFullYear(), 0, 1).toISOString().split("T")[0];
  try {
    const yeardata = await OrganizationDetails.aggregate([
      {
        $match: {
          enddate: { $lt: firstDay },
          AgreementStatus: { $eq: "Expired" },
        },
      },
      {
        $group: {
          _id: null,
          count: { $sum: 1 },
        },
      },
    ]);

    res.json(yeardata);
  } catch (err) {
    res.status(500).send("Internal Server Error.");
  }
});

//Exp Year Count filter
router.post("/get-previous-years-exp", async (req, res) => {
  const { selectedVal, OrganizationId } = req.body;

  var date = new Date(selectedVal);
  var firstDay = new Date(date.getFullYear(), 0, 1).toISOString().split("T")[0];

  try {
    const MonthExpCntData = await TenentAgreement.aggregate([
      {
        $lookup: {
          from: "tenantdetails",
          localField: "tdId",
          foreignField: "_id",
          as: "output",
        },
      },
      {
        $match: {
          OrganizationId: OrganizationId,
          tenantLeaseEndDate: { $lt: firstDay },
          AgreementStatus: { $ne: "Renewed" },
          output: { $elemMatch: { tenantstatus: { $eq: "Active" } } },
        },
      },

      {
        $group: {
          _id: null,
          count: { $sum: 1 },
        },
      },
    ]);
    res.json(MonthExpCntData);
  } catch (err) {
    res.status(500).send("Internal Server Error.");
  }
});

router.post("/get-tenant-exp-report", async (req, res) => {
  const { monthSearch, yearSearch, OrganizationId } = req.body;
  var monthVal = monthSearch;
  if (monthSearch < 10 && monthSearch.toString().length === 1) {
    var monthVal = "0" + monthSearch;
  }
  var yearMonth = yearSearch + "-" + monthVal;

  try {
    const tenantSettingsData = await TenantSettings.find({});
    const tenantExpReport = await TenantDetails.aggregate([
      {
        $lookup: {
          from: "tenantagreementsettings",
          localField: "_id",
          foreignField: "tdId",
          as: "output",
        },
      },
      { $unwind: "$output" },
      {
        $project: {
          tenantName: "$tenantName",
          OrganizationId: "$OrganizationId",
          tenantLeaseEndDate: "$output.tenantLeaseEndDate",
          tenantRentAmount: "$output.tenantRentAmount",
          AgreementStatus: "$output.AgreementStatus",
          tenantstatus: "$tenantstatus",
          tdId: "$output.tdId",
          agreementId: "$output._id",
          tenantDoorNo: "$output.tenantDoorNo",
          tenantFileNo: "$output.tenantFileNo",
          chargesCal: {
            $add: [
              {
                $divide: [
                  {
                    $multiply: [
                      "$output.tenantRentAmount",
                      tenantSettingsData[0].hikePercentage,
                    ],
                  },
                  100,
                ],
              },
              "$output.tenantRentAmount",
            ],
          },
          stampDuty: {
            $divide: [
              {
                $multiply: [
                  {
                    $multiply: [
                      {
                        $add: [
                          {
                            $divide: [
                              {
                                $multiply: [
                                  "$output.tenantRentAmount",
                                  tenantSettingsData[0].hikePercentage,
                                ],
                              },
                              100,
                            ],
                          },
                          "$output.tenantRentAmount",
                        ],
                      },
                      tenantSettingsData[0].stampDuty,
                    ],
                  },
                  tenantSettingsData[0].leaseTimePeriod,
                ],
              },
              100,
            ],
          },
        },
      },
      {
        $match: {
          OrganizationId: OrganizationId,
          tenantLeaseEndDate: { $regex: new RegExp("^" + yearMonth, "i") },
          AgreementStatus: { $ne: "Renewed" },
          tenantstatus: { $eq: "Active" },
        },
      },
    ]);
    res.json(tenantExpReport);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Internal Server Error.");
  }
});

router.get("/get-all-settings", async (req, res) => {
  try {
    const tenanatSettingData = await TenantSettings.find({});
    res.json(tenanatSettingData);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Internal Server Error.");
  }
});

router.post("/get-Particular-org-Tenantsetting", async (req, res) => {
  const data = req.body;

  try {
    const Tenant_SETTING = await TenantSettings.find({
      OrganizationId: data.OrganizationId,
    });
    res.json(Tenant_SETTING);
  } catch (error) {
    console.log(error.message);
  }
});

router.get("/get-door-nos", async (req, res) => {
  try {
    const doorNoData = await ShopDetails.aggregate([
      {
        $match: {
          shopStatus: {
            $eq: "Available",
          },
        },
      },
    ]);
    res.json(doorNoData);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Internal Server Error.");
  }
});
//get organization expiry data to Tenant filter
router.post("/get-organization-expiry-report", async (req, res) => {
  const { monthSearch, yearSearch } = req.body;

  var monthVal = monthSearch;
  if (monthSearch < 10 && monthSearch.toString().length === 1) {
    var monthVal = "0" + monthSearch;
  }
  var yearMonth = yearSearch + "-" + monthVal;
  try {
    const data = await OrganizationDetails.find({
      enddate: { $regex: new RegExp("^" + yearMonth, "i") },
      AgreementStatus: { $eq: "Expired" },
      org_status: "Active",
    });

    res.json(data);
  } catch (error) {
    console.log(error.message);
  }
});

router.post("/get-tenant-old-exp-report", async (req, res) => {
  const { yearSearch, OrganizationId } = req.body;
  var lastDate = new Date(yearSearch, 0, 1).toISOString().split("T")[0];
  try {
    const tenantSettingsData = await TenantSettings.find({});
    const tenantExpReport = await TenantDetails.aggregate([
      {
        $lookup: {
          from: "tenantagreementsettings",
          localField: "_id",
          foreignField: "tdId",
          as: "output",
        },
      },
      { $unwind: "$output" },
      {
        $project: {
          tenantName: "$tenantName",
          tenantLeaseEndDate: "$output.tenantLeaseEndDate",
          AgreementStatus: "$output.AgreementStatus",
          tenantstatus: "$tenantstatus",
          tdId: "$output.tdId",
          agreementId: "$output._id",
          tenantDoorNo: "$output.tenantDoorNo",
          tenantFileNo: "$output.tenantFileNo",
          OrganizationId: "$OrganizationId",
          chargesCal: {
            $add: [
              {
                $divide: [
                  {
                    $multiply: [
                      "$output.tenantRentAmount",
                      tenantSettingsData[0].hikePercentage,
                    ],
                  },
                  100,
                ],
              },
              "$output.tenantRentAmount",
            ],
          },
          stampDuty: {
            $divide: [
              {
                $multiply: [
                  {
                    $add: [
                      {
                        $divide: [
                          {
                            $multiply: [
                              "$output.tenantRentAmount",
                              tenantSettingsData[0].hikePercentage,
                            ],
                          },
                          100,
                        ],
                      },
                      "$output.tenantRentAmount",
                    ],
                  },
                  tenantSettingsData[0].stampDuty,
                ],
              },
              100,
            ],
          },
        },
      },
      {
        $match: {
          OrganizationId: OrganizationId,
          tenantLeaseEndDate: { $lte: lastDate },
          AgreementStatus: { $ne: "Renewed" },
          tenantstatus: { $eq: "Active" },
        },
      },
    ]);
    res.json(tenantExpReport);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Internal Server Error.");
  }
});

router.get("/get-door-number", async (req, res) => {
  try {
    const doorNoData = await TenentAgreement.aggregate([
      {
        $match: {
          AgreementStatus: { $ne: "Renewed" },
        },
      },
    ]);

    res.json(doorNoData);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Internal Server Error.");
  }
});

router.post("/filter-tenant-doorno-pref", async (req, res) => {
  const { doornoSearch } = req.body;

  try {
    const allTenantDoornofilter = await TenantDetails.aggregate([
      {
        $lookup: {
          from: "tenantagreementsettings",
          localField: "_id",
          foreignField: "tdId",
          as: "output",
        },
      },
      { $unwind: "$output" },
      {
        $project: {
          tenantName: "$tenantName",
          tenantDoorNo: "$output.tenantDoorNo",
          tenantFileNo: "$output.tenantFileNo",
          tenantPhone: "$tenantPhone",
          tenantFirmName: "$tenantFirmName",
          tenantAddr: "$tenantAddr",
          tenantAdharNo: "$tenantAdharNo",
          tenantPanNo: "$tenantPanNo",
          tenantDepositAmt: "$tenantDepositAmt",
          tenantPaymentMode: "$tenantPaymentMode",
          tenantChequenoOrDdno: "$tenantChequenoOrDdno",
          tenantchequeDate: "$tenantchequeDate",
          tenantBankName: "$tenantBankName",
          tenantstatus: "$tenantstatus",
          tenantRentAmount: "$output.tenantRentAmount",
          tenantLeaseEndDate: "$output.tenantLeaseEndDate",
          tenantLeaseStartDate: "$output.tenantLeaseStartDate",
          AgreementStatus: "$output.AgreementStatus",
        },
      },
      {
        $match: {
          tenantDoorNo: {
            $eq: doornoSearch,
          },
          tenantstatus: {
            $eq: "Active",
          },
          AgreementStatus: { $ne: "Renewed" },
        },
      },
    ]);
    res.json(allTenantDoornofilter);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Internal Server Error.");
  }
});

router.get("/get-all-tenants", async (req, res) => {
  try {
    const tenanatData = await TenantDetails.aggregate([
      {
        $lookup: {
          from: "tenantagreementsettings",
          localField: "_id",
          foreignField: "tdId",
          as: "output",
        },
      },
      { $unwind: "$output" },
      {
        $project: {
          tenantName: "$tenantName",
          BuildingName: "$BuildingName",
          Location: "$Location",
          tenantPhone: "$tenantPhone",
          tenantFirmName: "$tenantFirmName",
          tenantAdharNo: "$tenantAdharNo",
          tenantAddr: "$tenantAddr",
          tenantPanNo: "$tenantPanNo",
          tenantBankName: "$tenantBankName",
          generatordepoAmt: "$generatordepoAmt",
          tenantChequenoOrDdno: "$tenantChequenoOrDdno",
          tenantchequeDate: "$tenantchequeDate",
          tenantDepositAmt: "$tenantDepositAmt",
          tenantPaymentMode: "$tenantPaymentMode",
          tenantstatus: "$tenantstatus",
          tenantDoorNo: "$output.tenantDoorNo",
          tenantFileNo: "$output.tenantFileNo",
          tenantRentAmount: "$output.tenantRentAmount",
          tenantLeaseEndDate: "$output.tenantLeaseEndDate",
          tenantLeaseStartDate: "$output.tenantLeaseStartDate",
          AgreementStatus: "$output.AgreementStatus",
        },
      },
      {
        $match: {
          tenantstatus: {
            $eq: "Active",
          },
          AgreementStatus: { $ne: "Renewed" },
        },
      },
    ]).sort({ tenantstatus: 1 });
    res.json(tenanatData);
  } catch (err) {
    res.status(500).send("Internal Server Error.");
  }
});

router.get("/get-all-users", async (req, res) => {
  try {
    const userDetails = await UserDetails.find({}).sort({ userStatus: 1 });
    res.json(userDetails);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Internal Server Error.");
  }
});

//Renew the Organization details
router.post("/Renew-Organization", async (req, res) => {
  let data = req.body;
  try {
    await OrganizationDetails.updateOne(
      {
        _id: data.OrganizationId,
      },
      {
        $set: {
          OrganizationName: data.Orgname,
          OrganizationEmail: data.Orgemail,
          OrganizationNumber: data.Orgphone,
          OrganizationAddress: data.OrganizationAddress,
          date: data.date,
          enddate: data.enddate,
          AgreementStatus: "Renewed",
          org_status: "Active",
        },
      }
    );
  } catch (error) {
    console.log(error.message);
  }
});

router.post("/renew-tenant-details", async (req, res) => {
  let data = req.body;
  const finalDataTA = {
    tdId: data.tdId,
    tenantFileNo: data.tenantFileNo,
    tenantDoorNo: data.tenantDoorNo,
    tenantRentAmount: data.tenantRentAmount,
    tenantLeaseStartDate: data.tenantLeaseStartDate,
    tenantLeaseEndDate: data.tenantLeaseEndDate,
    AgreementStatus: data.AgreementStatus,
    tenantAgreementEntredBy: data.tenantEnteredBy,
    tenantAgreementDate: data.tenantDate,
  };
  try {
    let tenantAgreementDetails = new TenentAgreement(finalDataTA);
    output = await tenantAgreementDetails.save();

    const updateStatus = await TenentAgreement.updateOne(
      { _id: data.agreementId },
      {
        $set: {
          AgreementStatus: "Renewed",
        },
      }
    );
    res.json(updateStatus);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Internal Server Error.");
  }
});

router.post("/update-tenant", async (req, res) => {
  try {
    let data = req.body;

    const updateagreementdetails = await TenantSettings.updateOne(
      { _id: data.recordId },
      {
        $set: {
          hikePercentage: data.hikePercentage,
          stampDuty: data.stampDuty,
          leaseTimePeriod: data.leaseTimePeriod,
        },
      }
    );

    res.json(updateagreementdetails);
  } catch (error) {
    res.status(500).json({ errors: [{ msg: "Server Error" }] });
  }
});

router.post("/update-tenant-details", async (req, res) => {
  try {
    let data = req.body;
    let doonum = data.tenantDoorNo.map((ele) => ele.value);

    const updatetenantdetails = await TenantDetails.updateOne(
      { _id: data.recordId },
      {
        $set: {
          OrganizationId: data.OrganizationId,
          OrganizationName: data.OrganizationName,
          tenantName: data.tenantName,
          tenantPhone: data.tenantPhone,
          shopDoorNo: doonum,
          tenantRentAmount: data.tenantRentAmount,
          tenantLeaseEndDate: data.tenantLeaseEndDate,
          tenantLeaseStartDate: data.tenantLeaseStartDate,
          tenantFirmName: data.tenantFirmName,
          tenantAddr: data.tenantAddr,
          tenantAdharNo: data.tenantAdharNo,
          tenantPanNo: data.tenantPanNo,
          tenantDepositAmt: data.tenantDepositAmt,
          tenantPaymentMode: data.tenantPaymentMode,
          tenantBankName: data.tenantBankName,
          tenantchequeDate: data.tenantchequeDate,
          tenantChequenoOrDdno: data.tenantChequenoOrDdno,
          generatordepoAmt: data.generatordepoAmt,
        },
      }
    );

    res.json(updatetenantdetails);

    await TenentAgreement.updateOne(
      { tdId: data.recordId },

      {
        $set: {
          tenantRentAmount: data.tenantRentAmount,
          tenantLeaseStartDate: data.tenantLeaseStartDate,
          tenantLeaseEndDate: data.tenantLeaseEndDate,
        },
      }
    );
    //res.json(AgreementUpdate);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ errors: [{ msg: "Server Error of tdetaiz" }] });
  }
});

router.post("/tenant-update-history", async (req, res) => {
  let data = req.body;
  try {
    let tenantHistories = new TenentHistories(data);
    output = await tenantHistories.save();
    res.send(output);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Internal Server Error.");
  }
});

module.exports = router;
