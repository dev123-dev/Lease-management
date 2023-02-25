const express = require("express");
const router = express.Router();
const config = require("config");
const { check, validationResult } = require("express-validator");
const mongoose = require("mongoose");
const TenantDetails = require("../../models/TenantDetails");
const TenantSettings = require("../../models/TenantSettings");
const OrganizationDetails = require("../../models/OrganizationDetails");
const OrganizationDetailsHistories = require("../../models/OrganizationDetailsHistories");
const UserDetails = require("../../models/UserDetails");
const userdetail = require("../../models/UserDetail")
//const UserHistory = require("../../models/UserDetailsHistories")
const ShopDetails = require("../../models/ShopDetails");
const property = require("../../models/PropertyDetails");

const TenentAgreement = require("../../models/TenantAgreementDetails");
const TenentHistories = require("../../models/TenantHistories");
const bcrypt = require("bcryptjs");

router.post("/add-tenant-details", async (req, res) => {
  let data = req.body;
  console.log(data);
  let tenantDetails = new TenantDetails(data);
  // const finalData = {
  // tenantName: data.tenantName,
  // tenantPhone: data.tenantPhone,
  // tenantFirmName: data.tenantFirmName,
  // tenantAddr: data.tenantAddr,
  // tenantAdharNo: data.tenantAdharNo,
  // tenantPanNo: data.tenantPanNo,
  // tenantDepositAmt: data.tenantDepositAmt,
  // tenantPaymentMode: data.tenantPaymentMode,
  // tenantChequenoOrDdno: data.tenantChequenoOrDdno,
  // tenantBankName: data.tenantBankName,
  // tenantchequeDate: data.tenantchequeDate,
  // shopId: data.shopId,
  // tenantEnteredBy: data.tenantEnteredBy,
  // tenantDate: data.tenantDate,
  // generatordepoAmt: data.generatordepoAmt,
  //};
  try {
    //console.log(tenantDetails.tenantName);
    output = await tenantDetails.save();
    // console.log(output);

    const finalData2 = {
      tdId: output._id,
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

    const updateStatus = await ShopDetails.updateOne(
      { _id: output.shopId },
      {
        $set: {
          shopStatus: "Used",
          tdId: output._id,
        },
      }
    );
    res.json(updateStatus);

    const finalData1 = {
      tdId: output._id,
      tenantFileNo: data.tenantFileNo,
      tenantDoorNo: data.tenantDoorNo,
      tenantRentAmount: data.tenantRentAmount,
      tenantLeaseStartDate: data.tenantLeaseStartDate,
      tenantLeaseEndDate: data.tenantLeaseEndDate,
      tenantAgreementEntredBy: data.tenantEnteredBy,
      tenantAgreementDate: data.tenantDate,
    };
    let tenantAgreementDetails = new TenentAgreement(finalData1);
    output1 = await tenantAgreementDetails.save();
    // res.send(output);
    // res.send(output1);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Internal Server Error.");
  }
});

//add organization try
router.post("/add-Organization", async (req, res) => {
  let data = req.body;
  try {
    let orgData = new OrganizationDetails(data);
    output = await orgData.save();
    const finalData2 = {
      OrganizationName: output.OrganizationName,
      OrganizationEmail: output.OrganizationEmail,
      OrganizationNumber: output.OrganizationNumber,
      OrganizationAddress: output.OrganizationAddress,
      Location: output.Location,
      org_status: output.org_status,
      enter_by_dateTime: output.enter_by_dateTime,
    };
    let output2 = new OrganizationDetailsHistories(finalData2);
    let orghistory = output2.save();
    res.send(output);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Internal Server Error.");
  }
});

//get all organization
router.get("/get-all-Organization", async (req, res) => {
 
  try {
    const orgdata = await OrganizationDetails.find({})
    // aggregate([
    //   {
    //     $project:
    //      {
    //       OrganizationName: "$OrganizationName",
    //       OrganizationEmail: "$OrganizationEmail",
    //       OrganizationNumber: "$OrganizationNumber",
    //       OrganizationAddress: "$OrganizationAddress",
    //       Location: "$Location",

    //       enddate : "$enddate",
    //       org_status: "$org_status",
    //       enter_by_dateTime: "$enter_by_dateTime",
    //     },
      // },
      // {
      //   $match : {
      //     org_status : {
      //       $eq : "Acticve"
      //     },

      //   }
      
    res.json(orgdata);
    console.log("this is org data",orgdata)
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Internal Server Error.");
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
          Location: data.Location,
        },
      }
    );

    res.json(updateorg);
  } catch (error) {
    console.log("ERROR IN AP", error);
    res.status(500).json({ errors: [{ msg: "Server Error" }] });
  }
});
// router.post("/update-Property", async (req, res) => {
//   let data = req.body;
//   try {
//     const updateorg = await PropertyDetails.updateOne(
//       { _id: data.OrganizationId },
//       {
//         $set: {
//           OrganizationName: data.OrganizationName,
//           OrganizationEmail: data.OrganizationEmail,
//           OrganizationNumber: data.OrganizationNumber,
//           OrganizationAddress: data.OrganizationAddress,
//           Location: data.Location,
//         },
//       }
//     );

