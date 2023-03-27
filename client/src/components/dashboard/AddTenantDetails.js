import React, { useState, Fragment, useEffect } from "react";
import { connect } from "react-redux";
import {
  AddTenantDetailsform,
  getParticularProperty,
  getAllDoorNos,
  getAllTenants,
  getAllSettings,
} from "../../actions/tenants";
import Select from "react-select";
import { Modal } from "react-bootstrap";
import "../../../../client/src/styles/CustomisedStyle.css";
import { Link } from "react-router-dom";

const AddTenantDetails = ({
  auth: { isAuthenticated, user, users, finalDataRep },
  tenants: { allDoorNos, particular_org_data, allTenantSetting },
  setShowadd,
  getAllDoorNos,
  getParticularProperty,
  AddTenantDetailsform,
  getAllSettings,
}) => {
  const myuser = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    getParticularProperty({ OrganizationId: myuser.OrganizationId });
    getAllSettings({
      OrganizationId: myuser && myuser.OrganizationId,
      userId: myuser && myuser._id,
    });
  }, []);
  const [showInformationModal, setShowInformation] = useState(false);

  const handleInformationModalClose = () => setShowInformation(false);
  const LogoutModalClose = () => {
    handleInformationModalClose();
  };
  useEffect(() => {
    getAllDoorNos();
  }, [getAllDoorNos]);
  useEffect(() => {}, [getAllSettings]);
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

  const funcKeyDown = (e) => {
    ["e", "E", "+", "-"].includes(e.key) && e.preventDefault();
  };

  const [entryDate, setEntryDate] = useState("");
  const [leaseEndDate, setLeaseEndDate] = useState();
  const [newLeaseEndDate, setNewLeaseEndDate] = useState();

  const [buildingData, getbuildingData] = useState();
  const [buildingId, setBuildingID] = useState();
  const [buildingName, setBuildingName] = useState();

  //this code is used to filter out only those building whose room number is avaiable if not avaiable it will not display the building name
  let AvaiableRoomBuilding = particular_org_data.filter(
    (item) =>
      !item.shopDoorNo.every((nameItem) => nameItem.status !== "Avaiable")
  );
  const allBuildingNames = [];
  AvaiableRoomBuilding.map((buildingData) =>
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
    AvaiableRoomBuilding &&
      AvaiableRoomBuilding.map((ele) => {
        if (e.buildingId === ele._id) {
          SetLocList(ele.Location);
          ele.shopDoorNo.map((doornumber) => {
            if (doornumber.status === "Avaiable") {
              temp.push({
                label: doornumber.doorNo,
                value: doornumber.doorNo,
                status: "Acquired",
              });
            } else {
              temp.push({
                label: "Blank",
              });
            }
          });
        }
        setDnoList(temp);
      });

    getbuildingData(e);
    setBuildingID(e.buildingId ? e.buildingId : null);
    setBuildingName(e.label ? e.label : "");
  };

  const onDateChangeEntry = (e) => {
    setEntryDate(e.target.value);
    var newDate = e.target.value;
    var calDate = new Date(newDate);

    var leaseMonth = allTenantSetting.leaseTimePeriod;

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
  const [selectedDoorNumber, setSelectedDoorNumber] = useState([]);

  const onSelectChange = (inputuserdata) => {
    let temparray = [];
    temparray.push(...selectedDoorNumber, inputuserdata);
    setSelectedDoorNumber(temparray);
    setDnoList(DnoList.filter((x) => x.value !== inputuserdata.value));

    setFormData({
      ...formData,
      [inputuserdata.name]: 1,
    });
  };

  const onRemoveChange = (Doornumber) => {
    let temparray2 = [];
    temparray2.push(...DnoList, Doornumber);

    setDnoList(temparray2);
    setSelectedDoorNumber(
      selectedDoorNumber.filter((x) => x.value !== Doornumber.value)
    );
    setFormData({
      ...formData,
      [Doornumber.name]: 0,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const finalData = {
      OrganizationName: user.OrganizationName,
      OrganizationId: user.OrganizationId,
      BuildingName: buildingName,
      BuildingId: buildingId,
      Location: LocList,
      tenantFileNo: tenantFileNo,
      tenantDoorNo: selectedDoorNumber,
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
    console.log(finalData);
    setShowInformation(true);
    // AddTenantDetailsform(finalData);

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
    // setShowadd(false);
  };

  return !isAuthenticated || !user || !users ? (
    <Fragment></Fragment>
  ) : (
    <>
      <Modal.Header>
        <div className=" row col-lg-12 col-md-12 col-sm-12 col-12 modhead ">
          <div className="ml-5">
            <b className="text-center h3 ml-4 ">ADD TENANT DETAILS</b>
          </div>
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
      </Modal.Header>{" "}
      <Modal.Body>
        <form onSubmit={(e) => onSubmit(e)}>
          <div className="container-fluid ">
            <div className="row card-new pb-3">
              <div className="col-lg-3 col-md-12 col-sm-12 col-12  ">
                <label>Property Name*:</label>
                <Select
                  name="Property name"
                  options={allBuildingNames}
                  value={buildingData}
                  onChange={(e) => onBuildingChange(e)}
                  required
                ></Select>
                <br></br>
              </div>
              {/* <div className="col-lg-3 col-md-12 col-sm-12 col-12">
                <label>Door No*:</label>
                <Select
                  className="select"
                  name="doorno"
                  options={DnoList}
                  value={doorno}
                  onChange={(e) => onchangeDoor(e)}
                  isMulti={true}
                  required
                ></Select>
                <br></br>
              </div> */}
              <div className="col-lg-3 col-md-12 col-sm-12 col-12 ">
                <label> Location*:</label>
                <input
                  type="text"
                  value={LocList}
                  placeholder="Location"
                  className="form-control bg-dark"
                  readOnly
                ></input>
                <br></br>
              </div>
              <div className="col-lg-3 col-md-12 col-sm-12 col-12 ">
                <label> File No*:</label>
                <input
                  type="text"
                  name="tenantFileNo"
                  placeholder="File No"
                  value={tenantFileNo}
                  className="form-control"
                  onChange={(e) => onInputChange(e)}
                  required
                />{" "}
                <br></br>
              </div>
              <div className="col-lg-3 col-md-12 col-sm-12 col-12">
                <label>Tenant Name*:</label>
                <input
                  type="text"
                  name="tenantName"
                  placeholder="Name"
                  value={tenantName}
                  className="form-control"
                  onChange={(e) => onInputChange(e)}
                  required
                />{" "}
                <br></br>
              </div>
              <div className="col-lg-3 col-md-12 col-sm-12 col-12">
                <label>Phone No:</label>
                <input
                  type="number"
                  name="tenantPhone"
                  placeholder="Phone No"
                  value={tenantPhone}
                  className="form-control"
                  onChange={(e) => onInputChange(e)}
                  onKeyDown={(e) => funcKeyDown(e)}
                />{" "}
                <br></br>
              </div>
              <div className="col-lg-3 col-md-12 col-sm-12 col-12">
                <label>Firm Name:</label>
                <input
                  type="text"
                  name="tenantFirmName"
                  placeholder="Firm Name"
                  value={tenantFirmName}
                  className="form-control"
                  onChange={(e) => onInputChange(e)}
                />{" "}
                <br></br>
              </div>
              <div className="col-lg-3 col-md-12 col-sm-12 col-12">
                <label>Aadhaar No:</label>
                <input
                  type="number"
                  name="tenantAdharNo"
                  placeholder="Aadhar No"
                  value={tenantAdharNo}
                  className="form-control"
                  onChange={(e) => onInputChange(e)}
                  onKeyDown={(e) => funcKeyDown(e)}
                />{" "}
                <br></br>
              </div>
              <div className="col-lg-3 col-md-12 col-sm-12 col-12">
                <label>Pan Number:</label>
                <input
                  type="text"
                  name="tenantPanNo"
                  placeholder="Pan No"
                  value={tenantPanNo}
                  className="form-control"
                  onChange={(e) => onInputChange(e)}
                  onKeyDown={(e) => funcKeyDown(e)}
                />
                <br></br>
              </div>
              <div className="col-lg-3 col-md-12 col-sm-12 col-12">
                <label>Rent Amount*:</label>
                <input
                  type="number"
                  name="tenantRentAmount"
                  placeholder="Rent Amount"
                  value={tenantRentAmount}
                  className="form-control"
                  onChange={(e) => onInputChange(e)}
                  onKeyDown={(e) => funcKeyDown(e)}
                  required
                />{" "}
                <br></br>
              </div>
              <div className="col-lg-3 col-md-12 col-sm-12 col-12">
                <label>Deposit Amount*:</label>
                <input
                  type="number"
                  name="tenantDepositAmt"
                  value={tenantDepositAmt}
                  placeholder="Deposit Amount"
                  className="form-control"
                  onChange={(e) => onInputChange(e)}
                  onKeyDown={(e) => funcKeyDown(e)}
                  required
                />{" "}
                <br></br>
              </div>
              <div className="col-lg-3 col-md-12 col-sm-12 col-12">
                <label>Generator Deposit Amount :</label>
                <input
                  type="number"
                  name="generatordepoAmt"
                  placeholder="GeneratorDeposit Amount"
                  value={generatordepoAmt}
                  className="form-control"
                  onChange={(e) => onInputChange(e)}
                  onKeyDown={(e) => funcKeyDown(e)}
                />
                <br></br>
              </div>
              <div className="col-lg-3 col-md-12 col-sm-12 col-12">
                <label>Mode Of Payment*:</label>
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
                  required
                />
                <br></br>
              </div>{" "}
              {showChequenoSection ? (
                <>
                  {/* <div className="row"> */}
                  <div className="  col-lg-3 col-md-12 col-sm-12 col-12 ">
                    <label> Cheque No/DD No:</label>
                    <input
                      type="text"
                      name="tenantChequenoOrDdno"
                      value={tenantChequenoOrDdno}
                      className="form-control"
                      onChange={(e) => onInputChange(e)}
                    />
                    <br></br>
                  </div>

                  <div className=" col-lg-3 col-md-12 col-sm-12 col-12">
                    <label>Bank Name :</label>
                    <input
                      type="text"
                      name="tenantBankName"
                      value={tenantBankName}
                      className="form-control"
                      onChange={(e) => onInputChange(e)}
                    />{" "}
                    <br></br>
                  </div>
                  <div className="  col-lg-3 col-md-12 col-sm-12 col-12">
                    <label>Cheque Date:</label>
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
                    />{" "}
                    <br></br>
                  </div>
                  {/* </div> */}
                </>
              ) : (
                <></>
              )}
              <div className="col-lg-3 col-md-12 col-sm-12 col-12">
                <label>Lease Start Date*:</label>
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
                  required
                />{" "}
                <br></br>
              </div>{" "}
              <div className="col-lg-3 col-md-12 col-sm-12 col-12 ">
                <label>Lease End Date*:</label>
                <input
                  placeholder="dd-mm-yyyy"
                  className="form-control cpp-input datevalidation"
                  value={leaseEndDate}
                  required
                ></input>
                <br></br>
              </div>{" "}
              <div className="col-lg-2 col-md-12 col-sm-12 col-12">
                <label>Tenant's Address*:</label>
                <textarea
                  name="tenantAddr"
                  value={tenantAddr}
                  id="tenantAddr"
                  className="textarea form-control"
                  rows="4"
                  placeholder="Address"
                  onChange={(e) => onInputChange(e)}
                  required
                ></textarea>{" "}
                <br></br>
              </div>
              <div className="row ">
                <div
                  className=" col-lg-6 col-md-12"
                  style={{ border: "1px solid black", minHeight: "80px" }}
                >
                  {selectedDoorNumber &&
                    selectedDoorNumber.length > 0 &&
                    selectedDoorNumber.map((Doornumber, idx) => {
                      return (
                        <p key={idx} className="DoorCover">
                          <button
                            type="button"
                            name="selectedWorkMistake"
                            className="DoorNumber"
                          >
                            {Doornumber.value}
                            <span
                              className="mx-2"
                              onClick={() => onRemoveChange(Doornumber)}
                            >
                              X
                            </span>
                          </button>
                        </p>
                      );
                    })}
                </div>
                <div
                  className="col-lg-6 col-md-12 col-sm-12  button_Door"
                  style={{ border: "1px solid black", minHeight: "80px" }}
                >
                  {DnoList &&
                    DnoList.map((DoorNumber, idx) => {
                      return (
                        <div key={idx}>
                          <button
                            type="button"
                            name="workMistake"
                            className="btnLink"
                            onClick={() => onSelectChange(DoorNumber)}
                          >
                            {DoorNumber.value}
                          </button>
                        </div>
                      );
                    })}
                </div>
              </div>
              <div className="col-lg-9 text-danger">
                * Indicates mandatory fields, Please fill mandatory fields
                before Submit
              </div>
              <div className="col-lg-3 col-md-12 col-sm-12 col-12">
                <button
                  variant="success"
                  className="btn sub_form btn_continue Save float-right"
                  id="savebtn"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </form>
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
            <Link to="/tenant-detail">
              <button
                className="btn btn_green_bg"
                onClick={() => LogoutModalClose()}
              >
                OK
              </button>
            </Link>
          </Modal.Footer>
        </Modal>
      </Modal.Body>{" "}
      {/*  modal start */}
      {/* modal ending */}
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
  getParticularProperty,
})(AddTenantDetails);
