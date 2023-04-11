import React, { useState, Fragment, useEffect } from "react";
import { connect } from "react-redux";
import { AddTenantSettingform } from "../../actions/tenants";
import {
  UpdateTenantSettingform,
  getParticularTenantSetting,
} from "../../actions/tenants";

import { getAllSettings } from "../../actions/tenants";
const TenantSettings = ({
  AddTenantSettingform,
  UpdateTenantSettingform,
  tenants: { allTenantSetting },
  auth: { isAuthenticated, user, users },
  getAllSettings,
  onAddSettingModalChange,
}) => {
  //console.log("data", allTenantSetting.leaseTimePeriod);
  const myuser = JSON.parse(localStorage.getItem("user"));
  console.log("tenant setting", myuser);

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

  const [formData, setFormData] = useState({
    hike: myuser.output.hike,
    stampDuty: myuser.output && myuser.output.ltampDuty,
    leaseTimePeriod: myuser.output && myuser.output.leaseTimePeriod,
  });

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

  // const {  stampDuty, leaseTimePeriod } = formData;

  // const onInputChange = (e) => {
  //   setFormData({ ...formData, [e.target.name]: e.target.value });
  // };
  const [Error, SetError] = useState("");
  const onSubmit = () => {
    if (stampDuty === "" || hike === "" || leaseTimePeriod === "") {
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
        StampDuty: parseInt(stampDuty),
        LeaseTimePeriod: parseInt(leaseTimePeriod),
      };
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
    if (stampDuty === "" || hike === "" || leaseTimePeriod === "") {
      SetError(
        "* Indicates mandatory fields, Please fill mandatory fields before Submit"
      );
    } else {
      const finalData = {
        OrganizationId: user.OrganizationId,
        userId: user._id,
        userName: user.username,
        hike: hike,
        stampDuty: stampDuty,
        leaseTimePeriod: leaseTimePeriod,
      };
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
              type="text"
              name="hike"
              className="form-control"
              value={hike}
              onChange={(e) => setHike(e.target.value)}
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
                data-hint="Only enter Number "
              ></div>
            </div>
          </div>
        </div>
        <div className="row col-lg-12 col-md-9 col-sm-9 col-12 py-3">
          <div className="col-lg-4 col-md-2 col-sm-4 col-12">
            <label>Stamp Duty*:</label>
          </div>

          <div className="col-lg-5  col-md-4 col-sm-4 col-12">
            <input
              type="text"
              name="stampDuty"
              placeholder="Stamp Duty"
              className="form-control"
              value={stampDuty}
              onChange={(e) => setStampDuty(e.target.value)}
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
                data-hint=" Dont Enter fractional number (Eg:1.2),(2.2) "
              ></div>
            </div>
          </div>
        </div>

        <div className="row col-lg-12 col-md-9 col-sm-9 col-12 py-3">
          <div className="col-lg-4 col-md-2 col-sm-4 col-12">
            <label>Lease Time Period*:(in months)</label>
          </div>

          <div className="col-lg-5  col-md-4 col-sm-4 col-12">
            <input
              type="text"
              name="leaseTimePeriod"
              placeholder="Time Period"
              className="form-control"
              value={leaseTimePeriod}
              onChange={(e) => setLeaseTimePeriod(e.target.value)}
              required
            />
          </div>
        </div>
        <div className="col-lg-9 text-danger">
          * Indicates mandatory fields, Please fill mandatory fields before
          Submit
        </div>
        <div className="col-lg-12 col-sm-12 col-12 text-danger ">{Error}</div>
        <div className="col-lg-12 col-sm-12 col-12 ">
          {!myuser.OrganizationId ? (
            <button
              variant="success"
              className="btn sub_form btn_continue Save float-right"
              id="TenantSettingBtn"
              onClick={() => onSubmit()}
            >
              <b>Save</b>
            </button>
          ) : (
            <button
              variant="success"
              className="btn sub_form btn_continue Save float-right"
              id="TenantSettingBtn"
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
})(TenantSettings);
