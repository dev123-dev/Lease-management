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
    hike: allTenantSetting && allTenantSetting.hike,
    stampDuty: allTenantSetting && allTenantSetting.stampDuty,
    leaseTimePeriod: allTenantSetting && allTenantSetting.leaseTimePeriod,
  });

  const [hike, setHike] = useState(
    allTenantSetting && allTenantSetting.hike
      ? allTenantSetting && allTenantSetting.hike
      : ""
  );
  const [stampDuty, setStampDuty] = useState(
    allTenantSetting && allTenantSetting.stampDuty
      ? allTenantSetting && allTenantSetting.stampDuty
      : ""
  );
  const [leaseTimePeriod, setLeaseTimePeriod] = useState(
    allTenantSetting && allTenantSetting.leaseTimePeriod
      ? allTenantSetting && allTenantSetting.leaseTimePeriod
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
        stampDuty: parseInt(stampDuty),
        leaseTimePeriod: parseInt(leaseTimePeriod),
      };
      AddTenantSettingform(finalData);
      onAddSettingModalChange(true);
      getAllSettings({
        OrganizationId: myuser && myuser.OrganizationId,
        userId: myuser && myuser._id,
      });
    }
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
      <div className="row">
        <div className="row col-lg-12 col-md-9 col-sm-9 col-12 py-3">
          <div className="col-lg-4 col-md-2 col-sm-1 col-12">
            <label> Hike Percentage*:</label>
          </div>

          <div className="col-lg-5  col-md-4 col-sm-4 col-12">
            <input
              placeholder="Hike Percentage"
              type="text"
              name="hike"
              className="form-control"
              value={hike}
              onChange={(e) => setHike(e.target.value)}
              required
            />
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
          </div>
        </div>

        <div className="row col-lg-12 col-md-9 col-sm-9 col-12 py-3">
          <div className="col-lg-4 col-md-2 col-sm-4 col-12">
            <label>Lease Time Period*:</label>
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
        <div className="col-lg-12 col-sm-12 col-12 text-danger ">{Error}</div>
        <div className="col-lg-12 col-sm-12 col-12 ">
          {allTenantSetting == null ? (
            <button
              variant="success"
              className="btn sub_form btn_continue Save float-right"
              id="TenantSettingBtn"
              onClick={() => onSubmit()}
            >
              Save
            </button>
          ) : (
            <button
              variant="success"
              className="btn sub_form btn_continue Save float-right"
              id="TenantSettingBtn"
              onClick={() => onUpdate()}
            >
              Update
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
