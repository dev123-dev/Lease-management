import React, { useState, Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  AddTenantDetailsform,
  getAllDoorNos,
  getAllSettings,
} from "../../actions/tenants";
import Select from "react-select";
import { Modal } from "react-bootstrap";

const AddTenantDetails = ({
  tenants: { allDoorNos, allTenantSetting },
  auth: { isAuthenticated, user, users, finalDataRep },
  getAllDoorNos,
  AddTenantDetailsform,
  getAllSettings,
}) => {
  useEffect(() => {
    getAllDoorNos();
  }, [getAllDoorNos]);
  useEffect(() => {
    getAllSettings();
  }, [getAllSettings]);

  const PaymentMethods = [
    { value: "Cash", label: "Cash" },
    { value: "Cheque", label: "Cheque" },
  ];

  //formData
  const [formData, setFormData] = useState({
    tenantFileNo: "",
    tenantDoorNo: "",
    tenantName: "",
    tenantPhone: "",
    tenantFirmName: "",
    tenantAddr: "",
    tenantAdharNo: "",
    tenantPanNo: "",
    tenantDepositAmt: "",
    tenantPaymentMode: "",
    tenantBankName: "",
    tenantchequeDate: "",
    tenantRentAmount: "",
    tenantLeaseStartDate: "",
    tenantLeaseEndDate: "",
    tenantEnteredBy: "",
    tenantDate: "",
    generatordepoAmt: "",
    isSubmitted: false,
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
    tenantRentAmount,
    tenantchequeDate,
    tenantLeaseStartDate,
    tenantLeaseEndDate,
    tenantEnteredBy,
    tenantDate,
    generatordepoAmt,
    isSubmitted,
  } = formData;

  const onInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
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

  //For setting mindate as todays date

  const [entryDate, setEntryDate] = useState("");
  const [leaseEndDate, setLeaseEndDate] = useState();
  const [newLeaseEndDate, setNewLeaseEndDate] = useState();

  const onDateChangeEntry = (e) => {
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

  const [showHide, setShowHide] = useState({
    showChequenoSection: false,
  });
  const { showChequenoSection } = showHide;
  const [doorNo, getDoorNoData] = useState();
  const [shopfileNo, setFileNoData] = useState();
  const [shopId, setShopID] = useState();

  const onDoorNoChange = (e) => {
    var shopfileNumber = "";
    var shopdetailsId = "";
    getDoorNoData(e);

    allDoorNos.map((doorno) => {
      if (doorno.shopDoorNo === e.value) {
        shopfileNumber = doorno.shopFileNo;
        shopdetailsId = doorno._id;
      }
    });
    setFileNoData(shopfileNumber);
    setShopID(shopdetailsId);
  };

  const [startSelectedDate, setChequeDate] = useState("");
  const onDateChange = (e) => {
    setChequeDate(e.target.value);
  };
  const [showInformationModal, setShowInformation] = useState(false);

  const handleInformationModalClose = () => setShowInformation(false);
  const LogoutModalClose = () => {
    handleInformationModalClose();
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
  const shopdoorNo = [];
  allDoorNos.map((doorno) =>
    shopdoorNo.push({
      label: doorno.shopDoorNo,
      value: doorno.shopDoorNo,
    })
  );
  var dt = new Date(finalDataRep.yearSearch + "-" + finalDataRep.monthSearch);

  const onSubmit = () => {
    const finalData = {
      tenantFileNo: tenantFileNo,
      tenantDoorNo: tenantDoorNo,
      tenantName: tenantName,
      tenantPhone: tenantPhone,
      tenantFirmName: tenantFirmName,
      tenantAddr: tenantAddr,
      tenantAdharNo: tenantAdharNo,
      tenantPanNo: tenantPanNo,
      tenantDepositAmt: tenantDepositAmt,
      tenantPaymentMode: tenantPaymentMode.value,
      tenantChequenoOrDdno: tenantChequenoOrDdno,
      tenantBankName: tenantBankName,
      tenantchequeDate: startSelectedDate,
      tenantRentAmount: tenantRentAmount,
      tenantLeaseStartDate: entryDate,
      tenantLeaseEndDate: newLeaseEndDate,
      shopId: shopId,
      generatordepoAmt: generatordepoAmt,
      tenantEnteredBy: user && user._id,
      tenantDate: todayDateymd,
      selectedY: finalDataRep.yearSearch,
      selectedVal: dt,
    };
    AddTenantDetailsform(finalData);
    setFormData({
      ...formData,
      tenantFileNo: "",
      tenantDoorNo: "",
      tenantName: "",
      tenantPhone: "",
      tenantFirmName: "",
      tenantAddr: "",
      tenantAdharNo: "",
      tenantPanNo: "",
      tenantDepositAmt: "",
      tenantPaymentMode: "",
      tenantBankName: "",
      tenantchequeDate: "",
      tenantRentAmount: "",
      tenantLeaseEndDate: "",
      tenantChequenoOrDdno: "",
      generatordepoAmt: "",
    });
    setShowInformation(true);
    setEntryDate("");
    getDoorNoData("");
    setLeaseEndDate("");
    setNewLeaseEndDate("");
    setChequeDate("");
    setFileNoData("");
  };

  return !isAuthenticated || !user || !users ? (
    <Fragment></Fragment>
  ) : (
    <Fragment>
      <div className="container container_align">
        <section className="sub_reg">
          <div className="col-lg-5 col-md-12 col-sm-12 col-12 ">
            <h2 className="heading_color">Add Tenant Details </h2>
          </div>
          <div className="row col-lg-12 col-md-9 col-sm-9 col-12 py-3">
            <div className="col-lg-4  col-md-4 col-sm-4 col-12">
              <label>Door No*:</label>
              <input
                type="text"
                name="tenantDoorNo"
                value={tenantDoorNo}
                className="form-control"
                onChange={(e) => onInputChange(e)}
                required
              />
            </div>

            <div className="col-lg-4 col-md-4 col-sm-4 col-12">
              <label> File No* :</label>
              <input
                type="text"
                name="tenantFileNo"
                value={tenantFileNo}
                className="form-control"
                onChange={(e) => onInputChange(e)}
                required
              />
            </div>

            <div className="col-lg-4  col-md-4 col-sm-4 col-12">
              <label>Tenant Name *:</label>
              <input
                type="text"
                name="tenantName"
                value={tenantName}
                className="form-control"
                onChange={(e) => onInputChange(e)}
                required
              />
            </div>
            <div className="row col-lg-8 col-md-9 col-sm-9 col-12 no_padding ">
              <div className="col-lg-6 col-md-4 col-sm-4 col-12">
                <label>Phone No:</label>
                <input
                  type="number"
                  name="tenantPhone"
                  value={tenantPhone}
                  className="form-control"
                  onChange={(e) => onInputChange(e)}
                  onKeyDown={(e) =>
                    (e.keyCode === 69 || e.keyCode === 190) &&
                    e.preventDefault()
                  }
                  required
                />
              </div>
              <div className="col-lg-6 col-md-4 col-sm-4 col-12">
                <label> Firm Name :</label>
                <input
                  type="text"
                  name="tenantFirmName"
                  value={tenantFirmName}
                  className="form-control"
                  onChange={(e) => onInputChange(e)}
                  required
                />
              </div>
              <div className="col-lg-6 col-md-4 col-sm-4 col-12">
                <label>Adhaar No:</label>
                <input
                  type="number"
                  name="tenantAdharNo"
                  value={tenantAdharNo}
                  className="form-control"
                  onChange={(e) => onInputChange(e)}
                  onKeyDown={(e) =>
                    (e.keyCode === 69 || e.keyCode === 190) &&
                    e.preventDefault()
                  }
                  required
                />
              </div>
              <div className="col-lg-6 col-md-4 col-sm-4 col-12">
                <label>Pan Card No:</label>
                <input
                  type="text"
                  name="tenantPanNo"
                  value={tenantPanNo}
                  className="form-control"
                  onChange={(e) => onInputChange(e)}
                  onKeyDown={(e) =>
                    (e.keyCode === 69 || e.keyCode === 190) &&
                    e.preventDefault()
                  }
                  required
                />
              </div>
            </div>
            <div className="col-lg-4 col-md-4 col-sm-6 col-12">
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
          </div>

          <div className="row col-lg-12 col-md-9 col-sm-9 col-12 py-3">
            <div className="col-lg-4  col-md-4 col-sm-4 col-12">
              <label>Deposit Amount *:</label>
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
            <div className="col-lg-4  col-md-4 col-sm-4 col-12">
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
            <div className="col-lg-4 col-md-4 col-sm-4 col-12">
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
          {showChequenoSection && (
            <div className="row col-lg-12 col-md-9 col-sm-9 col-12 py-3">
              {/* <div className="col-lg-2 col-md-4 col-sm-4 col-12">
              
              </div> */}

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
              {/* <div className="col-lg-2 col-md-4 col-sm-4 col-12">
               
              </div> */}

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
              {/* <div className="col-lg-1 col-md-4 col-sm-4 col-12"></div> */}
              <div className="col-lg-4  col-md-4 col-sm-4 col-12">
                <label>ChequeDate:</label>
                <br />
                <input
                  type="date"
                  placeholder="dd/mm/yyyy"
                  className="form-control cpp-input datevalidation"
                  name="tenantchequeDate"
                  value={startSelectedDate}
                  onChange={(e) => onDateChange(e)}
                  style={{
                    width: "75%",
                  }}
                />
              </div>
            </div>
          )}
          <div className="row col-lg-12 col-md-9 col-sm-9 col-12 py-3">
            <div className="col-lg-4  col-md-4 col-sm-4 col-12">
              <label> Rent Amount *:</label>
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
              <label> Lease Start Date *:</label>
              <br />
              <input
                type="date"
                placeholder="dd/mm/yyyy"
                className="form-control cpp-input datevalidation"
                name="tenantLeaseStartDate"
                value={entryDate}
                onChange={(e) => onDateChangeEntry(e)}
                style={{
                  width: "55%",
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

          <div className="col-lg-12 Savebutton " size="lg">
            <button
              variant="success"
              className="btn sub_form btn_continue Save float-right"
              onClick={() => onSubmit()}
              style={
                tenantDoorNo !== "" &&
                tenantFileNo !== "" &&
                tenantName !== "" &&
                tenantPaymentMode !== "" &&
                tenantDepositAmt !== "" &&
                tenantRentAmount !== "" &&
                entryDate !== "" &&
                tenantAddr !== ""
                  ? { opacity: "1" }
                  : { opacity: "1", pointerEvents: "none" }
              }
            >
              Save
            </button>
          </div>
        </section>
        <Modal
          show={showInformationModal}
          backdrop="static"
          keyboard={false}
          aria-labelledby="contained-modal-title-vcenter"
          centered
          className="logout-modal"
        >
          <Modal.Header className="confirmbox-heading">
            <h4 className="mt-0">Information</h4>
          </Modal.Header>
          <Modal.Body>
            <h5>Shop Details Added!!</h5>
          </Modal.Body>
          <Modal.Footer>
            <button
              className="btn btn_green_bg"
              onClick={() => LogoutModalClose()}
            >
              OK
            </button>
          </Modal.Footer>
        </Modal>
      </div>
    </Fragment>
  );
};

AddTenantDetails.propTypes = {
  auth: PropTypes.object.isRequired,
  tenants: PropTypes.object.isRequired,
  AddTenantDetailsform: PropTypes.func.isRequired,
  getAllDoorNos: PropTypes.func.isRequired,
  getAllSettings: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  tenants: state.tenants,
});

export default connect(mapStateToProps, {
  AddTenantDetailsform,
  getAllDoorNos,
  getAllSettings,
})(AddTenantDetails);