//     res.json(updateorg);
//   } catch (error) {
//     console.log("ERROR IN AP", error);
//     res.status(500).json({ errors: [{ msg: "Server Error" }] });
//   }
// });

//Super user adding
router.post("/add-SuperUser", async (req, res) => {
let userdata = req.body;

console.log("this is user data")
console.log(userdata.usergroup.label)
  try {
    const adduser = {
      username  : userdata.username,
      useremail : userdata.useremail,
      userphone : userdata.userphone,
      useraddress : userdata.useraddress,
      usergroup : userdata.usergroup.label,
      password : userdata.password,
      OrganizationName : userdata.OrganizationName.label,
    }
    let u_data = new UserDetails(adduser);
    output = await u_data.save();
    res.send(u_data);
    console.log(output);
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
          useraddress : "$useraddress",
          OrganizationName : "$OrganizationName",
        },
      },
    ]);
    res.json(userdata);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Internal Server Error.");
  }
});
//edit the super user
router.post("/Update-User",async(req,res)=>{
  console.log("inside update api")
  let data = req.body;
  console.log(data);
  try{
  const updateuser = await UserDetails.updateOne(
    {_id:data.userid},
    {
      $set : {
        
        username : data.username,
        userphone : data.userphone,
        useremail : data.useremail,
        usergroup : data.usergroup.label,
        useraddress : data.useraddress,
        OrganizationName : data.OrganizationName.label,
      },
    }
  )
 
  console.log(updateuser)
  }catch(err){
    console.error(err.message);
  }
})

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
  //console.log(data);
  try {
    let proper = new property(data);
    output = await proper.save();
    console.log(output);
    res.send(output);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Internal Server Error.");
  }
});

//deactive property
router.post("/deactive-property", async (req, res) => {
  console.log("iinsde api");

  let data = req.body;
  console.log(data);
  try {
    const propertydata = await property.updateOne(
      { _id: data.Org_id },
      {
        $set: {
          shopStatus: "Avaiable",
          deactive_reason: data.deactive_reason,
        },
      }
    );
    console.log(propertydata);
    res.json(propertydata);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Internal Server Error.");
  }
});

// router.post("/add-shop-details", async (req, res) => {
//   let data = req.body;

//   try {
//     let shopDetails = new ShopDetails(data);
//     output = await shopDetails.save();
//     res.send(output);
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send("Internal Server Error.");
//   }
// });

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
  let data = req.body;
  console.log(data.OrgId);
  try {
    let data = req.body;
    let dltuser = await UserDetails.updateOne(
      { _id: data.Org_id },
      {
        $set: {
          userStatus: "Deactive",
          deactive_reason: data.deactive_reason,
        },
      }
    );
    res.json(dltuser);
  } catch (err) {
    console.log("error in deleting the org data");
  }
});

//ddeactivating the organization
router.post("/deactive-Organization", async (req, res) => {
  let data = req.body;
  console.log(data.OrgId);
  try {
    let data = req.body;
    let dltOrg = await OrganizationDetails.updateOne(
      { _id: data.Org_id },
      {
        $set: {
          org_status: "Deactive",
          deactive_reason: data.deactive_reason,
        },
      }
    );
    res.json(dltOrg);
  } catch (err) {
    console.log("error in deleting the org data");
  }
});

