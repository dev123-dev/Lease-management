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
const TenantAgreementHistory = require("../../models/TenantAgreementHistories");
const UserActivity = require("../../models/UserActivity");
const auth = require("../../middleware/auth");
const mongoose = require("mongoose");

router.post("/add-tenant-details", async (req, res) => {
  var today = new Date();
  var dd = today.getDate();
  var mm = today.getMonth() + 1;
  var yyyy = today.getFullYear();
  if (dd < 10) dd = "0" + dd;
  if (mm < 10) mm = "0" + mm;
  var todayDateymd = yyyy + "-" + mm + "-" + dd;
  let data = req.body;

  try {
    if (data.tenantLeaseEndDate < todayDateymd) {
      //adding the new data ---------------------------------------------------------------------------

      let tenantDetails = {
        OrganizationName: data.OrganizationName,
        OrganizationId: data.OrganizationId,
        BuildingName: data.BuildingName,
        AgreementStatus: "Expired",
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
        tenantchequeDate: data.tenantchequeDate,
        tenantRentAmount: data.tenantRentAmount,
        tenantLeaseStartDate: data.tenantLeaseStartDate,
        tenantLeaseEndDate: data.tenantLeaseEndDate,
        generatordepoAmt: data.generatordepoAmt,
        tenantEnteredBy: data.tenantEnteredBy,
        tenantDate: data.todayDateymd,
        selectedY: data.selectedY,
        selectedVal: data.selectedVal,
        tenantTransId: data.tenantTransId,
        tenantCardType: data.tenantCardType,
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
        thStatus: "Expired",
        thEnteredBy: data.tenantEnteredBy,
        thDate: data.tenantDate,
      };
      let tenantHistories = new TenentHistories(finalData2);
      output2 = await tenantHistories.save();

      tenantdata.shopDoorNo.map((eleDoor) => {
        property
          .updateOne(
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
          )
          .then(data);
      });

      const finalData1 = {
        tdId: tenantdata._id,
        OrganizationName: data.OrganizationName,
        OrganizationId: data.OrganizationId,
        BuildingName: data.BuildingName,
        BuildingId: data.BuildingId,
        tenantstatus: "Active",
        AgreementStatus: "Expired",
        tenantFileNo: data.tenantFileNo,
        tenantDoorNo: data.tenantDoorNo,
        tenantRentAmount: data.tenantRentAmount,
        tenantLeaseStartDate: data.tenantLeaseStartDate,
        tenantLeaseEndDate: data.tenantLeaseEndDate,
        tenantAgreementEntredBy: data.tenantEnteredBy,
        tenantAgreementDate: data.tenantDate,
      };
      const finalDataHistory = {
        tdId: tenantdata._id,
        OrganizationName: data.OrganizationName,
        OrganizationId: data.OrganizationId,
        BuildingName: data.BuildingName,
        BuildingId: data.BuildingId,
        tenantstatus: "Active",
        AgreementStatus: "Expired",
        tenantFileNo: data.tenantFileNo,
        tenantDoorNo: data.tenantDoorNo,
        tenantRentAmount: data.tenantRentAmount,
        tenantLeaseStartDate: data.tenantLeaseStartDate,
        tenantLeaseEndDate: data.tenantLeaseEndDate,
        tenantAgreementEntredBy: data.tenantEnteredBy,
        tenantAgreementDate: data.tenantDate,
        //new
        tenantPaymentMode: data.tenantPaymentMode,
        tenantChequenoOrDdno: data.tenantChequenoOrDdno,
        tenantBankName: data.tenantBankName,
        tenantchequeDate: data.tenantchequeDate,
        tenantTransId: data.tenantTransId,
        tenantCardType: data.tenantCardType,
      };
      let tenantAgreementDetails = new TenentAgreement(finalData1);
      output1 = await tenantAgreementDetails.save();
      let TenantAgreement = new TenantAgreementHistory(finalDataHistory);
      output2 = await TenantAgreement.save();

      //adding new data end----------------------------------------------------------------------------
    } else {
      let tenantDetails = {
        OrganizationName: data.OrganizationName,
        OrganizationId: data.OrganizationId,
        BuildingName: data.BuildingName,
        AgreementStatus: "Active",
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
        tenantchequeDate: data.tenantchequeDate,
        tenantRentAmount: data.tenantRentAmount,
        tenantLeaseStartDate: data.tenantLeaseStartDate,
        tenantLeaseEndDate: data.tenantLeaseEndDate,
        generatordepoAmt: data.generatordepoAmt,
        tenantEnteredBy: data.tenantEnteredBy,
        tenantDate: data.todayDateymd,
        selectedY: data.selectedY,
        selectedVal: data.selectedVal,
        tenantTransId: data.tenantTransId,
        tenantCardType: data.tenantCardType,
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
        thStatus: "Active",
        thEnteredBy: data.tenantEnteredBy,
        thDate: data.tenantDate,
      };
      let tenantHistories = new TenentHistories(finalData2);
      output2 = await tenantHistories.save();

      tenantdata.shopDoorNo.map((eleDoor) => {
        property
          .updateOne(
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
          )
          .then(data);
      });

      const finalData1 = {
        tdId: tenantdata._id,
        OrganizationName: data.OrganizationName,
        OrganizationId: data.OrganizationId,
        BuildingName: data.BuildingName,
        BuildingId: data.BuildingId,
        tenantstatus: "Active",
        AgreementStatus: "Active",
        tenantFileNo: data.tenantFileNo,
        tenantDoorNo: data.tenantDoorNo,
        tenantRentAmount: data.tenantRentAmount,
        tenantLeaseStartDate: data.tenantLeaseStartDate,
        tenantLeaseEndDate: data.tenantLeaseEndDate,
        tenantAgreementEntredBy: data.tenantEnteredBy,
        tenantAgreementDate: data.tenantDate,
      };

      const finalDataHistory = {
        tdId: tenantdata._id,
        OrganizationName: data.OrganizationName,
        OrganizationId: data.OrganizationId,
        BuildingName: data.BuildingName,
        BuildingId: data.BuildingId,
        tenantstatus: "Active",
        AgreementStatus: "Active",
        tenantFileNo: data.tenantFileNo,
        tenantDoorNo: data.tenantDoorNo,
        tenantRentAmount: data.tenantRentAmount,
        tenantLeaseStartDate: data.tenantLeaseStartDate,
        tenantLeaseEndDate: data.tenantLeaseEndDate,
        tenantAgreementEntredBy: data.tenantEnteredBy,
        tenantAgreementDate: data.tenantDate,
        //new
        tenantPaymentMode: data.tenantPaymentMode,
        tenantChequenoOrDdno: data.tenantChequenoOrDdno,
        tenantBankName: data.tenantBankName,
        tenantchequeDate: data.tenantchequeDate,
        tenantTransId: data.tenantTransId,
        tenantCardType: data.tenantCardType,
      };

      let tenantAgreementDetails = new TenentAgreement(finalData1);
      output1 = await tenantAgreementDetails.save();
      let TenantAgreement = new TenantAgreementHistory(finalDataHistory);
      output2 = await TenantAgreement.save();
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Internal Server Error.");
  }
});

//add organization try
router.post("/add-Organization", async (req, res) => {
  let data = req.body;

  var today = new Date();
  var dd = today.getDate();
  var mm = today.getMonth() + 1;
  var yyyy = today.getFullYear();
  if (dd < 10) dd = "0" + dd;
  if (mm < 10) mm = "0" + mm;
  var todayDateymd = yyyy + "-" + mm + "-" + dd;
  if (data.enddate < todayDateymd) {
    try {
      let orgd = {
        OrganizationName: data.OrganizationName,
        OrganizationEmail: data.OrganizationEmail,
        OrganizationNumber: data.OrganizationNumber,
        OrganizationAddress: data.OrganizationAddress,
        date: data.date,
        hike: "",
        StampDuty: "",
        LeaseTimePeriod: "",
        Logo: data.Logo,
        enddate: data.enddate,
        Location: data.Location,
        AgreementStatus: "Expired",
        org_status: "Active",
        enter_by_dateTime: data.enter_by_dateTime,
      };

      let orgData = new OrganizationDetails(orgd);
      let output = await orgData.save();
      const finalData2 = {
        OrganizationName: output.OrganizationName,
        OrganizationEmail: output.OrganizationEmail,
        OrganizationNumber: output.OrganizationNumber,
        OrganizationAddress: output.OrganizationAddress,
        date: output.date,
        Logo: data.Logo,
        hike: "",
        StampDuty: "",
        LeaseTimePeriod: "",
        enddate: output.enddate,
        Location: output.Location,
        AgreementStatus: "Expired",
        org_status: "Active",
        enter_by_dateTime: output.enter_by_dateTime,
      };

      let output2 = new OrganizationDetailsHistories(finalData2);
      output2.save();
      res.send(output);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Internal Server Error.");
    }
  } else {
    let data = req.body;
    try {
      let orgd = {
        OrganizationName: data.OrganizationName,
        OrganizationEmail: data.OrganizationEmail,
        OrganizationNumber: data.OrganizationNumber,
        OrganizationAddress: data.OrganizationAddress,
        date: data.date,
        Logo: data.Logo,
        hike: "",
        StampDuty: "",
        LeaseTimePeriod: "",
        enddate: data.enddate,
        Location: data.Location,
        AgreementStatus: "Active",
        org_status: "Active",
        enter_by_dateTime: data.enter_by_dateTime,
      };

      let orgData = new OrganizationDetails(orgd);
      let output = await orgData.save();
      const finalData2 = {
        OrganizationName: output.OrganizationName,
        OrganizationEmail: output.OrganizationEmail,
        OrganizationNumber: output.OrganizationNumber,
        OrganizationAddress: output.OrganizationAddress,
        date: output.date,
        Logo: data.Logo,
        hike: "",
        StampDuty: "",
        LeaseTimePeriod: "",
        enddate: output.enddate,
        Location: output.Location,
        AgreementStatus: "Active",
        org_status: "Active",
        enter_by_dateTime: output.enter_by_dateTime,
      };

      let output2 = new OrganizationDetailsHistories(finalData2);
      output2.save();
      res.send(output);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Internal Server Error.");
    }
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
      ).then((data) => res.json(data));
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
        Logo: 1,
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
  var today = new Date();
  var dd = today.getDate();
  var mm = today.getMonth() + 1;
  var yyyy = today.getFullYear();
  if (dd < 10) dd = "0" + dd;
  if (mm < 10) mm = "0" + mm;

  var todayDateymd = yyyy + "-" + mm + "-" + dd;
  if (data.enddate < todayDateymd) {
    UserDetails.updateMany(
      {
        OrganizationId: data.OrganizationId,
      },
      {
        $set: {
          OrganizationName: data.OrganizationName,
        },
      }
    ).then(data);

    await OrganizationDetails.updateOne(
      { _id: data.OrganizationId },
      {
        $set: {
          OrganizationName: data.OrganizationName,
          OrganizationEmail: data.OrganizationEmail,
          OrganizationNumber: data.OrganizationNumber,
          OrganizationAddress: data.OrganizationAddress,
          AgreementStatus: "Expired",
          enddate: data.enddate,
          Logo: data.Logo,
          date: data.startdate,
          Location: data.Location,
        },
      }
    );
  } else {
    UserDetails.updateMany(
      {
        OrganizationId: data.OrganizationId,
      },
      {
        $set: {
          OrganizationName: data.OrganizationName,
        },
      }
    ).then(data);

    const updateorg = await OrganizationDetails.updateOne(
      { _id: data.OrganizationId },
      {
        $set: {
          OrganizationName: data.OrganizationName,
          OrganizationEmail: data.OrganizationEmail,
          OrganizationNumber: data.OrganizationNumber,
          OrganizationAddress: data.OrganizationAddress,
          AgreementStatus: "Active",
          enddate: data.enddate,
          Logo: data.Logo,
          date: data.startdate,
          Location: data.Location,
        },
      }
    );
  }
  // try {
  //   const updateorg = await OrganizationDetails.updateOne(
  //     { _id: data.OrganizationId },
  //     {
  //       $set: {
  //         OrganizationName: data.OrganizationName,
  //         OrganizationEmail: data.OrganizationEmail,
  //         OrganizationNumber: data.OrganizationNumber,
  //         OrganizationAddress: data.OrganizationAddress,
  //         enddate: data.enddate,
  //         date: data.startdate,
  //         Location: data.Location,
  //       },
  //     }
  //   ).then((data) => console.log(data));
  //   res.json(updateorg);
  // } catch (error) {
  //   res.status(500).json({ errors: [{ msg: "Server Error" }] });
  // }
});
router.post("/update-Property", async (req, res) => {
  let data = req.body;

  try {
    const updateorg = await property.updateOne(
      { _id: data.Property_id, OrganizationId: data.Orgainzation_id },
      {
        $set: {
          BuildingName: data.BuildingName,
          shopDoorNo: data.shopDoorNo,
          shopAddress: data.shopAddress,
          hike: data.hike,
          Location: data.Location.label,
          stampDuty: data.stampDuty,
          leaseTimePeriod: data.leaseTimePeriod,
          OrganizationName: data.OrganizationName,
          shopStatus: "Active",
        },
      }
    );

    TenantDetails.updateMany(
      { BuildingId: data.Property_id },
      {
        $set: {
          BuildingName: data.BuildingName,
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
// router.post("/get-particular-org-user", auth, async (req, res) => {
//   const userInfo = await UserDetails.findById(req.user.id).select("-password");
//   try {
//     const ParticularOrg = await UserDetails.find({
//       OrganizationId: userInfo.OrganizationId,
//     }); /*.sort({ userStatus: 1 })*/
//     res.json(ParticularOrg);
//   } catch (error) {
//     console.log(error.message);
//   }
// });

router.post("/get-particular-org-user", auth, async (req, res) => {
  const userInfo = await UserDetails.findById(req.user.id).select("-password");
  const id = mongoose.Types.ObjectId(req.body.OrganizationId);
  try {
    await UserDetails.aggregate([
      {
        $match: {
          OrganizationId: id,
        },
      },
      {
        $lookup: {
          from: "organizationdetails",
          localField: "OrganizationName",
          foreignField: "OrganizationName",
          as: "output",
        },
      },
      { $unwind: "$output" },
    ]).then((data) => res.json(data));
    //res.json(ParticularOrg);
  } catch (error) {
    console.log(error.message);
  }
});

// $match: {
//   name: req.body.name,
//   pass:req.body.pass,
// },
// },
// $lookup: {
// from: "organizationdetails",
// localField: "OrganizationName",
// foreignField: "OrganizationName",
// as: "output"
// }
// }

//   },
// ])

//   $lookup: {
//     from: "OrganizationDetails",
//     localField: "OrganizationName",
//     foreignField: "OrganizationName",
//     as: "output",
//   },
// },
// { $unwind: "$output" },
// {
//   $project: {
//     //OrganizationId: "$_id",
//     OrganizationName: "$OrganizationName",
//     OrganizationEmail: "$OrganizationEmail",
//     OrganizationAddress: "$OrganizationAddress",
//     OrganizationNumber: "$OrganizationNumber",
//     Location: "$Location",
//   },
// },
// {
//   $match: {
//     //   OrganizationName: "$OrganizationName",
//   },

//edit the super user
router.post("/Update-User", async (req, res) => {
  let data = req.body;
  try {
    const r = await UserDetails.updateOne(
      { _id: data.userid },
      {
        $set: {
          username: data.username,
          userphone: data.userphone,
          useremail: data.useremail,
          usergroup: data.usergroup.value,
          useraddress: data.useraddress,
          OrganizationName: data.OrganizationName,
          OrganizationId: data.OrganizationId,
        },
      }
    );
    res.json(r);
  } catch (err) {
    console.error(err.message);
  }
});

//

// router.post("/add-tenant-settings", async (req, res) => {
//   let data = req.body;
//   try {
//     let tenantSettings = new TenantSettings(data);
//     output = await tenantSettings.save();
//     res.send(output);
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send("Internal Server Error.");
//   }
// });

//
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
  let query = { OrganizationId: mongoose.Types.ObjectId(OrganizationId) };

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

router.post("/get-Property-tenant-details", async (req, res) => {
  let { PropertyId, OrganizationId } = req.body;
  //const id = mongoose.Types.ObjectId(req.body.OrganizationId);

  property
    .aggregate([
      {
        $match: {
          OrganizationId: mongoose.Types.ObjectId(OrganizationId),
          shopStatus: "Active",
          // _id: mongoose.Types.ObjectId(ele),
        },
      },
      {
        $lookup: {
          from: "tenantdetails",
          localField: "_id",
          foreignField: "BuildingId",
          as: "output",
        },
      },
      {
        $unwind: "$output",
      },
      {
        $group: {
          _id: "$output.BuildingId",
          BuildingName: {
            $first: "$output.BuildingName",
          },
          shopAddress: { $first: "$shopAddress" },
          // shopAddress: "$shopAddress",
          Location: {
            $first: "$output.Location",
          },
          tenantRentAmount: {
            $sum: "$output.tenantRentAmount",
          },
          tenantDepositAmt: {
            $sum: "$output.tenantDepositAmt",
          },
          shopDoorNo: {
            $first: "$shopDoorNo",
          },
        },
      },
      // {
      //   $group: {
      //     _id: "$output.BuildingId",
      //     BuildingName: { $first: "$output.BuildingName" },
      //     //shopAddress: "$shopAddress",
      //     UnOccupied: { $first: "$shopDoorNo" },
      //     Location: { $first: "$output.Location" },
      //     shopDoorNo: { $push: "$output.shopDoorNo" },
      //     tenantRentAmount: { $first: "$output.tenantRentAmount" },
      //     tenantDepositAmt: { $first: "$output.tenantDepositAmt" },
      //   },
      // },
    ])
    .then((data) => res.json(data));
});

//deactive property
router.post("/deactive-property", async (req, res) => {
  let data = req.body;
  try {
    if (data.Dno.length === 0) {
      await property
        .updateOne(
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
        )
        .then();
    } else {
      data.Dno.map(async (eleDoor) => {
        await property
          .updateOne(
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
          )
          .then();
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

router.post("/get-tenant-sort", auth, async (req, res) => {
  const userInfo = await UserDetails.findById(req.user.id).select("-password");
  let { OrganizationId, LocationName, DoorNumber, propertyname, tenantName } =
    req.body;

  let query = { OrganizationId: userInfo.OrganizationId };
  if (LocationName) {
    query = {
      ...query,
      Location: LocationName,
    };
  } else if (DoorNumber) {
    query = {
      ...query,
      shopDoorNo: { $elemMatch: { label: DoorNumber } },
    };
  } else if (propertyname) {
    query = {
      ...query,
      BuildingName: propertyname,
    };
  } else if (tenantName) {
    query = {
      ...query,
      _id: mongoose.Types.ObjectId(tenantName),
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

router.post("/get-tenant-sort-contact-report", auth, async (req, res) => {
  const userInfo = await UserDetails.findById(req.user.id).select("-password");
  let { OrganizationId, LocationName, DoorNumber, propertyname, tenantName } =
    req.body;

  let query = { OrganizationId: userInfo.OrganizationId };
  if (LocationName) {
    query = {
      ...query,
      Location: LocationName,
    };
  } else if (DoorNumber) {
    query = {
      ...query,
      shopDoorNo: { $elemMatch: { label: DoorNumber } },
    };
  } else if (propertyname) {
    query = {
      ...query,
      BuildingName: propertyname,
    };
  } else if (tenantName) {
    query = {
      ...query,
      _id: mongoose.Types.ObjectId(tenantName),
    };
  }

  try {
    const tenantdata = await TenantDetails.aggregate([
      {
        $lookup: {
          from: "tenantagreementsettings",
          localField: "_id",
          foreignField: "tdId",
          as: "output",
        },
      },
      { $match: query },
      { $unwind: "$output" },
      { $sort: { tenantstatus: 1 } },
    ]);
    res.json(tenantdata);
  } catch (err) {
    console.error(err.message);

    res.status(500).send("Internal Server Error.");
  }
});

//for lease transfer dropdown
router.post("/get-tenantLeaseTransfer-sort", auth, async (req, res) => {
  const userInfo = await UserDetails.findById(req.user.id).select("-password");
  let { OrganizationId, LocationName, DoorNumber, propertyname, tenantName } =
    req.body;

  let query = {
    OrganizationId: userInfo.OrganizationId,
    tenantstatus: "Active",
  };
  if (LocationName) {
    query = {
      ...query,
      Location: LocationName,
    };
  } else if (DoorNumber) {
    query = {
      ...query,
      shopDoorNo: { $elemMatch: { label: DoorNumber } },
    };
  } else if (propertyname) {
    query = {
      ...query,
      BuildingName: propertyname,
    };
  } else if (tenantName) {
    query = {
      ...query,
      _id: mongoose.Types.ObjectId(tenantName),
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
    ).then(data);
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
    //  console.log( "len",data.Dno.length );
    if (data.Dno.length > 0) {
      //console.log("rvced data",data)
      data.Dno.map((ele) => {
        TenantDetails.updateOne(
          {
            _id: data.tid,
            // shopDoorNo: { $elemMatch: { label: ele.label } },
            // "shopDoorNo.$.label":ele.lable,
          },
          {
            $pull: {
              shopDoorNo: { label: ele.label },
              //"shopDoorNo.$.status": "Deleted",
              // "shopDoorNo.$.status": ele.lable,
            },
          }
          // {
          //   $set: {
          //     "shopDoorNo.$.status": "Deleted",
          //     deactive_reason: data.deactive_reason,
          //   },
          // }
        ).then((data) => {});
      });
      data.Dno.map((ele) => {
        property
          .updateOne(
            {
              _id: data.BiuldingID,
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
          .then(data);
      });
    } //if(console.log(data.Dno.length === 0))
    else {
      // console.log("door No");

      // data.Dno.map((ele) => {
      TenantDetails.updateOne(
        {
          _id: data.tid,
          //shopDoorNo: { $elemMatch: { label: ele.label } },
        },
        {
          $set: {
            tenantstatus: "Deactive",
            deactive_reason: data.deactive_reason,
          },
        }
      ).then(data);
      //});
    }
  } catch (error) {
    res.status(500).json({ errors: [{ msg: "Server Error" }] });
  }
});

// router.post("/update-tenant", async (req, res) => {
//   try {
//     let data = req.body;

//     const updateagreementdetails = await TenantSettings.updateOne(
//       { OrganizationId: data.OrganizationId },
//       {
//         $set: {
//           hikePercentage: data.hikePercentage,
//           stampDuty: data.stampDuty,
//           leaseTimePeriod: data.leaseTimePeriod,
//         },
//       }
//     );

//     res.json(updateagreementdetails);
//   } catch (error) {
//     res.status(500).json({ errors: [{ msg: "Server Error" }] });
//   }
// });

//get exp month count for Organization
router.post("/get-month-exp-org-count", async (req, res) => {
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
          // AgreementStatus: { $eq: "Expired" },
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

router.get("/get-door-no", async (req, res) => {
  try {
    let doorno = await property.find({ shopDoorNo: { $ne: "" } });
  } catch (error) {
    console.log(error.message);
  }
});

router.post("/get-month-exp-org", async (req, res) => {
  let data = req.body;
  const selectedY = data.yearSearch;

  var yearVal = new Date().getFullYear();
  if (selectedY) {
    yearVal = selectedY;
  }
  try {
    // const orgexp = await OrganizationDetails.aggregate([
    //   {
    //     $match: {
    //       enddate: { $regex: new RegExp("^" + yearVal, "i") },
    //       AgreementStatus: { $eq: "Expired" },
    //       org_status: "Active",
    //     },
    //   },
    //   // {
    //   //   $group: {
    //   //     _id: {
    //   //       year: {
    //   //         $year: { $dateFromString: { dateString: "$enddate" } },
    //   //       },
    //   //       month: {
    //   //         $month: {
    //   //           $dateFromString: { dateString: "$enddate" },
    //   //         },
    //   //       },
    //   //     },
    //   //   },
    //   // },
    // ]).then((data) => res.json(data));
    await OrganizationDetails.find({
      $and: [
        { enddate: { $regex: new RegExp("^" + yearVal, "i") } },
        { org_status: "Active" },
        {
          $or: [
            { AgreementStatus: { $eq: "Expired" } },
            { AgreementStatus: { $eq: "Renewed" } },
            { AgreementStatus: { $eq: "Active" } },
          ],
        },
      ],
    }).then((data) => res.json(data));

    //res.json(orgexp);
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
          OrganizationId: mongoose.Types.ObjectId(OrganizationId),
          tenantLeaseEndDate: { $regex: new RegExp("^" + yearVal, "i") },
          // AgreementStatus: { $ne: "Renewed" },
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
      // {
      //   $group: {
      //     _id: null,
      //     count: { $sum: 1 },
      //   },
      // },
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
          OrganizationId: mongoose.Types.ObjectId(OrganizationId),
          tenantLeaseEndDate: { $lt: firstDay },
          // AgreementStatus: { $eq: "Renewed" },
          output: { $elemMatch: { tenantstatus: { $eq: "Active" } } },
        },
      },

      // {
      //   $group: {
      //     _id: null,
      //     count: { $sum: 1 },
      //   },
      // },
    ]);
    res.json(MonthExpCntData);
  } catch (err) {
    res.status(500).send("Internal Server Error.");
  }
});

router.post("/get-tenant-exp-report", auth, async (req, res) => {
  const userInfo = await UserDetails.findById(req.user.id).select("-password");

  const id = mongoose.Types.ObjectId(req.body.OrganizationId);
  const { monthSearch, yearSearch, OrganizationId } = req.body;
  //console.log("this is it", req.body);
  var monthVal = monthSearch;
  if (monthSearch < 10 && monthSearch.toString().length === 1) {
    var monthVal = "0" + monthSearch;
  }
  var yearMonth = yearSearch + "-" + monthVal;
  let orgId = OrganizationId ? OrganizationId : userInfo.OrganizationId;
  try {
    const tenantSettingsData = await OrganizationDetails.findOne({
      _id: mongoose.Types.ObjectId(orgId),
    });

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
          BuildingName: "$BuildingName",
          tenantLeaseEndDate: "$output.tenantLeaseEndDate",
          tenantRentAmount: "$output.tenantRentAmount",
          AgreementStatus: "$output.AgreementStatus",
          tenantstatus: "$tenantstatus",
          tdId: "$output.tdId",
          agreementId: "$output._id",
          tenantDoorNo: "$shopDoorNo",
          tenantFileNo: "$output.tenantFileNo",
          tenantPaymentMode: "$tenantPaymentMode",
          tenantTransId: "$tenantTransId",
          tenantCardType: "$tenantCardType",
          tenantBankName: "$tenantBankName",
          tenantChequenoOrDdno: "$tenantChequenoOrDdno",
          tenantchequeDate: "$tenantchequeDate",
          tenantAddr: "$tenantAddr",
          tenantPhone: "$tenantPhone",
          tenantFirmName: "$tenantFirmName",
          Location: "$Location",
          chargesCal: {
            $add: [
              {
                $divide: [
                  {
                    $multiply: [
                      "$output.tenantRentAmount",
                      tenantSettingsData.hike,
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
                                  tenantSettingsData.hike,
                                ],
                              },
                              100,
                            ],
                          },
                          "$output.tenantRentAmount",
                        ],
                      },
                      tenantSettingsData.stampDuty,
                    ],
                  },
                  tenantSettingsData.leaseTimePeriod,
                ],
              },
              100,
            ],
          },
        },
      },
      {
        $match: {
          OrganizationId: mongoose.Types.ObjectId(OrganizationId),
          tenantLeaseEndDate: { $regex: new RegExp("^" + yearMonth, "i") },
          // AgreementStatus: { $eq: "Renewed" },
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

// router.get("/get-all-settings", async (req, res) => {
//   try {
//     const tenanatSettingData = await TenantSettings.find({});
//     res.json(tenanatSettingData);
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send("Internal Server Error.");
//   }
// });

// router.post("/get-Particular-org-Tenantsetting", async (req, res) => {
//   const data = req.body;

//   try {
//     const Tenant_SETTING = await TenantSettings.find({
//       OrganizationId: data.OrganizationId,
//     });
//     res.json(Tenant_SETTING);
//   } catch (error) {
//     console.log(error.message);
//   }
// });

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
    OrganizationDetails.find({
      enddate: { $regex: new RegExp("^" + yearMonth, "i") },
      AgreementStatus: { $eq: "Expired" },
      org_status: "Active",
    }).catch((error) => res.status(500).send("Internal Server Error."));
  } catch (error) {
    console.log(error.message);
  }
});

router.post("/get-tenant-old-exp-report", async (req, res) => {
  const { yearSearch, OrganizationId } = req.body;
  var lastDate = new Date(yearSearch, 0, 1).toISOString().split("T")[0];
  try {
    const tenantSettingsData = await OrganizationDetails.find({
      _id: OrganizationId,
    });
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
          Location: "$Location",
          tenantDoorNo: "$shopDoorNo",
          BuildingName: "$BuildingName",
          BuildingId: "$BuildingId",
          tenantPaymentMode: "$tenantPaymentMode",
          tenantBankName: "$tenantBankName",
          tenantChequenoOrDdno: "$tenantChequenoOrDdno",
          tenantchequeDate: "$tenantchequeDate",
          tenantPhone: "$tenantPhone",
          tenantFirmName: "$tenantFirmName",
          tenantAddr: "$tenantAddr",
          tenantRentAmount: "$tenantRentAmount",
          tenantTransId: "$tenantTransId",
          tenantCardType: "$tenantCardType",
          chargesCal: {
            $add: [
              {
                $divide: [
                  {
                    $multiply: [
                      "$output.tenantRentAmount",
                      tenantSettingsData[0].hike,
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
                              tenantSettingsData[0].hike,
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
          OrganizationId: mongoose.Types.ObjectId(OrganizationId),
          tenantLeaseEndDate: { $lte: lastDate },
          // AgreementStatus: { $ne: "Renewed" },
          tenantstatus: { $eq: "Active" },
        },
      },
    ]);
    // console.log("get-tenant-old-exp-report", tenantExpReport);
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
  //console.log("hey hitting api of get-all-tenants");
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
  var today = new Date();
  var dd = today.getDate();
  var mm = today.getMonth() + 1;
  var yyyy = today.getFullYear();
  if (dd < 10) dd = "0" + dd;
  if (mm < 10) mm = "0" + mm;
  var todayDateymd = yyyy + "-" + mm + "-" + dd;
  let data = req.body;
  // console.log("heheh", data.enddate, todayDateymd);
  if (data.enddate < todayDateymd) {
    await OrganizationDetails.updateOne(
      { _id: data.OrganizationId },
      {
        $set: {
          OrganizationName: data.Orgname,
          OrganizationEmail: data.Orgemail,
          OrganizationNumber: data.Orgphone,
          OrganizationAddress: data.OrganizationAddress,
          date: data.date,
          enddate: data.enddate,
          AgreementStatus: "Expired",
          org_status: "Active",
        },
      }
    );
  } else {
    await OrganizationDetails.updateOne(
      { _id: data.OrganizationId },
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
  }
});

router.post("/renew-tenant-details", async (req, res) => {
  var today = new Date();
  var dd = today.getDate();
  var mm = today.getMonth() + 1;
  var yyyy = today.getFullYear();
  if (dd < 10) dd = "0" + dd;
  if (mm < 10) mm = "0" + mm;
  var todayDateymd = yyyy + "-" + mm + "-" + dd;
  let data = req.body;

  if (data.tenantLeaseEndDate < todayDateymd) {
    try {
      const TenantAgreementHistorydata = {
        tenantRentAmount: data.tenantRentAmount,
        tenantLeaseStartDate: data.tenantLeaseStartDate,
        tenantLeaseEndDate: data.tenantLeaseEndDate,
        tdId: data.tdId,
        AgreementStatus: "Expired",
        OrganizationId: data.OrganizationId,
        BuildingName: data.BuildingName,
        BuildingId: data.BuildingId,
        agreementId: data.agreementId,
        tenantEnteredBy: data.tenantEnteredBy,
        tenantDate: data.tenantDate,
        //new
        tenantPaymentMode: data.tenantPaymentMode,
        tenantChequenoOrDdno: data.tenantChequenoOrDdno,
        tenantBankName: data.tenantBankName,
        tenantchequeDate: data.tenantchequeDate,
        tenantTransId: data.tenantTransId,
        tenantCardType: data.tenantCardType,
        stampDuty: data.stampDuty,
        oldRentAmount: data.oldRentAmount,
      };
      let aggdata = await new TenantAgreementHistory(
        TenantAgreementHistorydata
      );
      aggdata.save();
      await TenantDetails.updateOne(
        { _id: data.tdId },
        {
          $set: {
            AgreementStatus: "Expired",
            tenantLeaseStartDate: data.tenantLeaseStartDate,
            tenantLeaseEndDate: data.tenantLeaseEndDate,
            tenantRentAmount: data.tenantRentAmount,
            //new
            tenantPaymentMode: data.tenantPaymentMode,
            tenantChequenoOrDdno: data.tenantChequenoOrDdno,
            tenantBankName: data.tenantBankName,
            tenantchequeDate: data.tenantchequeDate,
            tenantTransId: data.tenantTransId,
            tenantCardType: data.tenantCardType,
          },
        }
      );
      const updateStatus = await TenentAgreement.updateOne(
        { _id: data.agreementId },
        {
          $set: {
            AgreementStatus: "Expired",
            tenantLeaseStartDate: data.tenantLeaseStartDate,
            tenantLeaseEndDate: data.tenantLeaseEndDate,
            tenantRentAmount: data.tenantRentAmount,
            tenantRenewedDate: data.tenantDate,
          },
        }
      );
      res.json(updateStatus);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Internal Server Error.");
    }
  } else {
    try {
      const TenantAgreementHistorydata = {
        tenantRentAmount: data.tenantRentAmount,
        tenantLeaseStartDate: data.tenantLeaseStartDate,
        tenantLeaseEndDate: data.tenantLeaseEndDate,
        tdId: data.tdId,
        AgreementStatus: "Renewed",
        OrganizationId: data.OrganizationId,
        BuildingName: data.BuildingName,
        BuildingId: data.BuildingId,
        agreementId: data.agreementId,
        tenantEnteredBy: data.tenantEnteredBy,
        tenantDate: data.tenantDate,
        //new
        tenantPaymentMode: data.tenantPaymentMode,
        tenantChequenoOrDdno: data.tenantChequenoOrDdno,
        tenantBankName: data.tenantBankName,
        tenantchequeDate: data.tenantchequeDate,
        tenantTransId: data.tenantTransId,
        tenantCardType: data.tenantCardType,
        stampDuty: data.stampDuty,
        oldRentAmount: data.oldRentAmount,
      };
      let aggdata = await new TenantAgreementHistory(
        TenantAgreementHistorydata
      );
      aggdata.save();
      await TenantDetails.updateOne(
        { _id: data.tdId },
        {
          $set: {
            AgreementStatus: "Renewed",
            tenantLeaseStartDate: data.tenantLeaseStartDate,
            tenantLeaseEndDate: data.tenantLeaseEndDate,
            tenantRentAmount: data.tenantRentAmount,
            //new
            tenantPaymentMode: data.tenantPaymentMode,
            tenantChequenoOrDdno: data.tenantChequenoOrDdno,
            tenantBankName: data.tenantBankName,
            tenantchequeDate: data.tenantchequeDate,
            tenantTransId: data.tenantTransId,
            tenantCardType: data.tenantCardType,
          },
        }
      );
      const updateStatus = await TenentAgreement.updateOne(
        { _id: data.agreementId },
        {
          $set: {
            AgreementStatus: "Renewed",
            tenantLeaseStartDate: data.tenantLeaseStartDate,
            tenantLeaseEndDate: data.tenantLeaseEndDate,
            tenantRentAmount: data.tenantRentAmount,
            tenantRenewedDate: data.tenantDate,
          },
        }
      );
      res.json(updateStatus);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Internal Server Error.");
    }
  }
});

router.post("/update-tenant-details", async (req, res) => {
  var today = new Date();
  var dd = today.getDate();
  var mm = today.getMonth() + 1;
  var yyyy = today.getFullYear();
  if (dd < 10) dd = "0" + dd;
  if (mm < 10) mm = "0" + mm;
  var todayDateymd = yyyy + "-" + mm + "-" + dd;
  try {
    let data = req.body;

    // console.log(data.tenantLeaseEndDate);
    //  console.log("", todayDateymd);
    if (data.tenantLeaseEndDate < todayDateymd) {
      //console.log(":hit update");
      const updatetenantdetails = await TenantDetails.updateOne(
        { _id: data.recordId },
        {
          $set: {
            OrganizationId: data.OrganizationId,
            OrganizationName: data.OrganizationName,
            tenantName: data.tenantName,
            AgreementStatus: "Expired",
            tenantFileNo: data.tenantFileNo,
            tenantPhone: data.tenantPhone,
            shopDoorNo: data.tenantDoorNo,
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
            BuildingName: data.BuildingName.label,
            BuildingId: data.BuildingName.buildingId,
            tenantTransId: data.tenantTransId,
            tenantCardType: data.tenantCardType,
          },
        }
      );

      data.tenantDoorNo.map((eleDoor) => {
        property
          .updateOne(
            {
              OrganizationId: data.OrganizationId,
              _id: data.BuildingId,
              shopDoorNo: { $elemMatch: { doorNo: eleDoor.label } },
            },
            {
              $set: {
                "shopDoorNo.$.status": "Acquired",
              },
            }
          )
          .then();
      });

      data.unseletedDoorno.map((eleDoor) => {
        property
          .updateOne(
            {
              OrganizationId: data.OrganizationId,
              _id: data.BuildingId,
              shopDoorNo: { $elemMatch: { doorNo: eleDoor.doorNo } },
            },
            {
              $set: {
                "shopDoorNo.$.status": "Avaiable",
              },
            }
          )
          .then();
      });
      res.json(updatetenantdetails);

      await TenentAgreement.updateOne(
        { tdId: data.recordId },
        {
          $set: {
            AgreementStatus: "Expired",
            tenantRentAmount: data.tenantRentAmount,
            tenantLeaseStartDate: data.tenantLeaseStartDate,
            tenantLeaseEndDate: data.tenantLeaseEndDate,
          },
        }
      );
    } else {
      const updatetenantdetails = await TenantDetails.updateOne(
        { _id: data.recordId },
        {
          $set: {
            OrganizationId: data.OrganizationId,
            OrganizationName: data.OrganizationName,
            tenantName: data.tenantName,
            AgreementStatus: "Active",
            tenantFileNo: data.tenantFileNo,
            tenantPhone: data.tenantPhone,
            shopDoorNo: data.tenantDoorNo,
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
            BuildingName: data.BuildingName.label,
            BuildingId: data.BuildingName.buildingId,
            tenantTransId: data.tenantTransId,
            tenantCardType: data.tenantCardType,
          },
        }
      );

      data.tenantDoorNo.map((eleDoor) => {
        property
          .updateOne(
            {
              OrganizationId: data.OrganizationId,
              _id: data.BuildingId,
              shopDoorNo: { $elemMatch: { doorNo: eleDoor.label } },
            },
            {
              $set: {
                "shopDoorNo.$.status": "Acquired",
              },
            }
          )
          .then(data);
      });

      data.unseletedDoorno.map((eleDoor) => {
        property
          .updateOne(
            {
              OrganizationId: data.OrganizationId,
              _id: data.BuildingId,
              shopDoorNo: { $elemMatch: { doorNo: eleDoor.doorNo } },
            },
            {
              $set: {
                "shopDoorNo.$.status": "Avaiable",
              },
            }
          )
          .then(data);
      });
      res.json(updatetenantdetails);

      await TenentAgreement.updateOne(
        { tdId: data.recordId },
        {
          $set: {
            AgreementStatus: "Active",
            tenantRentAmount: data.tenantRentAmount,
            tenantLeaseStartDate: data.tenantLeaseStartDate,
            tenantLeaseEndDate: data.tenantLeaseEndDate,
          },
        }
      );
    }

    // res.json(AgreementUpdate);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ errors: [{ msg: "Server Error of tdetaiz" }] });
  }
});

router.post("/activate-tenant-details", async (req, res) => {
  var today = new Date();
  var dd = today.getDate();
  var mm = today.getMonth() + 1;
  var yyyy = today.getFullYear();
  if (dd < 10) dd = "0" + dd;
  if (mm < 10) mm = "0" + mm;
  var todayDateymd = yyyy + "-" + mm + "-" + dd;
  try {
    let data = req.body;

    if (data.tenantLeaseEndDate < todayDateymd) {
      const updatetenantdetails = await TenantDetails.updateOne(
        { _id: data.recordId },
        {
          $set: {
            OrganizationId: data.OrganizationId,
            OrganizationName: data.OrganizationName,
            tenantName: data.tenantName,
            AgreementStatus: "Expired",
            tenantFileNo: data.tenantFileNo,
            tenantPhone: data.tenantPhone,
            shopDoorNo: data.tenantDoorNo,
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
            BuildingName: data.BuildingName,
            BuildingId: data.BuildingId,
            tenantTransId: data.tenantTransId,
            tenantCardType: data.tenantCardType,
            tenantstatus: "Active",
            Location: data.Location,
          },
        }
      );

      data.tenantDoorNo.map((eleDoor) => {
        property
          .updateOne(
            {
              OrganizationId: data.OrganizationId,
              _id: data.BuildingId,
              shopDoorNo: { $elemMatch: { doorNo: eleDoor.label } },
            },
            {
              $set: {
                "shopDoorNo.$.status": "Acquired",
              },
            }
          )
          .then();
      });

      data.unseletedDoorno.map((eleDoor) => {
        property
          .updateOne(
            {
              OrganizationId: data.OrganizationId,
              _id: data.BuildingId,
              shopDoorNo: { $elemMatch: { doorNo: eleDoor.doorNo } },
            },
            {
              $set: {
                "shopDoorNo.$.status": "Avaiable",
              },
            }
          )
          .then();
      });
      res.json(updatetenantdetails);

      await TenentAgreement.updateOne(
        { tdId: data.recordId },
        {
          $set: {
            AgreementStatus: "Expired",
            tenantRentAmount: data.tenantRentAmount,
            tenantLeaseStartDate: data.tenantLeaseStartDate,
            tenantLeaseEndDate: data.tenantLeaseEndDate,
            tenantstatus: "Active",
          },
        }
      );
    } else {
      const updatetenantdetails = await TenantDetails.updateOne(
        { _id: data.recordId },
        {
          $set: {
            OrganizationId: data.OrganizationId,
            OrganizationName: data.OrganizationName,
            tenantName: data.tenantName,
            AgreementStatus: "Active",
            tenantFileNo: data.tenantFileNo,
            tenantPhone: data.tenantPhone,
            shopDoorNo: data.tenantDoorNo,
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
            BuildingName: data.BuildingName,
            BuildingId: data.BuildingId,
            Location: data.Location,
            tenantTransId: data.tenantTransId,
            tenantCardType: data.tenantCardType,
            tenantstatus: "Active",
          },
        }
      );

      data.tenantDoorNo.map((eleDoor) => {
        property
          .updateOne(
            {
              OrganizationId: data.OrganizationId,
              _id: data.BuildingId,
              shopDoorNo: { $elemMatch: { doorNo: eleDoor.label } },
            },
            {
              $set: {
                "shopDoorNo.$.status": "Acquired",
              },
            }
          )
          .then(data);
      });

      data.unseletedDoorno.map((eleDoor) => {
        property
          .updateOne(
            {
              OrganizationId: data.OrganizationId,
              _id: data.BuildingId,
              shopDoorNo: { $elemMatch: { doorNo: eleDoor.doorNo } },
            },
            {
              $set: {
                "shopDoorNo.$.status": "Avaiable",
              },
            }
          )
          .then(data);
      });
      res.json(updatetenantdetails);

      await TenentAgreement.updateOne(
        { tdId: data.recordId },
        {
          $set: {
            AgreementStatus: "Active",
            tenantRentAmount: data.tenantRentAmount,
            tenantLeaseStartDate: data.tenantLeaseStartDate,
            tenantLeaseEndDate: data.tenantLeaseEndDate,
            tenantstatus: "Active",
          },
        }
      );
    }
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

//get tenant receipt number

router.post("/get-tenant-receiptnumber", async (req, res) => {
  let data = req.body;
  try {
    const tenanatReceiptNoData = await TenentAgreement.findOne({
      OrganizationId: data.OrganizationId,
      tenantReceiptNo: { $ne: "" },
    })
      // .sort({ tenantReceiptNo: -1 }).limit(1).collation({ locale: "en_US", numericOrdering: true });
      .sort({ tenantReceiptNo: -1 })
      .limit(1);
    // to store alphanumberic

    res.json(tenanatReceiptNoData.tenantReceiptNo);
  } catch (error) {
    console.error("Error occurred:", error);
  }
});

// tenant receipt details
router.post("/update-tenant-Receiptdetails", async (req, res) => {
  try {
    let data = req.body;
    const updateTenantReceipt = await TenentAgreement.updateOne(
      {
        OrganizationId: mongoose.Types.ObjectId(data.OrganizationId),
        tdId: mongoose.Types.ObjectId(data.tenantId),
      },
      {
        $set: {
          tenantsubTotal: data.tenantsubTotal,
          tenantDiscount: data.tenantDiscount,
          tenantOtherCharges: data.tenantOtherCharges,
          tenantGst: data.tenantGst,
          tenantGrandTotal: data.tenantGrandTotal,
          tenantReceiptNotes: data.tenantReceiptNotes,
          tenantReceiptDateTime: data.tenantReceiptDateTime,
          tenantPaymentMode: data.tenantPaymentMode,
          tenantReceiptEnteredBy: data.tenantReceiptEnteredBy,
          tenantReceiptNo: data.tenantReceiptNo,
        },
      }
    );

    res.json(updateTenantReceipt);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ errors: [{ msg: "Server Error of tdetaiz" }] });
  }
});

//tenant lease transfer

router.post("/edit-tenant-leasetransfer-details", async (req, res) => {
  try {
    let data = req.body;

    if (data.Dno.length > 1) {
      const isSameData = data.Dno.every((door) =>
        data.transferShoopDoorNo.some(
          (transferDoor) => transferDoor.label === door.label
        )
      );

      // Pull from 'fromId'
      data.transferShoopDoorNo.map((ele) => {
        // Pull from TenantDetails
        TenantDetails.updateOne(
          { _id: data.fromId },
          { $pull: { shopDoorNo: { label: ele.label } } }
        ).then((data) => {});

        // Pull from TenentAgreement
        TenentAgreement.updateOne(
          { tdId: data.fromId },
          { $pull: { tenantDoorNo: { label: ele.label } } }
        ).then((data) => {});
      });

      // Push to 'toId'
      data.transferShoopDoorNo.map((ele) => {
        // Push to TenantDetails
        TenantDetails.updateOne(
          { _id: data.toId },
          { $push: { shopDoorNo: ele } }
        ).then((data) => {});

        // Push to TenentAgreement
        TenentAgreement.updateOne(
          { tdId: data.toId },
          { $push: { tenantDoorNo: ele } }
        ).then((data) => {
          console.log(data);
        });
      });
      if (isSameData) {
        TenantDetails.updateOne(
          { _id: data.fromId },
          {
            $set: {
              tenantstatus: "Deactive",
              deactive_reason: "Lease transfer to " + data.toTenantName,
            },
          }
        ).then((data1) => {
          TenentAgreement.updateOne(
            { tdId: data.fromId },
            {
              $set: {
                tenantstatus: "Deactive",
                //deactive_reason: "Lease transfer from " + data.fromTenantName,
              },
            }
          ).then((data2) => {});
        });
      }
      // if (isSameData) {
      //  .then((data) => {});
      // }
    } else if (data.Dno.length === 1) {
      //pull
      data.transferShoopDoorNo.map((ele) => {
        const fromId = data.fromId;
        TenantDetails.updateOne(
          {
            _id: fromId,
          },
          {
            $pull: {
              shopDoorNo: { label: ele.label },
            },
          }
        ).then((pullResult) => {
          TenantDetails.updateOne(
            {
              _id: fromId,
            },
            {
              $set: {
                tenantstatus: "Deactive",
                deactive_reason: "lease transfer to " + data.toTenantName,
              },
            }
          ).then((setResult) => {});
        });
      });

      data.transferShoopDoorNo.map((ele) => {
        const fromId = data.fromId;
        TenentAgreement.updateOne(
          {
            tdId: fromId,
          },
          {
            $pull: {
              tenantDoorNo: { label: ele.label },
            },
          }
        ).then((pullResult) => {
          TenentAgreement.updateOne(
            {
              tdId: fromId,
            },
            {
              $set: {
                tenantstatus: "Deactive",
                // deactive_reason: "lease transfer from " + data.fromTenantName,
              },
            }
          ).then((setResult) => {});
        });
      });

      //push
      data.transferShoopDoorNo.map((ele) => {
        TenantDetails.updateOne(
          {
            _id: data.toId,
          },

          {
            $push: {
              shopDoorNo: ele,
            },
          }
        ).then((data) => {});
      });
      data.transferShoopDoorNo.map((ele) => {
        TenentAgreement.updateOne(
          {
            tdId: data.toId,
          },
          {
            $push: {
              tenantDoorNo: ele,
            },
          }
        ).then((data) => {});
      });
    }
  } catch (error) {
    res.status(500).json({ errors: [{ msg: "Server Error" }] });
  }
});

//user activity

router.post("/add-user-activity-details", async (req, res) => {
  let data = req.body;
  try {
    let userActivity = new UserActivity(data);
    output = await userActivity.save();
    res.send(output);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Internal Server Error.");
  }
});

router.post("/get-user-activity", async (req, res) => {
  let data = req.body;

  try {
    const userActivityData = await UserActivity.find({
      OrganizationId: data.OrganizationId,
    }).sort({ _id: -1 });
    // .sort({ _id: -1 });

    res.json(userActivityData);
  } catch (err) {
    res.status(500).send("Internal Server Error.");
  }
});

/////////////////////////////////////MIS REPORT////////////////////////////////////////////////

//mis report for count
router.post("/get-mis-report", async (req, res) => {
  let data = req.body;
  let inputDate = new Date(data.selectedY);
  let targetMonth = inputDate.getMonth() + parseInt(data.selectedEndY);
  inputDate.setMonth(targetMonth);

  // Set the day to the last day of the month, considering variations in the number of days in different months
  inputDate.setDate(0);

  let resultDate = inputDate.toISOString().split("T")[0];

  try {
    let renewedCount = await TenentAgreement.aggregate([
      {
        $match: {
          OrganizationId: mongoose.Types.ObjectId(data.OrganizationId),
          tenantstatus: "Active",
        },
      },
      {
        $match: {
          tenantLeaseStartDate: {
            $gte: data.selectedY,
            $lt: resultDate,
          },
          AgreementStatus: "Renewed",
        },
      },
      {
        $count: "totalCountRenewed",
      },
    ]);
    let renewableCount = await TenentAgreement.aggregate([
      {
        $match: {
          OrganizationId: mongoose.Types.ObjectId(data.OrganizationId),
          tenantstatus: "Active",
        },
      },
      {
        $match: {
          tenantLeaseEndDate: {
            $gte: data.selectedY,
            $lt: resultDate,
          },
          AgreementStatus: {
            $in: ["Expired"],
          },
        },
      },
      {
        $count: "totalCountRenewable",
      },
    ]);

    res.json({
      renewableCount:
        renewableCount[0] && renewableCount[0].totalCountRenewable
          ? renewableCount[0].totalCountRenewable
          : 0,
      renewedCount:
        renewedCount[0] && renewedCount[0].totalCountRenewed
          ? renewedCount[0].totalCountRenewed
          : 0,
    });
  } catch (error) {
    console.log(error.message);
  }
});
//mis report for amount
router.post("/get-mis-amount-report", async (req, res) => {
  let data = req.body;

  let inputDate = new Date(data.selectedY);
  let targetMonth = inputDate.getMonth() + parseInt(data.selectedEndY);
  inputDate.setMonth(targetMonth);
  inputDate.setDate(0);
  let resultDate = inputDate.toISOString().split("T")[0];
  let lastDate = resultDate.toString();

  try {
    let renewedAmount = await TenentAgreement.aggregate([
      {
        $match: {
          OrganizationId: mongoose.Types.ObjectId(data.OrganizationId),
          tenantstatus: "Active",
        },
      },
      {
        $match: {
          tenantLeaseStartDate: {
            $gte: data.selectedY,
            $lt: lastDate,
          },
          AgreementStatus: "Renewed",
        },
      },
      {
        $group: {
          _id: null,
          totalRentRenewed: {
            $sum: "$tenantRentAmount",
          },
        },
      },
    ]);
    let renewableAmount = await TenentAgreement.aggregate([
      {
        $match: {
          OrganizationId: mongoose.Types.ObjectId(data.OrganizationId),
          tenantstatus: "Active",
        },
      },
      {
        $match: {
          tenantLeaseEndDate: {
            $gte: data.selectedY,
            $lt: lastDate,
          },
          AgreementStatus: {
            $in: ["Expired"],
          },
        },
      },
      {
        $group: {
          _id: null,
          totalRentRenewable: {
            $sum: "$tenantRentAmount",
          },
        },
      },
    ]);

    res.json({
      renewableAmount:
        renewableAmount[0] && renewableAmount[0].totalRentRenewable
          ? renewableAmount[0].totalRentRenewable
          : 0,
      renewedAmount:
        renewedAmount[0] && renewedAmount[0].totalRentRenewed
          ? renewedAmount[0].totalRentRenewed
          : 0,
    });
  } catch (error) {
    console.log(error.message);
  }
});

//renewed bar chart

router.post("/get-mis-renewed-bar-report", async (req, res) => {
  let data = req.body;
  let inputDate = new Date(data.selectedY);
  let targetMonth = inputDate.getMonth() + parseInt(data.selectedEndY);
  inputDate.setMonth(targetMonth);
  inputDate.setDate(0);
  let resultDate = inputDate.toISOString().split("T")[0];
  let lastDate = resultDate.toString();

  // const specifiedYear = data.selectedY;
  // const startDate = new Date(`${specifiedYear}-01-01`);
  // const EndDate = new Date(`${specifiedYear}-12-31`);
  // const formattedStartDate = startDate.toISOString().split("T")[0];
  // const formattedEndDate = EndDate.toISOString().split("T")[0];

  try {
    let renewedBarCount = await TenentAgreement.aggregate([
      {
        $match:
          /**
           * query: The query in MQL.
           */
          {
            OrganizationId: mongoose.Types.ObjectId(data.OrganizationId),
            tenantstatus: "Active",
          },
      },
      {
        $match: {
          tenantLeaseStartDate: {
            $gte: data.selectedY,
            $lt: lastDate,
          },
          AgreementStatus: "Renewed",
        },
      },
      {
        $group: {
          _id: {
            month: {
              $month: {
                $toDate: "$tenantLeaseStartDate",
              },
            },
            year: {
              $year: {
                $toDate: "$tenantLeaseStartDate",
              },
            },
          },
          total: {
            $sum: 1,
          },
        },
      },
      {
        $project: {
          month: "$_id.month",
          year: "$_id.year",
          _id: 0,
          total: 1,
        },
      },
      {
        $sort: {
          month: 1,
          year: 1,
        },
      },
    ]);
    let renewableBarCount = await TenentAgreement.aggregate([
      {
        $match: {
          OrganizationId: mongoose.Types.ObjectId(data.OrganizationId),
          tenantstatus: "Active",
        },
      },
      {
        $match: {
          tenantLeaseEndDate: {
            $gte: data.selectedY,
            $lt: lastDate,
          },
          AgreementStatus: {
            $in: ["Expired"],
          },
        },
      },
      {
        $group: {
          _id: {
            month: {
              $month: {
                $toDate: "$tenantLeaseEndDate",
              },
            },
            year: {
              $year: {
                $toDate: "$tenantLeaseEndDate",
              },
            },
          },
          total: {
            $sum: 1,
          },
        },
      },
      {
        $project: {
          month: "$_id.month",
          year: "$_id.year",
          _id: 0,
          total: 1,
        },
      },
      {
        $sort: {
          month: 1,
          year: 1,
        },
      },
    ]);

    // res.json({
    //   renewableAmount:
    //     renewableAmount[0] && renewableAmount[0].totalRentRenewable
    //       ? renewableAmount[0].totalRentRenewable
    //       : 0,
    //   renewedAmount:
    //     renewedAmount[0] && renewedAmount[0].totalRentRenewed
    //       ? renewedAmount[0].totalRentRenewed
    //       : 0,
    // });
    res.json({ renewedBarCount, renewableBarCount });
  } catch (error) {
    console.log(error.message);
  }
});

module.exports = router;
