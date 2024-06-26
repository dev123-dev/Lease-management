import React, { useState, useEffect, Fragment } from "react";
import { connect } from "react-redux";
import {
  RenewTenantDetailsform,
  getAllSettings,
  AddUserActivity,
} from "../../actions/tenants";
import Select from "react-select";
const RenewTenentAgreement = ({
  auth: { isAuthenticated, user, users, finalDataRep },
  tenantsData,
  tenants: { allTenantSetting },
  RenewTenantDetailsform,
  AddUserActivity,
  getAllSettings,
  onReportModalChange,
}) => {
  const delimiter = "-";
  const myuser = JSON.parse(localStorage.getItem("user"));

  const [door, SetDoornumber] = useState([]);

  useEffect(() => {
    getAllSettings({
      OrganizationId: myuser && myuser.OrganizationId,
      userId: myuser && myuser._id,
    });

    const doornumber =
      tenantsData &&
      tenantsData.tenantDoorNo &&
      tenantsData.tenantDoorNo.map((ele) => {
        return ele.label;
      });
    SetDoornumber(doornumber);
  }, []);

  //formData
  const [formData, setFormData] = useState({
    isSubmitted: false,
    tenantDoorNo: door,
    tenantFileNo: tenantsData.tenantFileNo,
    // tenantRentAmount: tenantsData.chargesCal,
  });

  ////////////////////payment ///////////////////
  const [paymentMode, setPaymentMode] = useState([]);

  const paymentmodes = [
    { value: "Cash", label: "Cash" },
    { value: "Cheque", label: "Cheque" },
    { value: "Card", label: "Card" },
    { value: "NEFT", label: "NEFT" },
    { value: "UPI", label: "UPI" },
  ];

  // for type of card
  const [selectedCard, setSelectedCard] = useState("");

  const HandleCheck = (e) => {
    setSelectedCard(e.target.value);
    setErrors({
      ...errors,
      cardChecker: true,
      cardErrorStyle: { color: "#000" },
    });
  };

  const [startSelectedDate, setChequeDate] = useState("");
  const [validationChequeDateMessage, setValidationChequeDateMessage] =
    useState("");
  const onDateChange = (e) => {
    setChequeDate(e.target.value);
    e
      ? setValidationChequeDateMessage("")
      : setValidationChequeDateMessage("Please enter Date");
  };

  // validation for bank name

  const [tenantBankName, setTenantBankName] = useState("");
  const [validationBankMessage, setValidationBankMessage] = useState("");

  const handleBankNameChange = (e) => {
    const inputValue = e.target.value;

    const isValidPan = /^[A-Za-z\s]+$/;
    isValidPan.test(inputValue)
      ? setValidationBankMessage("")
      : setValidationBankMessage("enter valid Bank Name");

    setTenantBankName(inputValue);
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
      setValidationTransIdMessage("Please enter a valid  Transaction Id");
    }

    setTransId(inputValue);
  };
  const [tenantChequenoOrDdno, setTenantChequenoOrDdno] = useState("");
  const [validationChequeMessage, setValidationChequeMessage] = useState("");

  const handleChequeChange = (e) => {
    const inputValue = e.target.value;

    if (inputValue.length <= 6) {
      const isValidPan = /^(?!000000)\d{6}$/;
      isValidPan.test(inputValue)
        ? setValidationChequeMessage("")
        : setValidationChequeMessage("enter valid Cheque number");

      setTenantChequenoOrDdno(inputValue);
    }
  };

  const onPaymentModeChange = (e) => {
    setErrors({
      ...errors,
      paymentmodeChecker: true,
      paymentmodeErrorStyle: { color: "#000" },
    });

    setPaymentMode(e);
    if (e.value === "UPI") {
      setValidationTransIdMessage("Please enter Transaction Id");
      setValidationBankMessage("");
      setValidationChequeMessage("");
      setValidationChequeDateMessage("");
    } else if (e.value === "NEFT") {
      setValidationBankMessage("Please enter Bank Name");
      setValidationTransIdMessage("Please enter Transaction Id");
      setValidationChequeMessage("");
      setValidationChequeDateMessage("");
    } else if (e.value === "Card") {
      setValidationBankMessage("Please enter Bank Name");
      setValidationTransIdMessage("Please enter Transaction Id");
      setValidationChequeMessage("");
      setValidationChequeDateMessage("");
    } else if (e.value === "Cheque") {
      setValidationBankMessage("Please enter Bank Name");
      setValidationTransIdMessage("");
      setValidationChequeMessage("Please Enter Cheque/DD No");
      setValidationChequeDateMessage("Please enter Date");
    } else if (e.value === "Cash") {
      setValidationBankMessage("");
      setValidationTransIdMessage("");
      setValidationChequeMessage("");
      setValidationChequeDateMessage("");
    }
  };

  useEffect(() => {
    setChequeDate("");
    setTenantBankName("");
    setTransId("");
    setTenantChequenoOrDdno("");
  }, [paymentMode]);
  const { isSubmitted, tenantDoorNo, tenantFileNo } = formData;

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

  const onInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // validation for rent amt
  const [tenantRentAmount, setRentAmount] = useState(tenantsData.chargesCal);
  const [validationMessage, setValidationMessage] = useState();

  const handleInputChange = (e) => {
    const inputValue = e.target.value;
    if (inputValue === "") {
      // Allow empty string when user is deleting digits
      setRentAmount(inputValue);
      setValidationMessage("Enter valid Amount");
      setNextButtonDisabled1(true);
    } else if (/^(?:0|[1-9]\d*)(?:\.\d{0,2})?$/.test(inputValue)) {
      setRentAmount(inputValue);
      setValidationMessage("");
      setNextButtonDisabled1(false);
    } else {
      setRentAmount(inputValue);
      setValidationMessage(
        "Please enter a valid amount with two digits after the decimal point"
      );
      setNextButtonDisabled1(true);
    }
  };

  const ondone = () => {
    if (output !== "V") return;
    if (checkError()) {
      const finalData = {
        tenantRentAmount: tenantRentAmount,
        tenantFileNo: tenantFileNo,
        // tenantDoorNo: door,

        // endDateFin new code //startDate
        tenantLeaseStartDate:
          endDateFin.split(delimiter)[2] +
          delimiter +
          endDateFin.split(delimiter)[1] +
          delimiter +
          endDateFin.split(delimiter)[0],

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

        tdId: tenantsData.tdId,
        OrganizationId: tenantsData.OrganizationId,
        BuildingName: tenantsData.BuildingName,
        BuildingId: tenantsData.BuildingId,
        agreementId: tenantsData.agreementId,
        tenantEnteredBy: user && user._id,
        tenantDate: todayDateymd,
        monthSearch: finalDataRep.monthSearch,
        yearSearch: finalDataRep.yearSearch,
        selectedY: finalDataRep.yearSearch,
        selectedVal: dt,

        tenantPaymentMode: paymentMode.value ? paymentMode.value : "",
        tenantChequenoOrDdno: tenantChequenoOrDdno ? tenantChequenoOrDdno : 0,
        tenantBankName: tenantBankName ? tenantBankName : "",
        tenantchequeDate: startSelectedDate ? startSelectedDate : "",
        tenantTransId: transId ? transId : "",
        tenantCardType: paymentMode.value === "Card" ? selectedCard : "",
        stampDuty: tenantsData.stampDuty,
        oldRentAmount: tenantsData.tenantRentAmount,
      };

      const ActivityDetail = {
        userId: user && user._id,
        userName: user && user.username,
        Menu: "Tenant",
        Operation: "Renewal",
        Name: tenantsData.tenantName,
        NameId: tenantsData.tdId,
        OrganizationId: user.OrganizationId,
        expireAt: new Date().getTime() + 80,
      };
      AddUserActivity(ActivityDetail);
      RenewTenantDetailsform(finalData);

      setFormData({ ...formData, isSubmitted: true });
      onReportModalChange(true);
    }
  };

  const [entryDate, setEntryDate] = useState(
    dd + delimiter + mm + delimiter + yyyy
  );
  const [leaseEndDate, setLeaseEndDate] = useState("");
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

  const [date, setDate] = useState("");
  const [output, setOutput] = useState("R");
  const [key, setKey] = useState();
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

  useEffect(() => {
    if (entryDate) checkIfDateEnteredValidWhenFocussedOut(entryDate);
  }, [entryDate]);

  const onDateChangeEntry = (e) => {
    const { value } = e.target;
    if (value == "") {
      setOutput("R");
      setLeaseEndDate("");
    }
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

  var ED = leaseEndDate.split(/\D/g);
  var endDate = [ED[2], ED[1], ED[0]].join("-");
  //03-09-2023

  //validation for select
  const [errors, setErrors] = useState({
    paymentmodeChecker: false,
    paymentmodeErrorStyle: {},
    cardChecker: false,
    cardErrorStyle: {},
  });
  const {
    paymentmodeChecker,
    paymentmodeErrorStyle,
    cardChecker,
    cardErrorStyle,
  } = errors;
  const checkError = () => {
    if (!paymentmodeChecker) {
      setErrors({
        ...errors,
        paymentmodeErrorStyle: { color: "#F00" },
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

    return true;
  };

  /////////////////////////////////////////////////////////////
  const [isNextButtonDisabled, setNextButtonDisabled] = useState(false);
  const [isNextButtonDisabled1, setNextButtonDisabled1] = useState(false); //rent amount

  useEffect(() => {
    if (
      validationChequeMessage === "" &&
      validationBankMessage === "" &&
      validationTransIdMessage === "" &&
      validationChequeMessage === "" &&
      validationChequeDateMessage === ""
      // &&
      // validationMessage===""
      //  &&
      // cardChecker === true
    ) {
      setNextButtonDisabled(false);
    }
    // if (validationMessage !== "") {
    //   setNextButtonDisabled1(true);
    // } else
    else if (validationMessage === "") {
      setNextButtonDisabled1(false);
    } else {
      setNextButtonDisabled(true);
    }
  }, [
    validationChequeMessage,
    validationBankMessage,
    validationChequeMessage,
    validationTransIdMessage,
    validationChequeDateMessage,
    paymentMode,
  ]);

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
            <label>
              <b>{tenantsData.tenantName}</b>
            </label>
          </div>
        </div>

        <div className="row py-2">
          <div className="col-lg-4 col-md-2 col-sm-4 col-12">
            <label>Building Name:</label>
          </div>

          <div className="col-lg-6  col-md-4 col-sm-4 col-12">
            <input
              type="text"
              name="tenantDoorNo"
              className="form-control"
              value={tenantsData.BuildingName}
              onChange={(e) => onInputChange(e)}
              readOnly
              style={{
                width: "100%",
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
              readOnly
              style={{
                width: "100%",
              }}
            />
          </div>
        </div>
        <div className="row py-2">
          <div className="col-lg-4 col-md-2 col-sm-4 col-12">
            <label> Rent Amount* :</label>
          </div>

          <div className="col-lg-6  col-md-4 col-sm-4 col-12">
            <input
              type="number"
              name="tenantRentAmount"
              className="form-control"
              value={tenantRentAmount}
              // value={tenantRentAmount}
              onChange={(e) => handleInputChange(e)}
              style={{
                width: "100%",
              }}
            />
            <h6 style={{ color: "red" }}>{validationMessage}</h6>
          </div>
        </div>
        <div className="row py-2">
          <div className="col-lg-4 col-md-2 col-sm-4 col-12">
            <label>Lease Start Date* :</label>
          </div>

          <div className="col-lg-6 col-md-4 col-sm-4 col-12">
            <input
              className="form-control cpp-input datevalidation"
              type="text"
              value={entryDate}
              placeholder="DD-MM-YYYY"
              minLength={10}
              maxLength={10}
              name="tenantLeaseStartDate"
              autoComplete="off"
              onChange={(e) => onDateChangeEntry(e)}
              onKeyDown={(e) => setKey(e.key)}
            />
            <p className={`output ${className}`}>{content}</p>
          </div>
        </div>
        <div className="row py-2">
          <div className="col-lg-4 col-md-2 col-sm-4 col-12">
            <label>Lease End Date:</label>
            {/* <label>({  endDate})</label> */}
          </div>

          <div className="col-lg-6  col-md-4 col-sm-4 col-12">
            <label>{endDateFin}</label>
          </div>
        </div>
        <div className="row py-2">
          <div className="col-lg-4 col-md-2 col-sm-4 col-12 mt-2">
            <label style={paymentmodeErrorStyle}>
              {" "}
              Payment Mode<span style={{ color: "red" }}>*</span>:
            </label>
          </div>

          <div className="col-lg-6  col-md-4 col-sm-4 col-12">
            <Select
              name="paymentMode"
              options={paymentmodes}
              isSearchable={false}
              placeholder="Select"
              onChange={(e) => onPaymentModeChange(e)}
              theme={(theme) => ({
                ...theme,
                height: 20,
                minHeight: 20,
                borderRadius: 1,
                colors: {
                  ...theme.colors,
                  primary25: "#e8a317",
                  primary: "#095a4a",
                },
              })}
              styles={{
                control: (provided) => ({
                  ...provided,
                  height: "35px",
                }),
                // Add other custom styles as needed
              }}
            />
          </div>
          {paymentMode.value === "Cheque" ? (
            <div className="row py-2">
              <div className="col-lg-4 col-md-2 col-sm-4 col-12">
                <label> Cheque No/DD No*:</label>
              </div>
              <div className="col-lg-6 col-md-4 col-sm-4 col-12 ml-3">
                <input
                  type="number"
                  name="chequeNo"
                  className="form-control"
                  value={tenantChequenoOrDdno}
                  onChange={(e) => handleChequeChange(e)}
                  style={{
                    width: "100%",
                  }}
                  required
                />
                <h6 style={{ color: "red" }}>{validationChequeMessage}</h6>
              </div>
              <div className="col-lg-4 col-md-2 col-sm-4 col-12">
                <label> Bank Name*:</label>
              </div>
              <div className="col-lg-6 col-md-4 col-sm-4 col-12 ml-3">
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
              <div className="col-lg-4 col-md-2 col-sm-4 col-12">
                <label> Cheque Date*:</label>
              </div>
              <div className="col-lg-6 col-md-4 col-sm-4 col-12 ml-3">
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
                <h6 style={{ color: "red" }}>{validationChequeDateMessage}</h6>
              </div>
            </div>
          ) : paymentMode.value === "Card" ? (
            <div className="row">
              <div className="col-lg-4 col-md-2 col-sm-4 col-12">
                <label style={cardErrorStyle}> Choose card*:</label>
              </div>
              <div className="col-lg-6 col-md-4 col-sm-4 col-12 ml-3">
                <input
                  type="radio"
                  name="cardType"
                  id="debit"
                  value="debit"
                  onChange={(e) => HandleCheck(e)}
                />
                &nbsp;
                <label htmlFor="debit">Debit card&nbsp; &nbsp;</label>
                <input
                  type="radio"
                  name="cardType"
                  id="credit"
                  value="credit"
                  onChange={(e) => HandleCheck(e)}
                />
                &nbsp;
                <label htmlFor="credit">Credit Card&nbsp; &nbsp;</label>
              </div>

              <div className="col-lg-4 col-md-2 col-sm-4 col-12">
                <label> Transaction Id*:</label>
              </div>
              <div className="col-lg-6 col-md-4 col-sm-4 col-12 ml-3">
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
              <div className="col-lg-4 col-md-2 col-sm-4 col-12">
                <label> Bank Name*:</label>
              </div>
              <div className="col-lg-6 col-md-4 col-sm-4 col-12 ml-3">
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
              <div className="col-lg-4 col-md-2 col-sm-4 col-12">
                <label> Transaction Id*:</label>
              </div>
              <div className="col-lg-6 col-md-4 col-sm-4 col-12 ml-3">
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
              <div className="col-lg-4 col-md-2 col-sm-4 col-12">
                <label> Bank Name*:</label>
              </div>
              <div className="col-lg-6 col-md-4 col-sm-4 col-12 ml-3">
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
              <div className="col-lg-4 col-md-2 col-sm-4 col-12">
                <label> Transaction Id*:</label>
              </div>
              <div className="col-lg-6 col-md-4 col-sm-4 col-12 ml-3">
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
        </div>
        <div className="row py-2">
          <div className="col-lg-12  col-sm-12 col-md-12 Savebutton" size="lg">
            {isNextButtonDisabled || isNextButtonDisabled1 ? (
              <button
                variant="success"
                className="btn sub_form float-right"
                id="savebtn"
                onClick={() => ondone()}
                disabled={true}
              >
                Save
              </button>
            ) : (
              <button
                variant="success"
                className="btn sub_form float-right"
                id="savebtn"
                onClick={() => ondone()}
                disabled={output !== "V" ? true : false}
              >
                Save
              </button>
            )}
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

export default connect(mapStateToProps, {
  RenewTenantDetailsform,
  getAllSettings,
  AddUserActivity,
})(RenewTenentAgreement);
