import React, { useState, useEffect, Fragment } from "react";
import { connect } from "react-redux";
import { RenewTenantDetailsform, getAllSettings } from "../../actions/tenants";
import DatePicker from "react-datepicker";

const RenewTenentAgreement = ({
  auth: { isAuthenticated, user, users, finalDataRep },
  tenantsData,
  tenants: { allTenantSetting },
  RenewTenantDetailsform,
  getAllSettings,
  onReportModalChange,
}) => {
  const myuser = JSON.parse(localStorage.getItem("user"));

  const [door, SetDoornumber] = useState([]);

  useEffect(() => {
    getAllSettings({
      OrganizationId: myuser && myuser.OrganizationId,
      userId: myuser && myuser._id,
    });

    const doornumber =
      tenantsData &&
      tenantsData.tenantDoorNo &&
      tenantsData.tenantDoorNo.map((ele) => {
        return ele.label;
      });
    SetDoornumber(doornumber);
  }, [getAllSettings]);

  //formData
  const [formData, setFormData] = useState({
    isSubmitted: false,
    tenantDoorNo: door,
    tenantFileNo: tenantsData.tenantFileNo,
    tenantRentAmount: tenantsData.chargesCal,
  });
  const [reversedStart, setreversedStart] = useState("");
  var today = new Date();
  var dd = today.getDate();
  var mm = today.getMonth() + 1;
  var yyyy = today.getFullYear();
  if (dd < 10) {
    dd = "0" + dd;
  }
  if (mm < 10) {
    mm = "0" + mm;
  }
  var todayDateymd = yyyy + "-" + mm + "-" + dd;

  var dt = new Date(finalDataRep.yearSearch + "-" + finalDataRep.monthSearch);

  const {
    recordId,
    tenantstatus,
    tenantdeactivereason,
    isSubmitted,
    tenantDoorNo,
    tenantFileNo,
    tenantRentAmount,
    New_Rent_Amount,
  } = formData;

  const onInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const ondone = () => {
    const finalData = {
      tenantRentAmount: tenantRentAmount,
      tenantFileNo: tenantFileNo,
      // tenantDoorNo: door,
      tenantLeaseStartDate: reversedStart,
      tenantLeaseEndDate: newLeaseEndDate,
      tdId: tenantsData.tdId,
      OrganizationId: tenantsData.OrganizationId,
      BuildingName: tenantsData.BuildingName,
      BuildingId: tenantsData.BuildingId,
      agreementId: tenantsData.agreementId,
      tenantEnteredBy: user && user._id,
      tenantDate: todayDateymd,
      monthSearch: finalDataRep.monthSearch,
      yearSearch: finalDataRep.yearSearch,
      selectedY: finalDataRep.yearSearch,
      selectedVal: dt,
    };
    // console.log("this is sothing", finalData);
    RenewTenantDetailsform(finalData);
    setFormData({ ...formData, isSubmitted: true });
    onReportModalChange(true);
  };
  const [entryDate, setEntryDate] = useState(new Date());

  const [leaseEndDate, setLeaseEndDate] = useState("");
  const [newLeaseEndDate, setNewLeaseEndDate] = useState();
  const getNoOFDays = (mnth, year) => {
    switch (mnth) {
      case 1:
        return 31;
      case 2:
        return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0
          ? 29
          : 28;
      case 3:
        return 31;
      case 4:
        return 30;
      case 5:
        return 31;
      case 6:
        return 30;
      case 7:
        return 31;
      case 8:
        return 31;
      case 9:
        return 30;
      case 10:
        return 31;
      case 11:
        return 30;
      case 12:
        return 31;
      default:
        break;
    }
  };
  const [date, setDate] = useState("");
  // const onDateChangeEntry = (e) => {
  //   console.log(e);
  //   // var newDate = e;
  //   // var calDate = new Date(newDate);
  //   var calDate = e;
  //   var dd = calDate.getDate();
  //   var mm = calDate.getMonth() + 1;
  //   var yyyy = calDate.getFullYear();
  //   if (dd < 10) {
  //     dd = "0" + dd;
  //   }

  //   if (mm < 10) {
  //     mm = "0" + mm;
  //   }

  //   var start = dd + "-" + mm + "-" + yyyy;
  //   var reversedStart = yyyy + "-" + mm + "-" + dd;
  //   setEntryDate(start);
  //   setreversedStart(reversedStart);

  //   var leaseMonth = myuser.output.leaseTimePeriod;

  //   //Calculating lease end date
  //   var dateData = calDate.getDate();
  //   calDate.setMonth(calDate.getMonth() + +leaseMonth);
  //   if (calDate.getDate() != dateData) {
  //     calDate.setDate(0);
  //   }
  //   var dd1 = calDate.getDate();
  //   var mm2 = calDate.getMonth() + 1;
  //   var yyyy1 = calDate.getFullYear();
  //   if (dd1 < 10) {
  //     dd1 = "0" + dd1;
  //   }

  //   if (mm2 < 10) {
  //     mm2 = "0" + mm2;
  //   }

  //   var leaseEndDate = dd1 + "-" + mm2 + "-" + yyyy1;
  //   setLeaseEndDate(leaseEndDate);
  //   var newLeaseEndDate = yyyy1 + "-" + mm2 + "-" + dd1;
  //   setNewLeaseEndDate(newLeaseEndDate);
  // };
  const onDateChangeEntry = (e) => {
    var calDate = e;
    if (new Date(e).getFullYear() < 2050) {
      setEntryDate(new Date(e));
    }
    var dd = calDate.getDate();
    var mm = calDate.getMonth() + 1;
    var yyyy = calDate.getFullYear();
    if (dd < 10) {
      dd = "0" + dd;
    }
    if (mm < 10) {
      mm = "0" + mm;
    }
    var start = dd + "-" + mm + "-" + yyyy;
    var reversedStart = yyyy + "-" + mm + "-" + dd;
    setreversedStart(reversedStart);
    var leaseMonth = myuser.output.leaseTimePeriod;

    //Calculating lease end date
    var dateData = calDate.getDate();
    calDate.setMonth(calDate.getMonth() + +leaseMonth);
    if (dateData === 1) {
      calDate.setMonth(calDate.getMonth() - 1);
      calDate.setDate(
        getNoOFDays(calDate.getMonth() + 1, calDate.getFullYear())
      );
    } else if (dateData === 30 && calDate.getMonth() + 1 === 3) {
      calDate.setMonth(calDate.getMonth() - 1);
      calDate.setDate(
        getNoOFDays(calDate.getMonth() + 1, calDate.getFullYear())
      );
    } else if (dateData === 31) {
      if (calDate.getMonth() + 1 === 3) {
        calDate.setMonth(calDate.getMonth() - 1);
        calDate.setDate(
          getNoOFDays(calDate.getMonth() + 1, calDate.getFullYear())
        );
      } else {
        calDate.setMonth(calDate.getMonth() - 1);
        calDate.setDate(
          getNoOFDays(calDate.getMonth() + 1, calDate.getFullYear())
        );
      }
    } else if (dateData === 29) {
      if (calDate.getMonth() + 1 === 3) {
        calDate.setMonth(calDate.getMonth() - 1);
        calDate.setDate(
          getNoOFDays(calDate.getMonth() + 1, calDate.getFullYear())
        );
      } else {
        calDate.setDate(dateData - 1);
      }
    } else {
      calDate.setDate(dateData - 1);
    }
    var dd =
      calDate.getDate().toString().length === 1
        ? "0" + calDate.getDate().toString()
        : calDate.getDate().toString();
    var mm =
      (calDate.getMonth() + 1).toString().length === 1
        ? "0" + (calDate.getMonth() + 1).toString()
        : (calDate.getMonth() + 1).toString();
    var yyyy = calDate.getFullYear();
    setDate(dd + "-" + mm + "-" + yyyy);
    var leaseEndDate = "";
    if (dd == "31" && mm == "07") {
      leaseEndDate = "30-07" + "-" + yyyy;
    } else {
      leaseEndDate = dd + "-" + mm + "-" + yyyy;
    }
    setLeaseEndDate(leaseEndDate);
    var newLeaseEndDate = dd + "-" + mm + "-" + yyyy;
    setNewLeaseEndDate(newLeaseEndDate);
  };
  return !isAuthenticated || !user || !users ? (
    <Fragment></Fragment>
  ) : (
    <Fragment>
      <section className="sub_reg">
        <div className="row">
          <div
            className="col-lg-4 col-md-2 col-sm-4 col-12"
            style={{ paddingRight: "0px" }}
          >
            <label>Name:</label>
          </div>
          <div className="col-lg-6  col-md-4 col-sm-4 col-12">
            <label>
              <b>{tenantsData.tenantName}</b>
            </label>
          </div>
        </div>

        <div className="row py-2">
          <div className="col-lg-4 col-md-2 col-sm-4 col-12">
            <label>Building Name:</label>
          </div>

          <div className="col-lg-6  col-md-4 col-sm-4 col-12">
            <input
              type="text"
              name="tenantDoorNo"
              className="form-control"
              value={tenantsData.BuildingName}
              onChange={(e) => onInputChange(e)}
              readOnly
              style={{
                width: "100%",
              }}
            />
          </div>
        </div>
        <div className="row py-2">
          <div className="col-lg-4 col-md-2 col-sm-4 col-12">
            <label> File No:</label>
          </div>

          <div className="col-lg-6  col-md-4 col-sm-4 col-12">
            <input
              type="text"
              name="tenantFileNo"
              className="form-control"
              value={tenantFileNo}
              onChange={(e) => onInputChange(e)}
              readOnly
              style={{
                width: "100%",
              }}
            />
          </div>
        </div>
        <div className="row py-2">
          <div className="col-lg-4 col-md-2 col-sm-4 col-12">
            <label> Rent Amount:</label>
          </div>

          <div className="col-lg-6  col-md-4 col-sm-4 col-12">
            <input
              type="text"
              name="tenantRentAmount"
              className="form-control"
              value={tenantRentAmount}
              onChange={(e) => onInputChange(e)}
              style={{
                width: "100%",
              }}
            />
          </div>
        </div>
        <div className="row py-2">
          <div className="col-lg-4 col-md-2 col-sm-4 col-12">
            <label>Lease Start Date* :</label>
          </div>

          <div className="col-lg-6 col-md-4 col-sm-4 col-12">
            {/* <input
              type="date"
              required
              placeholder="dd/mm/yyyy"
              className="form-control "
              name="tenantLeaseStartDate"
              style={{
                width: "100%",
                }}
              /> */}
            {/* <input
              type="date"
              placeholder="dd-mm-yyyy"
              // className="form-control cpp-input datevalidation"
              name="tenantLeaseStartDate"
              value={entryDate}
              onChange={(e) => onDateChangeEntry(e)}
              style={{
                width: "75%",
                color: "black",
              }}
              required
            /> */}
            {/* <DatePicker
              label="Controlled picker"
              value={entryDate}
              className=" form-control cpp-input datevalidation"
              // placeholderText="dd/mm/yyyy"
              dateFormat="dd/MM/yyy"
              onChange={(e) => onDateChangeEntry(e)}
            /> */}
            <DatePicker
              dateFormat="dd/MM/yyyy"
              className="form-control "
              style={{ color: "red" }}
              selected={entryDate}
              onChange={(e) => onDateChangeEntry(e)}
            />
          </div>
        </div>
        <div className="row py-2">
          <div className="col-lg-4 col-md-2 col-sm-4 col-12">
            <label>Lease End Date:</label>
          </div>

          <div className="col-lg-6  col-md-4 col-sm-4 col-12">
            <label>{leaseEndDate}</label>
          </div>
        </div>
        <div className="row py-2">
          <div className="col-lg-12  col-sm-12 col-md-12 Savebutton" size="lg">
            <button
              variant="success"
              className="btn sub_form float-right"
              id="savebtn"
              onClick={() => ondone()}
              style={
                leaseEndDate !== ""
                  ? { opacity: "1", cursor: "pointer" }
                  : { opacity: "1", pointerEvents: "none", cursor: "pointer" }
              }
            >
              Save
            </button>
          </div>
        </div>
      </section>
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  tenants: state.tenants,
});

export default connect(mapStateToProps, {
  RenewTenantDetailsform,
  getAllSettings,
})(RenewTenentAgreement);
