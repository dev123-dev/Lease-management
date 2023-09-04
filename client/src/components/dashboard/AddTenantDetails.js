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
import { useHistory } from "react-router-dom";
const AddTenantDetails = ({
  auth: { isAuthenticated, user, users, finalDataRep },
  tenants: { allDoorNos, particular_org_data, allTenantSetting },

  getAllDoorNos,
  getParticularProperty,
  AddTenantDetailsform,
  getAllSettings,
}) => {
  const myuser = JSON.parse(localStorage.getItem("user"));
  const history = useHistory();
  useEffect(() => {
    getParticularProperty({ OrganizationId: myuser.OrganizationId });
    getAllSettings({
      OrganizationId: myuser && myuser.OrganizationId,
      userId: myuser && myuser._id,
    });
  }, []);

  useEffect(() => {
    getAllDoorNos();
  }, [getAllDoorNos]);

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
  const [BuildingName, setBuildingName] = useState();

  //this code is used to filter out only those building whose room number is avaiable if not avaiable it will not display the building name
  let AvaiableRoomBuilding = particular_org_data;
  let isavail = particular_org_data.filter(
    (item) =>
      item.shopDoorNo &&
      !item.shopDoorNo.every((nameItem) => nameItem.status !== "Avaiable")
  );
  const allBuildingNames = [];
  AvaiableRoomBuilding.map((buildingData) =>
    allBuildingNames.push({
      buildingId: buildingData._id,
      label: buildingData.BuildingName,
      value: buildingData._id,
    })
  );

  const [DnoList, setDnoList] = useState([]);
  const [LocList, SetLocList] = useState([]);
  let passwrdTooltip = {
    marginLeft: "-16em",
    position: "absolute",
    marginTop: "1.5em",
    pointerEvents: "none",
    zIndex: "999",
    width: "300px",
  };
  const LocName = [];
  particular_org_data.map((loc) => {
    LocName.push({
      label: loc.Location,
      value: loc._id,
    });
  });
  const onBuildingChange = (e) => {
    setErrors({
      ...errors,
      PropertyChecker: true,
      PropertyErrorStyle: { color: "#000" },
    });

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
              // } else {
              //   temp.push({
              //     label: "Blank",
              //   });
            }
          });
        }

        setDnoList(temp);
      });

    getbuildingData(e);
    setBuildingID(e.buildingId ? e.buildingId : null);
    setBuildingName(e.label ? e.label : "");
  };

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

  if (leaseEndDate && leaseEndDate !== "") {
    var ED = leaseEndDate.split(/\D/g);
    var endDate = [ED[2], ED[1], ED[0]].join("-");
  }

  const delimiter = "-";
  const [date, setDate] = useState("");
  //31-08-2023 gets triggered when out of focus and checks validness of the date or required  
  const checkIfDateEnteredValidWhenFocussedOut = (inputDate) => {
    if (inputDate.length !== 10) {
      setOutput("I");
      return;
    }

    const dateArr = inputDate.split("-");
    const year = dateArr[2] * 1;
    const month = dateArr[1][0] === "0" ? dateArr[1][1] * 1 : dateArr[1] * 1;
    const dateVal = dateArr[0][0] === "0" ? dateArr[0][1] * 1 : dateArr[0] * 1;
    const value = new Date(`${dateArr[2]}${delimiter}${dateArr[1]}${delimiter}${dateArr[0]}`);   //new Date("2023-09-03") YYYY-MM-DD

    let isSame = false;
    if (
      value.getFullYear() === year &&
      value.getMonth() + 1 === month &&
      value.getDate() === dateVal
    ) {
      isSame = true;
    }

    if (!isSame) {
      setOutput("I");
    } else {
      setOutput("V");
      updatingLeaseEndDateBasedOnStartDate(value);
    }
  }

  //31-08-2023 Determining the Lease End Date
  const updatingLeaseEndDateBasedOnStartDate = (calDate) => {
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
    setDate(dd + delimiter + mm + delimiter + yyyy);
    var leaseEndDate = "";
    if (dd == "31" && mm == "07") {
      leaseEndDate = yyyy + delimiter + `07${delimiter}30`;
    } else {
      leaseEndDate = yyyy + delimiter + mm + delimiter + dd;
    }
    setLeaseEndDate(leaseEndDate);
  }

  const [output, setOutput] = useState("R");
  useEffect(() => {
    if (entryDate) checkIfDateEnteredValidWhenFocussedOut(entryDate);
  }, [entryDate])

  const onDateChangeEntry = (e) => {
    const { value } = e.target;

    const lastChar = value[value.length - 1];
    const checkLength = value.length === 3 || value.length === 6;
    const regex = /^[A-Za-z]+$/;
    const specialChar = !regex.test(lastChar) && isNaN(lastChar);

    if (value === "") {
      setEntryDate(value);
      setOutput('R');
    } else if (value.length === 2 && specialChar) {
      setEntryDate((prevState) => 0 + prevState + delimiter);
    } else if (value.length === 5 && specialChar) {
      setEntryDate((prevState) => prevState.slice(0, 3) + 0 + prevState[3] + delimiter);
    } else if (checkLength && specialChar) {
      setEntryDate((prevState) => prevState.slice(0, value.length - 1) + delimiter);
    } else if (value !== " " && !isNaN(lastChar)) {
      if (checkLength) {
        setEntryDate((prevState) => prevState + delimiter + lastChar);
      } else {
        setEntryDate(value);
      }
    }
  };

  let content;
  let className;
  if (output === "R") {
    content = "* Required Field";
    className = "required";
  } else if (output === "I") {
    content = "Invalid Date";
    className = "invalid-date";
  } else if (output === "V") {
    content = `Valid Date`;
    className = "valid-date";
  }
  //02-09-2023 

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
    setErrors({
      ...errors,
      PaymentChecker: true,
      PaymentErrorStyle: { color: "#000" },
    });
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

  const [errors, setErrors] = useState({
    PropertyChecker: false,
    PropertyErrorStyle: {},
    PaymentChecker: false,
    PaymentErrorStyle: {},
  });
  const {
    PropertyChecker,
    PropertyErrorStyle,
    PaymentChecker,
    PaymentErrorStyle,
  } = errors;
  const checkError = () => {
    if (!PaymentChecker) {
      setErrors({
        ...errors,
        PaymentErrorStyle: { color: "#F00" },
      });
      return false;
    }
    if (!PropertyChecker) {
      setErrors({
        ...errors,
        PropertyErrorStyle: { color: "#F00" },
      });
      return false;
    }

    return true;
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (output !== "V") return;

    if (checkError()) {
      const finalData = {
        OrganizationName: user.OrganizationName,
        OrganizationId: user.OrganizationId,
        BuildingName: BuildingName,
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
        tenantLeaseStartDate: entryDate.split(delimiter)[2] + delimiter + entryDate.split(delimiter)[1] + delimiter + entryDate.split(delimiter)[0],
        tenantLeaseEndDate: leaseEndDate,
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

      setEntryDate("");
      getDoorNoData("");
      setLeaseEndDate("");
      setNewLeaseEndDate("");
      setChequeDate("");
      setFileNoData("");

      // setShowadd(false);

      history.push("/tenant-detail");
    }
  };

  return !isAuthenticated || !user || !users ? (
    <Fragment></Fragment>
  ) : (
    <>
      <Modal.Header className="mt-sm-5"></Modal.Header>{" "}
      <Modal.Body>
        <form onSubmit={(e) => onSubmit(e)}>
          <div className="container-fluid ">
            <div className="row card-new pb-3 ">
              <div className="col-lg-12 col-md-12 col-sm-12 col-12  ">
                <h2
                  style={{
                    marginLeft: "10px",
                  }}
                  className=" heading_color headsize mt-2"
                >
                  Add Tenant Details
                </h2>
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
              <div className="col-lg-3 col-md-12 col-sm-12 col-12  ">
                <label style={PropertyErrorStyle}>Property Name*:</label>
                <Select
                  className="py-0"
                  name="Property name"
                  options={allBuildingNames}
                  value={buildingData}
                  onChange={(e) => onBuildingChange(e)}
                  theme={(theme) => ({
                    ...theme,
                    height: 26,
                    minHeight: 26,
                    borderRadius: 1,
                    colors: {
                      ...theme.colors,
                      // primary25: "#e8a317",
                      primary: "#095a4a",
                    },
                  })}
                  required
                ></Select>
                <br></br>
              </div>
              <div className="col-lg-3 col-md-12 col-sm-12 col-12 ">
                <label> Location*:</label>
                <input
                  type="text"
                  value={LocList}
                  placeholder="Location"
                  className="form-control bg-white"
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
                  pattern="[a-zA-z0-9\-]+$"
                  onChange={(e) => onInputChange(e)}
                  required
                />{" "}
                <br></br>
              </div>
              <div className="col-lg-3 col-md-12 col-sm-12 col-12">
                <label>Phone No:</label>
                <input
                  type="text"
                  name="tenantPhone"
                  placeholder="Phone No"
                  value={tenantPhone}
                  pattern="\d{10}"
                  title=" 10 Digits only"
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
                  type="text"
                  name="tenantAdharNo"
                  placeholder="Aadhar No"
                  value={tenantAdharNo}
                  // pattern="^[0-9\b]+$"
                  pattern="\d{12}"
                  // minLength="12"
                  title="Must Contain 12 digits"
                  className="form-control"
                  onChange={(e) => onInputChange(e)}
                  onKeyDown={(e) => funcKeyDown(e)}
                />{" "}
                <div
                  className="cstm-hint"
                  id="pass_admin_help"
                  style={{ top: "30px", cursor: "pointer" }}
                >
                  <img
                    src={require("../../static/images/help1.png")}
                    alt="help"
                    id="img_tool_admin"
                    className="pass_admin_help_icon_question"
                  />
                  <div
                    id="tooltipPassAdmin"
                    className="syle-hint"
                    style={passwrdTooltip}
                    data-hint=" Must have only 12 digits "
                  ></div>
                </div>
                <br></br>
              </div>
              <div className="col-lg-3 col-md-12 col-sm-12 col-12">
                <label>Pan Number:</label>
                <input
                  type="text"
                  name="tenantPanNo"
                  placeholder="Pan No"
                  value={tenantPanNo}
                  pattern="^([a-zA-Z]){5}([0-9]){4}([a-zA-Z]){1}?$"
                  className="form-control"
                  onChange={(e) => onInputChange(e)}
                // onKeyDown={(e) => funcKeyDown(e)}
                />
                <div
                  className="cstm-hint"
                  id="pass_admin_help"
                  style={{ top: "30px", cursor: "pointer" }}
                >
                  <img
                    src={require("../../static/images/help1.png")}
                    alt="help"
                    id="img_tool_admin"
                    className="pass_admin_help_icon_question"
                  />
                  <div
                    id="tooltipPassAdmin"
                    className="syle-hint"
                    style={passwrdTooltip}
                    data-hint="Must have 5 Alphabets,4 Numbers,1 Alphabet"
                  ></div>
                </div>
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
                />
                <div
                  className="cstm-hint"
                  id="pass_admin_help"
                  style={{ top: "30px", cursor: "pointer" }}
                >
                  <img
                    src={require("../../static/images/help1.png")}
                    alt="help"
                    id="img_tool_admin"
                    className="pass_admin_help_icon_question"
                  />
                  <div
                    id="tooltipPassAdmin"
                    className="syle-hint"
                    style={passwrdTooltip}
                    data-hint="Monthly Rent "
                  ></div>
                </div>
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
                  placeholder="Generator Deposit Amount"
                  value={generatordepoAmt}
                  className="form-control"
                  onChange={(e) => onInputChange(e)}
                  onKeyDown={(e) => funcKeyDown(e)}
                />
                <br></br>
              </div>
              <div className="col-lg-3 col-md-12 col-sm-12 col-12">
                <label style={PaymentErrorStyle}>Mode Of Payment*:</label>
                <Select
                  name="tenantPaymentMode"
                  options={PaymentMethods}
                  isSearchable={false}
                  value={tenantPaymentMode}
                  placeholder="Select..."
                  onChange={(e) => onPaymentModeChange(e)}
                  theme={(theme) => ({
                    ...theme,

                    borderRadius: 0,
                    colors: {
                      ...theme.colors,
                      primary25: "#e8a317",
                      primary: "#095a4a",
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
                    <label> Cheque No/DD No*:</label>
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

                  <div className=" col-lg-3 col-md-12 col-sm-12 col-12">
                    <label>Bank Name*:</label>
                    <input
                      type="text"
                      name="tenantBankName"
                      value={tenantBankName}
                      className="form-control"
                      onChange={(e) => onInputChange(e)}
                      required
                    />
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
                      required
                    />
                    <br></br>
                  </div>
                  {/* </div> */}
                </>
              ) : (
                <></>
              )}
              <div className="col-lg-3 col-md-12 col-sm-12 col-12">
                <label>Lease Start Date (DD-MM-YYYY)*: </label>
                <input
                  className="form-control cpp-input datevalidation"
                  type="text"
                  value={entryDate}
                  placeholder="DD-MM-YYYY"
                  minLength={10}
                  maxLength={10}
                  autoComplete="off"
                  name="tenantLeaseStartDate"
                  onChange={(e) => onDateChangeEntry(e)}
                />
                <p className={`output ${className}`}>{content}</p>
                <br></br>
              </div>{" "}
              <div className="col-lg-3 col-md-12 col-sm-12 col-12 ">
                <label>Lease End Date (DD-MM-YYYY)*:</label>
                <input
                  placeholder="DD-MM-YYYY"
                  className="form-control cpp-input datevalidation"
                  value={endDate}
                  readOnly
                ></input>
                <br></br>
              </div>{" "}
              <div className="control-group col-md-6 col-lg-3 col-sm-6 col-xs-6">
                <label className="control-label"> Tenant Address*:</label>
                <div className="controls">
                  <textarea
                    rows="3"
                    value={tenantAddr}
                    name="tenantAddr"
                    // id="tenantAddr"
                    placeholder="Address"
                    className="form-control"
                    onChange={(e) => onInputChange(e)}
                    required
                  ></textarea>
                  <span className="form-input-info"></span>
                </div>
              </div>
              <div className="row ml-1">
                <div className="col-lg-6 col-md-12 col-sm-12">
                  <div
                    className="h4 "
                    style={{ fontFamily: "Serif", color: "#095a4a" }}
                  >
                    Door No:
                  </div>
                </div>
                {/* <div className="col-lg-6 col-md-12 col-sm-12">
                <div
                        className="h4"
                        style={{ fontFamily: "Serif", color: "#095a4a" }}
                      >
                        Selected Door No :{" "}
                      </div>
                </div> */}
              </div>
              <div className="row  mx-1">
                {isavail && isavail.length !== 0 ? (
                  <>
                    <div
                      className="col-lg-6 col-md-12 col-sm-12 card-new button_Door bg-white border-dark border-right"
                      style={{ border: "transparent", minHeight: "90px" }}
                    >
                      <div
                        className="h4 "
                        style={{ fontFamily: "Serif", color: "#095a4a" }}
                      >
                        Available:
                      </div>{" "}
                      <br></br>
                      {DnoList &&
                        DnoList.map((DoorNumber, idx) => {
                          return (
                            <button
                              key={idx}
                              type="button"
                              className="btn btn-success doorbtn"
                              onClick={() => onSelectChange(DoorNumber)}
                            >
                              {DoorNumber.value}
                              <span className="ml-4">
                                <b className="text-dark ">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="20"
                                    height="16"
                                    fill="currentColor"
                                    class="bi bi-plus-square-fill"
                                    viewBox="0 0 16 16"
                                  >
                                    <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm6.5 4.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3a.5.5 0 0 1 1 0z" />
                                  </svg>
                                </b>
                              </span>
                            </button>
                          );
                        })}
                    </div>

                    <div
                      className=" col-lg-6 col-md-12  card-new  bg-white"
                      style={{ border: "transparent", minHeight: "80px" }}
                    >
                      <div
                        className="h4"
                        style={{ fontFamily: "Serif", color: "#095a4a" }}
                      >
                        Selected:
                      </div>
                      <br></br>
                      {selectedDoorNumber &&
                        selectedDoorNumber.length > 0 &&
                        selectedDoorNumber.map((Doornumber, idx) => {
                          return (
                            <button
                              key={idx}
                              type="button"
                              className="btn  doorbtn"
                              onClick={() => onRemoveChange(Doornumber)}
                            >
                              {Doornumber.value}
                              <span className="ml-4">
                                <b className="text-light">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="20"
                                    height="16"
                                    fill="currentColor"
                                    class="bi bi-dash-square-fill"
                                    viewBox="0 0 16 16"
                                  >
                                    <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm2.5 7.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1 0-1z" />
                                  </svg>
                                </b>
                              </span>
                            </button>
                          );
                        })}
                    </div>
                  </>
                ) : (
                  <div
                    style={{ fontFamily: "Serif", color: "#095a4a" }}
                    className="card-new"
                  >
                    <marquee>No Doors in the Property</marquee>
                  </div>
                )}
              </div>
              <div className="col-lg-9 text-danger">
                * Indicates mandatory fields, Please fill mandatory fields
                before Submit
              </div>
              <div className="col-lg-3 col-md-12 col-sm-12 col-12">
                <div className="row ">
                  <div className="col-lg-6 col-md-12 col-sm-12">
                    <Link to="/tenant-detail">
                      <button
                        variant="success"
                        className="btn sub_form btn_continue Save float-right "
                        id="savebtn"
                        type="button"
                      >
                        Back
                      </button>
                    </Link>
                  </div>
                  <div className="col-lg-6 col-md-12 col-sm-12">
                    {/* <Link to="/tenant-detail"> */}
                    <button
                      variant="success"
                      className="btn sub_form btn_continue Save float-right"
                      id="savebtn"
                      type="submit"
                      disabled={output !== "V" ? true : false}
                    >
                      Save
                    </button>
                    {/* </Link> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
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
