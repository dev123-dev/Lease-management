import React, { useState, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { UpdateTenantsDetails } from "../../actions/tenants";
import { getAllTenants, tenantsDetailsHistory } from "../../actions/tenants";
import Select from "react-select";
import { Modal, Button } from "react-bootstrap";
import tenants from "../../reducers/tenants";
const EditTenantDetails = ({
  auth: { isAuthenticated, user, users },
  tenants1: { allTenantSetting },
  tenants,

  UpdateTenantsDetails,
  onUpdateModalChange,
  getAllTenants,
  tenantsDetailsHistory,
}) => {
  const PaymentMethods = [
    { value: "Cash", label: "Cash" },
    { value: "Cheque", label: "Cheque" },
  ];
  console.log(user);
  const [showHide, setShowHide] = useState({
    showChequenoSection:
      tenants && tenants.tenantPaymentMode === "Cheque" ? true : false,
    // showChequenoSection: false,
  });
  const { showChequenoSection } = showHide;
  // const [tenantchequeDate, setChequeDate] = useState("");
  const [startSelectedDate, setStartDate] = useState(tenants.tenantchequeDate);
  const onDateChange = (e) => {
    setStartDate(e.target.value);
  };
  const onPaymentModeChange = (e) => {
    if (e) {
      setFormData({
        ...formData,
        tenantPaymentMode: e,
      });
    }
    if (e.value === "Cheque") {
      setShowHide({
        ...showHide,
        showChequenoSection: true,
      });
    } else {
      setShowHide({
        ...showHide,
        showChequenoSection: false,
      });
    }
  };
  const [formData, setFormData] = useState({
    isSubmitted: false,
    tenantDoorNo: tenants.tenantDoorNo,
    tenantFileNo: tenants.tenantFileNo,
    tenantRentAmount: tenants.tenantRentAmount,
    tenantName: tenants.tenantName,
    tenantPhone: tenants.tenantPhone,
    tenantFirmName: tenants.tenantFirmName,
    tenantAddr: tenants.tenantAddr,
    tenantAdharNo: tenants.tenantAdharNo,
    tenantPanNo: tenants.tenantPanNo,
    tenantDepositAmt: tenants.tenantDepositAmt,
    tenantBankName: tenants.tenantBankName,
    tenantChequenoOrDdno: tenants.tenantChequenoOrDdno,
    startSelectedDate: tenants.tenantchequeDate,
    tenantLeaseStartDate: tenants.tenantLeaseStartDate,
    tenantLeaseEndDate: tenants.tenantLeaseEndDate,
    AgreementStatus: tenants.AgreementStatus,
    generatordepoAmt: tenants.generatordepoAmt,
    tenantPaymentMode:
      tenants && tenants.tenantPaymentMode
        ? {
            value: tenants.tenantPaymentMode,
            label: tenants.tenantPaymentMode,
          }
        : "",
  });
  const {
    tenantFileNo,
    tenantDoorNo,
    tenantName,
    tenantPhone,
    tenantFirmName,
    tenantAddr,
    tenantAdharNo,
    tenantPanNo,
    tenantDepositAmt,
    tenantPaymentMode,
    tenantChequenoOrDdno,
    tenantBankName,
    generatordepoAmt,
    tenantchequeDate,
    tenantRentAmount,
    tenantLeaseStartDate,
    tenantLeaseEndDate,
  } = formData;

  const onInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const [entryDate, setEntryDate] = useState(tenants.tenantLeaseStartDate);
  const [leaseEndDate, setLeaseEndDate] = useState(tenants.tenantLeaseEndDate);
  const [newLeaseEndDate, setNewLeaseEndDate] = useState();
  const onDateChangeEntry1 = (e) => {
    setEntryDate(e.target.value);
    var newDate = e.target.value;
    var calDate = new Date(newDate);

    var leaseMonth = allTenantSetting[0].leaseTimePeriod;

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
    var leaseEndDate = dd1 + "-" + mm2 + "-" + yyyy1;
    setLeaseEndDate(leaseEndDate);
    var newLeaseEndDate = yyyy1 + "-" + mm2 + "-" + dd1;
    setNewLeaseEndDate(newLeaseEndDate);
  };
  console.log(leaseEndDate);
  //For setting mindate as todays date
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

  const update = (e) => {
    alert("hai");
  };

  //For setting mindate as todays date

  const onUpdate = (tenants, idx) => {
    const finalData = {
      recordId: tenants ? tenants._id : "",
      tenantDoorNo: tenantDoorNo,
      tenantFileNo: tenantFileNo,
      tenantRentAmount: tenantRentAmount,
      tenantName: tenantName,
      tenantPhone: tenantPhone,
      tenantFirmName: tenantFirmName,
      tenantAddr: tenantAddr,
      tenantAdharNo: tenantAdharNo,
      tenantPanNo: tenantPanNo,
      tenantDepositAmt: tenantDepositAmt,
      tenantBankName: tenantBankName,
      tenantChequenoOrDdno: tenantChequenoOrDdno,
      tenantPaymentMode: tenantPaymentMode.value,
      tenantchequeDate: startSelectedDate,
      tenantLeaseStartDate: entryDate,
      tenantLeaseEndDate: newLeaseEndDate,
      generatordepoAmt: generatordepoAmt,
      AgreementStatus: tenants.AgreementStatus,
      tenantEnteredBy: user && user._id,
      tenantDate: todayDateymd,
    };
    const historyData = {
      tdId: tenants ? tenants._id : "",
      // tenantDoorNo: tenants.tenantDoorNo,
      // tenantFileNo: tenants.tenantFileNo,
      thRentAmount: tenants.tenantRentAmount,
      thName: tenants.tenantName,
      thPhone: tenants.tenantPhone,
      thFirmName: tenants.tenantFirmName,
      thAddr: tenants.tenantAddr,
      thAdharNo: tenants.tenantAdharNo,
      thPanNo: tenants.tenantPanNo,
      thDepositAmt: tenants.tenantDepositAmt,
      thPaymentMode: tenants.tenantPaymentMode,
      thBankName: tenants.tenantBankName,
      thChequenoOrDdno: tenants.tenantChequenoOrDdno,
      thgeneratordepoAmt: tenants.generatordepoAmt,
      thStatus: "Edit",
      // tenantBankName: tenants.tenantBankName,
      // tenantChequenoOrDdno: tenants.tenantChequenoOrDdno,
      // tenantPaymentMode: tenants.tenantPaymentMode.value,
      // tenantchequeDate: tenants.startSelectedDate,
      thLeaseStartDate: tenants.tenantLeaseStartDate,
      thLeaseEndDate: tenants.tenantLeaseEndDate,
      // AgreementStatus: tenants.AgreementStatus,
      thEnteredBy: user && user._id,
      thDate: todayDateymd,
    };
    // console.log(finalData);
    // console.log(historyData);

    tenantsDetailsHistory(historyData);
    UpdateTenantsDetails(finalData);

    onUpdateModalChange(true);
    getAllTenants();
  };
  return !isAuthenticated || !user || !users ? (
    <Fragment></Fragment>
  ) : (
    <Fragment>
      <div className="conatiner-fluid ">
        <div className="row">
          <div className="col-lg-4">
            <label>Name:</label>
            <input
              type="text"
              name="tenantName"
              value={tenantName}
              className="form-control"
              onChange={(e) => onInputChange(e)}
              required
            />
          </div>

          <div className="col-lg-4 ">
            <label>Phone No:</label>
            <input
              type="number"
              name="tenantPhone"
              value={tenantPhone}
              className="form-control"
              onChange={(e) => onInputChange(e)}
              onKeyDown={(e) =>
                (e.keyCode === 69 || e.keyCode === 190) && e.preventDefault()
              }
              required
            />
          </div>
          <div className="col-lg-4">
            <label>Firm Name :</label>
            <input
              type="text"
              name="tenantFirmName"
              value={tenantFirmName}
              className="form-control"
              onChange={(e) => onInputChange(e)}
              required
            />
          </div>

          <div className="col-lg-4 ">
            <label>Adhaar No:</label>
            <input
              type="number"
              name="tenantAdharNo"
              value={tenantAdharNo}
              className="form-control"
              onChange={(e) => onInputChange(e)}
              onKeyDown={(e) =>
                (e.keyCode === 69 || e.keyCode === 190) && e.preventDefault()
              }
              required
            />
          </div>

          <div className="col-lg-4">
            <label>Tenant's Address *:</label>
            <textarea
              name="tenantAddr"
              value={tenantAddr}
              id="tenantAddr"
              className="textarea form-control"
              rows="4"
              placeholder="Address"
              onChange={(e) => onInputChange(e)}
              style={{ width: "100%" }}
              required
            ></textarea>
          </div>

          <div className="col-lg-4">
            <label>BuildingName</label>
            <input
              type="text"
              name="tenantPanNo"
              value={tenantPanNo}
              className="form-control"
              onChange={(e) => onInputChange(e)}
              onKeyDown={(e) =>
                (e.keyCode === 69 || e.keyCode === 190) && e.preventDefault()
              }
              required
            />
          </div>

          <div className="col-lg-4">
            <label>Generator Deposit Amount:</label>
            <input
              type="number"
              name="generatordepoAmt"
              value={generatordepoAmt}
              className="form-control"
              onChange={(e) => onInputChange(e)}
              onKeyDown={(e) =>
                (e.keyCode === 69 || e.keyCode === 190) && e.preventDefault()
              }
              required
            />
          </div>

          <div className="col-lg-4 ">
            <label>Deposit Amount:</label>
            <input
              type="number"
              name="tenantDepositAmt"
              value={tenantDepositAmt}
              className="form-control"
              onChange={(e) => onInputChange(e)}
              onKeyDown={(e) =>
                (e.keyCode === 69 || e.keyCode === 190) && e.preventDefault()
              }
              required
            />
          </div>

          <div className="col-lg-4">
            <label>Mode Of Payment *:</label>
            <Select
              name="tenantPaymentMode"
              options={PaymentMethods}
              isSearchable={false}
              value={tenantPaymentMode}
              placeholder="Select"
              onChange={(e) => onPaymentModeChange(e)}
              theme={(theme) => ({
                ...theme,
                height: 26,
                minHeight: 26,
                borderRadius: 1,
                colors: {
                  ...theme.colors,
                  primary: "black",
                },
              })}
            />
          </div>
        </div>
      </div>

      {showChequenoSection ? (
        <>
          <div className="row col-lg-12 col-md-9 col-sm-9 col-12 py-3">
            <div className="col-lg-4  col-md-4 col-sm-4 col-12">
              <label>Cheque No/DD No :</label>
              <input
                type="text"
                name="tenantChequenoOrDdno"
                value={tenantChequenoOrDdno}
                className="form-control"
                onChange={(e) => onInputChange(e)}
                required
              />
            </div>

            <div className="col-lg-4  col-md-4 col-sm-4 col-12">
              <label>Bank Name :</label>
              <input
                type="text"
                name="tenantBankName"
                value={tenantBankName}
                className="form-control"
                onChange={(e) => onInputChange(e)}
                required
              />
            </div>

            <div className="col-lg-4  col-md-4 col-sm-4 col-12">
              <label>ChequeDate:</label>
              <input
                type="date"
                placeholder="dd/mm/yyyy"
                className="form-control cpp-input datevalidation"
                name="tenantchequeDate"
                value={startSelectedDate}
                onChange={(e) => onDateChange(e)}
                style={{
                  width: "100%",
                }}
              />
            </div>
          </div>
        </>
      ) : (
        <></>
      )}
      {tenants.AgreementStatus && tenants.AgreementStatus === "Active" ? (
        <div className="row col-lg-12 col-md-9 col-sm-9 col-12 py-3">
          <div className="col-lg-4  col-md-4 col-sm-4 col-12">
            <label>Rent Amount :</label>
            <input
              type="number"
              name="tenantRentAmount"
              value={tenantRentAmount}
              className="form-control"
              onChange={(e) => onInputChange(e)}
              onKeyDown={(e) =>
                (e.keyCode === 69 || e.keyCode === 190) && e.preventDefault()
              }
              required
            />
          </div>

          <div className="col-lg-4  col-md-4 col-sm-4 col-12">
            <label>Lease Start Date :</label>
            <input
              type="date"
              placeholder="dd/mm/yyyy"
              className="form-control cpp-input datevalidation"
              name="tenantLeaseStartDate"
              value={entryDate}
              onChange={(e) => onDateChangeEntry1(e)}
              style={{
                width: "100%",
              }}
            />
          </div>

          <div className="col-lg-4  col-md-4 col-sm-4 col-12">
            <label>Lease End Date:</label>
            <br />
            <label>
              <b>{leaseEndDate}</b>
            </label>
          </div>
        </div>
      ) : (
        <Fragment></Fragment>
      )}

      <button
        className="tenantEditSave"
        onClick={update} /*onUpdate(tenants)*/
        style={
          tenantDoorNo !== "" &&
          tenantFileNo !== "" &&
          tenantName !== "" &&
          tenantPaymentMode !== "" &&
          tenantDepositAmt !== "" &&
          tenantRentAmount !== "" &&
          tenantAddr !== ""
            ? { opacity: "1" }
            : { opacity: "1", pointerEvents: "none" }
        }
      >
        Update
      </button>
    </Fragment>
  );
};

EditTenantDetails.propTypes = {
  auth: PropTypes.object.isRequired,
  tenants: PropTypes.object.isRequired,
  UpdateTenantsDetails: PropTypes.func.isRequired,
  getAllTenants: PropTypes.func.isRequired,
  tenantsDetailsHistory: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  tenants1: state.tenants,
});

export default connect(mapStateToProps, {
  UpdateTenantsDetails,
  getAllTenants,
  tenantsDetailsHistory,
})(EditTenantDetails);
