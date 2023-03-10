import React, { useState, Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { UpdateTenantsDetails } from "../../actions/tenants";
import {
  getAllTenants,
  getParticularProperty,
  getParticularTenantSetting,
  tenantsDetailsHistory,
} from "../../actions/tenants";
import Select from "react-select";
import { Modal, Button } from "react-bootstrap";
import tenants from "../../reducers/tenants";
const EditTenantDetails = ({
  auth: { isAuthenticated, user, users },
  tenants1: { allTenantSetting },
  tenants: { particular_org_data, get_Particular_org_Tenantsetting },
  tenantsdetails,
  UpdateTenantsDetails,
  onUpdateModalChange,
  tenantsDetailsHistory,
  getAllTenants,
  getParticularTenantSetting,
  getParticularProperty,
}) => {
  useEffect(() => {
    getParticularProperty({ OrganizationId: user.OrganizationId });
    getParticularTenantSetting({
      OrganizationId: user && user.OrganizationId,
    });
    getAllTenants();
  }, []);

  // building name start
  const [buildingData, getbuildingData] = useState();
  const [buildingId, setBuildingID] = useState();
  const [buildingName, setBuildingName] = useState();

  const allBuildingNames = [];
  particular_org_data.map((buildingData) =>
    allBuildingNames.push({
      buildingId: buildingData._id,
      label: buildingData.buildingName,
      value: buildingData._id,
    })
  );

  // building name end
  // location listing start
  const [DnoList, setDnoList] = useState([]);
  const [LocList, SetLocList] = useState([]);

  const LocName = [];
  particular_org_data.map((loc) => {
    LocName.push({
      label: loc.Location,
      value: loc._id,
    });
  });

  const onBuildingChange = (e) => {
    setBuildingID(e.value);
    setBuildingName(e.label);
    let temp = []; //here we are adding blank arrray bcz to refresh everytime when new name is selected
    particular_org_data &&
      particular_org_data.map((ele) => {
        if (e.buildingId == ele._id) {
          SetLocList(ele.Location);
          ele.shopDoorNo.map((doornumber) => {
            temp.push({
              label: doornumber,
              value: doornumber,
            });
          });
        }
        setDnoList(temp);
      });

    getbuildingData(e);
    setBuildingID(e.buildingId ? e.buildingId : null);
    setBuildingName(e.label ? e.label : "");
  };

  // location listing end

  const PaymentMethods = [
    { value: "Cash", label: "Cash" },
    { value: "Cheque", label: "Cheque" },
  ];
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
    tenantId: tenantsdetails._id,
    tenantDoorNo: tenantsdetails.tenantDoorNo,
    tenantFileNo: tenantsdetails.tenantFileNo,
    tenantRentAmount: tenantsdetails.tenantRentAmount,
    tenantName: tenantsdetails.tenantName,
    tenantPhone: tenantsdetails.tenantPhone,
    tenantFirmName: tenantsdetails.tenantFirmName,
    tenantAddr: tenantsdetails.tenantAddr,
    tenantAdharNo: tenantsdetails.tenantAdharNo,
    tenantPanNo: tenantsdetails.tenantPanNo,
    tenantDepositAmt: tenantsdetails.tenantDepositAmt,
    tenantBankName: tenantsdetails.tenantBankName,
    tenantChequenoOrDdno: tenantsdetails.tenantChequenoOrDdno
      ? tenantsdetails.tenantChequenoOrDdno
      : "null",
    startSelectedDate: tenantsdetails.tenantchequeDate,
    tenantLeaseStartDate: tenantsdetails.tenantLeaseStartDate,
    tenantLeaseEndDate: tenantsdetails.tenantLeaseEndDate,
    AgreementStatus: tenantsdetails.AgreementStatus,
    generatordepoAmt: tenantsdetails.generatordepoAmt,
    tenantPaymentMode:
      tenantsdetails && tenantsdetails.tenantPaymentMode
        ? {
            value: tenantsdetails.tenantPaymentMode,
            label: tenantsdetails.tenantPaymentMode,
          }
        : "null",
  });
  const {
    tenantId,
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

  const [doorno, setdno] = useState([]);
  const onchangeDoor = (e) => {
    setdno(e);
  };
  const onDateChangeEntry = (e) => {
    setEntryDate(e.target.value);
    var newDate = e.target.value;
    var calDate = new Date(newDate);

    var leaseMonth = get_Particular_org_Tenantsetting[0].leaseTimePeriod;

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

  const [entryDate, setEntryDate] = useState(tenants.tenantLeaseStartDate);
  const [leaseEndDate, setLeaseEndDate] = useState(tenants.tenantLeaseEndDate);
  const [newLeaseEndDate, setNewLeaseEndDate] = useState("null");

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

  const onUpdate = (tenantsdetails, idx) => {
    //  onDateChangeEntry1();
    const finalData = {
      recordId: tenantId,
      OrganizationId: user && user.OrganizationId,
      OrganizationName: user && user.OrganizationName,
      tenantDoorNo: doorno,
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
      //AgreementStatus: tenants.AgreementStatus,
      tenantEnteredBy: user && user._id,
      tenantDate: todayDateymd,
    };
    UpdateTenantsDetails(finalData);

    const historyData = {
      tdId: tenantId,
      tenantDoorNo: tenantsdetails.tenantDoorNo,
      tenantFileNo: tenantsdetails.tenantFileNo,
      thRentAmount: tenantsdetails.tenantRentAmount,
      thName: tenantsdetails.tenantName,
      thPhone: tenantsdetails.tenantPhone,
      thFirmName: tenantsdetails.tenantFirmName,
      thAddr: tenantsdetails.tenantAddr,
      thAdharNo: tenantsdetails.tenantAdharNo,
      thPanNo: tenantsdetails.tenantPanNo,
      thDepositAmt: tenantsdetails.tenantDepositAmt,
      thPaymentMode: tenantsdetails.tenantPaymentMode,
      thBankName: tenantsdetails.tenantBankName,
      thChequenoOrDdno: tenantsdetails.tenantChequenoOrDdno,
      thgeneratordepoAmt: tenantsdetails.generatordepoAmt,
      thStatus: "Edit",
      tenantBankName: tenantsdetails.tenantBankName,
      //tenantChequenoOrDdno: tenants.tenantChequenoOrDdno,
      tenantPaymentMode: "",
      tenantchequeDate: tenantsdetails.startSelectedDate
        ? tenantsdetails.startSelectedDate
        : "",
      thLeaseStartDate: tenantsdetails.tenantLeaseStartDate,
      thLeaseEndDate: tenantsdetails.tenantLeaseEndDate,
      AgreementStatus: tenantsdetails.AgreementStatus,
      thEnteredBy: user && user._id,
      thDate: todayDateymd,
    };

    tenantsDetailsHistory(historyData);

    onUpdateModalChange(true);
  };
  return !isAuthenticated || !user || !users ? (
    <Fragment></Fragment>
  ) : (
    <Fragment>
      <div className="conatiner-fluid ">
        <div className="row">
          <div className="col-lg-4">
            <label className="ml-2">Property Name:</label>
            <Select
              name="Property name"
              options={allBuildingNames}
              value={buildingData}
              onChange={(e) => onBuildingChange(e)}
            ></Select>
          </div>
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
            ></Select>
            <br></br>
          </div>
          <div className="col-lg-4">
            <label className="ml-2">
              Location{" "}
              <i className="text-danger  ">
                <b>*</b>
              </i>
            </label>
            <input
              type="text"
              placeholder={LocList}
              className="form-control"
            ></input>
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
              placeholder="FileNo"
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
              placeholder="Name"
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
            <br></br>
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
            <label className="ml-2">
              Tenant Pan Number{" "}
              <i className="text-danger  ">
                <b>*</b>
              </i>
            </label>
            <input
              type="text"
              name="tenantPanNo"
              placeholder="PanNo"
              value={tenantPanNo}
              className="form-control"
              onChange={(e) => onInputChange(e)}
              onKeyDown={(e) =>
                (e.keyCode === 69 || e.keyCode === 190) && e.preventDefault()
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
              placeholder="RentAmount"
              value={tenantRentAmount}
              className="form-control"
              onChange={(e) => onInputChange(e)}
              onKeyDown={(e) =>
                (e.keyCode === 69 || e.keyCode === 190) && e.preventDefault()
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
              placeholder="DepositAmount"
              className="form-control"
              onChange={(e) => onInputChange(e)}
              onKeyDown={(e) =>
                (e.keyCode === 69 || e.keyCode === 190) && e.preventDefault()
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
              placeholder="GeneratorDepositAmount"
              value={generatordepoAmt}
              className="form-control"
              onChange={(e) => onInputChange(e)}
              onKeyDown={(e) =>
                (e.keyCode === 69 || e.keyCode === 190) && e.preventDefault()
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
              placeholder="Select..."
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
                width: "100%",
              }}
            />
          </div>
          <div className="col-lg-4 ">
            <label>Lease End Date:</label>
            <br />
            <label>
              <b>{leaseEndDate}</b>
            </label>
          </div>

          <div className="col-lg-12">
            {showChequenoSection ? (
              <>
                <div className="container-fluid">
                  <div className="row">
                    <div className="  col-lg-4">
                      <label>Cheque No/DD No :</label>
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
                </div>
              </>
            ) : (
              <></>
            )}
          </div>

          <div className="col-lg-8  col-md-4 col-sm-4 col-12">
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

          <div className="col-lg-12">
            <button
              variant="success"
              className="btn sub_form btn_continue Save float-right"
              id="savebtn"
              onClick={() => onUpdate()}
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  tenants1: state.tenants,
  tenants: state.tenants,
});

export default connect(mapStateToProps, {
  UpdateTenantsDetails,
  getAllTenants,
  getParticularProperty,
  tenantsDetailsHistory,
  getParticularTenantSetting,
})(EditTenantDetails);
