import React, { useState, Fragment } from "react";
import { connect } from "react-redux";
import { RenewOrgDetailsform } from "../../actions/tenants";
import { useLocation } from "react-router-dom";

const RenewalOrg_mainPage = ({
  auth: { isAuthenticated, user, users, finalDataRep },
  RenewOrgDetailsform,
  setShowRenewalModal,
  orgData,
}) => {
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
  const [entryDate, setEntryDate] = useState("");
  const [leaseEndDate, setLeaseEndDate] = useState("");
  const [newLeaseEndDate, setNewLeaseEndDate] = useState();
  var ED = leaseEndDate.split(/\D/g);
  var endDate = [ED[2], ED[1], ED[0]].join("-");

  const onDateChangeEntry = (e) => {
    setEntryDate(e.target.value);
    var newDate = e.target.value;
    var calDate = new Date(newDate);

    var leaseMonth = 12;

    //Calculating lease end date
    var dateData = calDate.getDate();
    calDate.setMonth(calDate.getMonth() + +leaseMonth);
    if (calDate.getDate() !== dateData) {
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
    var leaseEndDate = yyyy1 + "-" + mm2 + "-" + dd1;
    setLeaseEndDate(leaseEndDate);
    var newLeaseEndDate = yyyy1 + "-" + mm2 + "-" + dd1;
    setNewLeaseEndDate(newLeaseEndDate);
  };

  useState({
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

  const onSubmit = () => {
    setShowRenewalModal(false);
    const finalData = {
      isSubmitted: true,
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
      <div></div>
      <section className="sub_reg">
        <div className="row">
          <div
            className="col-lg-4 col-md-2 col-sm-4 col-12"
            style={{ paddingRight: "0px" }}
          >
            <label> Organization Name:</label>
          </div>
          <div className="col-lg-6  col-md-4 col-sm-4 col-12">
            <label>
              <b>{orgData.OrganizationName}</b>
            </label>
          </div>
        </div>
        <div className="row py-2">
          <div className="col-lg-4 col-md-2 col-sm-4 col-12">
            <label>Agreement Start Date* :</label>
          </div>

          <div className="col-lg-6 col-md-4 col-sm-4 col-12">
            <input
              type="date"
              placeholder="dd/mm/yyyy"
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
            <label>Agreement End Date:</label>
          </div>

          <div className="col-lg-6  col-md-4 col-sm-4 col-12">
            <input
              className="form-control cpp-input datevalidation"
              placeholder={endDate}
            ></input>
          </div>
        </div>
        <div className="row py-2">
          <div className="col-lg-12  col-sm-12 col-md-12 " size="lg">
            <button
              id="savebtn"
              className="btn sub_form btn_continue Save float-right"
              variant="success"
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

const mapStateToProps = (state) => ({
  auth: state.auth,
  tenants: state.tenants,
});

export default connect(mapStateToProps, { RenewOrgDetailsform })(
  RenewalOrg_mainPage
);