router.post("/deactive-tenant", async (req, res) => {
  // [check("tdId", "Invalid Request").not().isEmpty()],
  console.log("hit");
  try {
    let data = req.body;

    const updatedetails = await TenantDetails.updateOne(
      { _id: data.tid },
      {
        $set: {
          tenantstatus: "Deactive",
          tenantdeactivereason: data.deactive_reason,
        },
      }
    );

    const finalData2 = {
      tdId: data.tid,
      thStatus: "Deactive",
    };
    console.log(finalData2);

    let tenantHistories = new TenentHistories(finalData2);
    output2 = await tenantHistories.save();

    const detail = ShopDetails.updateOne(
      { tdId: data.tid },
      {
        $set: {
          shopStatus: "Available",
        },
      }
    );
    console.log(detail);
    // const shopDoorNoUpdate = await ShopDetails.updateOne(
    //   { tdId: data.tid },
    //   {
    //     $set: {
    //       shopStatus: "Available",
    //     },
    //   }
    // );
    //res.json(shopDoorNoUpdate);
    res.json(updatedetails);
  } catch (error) {
    res.status(500).json({ errors: [{ msg: "Server Error" }] });
  }
});

router.post(
  "/update-tenant",
  // [check("tdId", "Invalid Request").not().isEmpty()],
  async (req, res) => {
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
  }
);

// Get Exp Month Count
router.get("/get-month-exp-count", async (req, res) => {
  var yearVal = new Date().getFullYear();
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
router.post("/get-month-exp-count-filter", async (req, res) => {
  const { selectedY } = req.body;
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
          tenantLeaseEndDate: { $regex: new RegExp("^" + selectedY, "i") },
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

router.post("/add-agreement-details", async (req, res) => {
  let data = req.body;

  try {
    let tenantAgreementDetails = new TenantAgreementDetails(data);
    output = await tenantAgreementDetails.save();
    res.send(output);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Internal Server Error.");
  }
});

router.get("/get-all-shops", async (req, res) => {
  try {
    const ShopsData = await property.find({}).sort({ _id: -1 });
    res.json(ShopsData);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Internal Server Error.");
  }
});

//Exp Year Count filter
router.post("/get-previous-years-exp", async (req, res) => {
  const { selectedVal } = req.body;

  var date = new Date(selectedVal);
  var firstDay = new Date(date.getFullYear(), 0, 1).toISOString().split("T")[0];
  try {
    // const MonthExpCntData = await TenentAgreement.find({
    //   tenantLeaseEndDate: { $lt: firstDay },
    // }).count();
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
    console.error(err.message);
    res.status(500).send("Internal Server Error.");
  }
});

router.post("/get-tenant-exp-report", async (req, res) => {
  const { monthSearch, yearSearch } = req.body;
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

router.post("/get-tenant-old-exp-report", async (req, res) => {
  const { yearSearch } = req.body;
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

//



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
    ]);
    res.json(tenanatData);
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Server Error.");
  }
});

router.get("/get-all-users", async (req, res) => {
  try {
    const userDetails = await UserDetails.find({});
    res.json(userDetails);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Internal Server Error.");
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

router.post(
  "/update-tenant",
  // [check("tdId", "Invalid Request").not().isEmpty()],
  async (req, res) => {
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
  }
);

router.post(
  "/update-tenant-details",

  async (req, res) => {
    try {
      let data = req.body;
      const updatetenantdetails = await TenantDetails.updateOne(
        { _id: data.recordId },
        {
          $set: {
            tenantName: data.tenantName,
            tenantPhone: data.tenantPhone,
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

      //  res.json(updatetenantdetails);

      const AgreementUpdate = await TenentAgreement.updateOne(
        { tdId: data.recordId, AgreementStatus: data.AgreementStatus },

        {
          $set: {
            tenantRentAmount: data.tenantRentAmount,
            tenantLeaseStartDate: data.tenantLeaseStartDate,
            tenantLeaseEndDate: data.tenantLeaseEndDate,
          },
        }
      );

      // res.json(AgreementUpdate);
    } catch (error) {
      res.status(500).json({ errors: [{ msg: "Server Error" }] });
    }
  }
);

router.post("/tenant-update-history", async (req, res) => {
  let data = req.body;
  try {
    let tenantHistories = new TenentHistories(data);
    output = await tenantHistories.save();
    res.send(output);
    console.log(output);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Internal Server Error.");
  }
});

module.exports = router;
