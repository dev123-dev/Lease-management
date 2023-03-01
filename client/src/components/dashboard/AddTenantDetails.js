import React, { useState, Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  AddTenantDetailsform,
  getAllDoorNos,
  getAllSettings,
} from "../../actions/tenants";
import Select from "react-select";
import { Button, Modal } from "react-bootstrap";
import { Model } from "mongoose";
import "../../../../client/src/styles/CustomisedStyle.css";

const AddTenantDetails = ({
  tenants: { allDoorNos, allTenantSetting, particular_org_data  },
  auth: { isAuthenticated, user, users, finalDataRep },
  getAllDoorNos,
  AddTenantDetailsform,
  Addorgform,
  getAllSettings,
}) => {
  useEffect(() => {
    getAllDoorNos();
  }, [getAllDoorNos]);
  useEffect(() => {
    getAllSettings();
    console.log(" particular_org_data ", particular_org_data )

  }, [getAllSettings]);

const [doorno, setdno] = useState([]);
const DnoList = [];
particular_org_data.shopDoorNo
&&
particular_org_data.shopDoorNo.map((dorno) => {
  DnoList.push({
    value: dorno,
    label: dorno,
  });
});
const onchangeDoor=(e)=>{
  setdno(e);
}


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

  //tenant data
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
  // const shopdoorNo = [];
  // allDoorNos.map((doorno) =>
  //   shopdoorNo.push({
  //     label: doorno.shopDoorNo,
  //     value: doorno.shopDoorNo,
  //   })
  // );

 
  
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

    //handleInformationModalOpen();
    //setShowInformation(true);
    setEntryDate("");
    getDoorNoData("");
    setLeaseEndDate("");
    setNewLeaseEndDate("");
    setChequeDate("");
    setFileNoData("");
  };
  const [showInformationModal, setShowInformation] = useState(false);
  const handleInformationModalOpen = () => setShowInformation(true);
  const LogoutModalOpen = () => {
    handleInformationModalOpen();
  };
  const handleInformationModalClose = () => setShowInformation(false);
  const LogoutModalClose = () => {
    handleInformationModalClose();
  };

  return !isAuthenticated || !user || !users ? (
    <Fragment></Fragment>
  ) : (
    <>
      <img
        onClick={handleInformationModalOpen}
        src={require("../../static/images/add-icon.png")}
        alt="Add Shop"
        title="Add Shop"
      />

      <Modal
        show={showInformationModal}
        backdrop="static"
        keyboard={false}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        className="logout-modal"
      >
        <Modal.Header>
          <div className=" row col-lg-12 col-md-12 col-sm-12 col-12 ">
            <h2>
              <b className="text-center h1">ADD TENANT DETAILS</b>
            </h2>

            <div className=" col-lg-2">
              <button
                onClick={handleInformationModalClose}
                className="close ml-5 cl"
              >
                <img
                  src={require("../../static/images/close.png")}
                  alt="X"
                  style={{ height: "20px", width: "20px" }}
                />
              </button>
            </div>
          </div>
        </Modal.Header>
        <Modal.Body>
          <div className="container-fluid">
            <div className="row">
              <div className="col-lg-4">
                <label className="ml-2">
                  DoorNo{" "}
                  <i className="text-danger  ">
                    <b>*</b>
                  </i>
                </label>
                <Select
                  name="doorno"
                  options={DnoList}
                  value={doorno}
                  onChange={(e) => onchangeDoor(e)}
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
                ></Select>
                <br></br>
                
              </div>
              <div className="col-lg-4">
                <label className="ml-2">
                  FileNo{" "}
                  <i className="text-danger  ">
                    <b>*</b>
                  </i>
                </label>
                <input
                  type="text"
                  name="tenantFileNo"
                  value={tenantFileNo}
                  className="form-control"
                  onChange={(e) => onInputChange(e)}
                  required
                />
              </div>
              <div className="col-lg-4">
                <label className="ml-2">
                  TenantName{" "}
                  <i className="text-danger  ">
                    <b>*</b>
                  </i>
                </label>
                <input
                  type="text"
                  name="tenantName"
                  value={tenantName}
                  className="form-control"
                  onChange={(e) => onInputChange(e)}
                  required
                />
              </div>

              <div className="col-lg-4">
                PhoneNo
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
                />{" "}
                <br></br>
              </div>
              <div className="col-lg-4">
                FirmName
                <input
                  type="text"
                  name="tenantFirmName"
                  value={tenantFirmName}
                  className="form-control"
                  onChange={(e) => onInputChange(e)}
                  required
                />
              </div>
              <div className="col-lg-4">
                Adhaar No
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

              <div className="col-lg-4">
                <label className="ml-2">
                  BuildingName{" "}
                  <i className="text-danger  ">
                    <b>*</b>
                  </i>
                </label>
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
                />{" "}
                <br></br>
              </div>
              <div className="col-lg-4">
                <label className="ml-2">
                  RentAmount{" "}
                  <i className="text-danger  ">
                    <b>*</b>
                  </i>
                </label>
                <input
                  type="number"
                  name="tenantRentAmount"
                  value={tenantRentAmount}
                  className="form-control"
                  onChange={(e) => onInputChange(e)}
                  onKeyDown={(e) =>
                    (e.keyCode === 69 || e.keyCode === 190) &&
                    e.preventDefault()
                  }
                  required
                />
              </div>
              <div className="col-lg-4">
                <label className="ml-2">
                  DepositAmount{" "}
                  <i className="text-danger  ">
                    <b>*</b>
                  </i>
                </label>
                <input
                  type="number"
                  name="tenantDepositAmt"
                  value={tenantDepositAmt}
                  className="form-control"
                  onChange={(e) => onInputChange(e)}
                  onKeyDown={(e) =>
                    (e.keyCode === 69 || e.keyCode === 190) &&
                    e.preventDefault()
                  }
                  required
                />
              </div>
              <div className="col-lg-4">
                <label className="ml-2">
                  GeneratorDepositAmount{" "}
                  <i className="text-danger  ">
                    <b>*</b>
                  </i>
                </label>
                <input
                  type="number"
                  name="generatordepoAmt"
                  value={generatordepoAmt}
                  className="form-control"
                  onChange={(e) => onInputChange(e)}
                  onKeyDown={(e) =>
                    (e.keyCode === 69 || e.keyCode === 190) &&
                    e.preventDefault()
                  }
                  required
                />
                <br></br>
              </div>
              <div className="col-lg-4">
                Mode Of Payment
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

              <div className="col-lg-4">
                LeaseStartDate
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
              <div className="col-lg-12">
                {showChequenoSection ? (
                  <>
                    <div className="container-fluid">
                      <div className="row">
                        <div className="  col-lg-4">
                          Cheque No/DD No
                          <input
                            type="text"
                            name="tenantChequenoOrDdno"
                            value={tenantChequenoOrDdno}
                            className="form-control"
                            onChange={(e) => onInputChange(e)}
                            required
                          />
                          <br></br>
                        </div>

                        <div className=" col-lg-4">
                          BankName :
                          <input
                            type="text"
                            name="tenantBankName"
                            value={tenantBankName}
                            className="form-control"
                            onChange={(e) => onInputChange(e)}
                            required
                          />
                        </div>
                        <div className="  col-lg-4">
                          ChequeDate:
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
                    </div>
                  </>
                ) : (
                  <></>
                )}
              </div>

              <div className="col-lg-8">
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
                ></textarea>{" "}
              </div>
              <div className="col-lg-3">
                <label>Lease End Date:</label>
                <br />
                <label>
                  <b>{leaseEndDate}</b>
                </label>
              </div>
              <div className="col-lg-12">
                <button
                  variant="success"
                  className="btn sub_form btn_continue Save float-right"
                  id="savebtnt"
                  onClick={() => onSubmit()}
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </Modal.Body>

        {/* <Modal
          show={showInformationModal}
          backdrop="static"
          keyboard={false}
          aria-labelledby="contained-modal-title-vcenter"
          centered
          className="logout-modal model_bck"
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
        </Modal> */}
      </Modal>
    </>
  );
};

AddTenantDetails.propTypes = {
  auth: PropTypes.object.isRequired,
  tenants: PropTypes.object.isRequired,
  AddTenantDetailsform: PropTypes.func.isRequired,
  getAllDoorNos: PropTypes.func.isRequired,
  getAllSettings: PropTypes.func.isRequired,
};

//
const mapStateToProps = (state) => ({
  auth: state.auth,
  tenants: state.tenants,
});

export default connect(mapStateToProps, {
  AddTenantDetailsform,
  getAllDoorNos,
  getAllSettings,
})(AddTenantDetails);
