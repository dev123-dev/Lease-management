import React, { useState, Fragment, useEffect } from "react";
import { connect } from "react-redux";
import { AddTenantSettingform } from "../../actions/tenants";
import {
  UpdateTenantSettingform,
  getParticularTenantSetting,
  AddUserActivity,
} from "../../actions/tenants";

import { getAllSettings } from "../../actions/tenants";
const TenantSettings = ({
  AddTenantSettingform,
  UpdateTenantSettingform,
  AddUserActivity,
  tenants: { allTenantSetting },
  auth: { isAuthenticated, user, users },
  getAllSettings,
  onAddSettingModalChange,
}) => {
  //console.log("data", allTenantSetting.leaseTimePeriod);
  const myuser = JSON.parse(localStorage.getItem("user"));
  // console.log("tenant setting", myuser);

  useEffect(() => {
    if (myuser) {
      getAllSettings({
        OrganizationId: myuser && myuser.OrganizationId,
        userId: myuser && myuser._id,
      });
    }

    // getParticularTenantSetting({
    //   OrganizationId: user && user.OrganizationId,
    // });
  }, []);
  //formData

  // const [formData, setFormData] = useState({
  //   hike: myuser.output.hike,
  //   stampDuty: myuser.output && myuser.output.ltampDuty,
  //   leaseTimePeriod: myuser.output && myuser.output.leaseTimePeriod,
  // });

  const [hike, setHike] = useState(
    myuser.output && myuser.output.hike
      ? myuser.output && myuser.output.hike
      : ""
  );
  const [stampDuty, setStampDuty] = useState(
    myuser.output && myuser.output.stampDuty
      ? myuser.output && myuser.output.stampDuty
      : ""
  );
  const [leaseTimePeriod, setLeaseTimePeriod] = useState(
    myuser.output && myuser.output.leaseTimePeriod
      ? myuser.output && myuser.output.leaseTimePeriod
      : ""
  );
  const [leasePeriod, setLeasePeriod] = useState(
    myuser.output && myuser.output.leaseTimePeriod
      ? myuser.output && myuser.output.leaseTimePeriod
      : ""
  );
  // const onChangeField = (event) => {
  //   console.log("event", event.target.name);
  //   const newValue = event.target.value;
  //   switch (event.target.name) {
  //     case "leaseTimePeriod":
  //       if (/^[1-9]\d{0,2}$/.test(newValue) || newValue === "") {
  //         setLeasePeriod(newValue);
  //       }

  //       break;
  //     case "stampDuty":
  //       if (/^[1-9]\d{0,1}$/.test(newValue) || newValue === "") {
  //         setStampDuty(newValue);
  //       }
  //       break;
  //     case "hike":
  //       if (/^[1-9]\d{0,1}$/.test(newValue) || newValue === "") {
  //         setHike(newValue);
  //       }
  //       break;

  //     default:
  //       break;
  //   }
  //   // Check if the new value is a positive number
  // };

  // const onChangeField = (event) => {
  //   console.log("event", event.target.name);
  //   const newValue = event.target.value;
  //   // Use regex to allow only positive integers with 1 or 2 digits (excluding 0), and no hyphen
  //   const positiveIntegerRegex = /^[1-9][0-9]?$/;

  //   switch (event.target.name) {
  //     case "leaseTimePeriod":
  //       if (positiveIntegerRegex.test(newValue) || newValue === "") {
  //         setLeasePeriod(newValue);
  //       }
  //       break;
  //     case "stampDuty":
  //       if (positiveIntegerRegex.test(newValue) || newValue === "") {
  //         setStampDuty(newValue);
  //       }
  //       break;
  //     case "hike":
  //       if (positiveIntegerRegex.test(newValue) || newValue === "") {
  //         setHike(newValue);
  //       }
  //       break;
  //     default:
  //       break;
  //   }
  //   // Check if the new value is a positive number with 1 or 2 digits (excluding 0) and no hyphen
  // };
  const [isButtonDisabled, setisButtonDisabled] = useState(false);
  const [validationHikeMessage, setValidationHikeMessage] = useState("");
  const handleHikeChange = (e) => {
    const inputValue = e.target.value;
    const trimmedValue = inputValue.replace(/^\s+/, ""); // Remove leading spaces
    const filteredValue = trimmedValue.replace(/[^0-9\s.]/g, ""); // Remove non-alphabetic characters
    // const inputValue = e.target.value;
    // const isValid = /^[^a-zA-Z-]*$/;

    // isValid.test(inputValue)
    //   ? setValidationshgSavingPerMeetingMessage("")
    //   : setValidationshgSavingPerMeetingMessage("enter saving per meeting");
    if (
      filteredValue === "0" ||
      filteredValue.length > 2 ||
      filteredValue === "00"
    ) {
      setValidationHikeMessage("Please Enter valid Hike");
    } else {
      filteredValue === ""
        ? setValidationHikeMessage("Please enter Hike")
        : setValidationHikeMessage("");
    }

    setHike(inputValue);
  };

  // const [
  //   validationHikeMessage,
  //   setValidationHikeMessage,
  // ] = useState("");
  // const handleHikeChange = (e) => {
  //   const inputValue = e.target.value;
  //   const trimmedValue = inputValue.replace(/^\s+/, ""); // Remove leading spaces
  //   const filteredValue = trimmedValue.replace(/[^0-9\s]/g, ""); // Remove non-numeric characters

  //   if (filteredValue === "") {
  //     setValidationHikeMessage("Enter saving amount");
  //   } else {
  //     setValidationHikeMessage("");

  //   }
  //   setHike(inputValue);
  // };

  const [validationStampMessage, setValidationStampMessage] = useState("");
  const handleStampChange = (e) => {
    const inputValue = e.target.value;
    // const trimmedValue = inputValue.replace(/^\s+/, ""); // Remove leading spaces
    // const filteredValue = trimmedValue.replace(/[^0-9\s.]/g, ""); // Remove non-alphabetic characters

    // if (
    //   filteredValue === "0" ||
    //   filteredValue.length > 2 ||
    //   filteredValue === "00"
    // ) {
    //   setValidationStampMessage("Please Enter valid Stamp Duty");
    // } else {
    //   filteredValue === ""
    //     ? setValidationStampMessage("Please enter Stamp Duty")
    //     : setValidationStampMessage("");
    // }

    setStampDuty(inputValue);
  };

  const [validationTimePeriodMessage, setValidationTimePeriodMessage] =
    useState("");
  const handleTimePeriodChange = (e) => {
    const inputValue = e.target.value;
    const trimmedValue = inputValue.replace(/^\s+/, ""); // Remove leading spaces
    const filteredValue = trimmedValue.replace(/[^0-9\s.]/g, ""); // Remove non-alphabetic characters

    if (
      filteredValue === "0" ||
      filteredValue.length > 2 ||
      filteredValue === "00"
    ) {
      setValidationTimePeriodMessage("Please Enter valid Time Period");
    } else {
      filteredValue === ""
        ? setValidationTimePeriodMessage("Please enter Time Period")
        : setValidationTimePeriodMessage("");
    }

    setLeasePeriod(inputValue);
  };
  // const [
  //   validationTimePeriodMessage,
  //   setValidationTimePeriodMessage
  // ] = useState("");

  // const handleTimePeriodChange = (e) => {
  //   const inputValue = e.target.value;
  //   const trimmedValue = inputValue.replace(/^\s+/, ""); // Remove leading spaces
  //   const filteredValue = trimmedValue.replace(/[^0-9\s]/g, ""); // Remove non-alphabetic characters

  //   if (filteredValue === "") {
  //     // If the input is empty, clear the validation message and update the state
  //     setValidationTimePeriodMessage("");
  //     setLeasePeriod(filteredValue);
  //   } else if (/^[1-9][0-9]?$/.test(filteredValue)) {
  //     setValidationTimePeriodMessage("");
  //     setLeasePeriod(filteredValue);
  //   } else {
  //     setValidationTimePeriodMessage("Enter a valid Time Period");
  //   }
  // };

  useEffect(() => {
    if (
      validationHikeMessage === "" &&
      validationStampMessage === "" &&
      validationTimePeriodMessage === ""
    ) {
      setisButtonDisabled(false);
    } else {
      setisButtonDisabled(true);
    }
  }, [
    validationHikeMessage,
    validationStampMessage,
    validationTimePeriodMessage,
  ]);
  // const {  stampDuty, leaseTimePeriod } = formData;

  // const onInputChange = (e) => {
  //   setFormData({ ...formData, [e.target.name]: e.target.value });
  // };
  const [Error, SetError] = useState("");
  const onSubmit = () => {
    if (stampDuty === "" || hike === "" || leasePeriod === "") {
      SetError(
        "* Indicates mandatory fields, Please fill mandatory fields before Submit"
      );
    } else {
      const finalData = {
        OrganizationId: user.OrganizationId,
        userId: user._id,
        userName: user.username,
        OrganizationName: user.OrganizationName,
        hike: parseInt(hike),
        StampDuty: parseFloat(stampDuty),
        LeaseTimePeriod: parseInt(leasePeriod),
      };
      const ActivityDetail = {
        userId: user && user._id,
        userName: user && user.username,
        Menu: "Tenant Setting",
        Operation: "Update",
        Name: user.OrganizationName,
        OrganizationId: user.OrganizationId,
        expireAt: new Date().getTime() + 80,
      };
      AddUserActivity(ActivityDetail);
      AddTenantSettingform(finalData);
      onAddSettingModalChange(true);
      getAllSettings({
        OrganizationId: myuser && myuser.OrganizationId,
        userId: myuser && myuser._id,
      });
    }
  };
  let passwrdTooltip = {
    marginLeft: "-16em",
    position: "absolute",
    marginTop: "1.5em",
    pointerEvents: "none",
    zIndex: "999",
    width: "300px",
  };
  const onUpdate = () => {
    if (stampDuty === "" || hike === "" || leasePeriod === "") {
      SetError(
        "* Indicates mandatory fields, Please fill mandatory fields before Submit"
      );
    } else {
      const finalData = {
        OrganizationId: user.OrganizationId,
        userId: user._id,
        userName: user.username,
        hike: parseInt(hike),
        stampDuty: parseFloat(stampDuty),
        leaseTimePeriod: parseInt(leasePeriod),
      };
      const ActivityDetail = {
        userId: user && user._id,
        userName: user && user.username,
        Menu: "Tenant Setting",
        Operation: "Update",
        Name: user.OrganizationName,
        OrganizationId: user.OrganizationId,
        expireAt: new Date().getTime() + 80,
      };
      AddUserActivity(ActivityDetail);

      UpdateTenantSettingform(finalData);
      onAddSettingModalChange(true);
      getAllSettings({
        OrganizationId: myuser && myuser.OrganizationId,
        userId: myuser && myuser._id,
      });
    }
  };

  return !isAuthenticated || !user || !users ? (
    <Fragment></Fragment>
  ) : (
    <Fragment>
      <div className="row ">
        <div className="row col-lg-12 col-md-9 col-sm-9 col-12 py-3">
          <div className="col-lg-4 col-md-2 col-sm-4 col-12">
            <label> Hike %*:</label>
          </div>

          <div className="col-lg-5 col-md-4 col-sm-4  col-12 ">
            <input
              placeholder="Hike Percentage"
              type="number"
              name="hike"
              className="form-control"
              value={hike}
              onChange={(e) => handleHikeChange(e)}
              // onChange={(e) => setHike(e.target.value)}
              required
            />

            <div
              className="cstm-hint"
              id="pass_admin_help"
              style={{ top: "10px" }}
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
                data-hint="Please Only enter Number "
              ></div>
            </div>
            <h6 style={{ color: "red" }}>{validationHikeMessage}</h6>
          </div>
        </div>
        <div className="row col-lg-12 col-md-9 col-sm-9 col-12 py-3">
          <div className="col-lg-4 col-md-2 col-sm-4 col-12">
            <label>Stamp Duty % *:</label>
          </div>

          <div className="col-lg-5  col-md-4 col-sm-4 col-12">
            <input
              type="number"
              name="stampDuty"
              placeholder="Stamp Duty"
              className="form-control"
              value={stampDuty}
              onChange={(e) => handleStampChange(e)}
              // onChange={(e) => setStampDuty(e.target.value)}
              required
            />
            <div
              className="cstm-hint"
              id="pass_admin_help"
              style={{ top: "10px" }}
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
                data-hint=" Dont Enter Fractional Number (Eg:1.2),(2.2) "
              ></div>
            </div>
            <h6 style={{ color: "red" }}>{validationStampMessage}</h6>
          </div>
        </div>

        <div className="row col-lg-12 col-md-9 col-sm-9 col-12 py-3">
          <div className="col-lg-4 col-md-2 col-sm-4 col-12">
            <label>Lease Time Period*:(in months)</label>
          </div>

          <div className="col-lg-5  col-md-4 col-sm-4 col-12">
            <input
              type="number"
              //pattern="/^(?!0+$)(?!-)[0-9]+$/"
              name="leaseTimePeriod"
              placeholder="Time Period"
              className="form-control"
              value={leasePeriod}
              // value={leaseTimePeriod}
              onChange={(e) => handleTimePeriodChange(e)}
              required
            />
            <h6 style={{ color: "red" }}>{validationTimePeriodMessage}</h6>
          </div>
        </div>
        {/* <div className="col-lg-9  col-sm-12 col-md-12 text-danger">
          * Indicates mandatory fields, Please fill mandatory fields before
          Submit
        </div> */}
        <div className="col-lg-12 col-sm-12 col-12 text-danger ">{Error}</div>
        <div className="col-lg-12 col-sm-12 col-12 ">
          <label>
            <span style={{ color: "#095a4a", fontWeight: "bold" }}> Note:</span>{" "}
            Lease Time Period is used for Stamp Duty and hike calculation only
          </label>
          {!myuser.OrganizationId ? (
            <button
              variant="success"
              className="btn sub_form btn_continue Save float-right"
              id="TenantSettingBtn"
              disabled={isButtonDisabled}
              onClick={() => onSubmit()}
            >
              <b>Save</b>
            </button>
          ) : (
            <button
              variant="success"
              className="btn sub_form btn_continue Save float-right"
              id="TenantSettingBtn"
              disabled={isButtonDisabled}
              onClick={() => onUpdate()}
            >
              <b>Update</b>
            </button>
          )}
        </div>
      </div>
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  tenants: state.tenants,
});

export default connect(mapStateToProps, {
  getAllSettings,
  AddTenantSettingform,
  getParticularTenantSetting,
  UpdateTenantSettingform,
  AddUserActivity,
})(TenantSettings);
