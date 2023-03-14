import React, { useState, Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  AddTenantDetailsform,
  getParticularProperty,
  getAllDoorNos,
  getAllTenants,
  getParticularTenantSetting,
  getAllSettings,
} from "../../actions/tenants";
import { v4 as uuid } from "uuid";
import Select from "react-select";
import { Modal, Button } from "react-bootstrap";
import "../../../../client/src/styles/CustomisedStyle.css";

const AddTenantDetails = ({
  setFreshPage,
  freshpage,
  auth: { isAuthenticated, user, users, finalDataRep },
  tenants: {
    allDoorNos,
    particular_org_data,
    get_Particular_org_Tenantsetting,
  },
  setShowadd,
  getAllDoorNos,
  getParticularProperty,
  AddTenantDetailsform,

  getParticularTenantSetting,
  getAllSettings,
}) => {
  useEffect(() => {
    getParticularProperty({ OrganizationId: user.OrganizationId });
    getParticularTenantSetting({ OrganizationId: user.OrganizationId });
  }, []);

  useEffect(() => {
    getAllDoorNos();
  }, [getAllDoorNos]);
  useEffect(() => {
    getAllSettings();
  }, [getAllSettings]);
  const [doorno, setdno] = useState([]);

  const onchangeDoor = (e) => {
    setdno(e);
  };

  const PaymentMethods = [
    { value: "Cash", label: "Cash" },
    { value: "Cheque", label: "Cheque" },
  ];
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
              value: doornumber, //uuid(),
            });
          });
        }
        setDnoList(temp);
      });
    console.log("door list", DnoList);
    getbuildingData(e);
    setBuildingID(e.buildingId ? e.buildingId : null);
    setBuildingName(e.label ? e.label : "");
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

  var dt = new Date(finalDataRep.yearSearch + "-" + finalDataRep.monthSearch);
  const [fill, setfill] = useState(false);

  const onSubmit = () => {
    if (
      buildingName === "" ||
      doorno === "" ||
      LocList === "" ||
      tenantFileNo === "" ||
      tenantName === "" ||
      tenantRentAmount === "" ||
      tenantDepositAmt === "" ||
      tenantPaymentMode === "" ||
      entryDate === "" ||
      tenantAddr === ""
    ) {
      setfill(true);
    } else {
      const finalData = {
        OrganizationName: user.OrganizationName,
        OrganizationId: user.OrganizationId,
        BuildingName: buildingName,
        BuildingId: buildingId,
        Location: LocList,
        tenantFileNo: tenantFileNo,
        tenantDoorNo: doorno,
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
        generatordepoAmt: generatordepoAmt,
        tenantEnteredBy: user && user._id,
        tenantDate: todayDateymd,
        selectedY: finalDataRep.yearSearch,
        selectedVal: dt,
      };

      AddTenantDetailsform(finalData);
      setFreshPage(!freshpage);

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

      setEntryDate("");
      getDoorNoData("");
      setLeaseEndDate("");
      setNewLeaseEndDate("");
      setChequeDate("");
      setFileNoData("");
      setShowadd(false);
    }
  };

  return !isAuthenticated || !user || !users ? (
    <Fragment></Fragment>
  ) : (
    <>
      <Modal.Header>
        <div className=" row col-lg-12 col-md-12 col-sm-12 col-12 modhead ">
          <h3>
            <b className="text-center ">ADD TENANT DETAILS</b>
          </h3>
        </div>
        <div className=" col-lg-2">
          <button className="close" onClick={() => setShowadd(false)}>
            <img
              className="mr-5"
              src={require("../../static/images/close.png")}
              alt="X"
              style={{ height: "20px", width: "20px" }}
            />
          </button>
        </div>
      </Modal.Header>
      <Modal.Body>
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-4">
              <label className="ml-2">
                Property Name{" "}
                <i className="text-danger  ">
                  <b>*</b>
                </i>
              </label>
              <Select
                name="Property name"
                options={allBuildingNames}
                value={buildingData}
                onChange={(e) => onBuildingChange(e)}
              ></Select>
              <br></br>
            </div>
            <div className="col-lg-4">
              <label className="ml-2">
                Door No{" "}
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
                File No{" "}
                <i className="text-danger  ">
                  <b>*</b>
                </i>
              </label>
              <input
                type="text"
                name="tenantFileNo"
                placeholder="File No"
                value={tenantFileNo}
                className="form-control"
                onChange={(e) => onInputChange(e)}
                required
              />
            </div>
            <div className="col-lg-4">
              <label className="ml-2">
                Tenant Name{" "}
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
            <div className="col-lg-4">
              Phone No
              <input
                type="number"
                name="tenantPhone"
                placeholder="Phone No"
                value={tenantPhone}
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
              Firm Name
              <input
                type="text"
                name="tenantFirmName"
                placeholder="Firm Name"
                value={tenantFirmName}
                className="form-control"
                onChange={(e) => onInputChange(e)}
                required
              />
            </div>
            <div className="col-lg-4">
              Aadhaar No
              <input
                type="number"
                name="tenantAdharNo"
                placeholder="Aadhar No"
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
              <label className="ml-2">Pan Number </label>
              <input
                type="text"
                name="tenantPanNo"
                placeholder="Pan No"
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
                Rent Amount{" "}
                <i className="text-danger  ">
                  <b>*</b>
                </i>
              </label>
              <input
                type="number"
                name="tenantRentAmount"
                placeholder="Rent Amount"
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
                Deposit Amount{" "}
                <i className="text-danger  ">
                  <b>*</b>
                </i>
              </label>
              <input
                type="number"
                name="tenantDepositAmt"
                value={tenantDepositAmt}
                placeholder="Deposit Amount"
                className="form-control"
                onChange={(e) => onInputChange(e)}
                onKeyDown={(e) =>
                  (e.keyCode === 69 || e.keyCode === 190) && e.preventDefault()
                }
                required
              />
            </div>
            <div className="col-lg-4">
              <label className="ml-2">Generator Deposit Amount </label>
              <input
                type="number"
                name="generatordepoAmt"
                placeholder="GeneratorDeposit Amount"
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
              <i className="text-danger  ">
                <b>*</b>
              </i>
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
              <br></br>
            </div>{" "}
            <div className="col-lg-4">
              Lease Start Date{" "}
              <i className="text-danger  ">
                <b>*</b>
              </i>
              <input
                type="date"
                placeholder="dd-mm-yyyy"
                className="form-control cpp-input datevalidation"
                name="tenantLeaseStartDate"
                value={entryDate}
                onChange={(e) => onDateChangeEntry(e)}
                style={{
                  width: "100%",
                }}
              />{" "}
              <br></br>
            </div>{" "}
            <div className="col-lg-4 ">
              Lease End Date{" "}
              <i className="text-danger  ">
                <b>*</b>
              </i>
              <input
                placeholder="dd-mm-yyyy"
                className="form-control cpp-input datevalidation"
                value={leaseEndDate}
              ></input>
              <br></br>
            </div>{" "}
            <div className="col-lg-12">
              {showChequenoSection ? (
                <>
                  <div className="row">
                    <div className="  col-lg-4 ">
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
                      Bank Name :
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
                      Cheque Date:
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
            </div>
            <div className="col-lg-8">
              <label>
                Tenant's Address{" "}
                <i className="text-danger  ">
                  <b>*</b>
                </i>
              </label>
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
            <h5 className="Uservalidation">
              {fill ? <>Please fill all Mandatory(*) fields..!!</> : <></>}
            </h5>
            <div className="col-lg-12">
              <button
                variant="success"
                className="btn sub_form btn_continue Save float-right"
                id="savebtn"
                onClick={() => onSubmit()}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </Modal.Body>
    </>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  tenants: state.tenants,
});

export default connect(mapStateToProps, {
  AddTenantDetailsform,
  getAllDoorNos,
  getAllSettings,
  getAllTenants,
  getParticularTenantSetting,
  getParticularProperty,
})(AddTenantDetails);
