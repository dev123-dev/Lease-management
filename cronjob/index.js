const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const mongoose = require("mongoose");
const cron = require("node-cron");
const shell = require("shelljs");
const fs = require("fs");
const { Console } = require("console");
const TenantDetails = require("../server/models/TenantDetails");
const TenentAgreement = require("../server/models/TenantAgreementDetails");
const OrganizationDetails = require("../server/models/OrganizationDetails");

// const MONGODB_URI =
//   process.env.MONGODB_URI || "mongodb://localhost:27017/pinnac23_LRA";
// mongoose.Promise = Promise;

// // Connect to the Mongo DB
// mongoose.connect(MONGODB_URI, { useNewUrlParser: true }, (err, db) => {
//   if (err) {
//     console.log("Unable to connect to the mongoDB server. Error:", err);
//   } else {
//     console.log("Connection established to", MONGODB_URI);
//   }
// });

async function updateExpiryStatus() {
  // console.log("Running Cron Job");
  var today = new Date();
  var dd = today.getDate();
  var mm = today.getMonth() + 1;
  var yyyy = today.getFullYear();
  if (dd < 10) dd = "0" + dd;
  if (mm < 10) mm = "0" + mm;
  var todayDateymd = yyyy + "-" + mm + "-" + dd;
  try {
    await TenantDetails.updateMany(
      {
        $and: [
          { tenantLeaseEndDate: { $lte: todayDateymd } },
          {
            $or: [
              { AgreementStatus: { $eq: "Active" } },
              { AgreementStatus: { $eq: "Renewed" } },
            ],
          },
        ],
      },

      {
        $set: {
          AgreementStatus: "Expired",
        },
      }
    );
    await TenentAgreement.updateMany(
      { tenantLeaseEndDate: { $lte: todayDateymd } },
      // {
      //   $or: [{ AgreementStatus: "Active" }, { AgreementStatus: "Renewed" }],
      // },
      {
        $set: {
          AgreementStatus: "Expired",
        },
      }
    );

    await OrganizationDetails.updateMany(
      {
        $and: [
          { enddate: { $lte: todayDateymd } },
          {
            $or: [
              { AgreementStatus: { $eq: "Active" } },
              { AgreementStatus: { $eq: "Renewed" } },
            ],
          },
        ],
      },
      // {
      //   $or: [{ AgreementStatus: "Active" }, { AgreementStatus: "Renewed" }],
      // },
      {
        $set: { AgreementStatus: "Expired" },
      }
    );

    // console.log("Status updated as Expired");
  } catch (error) {
    console.error("Error Here", error);
    //res.status(500).send("Internal Server Error.");
    //
  }
}

function expairyNotif() {
  cron.schedule("19 7 * * *", function () {
    updateExpiryStatus();
  });
}

module.exports = expairyNotif();
