import React, { useState, useEffect, Fragment } from "react";
import { connect } from "react-redux";
import { RenewTenantDetailsform, getAllSettings } from "../../actions/tenants";
import Select from "react-select";
const RenewTenentAgreement = ({
  auth: { isAuthenticated, user, users, finalDataRep },
  tenantsData,
  tenants: { allTenantSetting },
  RenewTenantDetailsform,
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

  // validation
  const [tenantRentAmount, setRentAmount] = useState(tenantsData.chargesCal);
  const [validationMessage, setValidationMessage] = useState();

  const handleInputChange = (e) => {
    const inputValue = e.target.value;

    // if (/^[1-9]\d{0,2}$/.test(inputValue) || inputValue === "") {
    // const isValidate = /^[1-9]\d{0,2}$/;
    // isValidate.test(inputValue)
    //   ? setValidationMessage("")
    //   : setValidationMessage("enter valid amount");

    if (/^(?!0\d*)\d+(\.\d+)?$/.test(inputValue) || inputValue === "") {
      setRentAmount(inputValue);
      setValidationMessage("");
    } else {
      setValidationMessage("enter valid amount");
    }

    // }

    //const cleanedValue = inputValue.replace(/\D/g, ""); // Remove non-digit characters

    // if (cleanedValue.length <= 10) {
    //   const isValidPhone = /^[0-9]{9}$/;
    //   isValidPhone.test(cleanedValue)
    //     ? setValidationMessage("")
    //     : setValidationMessage("enter valid phone number");

    //   setUserphone(cleanedValue);
    // }
  };

  const ondone = () => {
    if (output !== "V") return;

    const finalData = {
      tenantRentAmount: tenantRentAmount,
      tenantFileNo: tenantFileNo,
      // tenantDoorNo: door,
      tenantLeaseStartDate:
        entryDate.split(delimiter)[2] +
        delimiter +
        entryDate.split(delimiter)[1] +
        delimiter +
        entryDate.split(delimiter)[0],
      tenantLeaseEndDate: leaseEndDate,
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
    };
    // console.log("this is sothing", finalData);
    RenewTenantDetailsform(finalData);
    setFormData({ ...formData, isSubmitted: true });
    onReportModalChange(true);
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

      const newYear = yearVal + 1;
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
            <label> Rent Amount:</label>
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
          </div>

          <div className="col-lg-6  col-md-4 col-sm-4 col-12">
            <label>{endDate}</label>
          </div>
        </div>
        <div className="row py-2">
          <div className="col-lg-4 col-md-2 col-sm-4 col-12">
            <label> Payment Mode:</label>
          </div>

          <div className="col-lg-6  col-md-4 col-sm-4 col-12">
          <Select
                  name="usergroup"
                  // options={UserGroups}
                  isSearchable={false}
                  placeholder="Select"
                  // onChange={(e) => onuser(e)}
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
                  required
                />
            <h6 style={{ color: "red" }}>
            </h6>
          </div>
        </div>
        <div className="row py-2">
          <div className="col-lg-12  col-sm-12 col-md-12 Savebutton" size="lg">
            <button
              variant="success"
              className="btn sub_form float-right"
              id="savebtn"
              onClick={() => ondone()}
              disabled={output !== "V" ? true : false}
            >
              Save
            </button>
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
})(RenewTenentAgreement);
