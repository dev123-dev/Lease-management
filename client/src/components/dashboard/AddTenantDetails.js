import React, { useState, Fragment, useEffect } from "react";
import { connect } from "react-redux";
import {
  AddTenantDetailsform,
  AddUserActivity,
  getParticularProperty,
  getAllDoorNos,
  getAllTenants,
  getAllSettings,
  ParticularTenantFilter,
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
  ParticularTenantFilter,
  AddUserActivity,

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
    ParticularTenantFilter();
  }, []);

  useEffect(() => {
    getAllDoorNos();
  }, [getAllDoorNos]);

  const [doorno, setdno] = useState([]);

  const onchangeDoor = (e) => {
    setdno(e);
  };

  ///////////////////////payment////////////////////

  const [paymentMode, setPaymentMode] = useState([]);

  const PaymentMethods = [
    { value: "Cash", label: "Cash" },
    { value: "Cheque", label: "Cheque" },
    { value: "Card", label: "Card" },
    { value: "NEFT", label: "NEFT" },
    { value: "UPI", label: "UPI" },
  ];

  // for type of card
  const [selectedCard, setSelectedCard] = useState("");

  const HandleCheck = (e) => {
    setErrors({
      ...errors,
      cardChecker: true,
      cardErrorStyle: { color: "#000" },
    });
    setSelectedCard(e.target.value);
  };

  // validation for trancation id
  const [transId, setTransId] = useState("");
  const [validationTransIdMessage, setValidationTransIdMessage] = useState("");
  const handleTransIdChange = (e) => {
    const inputValue = e.target.value;

    const isAlphanumeric = /^[A-Za-z0-9]+$/;
    const isWithinLength = inputValue.length >= 12 && inputValue.length <= 18;
    const hasNoDotsOrHyphens = /^[^.\\-]*$/.test(inputValue);

    if (
      isWithinLength &&
      isAlphanumeric.test(inputValue) &&
      hasNoDotsOrHyphens &&
      !/^[0-9]+$/.test(inputValue) &&
      !/^[a-zA-Z]+$/.test(inputValue)
    ) {
      setValidationTransIdMessage("");
    } else {
      setValidationTransIdMessage("Please enter a valid  Transaction id");
    }

    setTransId(inputValue);
  };

  const [formData, setFormData] = useState({
    tenantFileNo: "",
    tenantDoorNo: "",
    // tenantName: "",
    // tenantPhone: "",
    tenantFirmName: "",
    // tenantAddr: "",
    // tenantAdharNo: "",
    // tenantPanNo: "",
    tenantDepositAmt: "",
    tenantPaymentMode: "",
    // tenantBankName: "",
    tenantchequeDate: "",
    // tenantRentAmount: "",
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
    // tenantName,
    // tenantPhone,
    tenantFirmName,
    // tenantAddr,
    // tenantAdharNo,
    // tenantPanNo,
    tenantDepositAmt,
    tenantPaymentMode,
    // tenantChequenoOrDdno,
    // tenantBankName,
    // tenantRentAmount,
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
  AvaiableRoomBuilding.filter((ele)=>ele.shopStatus=="Active").map((buildingData) =>
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

    const dateArr = inputDate.split(delimiter);

    const yearVal = dateArr[2] * 1;
    const monthVal = dateArr[1][0] === "0" ? dateArr[1][1] * 1 : dateArr[1] * 1;
    const dateVal = dateArr[0][0] === "0" ? dateArr[0][1] * 1 : dateArr[0] * 1;
    const value = new Date(
      `${dateArr[2]}${delimiter}${dateArr[1]}${delimiter}${dateArr[0]}`
    ); //new Date("2023-09-03") YYYY-MM-DD

    const isSame = checkSameDate(value, yearVal, monthVal, dateVal);

    if (!isSame) {
      setOutput("I");
    } else {
      setOutput("V");

      var leaseMonth = myuser.output.leaseTimePeriod; //Setting Value

      const newYear = monthVal === 1 ? yearVal : yearVal + 1;
      const newMonth = monthVal === 1 ? monthVal + leaseMonth : monthVal - 1;
      const expiryDate = getLeaseExpiryDate(newYear, newMonth, dateVal);

      const date = expiryDate.getDate();
      const month = expiryDate.getMonth() + 1;
      const year = expiryDate.getFullYear();

      setLeaseEndDate(
        `${year}${delimiter}${month < 10 ? "0" + month : month}${delimiter}${
          date < 10 ? "0" + date : date
        }`
      );
    }
  };

  const checkSameDate = (newDate, yearVal, monthVal, dateVal) => {
    let isSame = false;
    if (
      newDate.getFullYear() === yearVal &&
      newDate.getMonth() + 1 === monthVal &&
      newDate.getDate() === dateVal
    ) {
      isSame = true;
    }

    return isSame;
  };

  const getLeaseExpiryDate = (year, month, dateVal) => {
    let isSame = false;
    let newDate = dateVal;

    isSame = checkSameDate(
      new Date(year, month - 1, dateVal),
      year,
      month,
      newDate
    );
    dateVal--;

    while (!isSame) {
      isSame = checkSameDate(
        new Date(year, month - 1, dateVal),
        year,
        month,
        dateVal
      );
      if (!isSame) dateVal--;
    }

    return new Date(year, month - 1, dateVal);
  };

  const [output, setOutput] = useState("R");
  const [key, setKey] = useState();
  useEffect(() => {
    if (entryDate) checkIfDateEnteredValidWhenFocussedOut(entryDate);
  }, [entryDate]);

  const onDateChangeEntry = (e) => {
    const { value } = e.target;

    const lastChar = value[value.length - 1];
    const checkLength = value.length === 3 || value.length === 6;
    const regex = /^[A-Za-z]+$/;
    const specialChar = !regex.test(lastChar) && isNaN(lastChar);

    if (key === "Backspace" || key === "Delete") {
      setEntryDate(value);
    } else if (value === "") {
      setEntryDate(value);
      setOutput("R");
    } else if (value.length === 2 && specialChar) {
      setEntryDate((prevState) => 0 + prevState + delimiter);
    } else if (value.length === 5 && specialChar) {
      setEntryDate(
        (prevState) => prevState.slice(0, 3) + 0 + prevState[3] + delimiter
      );
    } else if (checkLength && specialChar) {
      setEntryDate(
        (prevState) => prevState.slice(0, value.length - 1) + delimiter
      );
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

  // const onDoorNoChange = (e) => {
  //   var shopfileNumber = "";
  //   var shopdetailsId = "";
  //   getDoorNoData(e);

  //   allDoorNos.map((doorno) => {
  //     if (doorno.shopDoorNo === e.value) {
  //       shopfileNumber = doorno.shopFileNo;
  //       shopdetailsId = doorno._id;
  //     }
  //   });
  //   setFileNoData(shopfileNumber);
  //   setShopID(shopdetailsId);
  // };

  const [startSelectedDate, setChequeDate] = useState("");
  const onDateChange = (e) => {
    setChequeDate(e.target.value);
  };

  const onPaymentModeChange = (e) => {
    setPaymentMode(e);
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
    setErrors({
      ...errors,
      DoorChecker: true,
      DoorErrorStyle: { color: "#000" },
    });
  };

  const onRemoveChange = (Doornumber) => {
    setErrors({
      ...errors,
      DoorChecker: false,
      DoorErrorStyle: { color: "#F00" },
    });
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
    cardChecker: false,
    cardErrorStyle: {},
    DoorChecker: false,
    DoorErrorStyle: {},
  });
  const {
    PropertyChecker,
    PropertyErrorStyle,
    PaymentChecker,
    PaymentErrorStyle,
    cardChecker,
    cardErrorStyle,
    DoorErrorStyle,
    DoorChecker,
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
    if (!cardChecker && paymentMode.value === "Card") {
      setErrors({
        ...errors,
        cardErrorStyle: { color: "#F00" },
      });
      return false;
    }
    if (!DoorChecker) {
      setErrors({
        ...errors,
        DoorErrorStyle: { color: "#F00" },
      });
      return false;
    }

    return true;
  };

  // validation
  const [tenantName, setTenantName] = useState("");
  const [validationNameMessage, setValidationNameMessage] = useState(
    "Please enter valid Name"
  );
  const handleInputNameChange = (e) => {
    // const inputValue = e.target.value;
    // const filteredValue = inputValue.replace(/[^A-Za-z\s]/g, ""); // Remove non-alphabetic characters
    // filteredValue === ""
    //   ? setValidationNameMessage("Please enter valid Name")
    //   : setValidationNameMessage("");

    // setTenantName(filteredValue);
    const inputValue = e.target.value;
    const trimmedValue = inputValue.replace(/^\s+/, ""); // Remove leading spaces

    if (/^\d+$/.test(trimmedValue)) {
      setValidationNameMessage(
        "Name must contain at least one non-digit character"
      );
    } else {
      const filteredValue = trimmedValue.replace(/[^A-Za-z\d\s]/g, ""); // Remove non-alphabetic characters
      if (filteredValue === "") {
        setValidationNameMessage("Please enter a valid Name");
      } else {
        setValidationNameMessage("");
      }
      setTenantName(filteredValue);
    }
  };

  const [tenantPhone, setTenantPhone] = useState("");
  const [validationPhoneMessage, setValidationPhoneMessage] = useState("");

  const handleInputPhoneChange = (e) => {
    const inputValue = e.target.value;
    const cleanedValue = inputValue.replace(/\D/g, ""); // Remove non-digit characters

    if (cleanedValue.length <= 10) {
      const isValidPhone = /^[6789]\d{9}$/;
      isValidPhone.test(cleanedValue)
        ? setValidationPhoneMessage("")
        : setValidationPhoneMessage("Please enter valid Phone Number");

      setTenantPhone(cleanedValue);
    }
  };

  // validation for rent amt
  const [tenantRentAmount, setRentAmount] = useState("");
  const [validationRentAmtMessage, setValidationRentAmtMessage] = useState(
    "Please enter valid Amount"
  );

  const handleRentAmtChange = (e) => {
    const inputValue = e.target.value;

    if (/^(?!0\d*)\d+(\.\d+)?$/.test(inputValue) || inputValue === "") {
      setRentAmount(inputValue);
      setValidationRentAmtMessage("");
    } else {
      setValidationRentAmtMessage("Please enter valid Amount");
    }
  };

  // validation for adhar number
  const [tenantAdharNo, setTenantAdharNo] = useState("");
  const [validationAdharMessage, setValidationAdharMessage] = useState(
    "Please enter valid Aadhar Number"
  );

  const handleAdharChange = (e) => {
    const inputValue = e.target.value;

    if (inputValue.length <= 12) {
      const isValidAdhar = /^(?!(\d)\1{11})\d{12}$/;
      isValidAdhar.test(inputValue)
        ? setValidationAdharMessage("")
        : setValidationAdharMessage("Please enter valid Aadhar Number");

      setTenantAdharNo(inputValue);
    }
  };
  // validation for pan number
  const [tenantPanNo, setTenantPanNo] = useState("");
  const [validationPanMessage, setValidationPanMessage] = useState(
    "Please enter valid Pan Number"
  );

  const handlePanChange = (e) => {
    const inputValue = e.target.value;

    if (inputValue.length <= 10) {
      const isValidPan = /^(?!.*([A-Z])\1{3,})[A-Z]{5}[0-9]{4}[A-Z]$/;
      isValidPan.test(inputValue)
        ? setValidationPanMessage("")
        : setValidationPanMessage("Please enter valid Pan Number");

      setTenantPanNo(inputValue);
    }
  };

  // validation for checque number

  const [tenantChequenoOrDdno, setTenantChequenoOrDdno] = useState("");
  const [validationChequeMessage, setValidationChequeMessage] = useState("");

  const handleChequeChange = (e) => {
    const inputValue = e.target.value;

    if (inputValue.length <= 6) {
      const isValidPan = /^(?!000000)\d{6}$/;
      isValidPan.test(inputValue)
        ? setValidationChequeMessage("")
        : setValidationChequeMessage("Please enter valid Cheque Number");

      setTenantChequenoOrDdno(inputValue);
    }
  };

  // validation for bank name

  const [tenantBankName, setTenantBankName] = useState("");
  const [validationBankMessage, setValidationBankMessage] = useState("");

  const handleBankNameChange = (e) => {
    const inputValue = e.target.value;

    const isValidPan = /^[A-Za-z\s]+$/;
    isValidPan.test(inputValue)
      ? setValidationBankMessage("")
      : setValidationBankMessage("Please enter valid Bank Name");

    setTenantBankName(inputValue);
  };

  // validation for address

  const [tenantAddr, setTenantAddr] = useState("");
  const [validationAddressMessage, setValidationAddressMessage] = useState(
    "Please enter valid Address"
  );

  const handleAddressChange = (e) => {
    const inputValue = e.target.value;
    const isValidBuilding = /^(?!([\d\s-]*|[\W\\\/\,]*)$)[A-Za-z\d\s\\\/\,-]+$/;

    isValidBuilding.test(inputValue)
      ? setValidationAddressMessage("")
      : setValidationAddressMessage("Please enter valid Address");

    setTenantAddr(inputValue);
  };

  /////////////////////////////////////////////////////////////
  const [isNextButtonDisabled, setNextButtonDisabled] = useState(false);
  useEffect(() => {
    if (
      validationNameMessage === "" &&
      validationPhoneMessage === "" &&
      validationRentAmtMessage === "" &&
      validationAdharMessage === "" &&
      validationPanMessage === "" &&
      validationChequeMessage === "" &&
      validationBankMessage === "" &&
      validationAddressMessage === "" &&
      validationTransIdMessage === ""
    ) {
      setNextButtonDisabled(false);
    } else {
      setNextButtonDisabled(true);
    }
  }, [
    validationNameMessage,
    validationPhoneMessage,
    validationRentAmtMessage,
    validationAdharMessage,
    validationPanMessage,
    validationChequeMessage,
    validationBankMessage,
    validationAddressMessage,
    validationTransIdMessage,
  ]);

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

        // endDateFin new code
        tenantLeaseStartDate:
          endDateFin.split(delimiter)[2] +
          delimiter +
          endDateFin.split(delimiter)[1] +
          delimiter +
          endDateFin.split(delimiter)[0],

        //old code 11 month default

        tenantLeaseStartDate:
          entryDate.split(delimiter)[2] +
          delimiter +
          entryDate.split(delimiter)[1] +
          delimiter +
          entryDate.split(delimiter)[0],

        // tenantLeaseEndDate: leaseEndDate,
        tenantLeaseEndDate:
          endDateFin.split(delimiter)[2] +
          delimiter +
          endDateFin.split(delimiter)[1] +
          delimiter +
          endDateFin.split(delimiter)[0],

        generatordepoAmt: generatordepoAmt,
        tenantEnteredBy: user && user._id,
        tenantDate: todayDateymd,
        selectedY: finalDataRep.yearSearch,
        selectedVal: dt,
        tenantTransId: transId ? transId : "",
        tenantCardType: paymentMode.value === "Card" ? selectedCard : "",
      };
      const ActivityDetail = {
        userId: user && user._id,
        userName: user && user.username,
        Menu: "Tenant",
        Operation: "Add",
        Name: tenantName,
        OrganizationId: user.OrganizationId,
        expireAt: new Date().getTime() + 80,
      };
      AddTenantDetailsform(finalData);
      AddUserActivity(ActivityDetail);
      ParticularTenantFilter();
      setFormData({
        ...formData,
        tenantFileNo: "",
        tenantDoorNo: "",
        // tenantName: "",
        // tenantPhone: "",
        tenantFirmName: "",
        tenantAddr: "",
        // tenantAdharNo: "",
        // tenantPanNo: "",
        tenantDepositAmt: "",
        tenantPaymentMode: "",
        tenantBankName: "",
        tenantchequeDate: "",
        tenantRentAmount: "",
        tenantLeaseEndDate: "",
        // tenantChequenoOrDdno: "",
        generatordepoAmt: "",
      });

      setEntryDate("");
      getDoorNoData("");
      setLeaseEndDate("");
      setChequeDate("");
      setFileNoData("");

      // setShowadd(false);

      history.push("/tenant-detail");
    }
  };
  useEffect(() => {
    setChequeDate("");
    setTenantBankName("");
    setTransId("");
    setTenantChequenoOrDdno("");
  }, [paymentMode]);

  //Rakxit-
  function calculateMonthsFromDate(date, monthsToAdd) {
    try {
      const d = new Date(date);
      d.setMonth(d.getMonth() + monthsToAdd);
      d.setDate(d.getDate() - 1);
      return d.toISOString().split("T")[0].split("-").reverse().join("-");
    } catch (er) {
      console.log(er);
      return 0;
    }
  }

  const [endDateFin, setEndDateFin] = useState(null);

  useEffect(() => {
    if (entryDate.length === 10) {
      setEndDateFin(
        calculateMonthsFromDate(
          entryDate.split("-").reverse().join("-"),
          myuser.output.leaseTimePeriod
        )
      );
    }
  }, [entryDate]);

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
                  onChange={(e) => handleInputNameChange(e)}
                  required
                />{" "}
                <h6 style={{ color: "red" }}>{validationNameMessage}</h6>
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
                <label>Phone No :</label>
                <input
                  type="text"
                  name="tenantPhone"
                  placeholder="Phone No"
                  value={tenantPhone}
                  // pattern="\d{10}"
                  // title=" 10 Digits only"
                  className="form-control"
                  onChange={(e) => handleInputPhoneChange(e)}
                  onKeyDown={(e) => funcKeyDown(e)}
                />{" "}
                <h6 style={{ color: "red" }}>{validationPhoneMessage}</h6>
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
                  // pattern="\d{12}"

                  title="Must Contain 12 digits"
                  className="form-control"
                  onChange={(e) => handleAdharChange(e)}
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
                <h6 style={{ color: "red" }}>{validationAdharMessage}</h6>
              </div>
              <div className="col-lg-3 col-md-12 col-sm-12 col-12">
                <label>Pan Number:</label>
                <input
                  type="text"
                  name="tenantPanNo"
                  placeholder="Pan No"
                  value={tenantPanNo}
                  // pattern="^([a-zA-Z]){5}([0-9]){4}([a-zA-Z]){1}?$"
                  className="form-control"
                  onChange={(e) => handlePanChange(e)}
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
                <h6 style={{ color: "red" }}>{validationPanMessage}</h6>
              </div>
              <div className="col-lg-3 col-md-12 col-sm-12 col-12">
                <label>Rent Amount*:</label>
                <input
                  type="number"
                  name="tenantRentAmount"
                  placeholder="Rent Amount"
                  value={tenantRentAmount}
                  className="form-control"
                  onChange={(e) => handleRentAmtChange(e)}
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
                <h6 style={{ color: "red" }}>{validationRentAmtMessage}</h6>

                {/* <br></br> */}
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
                      type="number"
                      name="tenantChequenoOrDdno"
                      value={tenantChequenoOrDdno}
                      className="form-control"
                      onChange={(e) => handleChequeChange(e)}
                      required
                    />
                    <h6 style={{ color: "red" }}>{validationChequeMessage}</h6>
                  </div>

                  <div className=" col-lg-3 col-md-12 col-sm-12 col-12">
                    <label>Bank Name*:</label>
                    <input
                      type="text"
                      name="tenantBankName"
                      value={tenantBankName}
                      className="form-control"
                      onChange={(e) => handleBankNameChange(e)}
                      required
                    />
                    <h6 style={{ color: "red" }}>{validationBankMessage}</h6>
                  </div>
                  <div className="  col-lg-3 col-md-12 col-sm-12 col-12">
                    <label>Cheque Date*:</label>
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
              {paymentMode.value === "Card" ? (
                <div className="row">
                  <div className="col-lg-3 col-md-12 col-sm-12 col-12">
                    <label style={cardErrorStyle}> Choose card*:</label>
                    <br />
                    <input
                      type="radio"
                      name="cardType"
                      id="debit"
                      value="debit"
                      onChange={(e) => HandleCheck(e)}
                    />
                    <label htmlFor="debit">&nbsp;Debit card&nbsp; &nbsp;</label>

                    <input
                      type="radio"
                      name="cardType"
                      id="credit"
                      value="credit"
                      onChange={(e) => HandleCheck(e)}
                    />
                    <label htmlFor="credit">
                      &nbsp;Credit Card&nbsp; &nbsp;
                    </label>
                  </div>

                  <div className="col-lg-3 col-md-12 col-sm-12 col-12">
                    <label> Transaction Id*:</label>
                    <input
                      type="text"
                      name="transcationId"
                      className="form-control"
                      value={transId}
                      onChange={(e) => handleTransIdChange(e)}
                      style={{
                        width: "100%",
                      }}
                      required
                    />
                    <h6 style={{ color: "red" }}>{validationTransIdMessage}</h6>
                  </div>

                  <div className="col-lg-3 col-md-12 col-sm-12 col-12">
                    <label> Bank Name*:</label>
                    <input
                      type="text"
                      name="bankName"
                      className="form-control"
                      value={tenantBankName}
                      onChange={(e) => handleBankNameChange(e)}
                      style={{
                        width: "100%",
                      }}
                      required
                    />
                    <h6 style={{ color: "red" }}>{validationBankMessage}</h6>
                  </div>
                </div>
              ) : paymentMode.value === "NEFT" ? (
                <div className="row">
                  <div className="col-lg-3 col-md-12 col-sm-12 col-12">
                    <label> Transaction Id*:</label>
                    <input
                      type="text"
                      name="transcationId"
                      className="form-control"
                      value={transId}
                      onChange={(e) => handleTransIdChange(e)}
                      style={{
                        width: "100%",
                      }}
                      required
                    />
                    <h6 style={{ color: "red" }}>{validationTransIdMessage}</h6>
                  </div>

                  <div className="col-lg-3 col-md-12 col-sm-12 col-12">
                    <label> Bank Name*:</label>
                    <input
                      type="text"
                      name="bankName"
                      className="form-control"
                      value={tenantBankName}
                      onChange={(e) => handleBankNameChange(e)}
                      style={{
                        width: "100%",
                      }}
                      required
                    />
                    <h6 style={{ color: "red" }}>{validationBankMessage}</h6>
                  </div>
                </div>
              ) : paymentMode.value === "UPI" ? (
                <div className="row">
                  <div className="col-lg-3 col-md-12 col-sm-12 col-12">
                    <label> Transaction Id*:</label>
                    <input
                      type="text"
                      name="transactionId"
                      className="form-control"
                      value={transId}
                      onChange={(e) => handleTransIdChange(e)}
                      style={{
                        width: "100%",
                      }}
                      required
                    />
                    <h6 style={{ color: "red" }}>{validationTransIdMessage}</h6>
                  </div>
                </div>
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
                  onKeyDown={(e) => setKey(e.key)}
                />
                <p className={`output ${className}`}>{content}</p>
                <br></br>
              </div>{" "}
              <div className="col-lg-3 col-md-12 col-sm-12 col-12 ">
                <label>
                  Lease End Date ({endDateFin}){/* {endDate} (DD-MM-YYYY)* */}:
                </label>
                <input
                  placeholder="DD-MM-YYYY"
                  className="form-control cpp-input datevalidation"
                  value={endDateFin}
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
                    onChange={(e) => handleAddressChange(e)}
                    required
                  ></textarea>
                  <h6 style={{ color: "red" }}>{validationAddressMessage}</h6>
                  <span className="form-input-info"></span>
                </div>
              </div>
              <div className="row ml-1">
                <div className="col-lg-6 col-md-12 col-sm-12">
                  <div
                    className="h4 "
                    style={DoorErrorStyle}
                    // style={{ fontFamily: "Serif", color: "#095a4a" }}
                  >
                    Door No*:
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
                                    className="bi bi-plus-square-fill"
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
                                    className="bi bi-dash-square-fill"
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
                    {isNextButtonDisabled ? (
                      <button
                        variant="success"
                        className="btn sub_form btn_continue Save float-right"
                        id="savebtn"
                        type="submit"
                        disabled={true}
                        // disabled={isNextButtonDisabled}
                      >
                        Save
                      </button>
                    ) : (
                      <button
                        variant="success"
                        className="btn sub_form btn_continue Save float-right"
                        id="savebtn"
                        type="submit"
                        disabled={output != "V" ? true : false}
                        // disabled={isNextButtonDisabled}
                      >
                        Save
                      </button>
                    )}
                    {/* <button
                      variant="success"
                      className="btn sub_form btn_continue Save float-right"
                      id="savebtn"
                      type="submit"
                      disabled={ output!="V"?true:false}
                      // disabled={isNextButtonDisabled}
                    >
                      Save
                    </button> */}
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
  AddUserActivity,

  ParticularTenantFilter,
})(AddTenantDetails);
