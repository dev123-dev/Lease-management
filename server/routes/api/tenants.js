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

//add new tenant
router.post("/add-tenant-details", auth, async (req, res) => {
  var today = new Date();
  var dd = today.getDate();
  var mm = today.getMonth() + 1;
  var yyyy = today.getFullYear();
  if (dd < 10) dd = "0" + dd;
  if (mm < 10) mm = "0" + mm;
  var todayDateymd = yyyy + "-" + mm + "-" + dd;
  let data = req.body;

  try {
    let tenantDetails = {
      OrganizationName: data.OrganizationName,
      OrganizationId: data.OrganizationId,
      BuildingName: data.BuildingName,
      AgreementStatus:
        data.tenantLeaseEndDate < todayDateymd ? "Expired" : "Active", //flg
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

    tenantdata.shopDoorNo.map(async (eleDoor) => {
      await property.updateOne(
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
      //.then(data);
    });

    const finalTenantAgr = {
      tdId: tenantdata._id,
      OrganizationName: data.OrganizationName,
      OrganizationId: data.OrganizationId,
      BuildingName: data.BuildingName,
      BuildingId: data.BuildingId,
      tenantstatus: "Active",
      AgreementStatus:
        data.tenantLeaseEndDate < todayDateymd ? "Expired" : "Active", //flg
      tenantFileNo: data.tenantFileNo,
      tenantDoorNo: data.tenantDoorNo,
      tenantRentAmount: data.tenantRentAmount,
      tenantLeaseStartDate: data.tenantLeaseStartDate,
      tenantLeaseEndDate: data.tenantLeaseEndDate,
      tenantAgreementEntredBy: data.tenantEnteredBy,
      tenantAgreementDate: data.tenantDate,
    };

    let tenantAgreementDetails = new TenentAgreement(finalTenantAgr);
    await tenantAgreementDetails.save();

    res.status(200).send("Added");
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Internal Server Error.");
  }
});

//renew tenant
router.post("/renew-tenant-details", auth, async (req, res) => {
  try {
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1;
    var yyyy = today.getFullYear();
    if (dd < 10) dd = "0" + dd;
    if (mm < 10) mm = "0" + mm;
    var todayDateymd = yyyy + "-" + mm + "-" + dd;
    let data = req.body;

    // FOR Pushing tenant Histroy
    const tentHis = await TenantDetails.findById({ _id: data.tdId });

    const tenantDetHistrData = {
      tdId: tentHis._id,
      thName: tentHis.tenantName,
      thOperation: "Renewal",
      thPhone: tentHis.tenantPhone,
      thFirmName: tentHis.tenantFirmName,
      thAddr: tentHis.tenantAddr,
      thAdharNo: tentHis.tenantAdharNo,
      thPanNo: tentHis.tenantPanNo,
      thRentAmount: tentHis.tenantRentAmount,
      thDepositAmt: tentHis.tenantDepositAmt,
      thgeneratordepoAmt: tentHis.generatordepoAmt,
      thBankName: tentHis.tenantBankName ? tentHis.tenantBankName : null,
      thChequenoOrDdno: tentHis.tenantChequenoOrDdno
        ? tentHis.tenantChequenoOrDdno
        : null,
      thPaymentMode: tentHis.tenantPaymentMode,
      thLeaseStartDate: tentHis.tenantLeaseStartDate,
      thLeaseEndDate: tentHis.tenantLeaseEndDate,
      thBuildingId: tentHis.BuildingId,
      thDoorNo: tentHis.shopDoorNo,
      thAgreementStatus: tentHis.AgreementStatus,
      tenantStatus: tentHis.tenantstatus,
      thNotes: "Renewed",
      edit_by_id: data.tenantEnteredBy,
    };

    let tenantHistories = new TenentHistories(tenantDetHistrData);
    await tenantHistories.save();

    // Start saving Renew histroy
    let tenantsAgrementHistory = {
      tdId: tentHis._id,
      tenantName: tentHis.tenantName,
      tenantFileNo: tentHis.tenantFileNo,
      AgreementStatus: "Renewed", //flg
      OrganizationName: tentHis.OrganizationName,
      OrganizationId: tentHis.OrganizationId,
      tenantLeaseEndDate: tentHis.tenantLeaseEndDate,
      tenantLeaseStartDate: tentHis.tenantLeaseStartDate,
      tenantPhone: tentHis.tenantPhone,
      tenantFirmName: tentHis.tenantFirmName || null,
      tenantAddr: tentHis.tenantAddr,
      tenantAdharNo: tentHis.tenantAdharNo || null,
      tenantPanNo: tentHis.tenantPanNo || null,
      tenantRentAmount: tentHis.tenantRentAmount,
      tenantDepositAmt: tentHis.tenantDepositAmt,
      generatordepoAmt: tentHis.generatordepoAmt,
      tenantPaymentMode: tentHis.tenantPaymentMode,
      tenantChequenoOrDdno: tentHis.tenantChequenoOrDdno,
      tenantBankName: tentHis.tenantBankName,
      tenantchequeDate: tentHis.tenantchequeDate || null,
      tenantCardType: tentHis.tenantCardType,
      tenantTransId: tentHis.tenantTransId,
      BuildingName: tentHis.BuildingName,
      BuildingId: tentHis.BuildingId,
      Location: tentHis.Location,
      shopDoorNo: tentHis.shopDoorNo,
      tenantEnteredBy: tentHis.tenantEnteredBy,
      tenantDate: tentHis.todayDateymd,
    };

    let SavedRenwedHistroy = await new TenantAgreementHistory(
      tenantsAgrementHistory
    );
    SavedRenwedHistroy.save();
    // End saving Renew histroy

    // update Renew
    await TenantDetails.updateOne(
      { _id: data.tdId },
      {
        $set: {
          AgreementStatus:
            data.tenantLeaseEndDate < todayDateymd ? "Expired" : "Renewed", //flag
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
          AgreementStatus:
            data.tenantLeaseEndDate < todayDateymd ? "Expired" : "Renewed", //fLAG
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
});

//add organization try
router.post("/add-Organization", auth, async (req, res) => {
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
router.get("/get-all-Organization", auth, async (req, res) => {
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
router.post("/get-particular-org", auth, async (req, res) => {
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
    res.status(500).send("Internal Server Error.");
  }
});

//get particular user data for admin side
router.post("/get-particular-user", auth, async (req, res) => {
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
    res.status(500).send("Internal Server Error.");
  }
});

//update all organization
router.post("/update-Organization", auth, async (req, res) => {
  try {
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
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Internal Server Error.");
  }
});

router.post("/update-Property", auth, async (req, res) => {
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
    console.log(error.message);
    // res.status(500).send("Internal Server Error.");
    res.status(500).json({ errors: [{ msg: "Server Error" }] });
  }
});

//Super user adding
router.post("/add-SuperUser", auth, async (req, res) => {
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
    res.status(500).send("Internal Server Error.");
  }
});

//Add admin user
router.post("/add-AdminUser", auth, async (req, res) => {
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
    res.status(500).send("Internal Server Error.");
  }
});

//super user displaying
router.get("/get-all-Superuser", auth, async (req, res) => {
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
      { $sort: { userStatus: 1 } },
    ]).then((data) => res.json(data));
    //res.json(ParticularOrg);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Internal Server Error.");
  }
});

//edit the super user
router.post("/Update-User", auth, async (req, res) => {
  let data = req.body;
  try {
    const output = await UserDetails.updateOne(
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
    res.json(output);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Internal Server Error.");
  }
});

//add property details
router.post("/add-Property-details", auth, async (req, res) => {
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

router.post("/get-Particular-Property", auth, async (req, res) => {
  try {
    let { OrganizationId, LocationName } = req.body;
    let query = { OrganizationId: mongoose.Types.ObjectId(OrganizationId) };

    if (LocationName) {
      query = {
        ...query,
        Location: LocationName,
      };
    }

    let propertydata = await property.find(query).sort({ shopStatus: 1 });
    res.json(propertydata);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Internal Server Error.");
  }
});

router.post("/get-Property-tenant-details", auth, async (req, res) => {
  try {
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
      ])
      .then((data) => res.json(data));
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Internal Server Error.");
  }
});

//deactive property
router.post("/deactive-property", auth, async (req, res) => {
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

    res.json("Done");
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Internal Server Error.");
  }
});

//getting particular Tenant details based on Orgaination
router.post("/get-particular-Tenant", auth, async (req, res) => {
  try {
    let { OrganizationId, LocationName } = req.body;

    let query = { OrganizationId: OrganizationId };

    if (LocationName) {
      query = {
        ...query,
        Location: LocationName,
      };
    }

    const tenantdata = await TenantDetails.find(query).sort({
      tenantstatus: 1,
    });
    res.json(tenantdata);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Internal Server Error.");
  }
});

router.post("/get-tenant-sort", auth, async (req, res) => {
  try {
    const userInfo = await UserDetails.findById(req.user.id).select(
      "-password"
    );
    let {
      OrganizationId,
      LocationName,
      DoorNumber,
      propertyname,
      tenantName,
      tenantStatus,
    } = req.body;

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
    } else if (tenantStatus) {
      query = {
        ...query,
        tenantstatus: tenantStatus,
      };
    }

    const tenantdata = await TenantDetails.find(query).sort({
      tenantstatus: 1,
    });
    res.json(tenantdata);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Internal Server Error.");
  }
});

router.post("/get-tenant-sort-for-activecount", auth, async (req, res) => {
  try {
    const userInfo = await UserDetails.findById(req.user.id).select(
      "-password"
    );

    const query = { OrganizationId: userInfo.OrganizationId };

    const tenantdata = await TenantDetails.find(query).sort({
      tenantstatus: 1,
    });

    res.json(tenantdata);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.post("/get-tenant-activecount", auth, async (req, res) => {
  try {
    const userInfo = await UserDetails.findById(req.user.id).select(
      "-password"
    );

    let query = { OrganizationId: userInfo.OrganizationId };

    const tenantdata = await TenantDetails.find({
      ...query,
      tenantstatus: "Active", // Move the condition inside the find function
    });
    res.json(tenantdata);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: "Server Error" });
  }
});
router.post("/get-tenant-renewedcount", auth, async (req, res) => {
  try {
    const userInfo = await UserDetails.findById(req.user.id).select(
      "-password"
    );

    let query = {
      OrganizationId: userInfo.OrganizationId,
      tenantstatus: "Active",
      AgreementStatus: "Renewed",
      $where: function () {
        const currentYear = new Date().getFullYear();
        return (
          new Date(this.tenantLeaseStartDate).getFullYear() === currentYear
        );
      },
    };

    const tenantrenewdata = await TenantDetails.find(query);
    res.json(tenantrenewdata);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: "Server Error" });
  }
});

