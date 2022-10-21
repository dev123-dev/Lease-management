import React, { useState, useEffect, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { RenewTenantDetailsform, getAllSettings } from "../../actions/tenants";

const RenewTenentAgreement = ({
  auth: { isAuthenticated, user, users, finalDataRep },
  tenantsData,
  tenants: { allTenantSetting },
  RenewTenantDetailsform,
  getAllSettings,
  onReportModalChange,
}) => {
  const [error, setError] = useState({
    nextBtnStyle: { opacity: "0.5", pointerEvents: "none" },
    selBtnStyle: { opacity: "0.5", pointerEvents: "none" },
  });
  useEffect(() => {
    getAllSettings();
  }, [getAllSettings]);

  const { nextBtnStyle } = error;

  //formData
  const [formData, setFormData] = useState({
    isSubmitted: false,
    tenantDoorNo: tenantsData.tenantDoorNo,
    tenantFileNo: tenantsData.tenantFileNo,
    tenantRentAmount: tenantsData.chargesCal,
  });

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
  } = formData;

  const onInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const [showEditModal, setShowEditModal] = useState(false);

  const onSubmit = () => {
    const finalData = {
      tenantRentAmount: tenantRentAmount,
      tenantFileNo: tenantFileNo,
      tenantDoorNo: tenantDoorNo,
      tenantLeaseStartDate: entryDate,
      tenantLeaseEndDate: newLeaseEndDate,
      tdId: tenantsData.tdId,
      AgreementStatus: "Active",
      agreementId: tenantsData.agreementId,
      tenantEnteredBy: user && user._id,
      tenantDate: todayDateymd,

      monthSearch: finalDataRep.monthSearch,
      yearSearch: finalDataRep.yearSearch,
      selectedY: finalDataRep.yearSearch,
      selectedVal: dt,
    };
    RenewTenantDetailsform(finalData);
    setFormData({ ...formData, isSubmitted: true });
    onReportModalChange(true);
  };
  const [entryDate, setEntryDate] = useState("");
  const [leaseEndDate, setLeaseEndDate] = useState("");
  const [newLeaseEndDate, setNewLeaseEndDate] = useState();
  const onDateChangeEntry = (e) => {
    setEntryDate(e.target.value);
    var newDate = e.target.value;
    var calDate = new Date(newDate);

    var leaseMonth = allTenantSetting[0].leaseTimePeriod;

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
            <label>{tenantsData.tenantName}</label>
          </div>
        </div>

        <div className="row py-2">
          <div className="col-lg-4 col-md-2 col-sm-4 col-12">
            <label>Door No:</label>
          </div>

          <div className="col-lg-6  col-md-4 col-sm-4 col-12">
            <input
              type="text"
              name="tenantDoorNo"
              className="form-control"
              value={tenantDoorNo}
              onChange={(e) => onInputChange(e)}
              required
              style={{
                width: "70%",
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
              required
              style={{
                width: "70%",
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
              required
              style={{
                width: "70%",
              }}
            />
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
              //   min={yesterdayDt}
              //   max={today2}
              className="form-control cpp-input datevalidation"
              name="tenantLeaseStartDate"
              // value={tenants.tenantLeaseEndDate}
              onChange={(e) => onDateChangeEntry(e)}
              style={{
                width: "70%",
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
              className="btn sub_form btn_continue Save float-right"
              onClick={() => onSubmit()}
              style={
                leaseEndDate !== ""
                  ? { opacity: "1" }
                  : { opacity: "1", pointerEvents: "none" }
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

RenewTenentAgreement.propTypes = {
  auth: PropTypes.object.isRequired,
  tenants: PropTypes.object.isRequired,
  RenewTenantDetailsform: PropTypes.func.isRequired,
  getAllSettings: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  tenants: state.tenants,
});

export default connect(mapStateToProps, {
  RenewTenantDetailsform,
  getAllSettings,
})(RenewTenentAgreement);
