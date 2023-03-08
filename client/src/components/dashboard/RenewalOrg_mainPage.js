import React, { useState, useEffect, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { RenewOrgDetailsform } from "../../actions/tenants";

const RenewalOrg_mainPage = ({
  auth: { isAuthenticated, user, users, finalDataRep },
  //Org: { allOrgSetting },
  RenewOrgDetailsform,
  orgData,
  onReportModalChange,
}) => {
  const [error, setError] = useState({
    nextBtnStyle: { opacity: "0.5", pointerEvents: "none" },
    selBtnStyle: { opacity: "0.5", pointerEvents: "none" },
  });
  // useEffect(() => {
  //   getAllSettings();
  // }, [getAllSettings]);

  const { nextBtnStyle } = error;

  //formData

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

  const onInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const [showEditModal, setShowEditModal] = useState(false);

  const [entryDate, setEntryDate] = useState("");
  const [leaseEndDate, setLeaseEndDate] = useState("");
  const [newLeaseEndDate, setNewLeaseEndDate] = useState();
  const onDateChangeEntry = (e) => {
    setEntryDate(e.target.value);
    var newDate = e.target.value;
    var calDate = new Date(newDate);

    var leaseMonth = 12;

    //Calculating lease end date
    var dateData = calDate.getDate();
    calDate.setMonth(calDate.getMonth() + +leaseMonth);
    if (calDate.getDate() != dateData) {
      calDate.setDate(0);
    }
    var dd1 = calDate.getDate();
    var mm2 = calDate.getMonth() + 1;
    var yyyy1 = calDate.getFullYear();
    if (dd1 < 10) {
      dd1 = "0" + dd1;
    }

    if (mm2 < 10) {
      mm2 = "0" + mm2;
    }
    var leaseEndDate = dd1 + "-" + mm2 + "-" + yyyy1;
    setLeaseEndDate(leaseEndDate);
    var newLeaseEndDate = yyyy1 + "-" + mm2 + "-" + dd1;
    setNewLeaseEndDate(newLeaseEndDate);
  };

  const [formData, setFormData] = useState({
    isSubmitted: false,
    OrganizationId: orgData._id,
    Orgname: orgData.OrganizationName,
    Orgemail: orgData.OrganizationEmail,
    Orgphone: orgData.OrganizationNumber,
    Location: orgData.Location,
    OrganizationAddress: orgData.OrganizationAddress,
    date: entryDate,
    enddate: leaseEndDate,
  });
  const {
    OrganizationId,
    OrganizationName,
    OrganizationEmail,
    OrganizationNumber,
    OrganizationStartDate,
    OrganizationEndDate,
  } = formData;

  const onSubmit = () => {
    const finalData = {
      isSubmitted: false,
      OrganizationId: orgData._id,
      Orgname: orgData.OrganizationName,
      Orgemail: orgData.OrganizationEmail,
      Orgphone: orgData.OrganizationNumber,
      Location: orgData.Location,
      OrganizationAddress: orgData.OrganizationAddress,
      date: entryDate,
      enddate: leaseEndDate,
    };
    RenewOrgDetailsform(finalData);
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
            <label> Organization Name:</label>
          </div>
          <div className="col-lg-6  col-md-4 col-sm-4 col-12">
            <label>{orgData.OrganizationName}</label>
          </div>
        </div>
        <div className="row py-2">
          <div className="col-lg-4 col-md-2 col-sm-4 col-12">
            <label>Lease Start Date* :</label>
          </div>

          <div className="col-lg-6 col-md-4 col-sm-4 col-12">
            <input
              type="date"
              placeholder="dd/mm/yyyy"
              // min={yesterdayDt}
              //min={today}
              className="form-control cpp-input datevalidation"
              name="tenantLeaseStartDate"
              value={entryDate}
              onChange={(e) => onDateChangeEntry(e)}
              style={{
                width: "100%",
              }}
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
          <div className="col-lg-12 Savebutton" size="lg">
            <button
              variant="success"
              id="Renewalbtn"
              onClick={() => onSubmit()}
              style={
                leaseEndDate !== ""
                  ? { opacity: "1" }
                  : { opacity: "1", pointerEvents: "none" }
              }
            >
              Renew
            </button>
          </div>
        </div>
      </section>
    </Fragment>
  );
};

RenewalOrg_mainPage.propTypes = {
  auth: PropTypes.object.isRequired,

  // RenewTenantDetailsform: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  tenants: state.tenants,
});

export default connect(mapStateToProps, { RenewOrgDetailsform })(
  RenewalOrg_mainPage
);