router.post("/get-tenant-sort-contact-report", auth, async (req, res) => {
  try {
    const userInfo = await UserDetails.findById(req.user.id).select(
      "-password"
    );
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
  try {
    const userInfo = await UserDetails.findById(req.user.id).select(
      "-password"
    );
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

    const tenantdata = await TenantDetails.find(query).sort({
      tenantstatus: 1,
    });
    res.json(tenantdata);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Internal Server Error.");
  }
});
// Get Exp Month Count
router.get("/get-tenant-report", auth, async (req, res) => {
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
router.post("/deactive-user", auth, async (req, res) => {
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
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Internal Server Error.");
  }
});

//ddeactivating the organization
router.post("/deactive-Organization", auth, async (req, res) => {
  try {
    let data = req.body;
    await UserDetails.updateMany(
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
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Internal Server Error.");
  }
});

router.post("/deactive-tenant", auth, async (req, res) => {
  try {
    let data = req.body;
    if (data.Dno.length > 0) {
      const tentHis = await TenantDetails.findById({ _id: data.tid });

      const HistrData = {
        tdId: tentHis._id,
        thName: tentHis.tenantName,
        thOperation: "Door Deactivated",
        thPhone: tentHis.tenantPhone,
        thFirmName: tentHis.tenantFirmName,

        thRentAmount: tentHis.tenantRentAmount,
        thDepositAmt: tentHis.tenantDepositAmt,
        thgeneratordepoAmt: tentHis.generatordepoAmt,

        thLeaseStartDate: tentHis.tenantLeaseStartDate,
        thLeaseEndDate: tentHis.tenantLeaseEndDate,
        thBuildingId: tentHis.BuildingId,
        thDoorNo: tentHis.shopDoorNo,
        thAgreementStatus: tentHis.AgreementStatus,
        tenantStatus: tentHis.tenantstatus,
        thNotes: data.deactive_reason,

        edit_by_id: data.tenantEnteredBy,
      };
      let tenantHistories = new TenentHistories(HistrData);
      await tenantHistories.save();

      data.Dno.map((ele) => {
        TenantDetails.updateOne(
          {
            _id: data.tid,
          },
          {
            $pull: {
              shopDoorNo: { label: ele.label },
            },
          }
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
    } else {
      const tentHis = await TenantDetails.findById({ _id: data.tid });

      const HistrData1 = {
        tdId: tentHis._id,
        thName: tentHis.tenantName,
        thOperation: "Deactivated",
        thPhone: tentHis.tenantPhone,
        thFirmName: tentHis.tenantFirmName,

        thRentAmount: tentHis.tenantRentAmount,
        thDepositAmt: tentHis.tenantDepositAmt,
        thgeneratordepoAmt: tentHis.generatordepoAmt,

        thLeaseStartDate: tentHis.tenantLeaseStartDate,
        thLeaseEndDate: tentHis.tenantLeaseEndDate,
        thBuildingId: tentHis.BuildingId,
        thDoorNo: tentHis.shopDoorNo,
        thAgreementStatus: tentHis.AgreementStatus,
        tenantStatus: tentHis.tenantstatus,
        thNotes: data.deactive_reason,

        edit_by_id: data.tenantEnteredBy,
      };
      let tenantHistories = new TenentHistories(HistrData1);
      await tenantHistories.save();

      TenantDetails.updateOne(
        {
          _id: data.tid,
        },
        {
          $set: {
            tenantstatus: "Deactive",
            deactive_reason: data.deactive_reason,
          },
        }
      ).then(data);
    }
    res.status(200).json({ success: true });
  } catch (error) {
    console.error(err.message);
    res.status(500).json({ errors: [{ msg: "Server Error" }] });
  }
});

//get exp month count for Organization
router.post("/get-month-exp-org-count", auth, async (req, res) => {
  try {
    const { selectedY } = req.body;

    var yearVal = new Date().getFullYear();
    if (selectedY) {
      yearVal = selectedY;
    }

    const orgexp = await OrganizationDetails.aggregate([
      {
        $match: {
          enddate: { $regex: new RegExp("^" + yearVal, "i") },
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

//flag
// router.get("/get-door-no", auth, async (req, res) => {
//   //flag
//   try {
//     let doorno = await property.find({ shopDoorNo: { $ne: "" } });
//   } catch (error) {
//     console.log(error.message);
//     res.status(500).send("Internal Server Error.");
//   }
// });

router.post("/get-month-exp-org", auth, async (req, res) => {
  try {
    let data = req.body;
    const selectedY = data.yearSearch;

    var yearVal = new Date().getFullYear();
    if (selectedY) {
      yearVal = selectedY;
    }

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
router.post("/get-month-exp-count", auth, async (req, res) => {
  try {
    const { selectedY, OrganizationId } = req.body; //change
    var yearVal = new Date().getFullYear();
    if (selectedY) {
      //change
      yearVal = selectedY;
    }

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

router.post("/add-agreement-details", auth, async (req, res) => {
  try {
    let data = req.body;

    let tenantAgreementDetails = new TenantAgreementDetails(data);
    output = await tenantAgreementDetails.save();
    res.send(output);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Internal Server Error.");
  }
});

router.post("/get-all-shops", auth, async (req, res) => {
  try {
    let data = req.body;

    const ShopsData = await property
      .find({
        Organization_id: data.OrganizationId,
      })
      .sort({ shopStatus: -1 });

    res.json(ShopsData);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Internal Server Error.");
  }
});
//get year count for Organization
router.post("/get-previous-years-exp-Org", auth, async (req, res) => {
  try {
    const { selectedVal } = req.body;

    var date = new Date(selectedVal);
    var firstDay = new Date(date.getFullYear(), 0, 1)
      .toISOString()
      .split("T")[0];

    const yeardata = await OrganizationDetails.aggregate([
      {
        $match: {
          enddate: { $lt: firstDay },
          AgreementStatus: { $eq: "Expired" },
        },
      },
    ]);
    res.json(yeardata);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Internal Server Error.");
  }
});

//Exp Year Count filter
router.post("/get-previous-years-exp", auth, async (req, res) => {
  try {
    const { selectedVal, OrganizationId } = req.body;
    var date = new Date(selectedVal);
    var firstDay = new Date(date.getFullYear(), 0, 1)
      .toISOString()
      .split("T")[0];

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
          output: { $elemMatch: { tenantstatus: { $eq: "Active" } } },
        },
      },
    ]);
    res.json(MonthExpCntData);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Internal Server Error.");
  }
});

//flag
router.post("/get-tenant-exp-report", auth, async (req, res) => {
  const userInfo = await UserDetails.findById(req.user.id).select("-password");

  const id = mongoose.Types.ObjectId(req.body.OrganizationId);
  const { monthSearch, yearSearch, OrganizationId } = req.body;

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

//flag API no need
router.get("/get-door-nos", auth, async (req, res) => {
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

//get organization expiry data to Tenant filter //flag Api no need
router.post("/get-organization-expiry-report", auth, async (req, res) => {
  try {
    const { monthSearch, yearSearch } = req.body;

    var monthVal = monthSearch;
    if (monthSearch < 10 && monthSearch.toString().length === 1) {
      var monthVal = "0" + monthSearch;
    }
    var yearMonth = yearSearch + "-" + monthVal;

    OrganizationDetails.find({
      enddate: { $regex: new RegExp("^" + yearMonth, "i") },
      AgreementStatus: { $eq: "Expired" },
      org_status: "Active",
    }).catch((error) => res.status(500).send("Internal Server Error."));
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Internal Server Error.");
  }
});

//flag
router.post("/get-tenant-old-exp-report", auth, async (req, res) => {
  try {
    const { yearSearch, OrganizationId } = req.body;
    var lastDate = new Date(yearSearch, 0, 1).toISOString().split("T")[0];
    var year = new Date(lastDate).getFullYear(); // Extract the year value from lastDate

    // Create the start and end dates for the year

    var endDate = new Date(yearSearch, 11, 31).toISOString().split("T")[0];

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
          // tenantLeaseEndDate: {
          //   $gte: lastDate,
          //   $lt: endDate,
          // },
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

///123 flag can be optimisied
router.post("/get-tenant-year-report", async (req, res) => {
  const { yearSearch, OrganizationId } = req.body;
  var currentDate = new Date();
  if (yearSearch === new Date().getFullYear()) {
    var firstDayOfMonth = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      1
    );
    var lastDayOfMonth = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() + 1,
      1
    ); // Corrected

    var firstDayISOString = firstDayOfMonth.toISOString().split("T")[0];
    var lastDayISOString = lastDayOfMonth.toISOString().split("T")[0];

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
            tenantLeaseEndDate: {
              $gt: firstDayISOString,
              $lte: lastDayISOString,
            },

            tenantstatus: { $eq: "Active" },
          },
        },
      ]);

      res.json(tenantExpReport);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Internal Server Error.");
    }
  } else {
    var lastDate = new Date(yearSearch, 0, 1).toISOString().split("T")[0];
    var year = new Date(lastDate).getFullYear(); // Extract the year value from lastDate

    // Create the start and end dates for the year

    // var endDate = new Date(yearSearch, 11, 31).toLocaleDateString("en-GB");
    var endDate1 = new Date(yearSearch, 11, 31);
    var endDate =
      new Date(endDate1).getFullYear() +
      "-" +
      ("0" + (endDate1.getMonth() + 1)).slice(-2) +
      "-" +
      ("0" + endDate1.getDate()).slice(-2);

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
            tenantLeaseEndDate: {
              $gt: lastDate,
              $lte: endDate,
            },
            // tenantLeaseEndDate: { $lte: lastDate },
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
  }
});

router.get("/get-door-number", auth, async (req, res) => {
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

//flag
router.post("/filter-tenant-doorno-pref", auth, async (req, res) => {
  try {
    const { doornoSearch } = req.body;

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

router.get("/get-all-tenants", auth, async (req, res) => {
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
    console.error(err.message);
    res.status(500).send("Internal Server Error.");
  }
});

router.get("/get-all-users", auth, async (req, res) => {
  try {
    const userDetails = await UserDetails.find({}).sort({ userStatus: 1 });
    res.json(userDetails);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Internal Server Error.");
  }
});

//Renew the Organization details
router.post("/Renew-Organization", auth, async (req, res) => {
  try {
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
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Internal Server Error.");
  }
});

//flag
router.post("/update-tenant-details", auth, async (req, res) => {
  try {
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1;
    var yyyy = today.getFullYear();
    if (dd < 10) dd = "0" + dd;
    if (mm < 10) mm = "0" + mm;
    var todayDateymd = yyyy + "-" + mm + "-" + dd;

    let data = req.body;

    const tentHis = await TenantDetails.findById({ _id: data.recordId });

    const HistrData = {
      tdId: tentHis._id,
      thName: tentHis.tenantName,
      thOperation: "Edit",
      thPhone: tentHis.tenantPhone,
      thFirmName: tentHis.tenantFirmName,
      thAddr: tentHis.tenantAddr,
      thAdharNo: tentHis.tenantAdharNo,
      thPanNo: tentHis.tenantPanNo,
      thRentAmount: tentHis.tenantRentAmount,
      thDepositAmt: tentHis.tenantDepositAmt,
      thgeneratordepoAmt: tentHis.generatordepoAmt,
      thBankName: tentHis.tenantBankName ? tentHis.tenantBankName : null,
      thChequenoOrDdno: tentHis.tenantChequenoOrDdno
        ? tentHis.tenantChequenoOrDdno
        : null,
      thPaymentMode: tentHis.tenantPaymentMode,
      thLeaseStartDate: tentHis.tenantLeaseStartDate,
      thLeaseEndDate: tentHis.tenantLeaseEndDate,
      thBuildingId: tentHis.BuildingId,
      thDoorNo: tentHis.shopDoorNo,
      thAgreementStatus: tentHis.AgreementStatus,
      tenantStatus: tentHis.tenantstatus,
      thNotes: "",

      edit_by_id: data.tenantEnteredBy,
    };
    let tenantHistories = new TenentHistories(HistrData);
    await tenantHistories.save();

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
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ errors: [{ msg: "Server Error of tdetaiz" }] });
  }
});

router.post("/activate-tenant-details", auth, async (req, res) => {
  try {
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1;
    var yyyy = today.getFullYear();
    if (dd < 10) dd = "0" + dd;
    if (mm < 10) mm = "0" + mm;
    var todayDateymd = yyyy + "-" + mm + "-" + dd;

    let data = req.body;

    const tentHis = await TenantDetails.findById({ _id: data.recordId });

    const HistrData = {
      tdId: tentHis._id,
      thName: tentHis.tenantName,
      thOperation: "Activate",
      thPhone: tentHis.tenantPhone,
      thFirmName: tentHis.tenantFirmName,
      thAddr: tentHis.tenantAddr,
      thAdharNo: tentHis.tenantAdharNo,
      thPanNo: tentHis.tenantPanNo,
      thRentAmount: tentHis.tenantRentAmount,
      thDepositAmt: tentHis.tenantDepositAmt,
      thgeneratordepoAmt: tentHis.generatordepoAmt,
      thBankName: tentHis.tenantBankName ? tentHis.tenantBankName : null,
      thChequenoOrDdno: tentHis.tenantChequenoOrDdno
        ? tentHis.tenantChequenoOrDdno
        : null,
      thPaymentMode: tentHis.tenantPaymentMode,
      thLeaseStartDate: tentHis.tenantLeaseStartDate,
      thLeaseEndDate: tentHis.tenantLeaseEndDate,
      thBuildingId: tentHis.BuildingId,
      thDoorNo: tentHis.shopDoorNo,
      thAgreementStatus: tentHis.AgreementStatus,
      tenantStatus: tentHis.tenantstatus,
      thNotes: "Tenant Activated",

      edit_by_id: data.tenantEnteredBy,
    };
    let tenantHistories = new TenentHistories(HistrData);
    await tenantHistories.save();

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

router.post("/tenant-update-history", auth, async (req, res) => {
  try {
    let data = req.body;
    let tenantHistories = new TenentHistories(data);
    output = await tenantHistories.save();
    res.send(output);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Internal Server Error.");
  }
});

//get tenant receipt number
router.post("/get-tenant-receiptnumber", auth, async (req, res) => {
  try {
    let data = req.body;
    const tenanatReceiptNoData = await TenentAgreement.findOne({
      OrganizationId: data.OrganizationId,
      tenantReceiptNo: { $ne: "" },
    })
      .sort({ tenantReceiptNo: -1 })
      .limit(1)
      .collation({ locale: "en_US", numericOrdering: true });

    res.json(tenanatReceiptNoData.tenantReceiptNo);
  } catch (error) {
    console.error("Error occurred:", error);
  }
});

// tenant receipt details
router.post("/update-tenant-Receiptdetails", auth, async (req, res) => {
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
router.post("/edit-tenant-leasetransfer-details", auth, async (req, res) => {
  try {
    let data = req.body;

    const doorNos = data.transferShoopDoorNo
      .map((door) => door.label)
      .join(", ");

    if (data.Dno.length > 1) {
      const tentHis = await TenantDetails.findById({ _id: data.fromId });

      const HistrData = {
        tdId: tentHis._id,
        thName: tentHis.tenantName,
        thOperation: "Lease Transfer",
        thPhone: tentHis.tenantPhone,
        thFirmName: tentHis.tenantFirmName,
        thAddr: tentHis.tenantAddr,
        thAdharNo: tentHis.tenantAdharNo,
        thPanNo: tentHis.tenantPanNo,
        thRentAmount: tentHis.tenantRentAmount,
        thDepositAmt: tentHis.tenantDepositAmt,
        thgeneratordepoAmt: tentHis.generatordepoAmt,
        thBankName: tentHis.tenantBankName ? tentHis.tenantBankName : null,
        thChequenoOrDdno: tentHis.tenantChequenoOrDdno
          ? tentHis.tenantChequenoOrDdno
          : null,
        thPaymentMode: tentHis.tenantPaymentMode,
        thLeaseStartDate: tentHis.tenantLeaseStartDate,
        thLeaseEndDate: tentHis.tenantLeaseEndDate,
        thBuildingId: tentHis.BuildingId,
        thDoorNo: tentHis.shopDoorNo,
        thAgreementStatus: tentHis.AgreementStatus,
        tenantStatus: tentHis.tenantstatus,
        thNotes: "Lease Transfer of " + doorNos + " to " + data.toId,

        edit_by_id: data.tenantEnteredBy,
      };
      let tenantHistories = new TenentHistories(HistrData);
      await tenantHistories.save();

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
        ).then((data) => {});
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
      const tentHis = await TenantDetails.findById({ _id: data.fromId });

      const HistrData = {
        tdId: tentHis._id,
        thName: tentHis.tenantName,
        thOperation: "Lease Transfer",
        thPhone: tentHis.tenantPhone,
        thFirmName: tentHis.tenantFirmName,
        thAddr: tentHis.tenantAddr,
        thAdharNo: tentHis.tenantAdharNo,
        thPanNo: tentHis.tenantPanNo,
        thRentAmount: tentHis.tenantRentAmount,
        thDepositAmt: tentHis.tenantDepositAmt,
        thgeneratordepoAmt: tentHis.generatordepoAmt,
        thBankName: tentHis.tenantBankName ? tentHis.tenantBankName : null,
        thChequenoOrDdno: tentHis.tenantChequenoOrDdno
          ? tentHis.tenantChequenoOrDdno
          : null,
        thPaymentMode: tentHis.tenantPaymentMode,
        thLeaseStartDate: tentHis.tenantLeaseStartDate,
        thLeaseEndDate: tentHis.tenantLeaseEndDate,
        thBuildingId: tentHis.BuildingId,
        thDoorNo: tentHis.shopDoorNo,
        thAgreementStatus: tentHis.AgreementStatus,
        tenantStatus: tentHis.tenantstatus,
        thNotes:
          "Lease Transfere of " +
          doorNos +
          " to " +
          data.toId +
          " and got deactivated",

        edit_by_id: data.tenantEnteredBy,
      };
      let tenantHistories = new TenentHistories(HistrData);
      await tenantHistories.save();

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
    res.status(200).json({ message: "Success" });
  } catch (error) {
    res.status(500).json({ errors: [{ msg: "Server Error" }] });
  }
});

//user activity
router.post("/add-user-activity-details", auth, async (req, res) => {
  try {
    let data = req.body;
    let userActivity = new UserActivity(data);
    output = await userActivity.save();
    res.send(output);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Internal Server Error.");
  }
});

router.post("/get-user-activity", auth, async (req, res) => {
  try {
    let data = req.body;
    const userActivityData = await UserActivity.find({
      OrganizationId: data.OrganizationId,
    }).sort({ _id: -1 });

    res.json(userActivityData);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Internal Server Error.");
  }
});

/////////////////////////////////////MIS REPORT////////////////////////////////////////////////

//mis report for count
router.post("/get-mis-report", auth, async (req, res) => {
  try {
    let data = req.body;
    let inputDate = new Date(data.selectedY);
    let targetMonth = inputDate.getMonth() + parseInt(data.selectedEndY);
    inputDate.setMonth(targetMonth);

    // Set the day to the last day of the month, considering variations in the number of days in different months
    inputDate.setDate(0);

    let resultDate = inputDate.toISOString().split("T")[0];

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
    let activeCount = await TenentAgreement.aggregate([
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
          AgreementStatus: { $in: ["Renewed", "Active"] },
        },
      },
      {
        $count: "totalCountActive",
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
      activeCount:
        activeCount[0] && activeCount[0].totalCountActive
          ? activeCount[0].totalCountActive
          : 0,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Internal Server Error.");
  }
});
//mis report for amount
router.post("/get-mis-amount-report", auth, async (req, res) => {
  try {
    let data = req.body;

    let inputDate = new Date(data.selectedY);
    let targetMonth = inputDate.getMonth() + parseInt(data.selectedEndY);
    inputDate.setMonth(targetMonth);
    inputDate.setDate(0);
    let resultDate = inputDate.toISOString().split("T")[0];
    let lastDate = resultDate.toString();

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
    let activeAmount = await TenentAgreement.aggregate([
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
            $in: ["Active", "Renewed"],
          },
        },
      },
      {
        $group: {
          _id: null,
          totalRentActive: {
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
      activeAmount:
        activeAmount[0] && activeAmount[0].totalRentActive
          ? activeAmount[0].totalRentActive
          : 0,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Internal Server Error.");
  }
});

//renewed bar chart

router.post("/get-mis-renewed-bar-report", auth, async (req, res) => {
  try {
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

    let renewedBarCount = await TenentAgreement.aggregate([
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
    let activeBarCount = await TenentAgreement.aggregate([
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
            $in: ["Active", "Renewed"],
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

    res.json({ renewedBarCount, renewableBarCount, activeBarCount });
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Internal Server Error.");
  }
});

module.exports = router;
