import React, { useState, Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { AddTenantSettingform } from "../../actions/tenants";
import { UpdateTenantSettingform } from "../../actions/tenants";

import { getAllSettings } from "../../actions/tenants";
const TenantSettings = ({
  AddTenantSettingform,
  UpdateTenantSettingform,
  tenants: { allTenantSetting },
  auth: { isAuthenticated, user, users },
  getAllSettings,
  onAddSettingModalChange,
}) => {
  useEffect(() => {
    getAllSettings();
  }, [getAllSettings]);

  //formData

  const [formData, setFormData] = useState({
    recordId: allTenantSetting[0] ? allTenantSetting[0]._id : "",
    hikePercentage: allTenantSetting[0]
      ? allTenantSetting[0].hikePercentage
      : "",
    stampDuty: allTenantSetting[0] ? allTenantSetting[0].stampDuty : "",
    leaseTimePeriod: allTenantSetting[0]
      ? allTenantSetting[0].leaseTimePeriod
      : "",
  });

  const { hikePercentage, stampDuty, leaseTimePeriod } = formData;

  const onInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = () => {
    const finalData = {
      hikePercentage: hikePercentage,
      stampDuty: stampDuty,
      leaseTimePeriod: leaseTimePeriod,
    };
    AddTenantSettingform(finalData);
    setFormData({ ...formData, isSubmitted: true });
    getAllSettings();
  };

  const onUpdate = (allTenantSetting) => {
    const finalData = {
      recordId: allTenantSetting ? allTenantSetting[0]._id : "",
      hikePercentage: hikePercentage,
      stampDuty: stampDuty,
      leaseTimePeriod: leaseTimePeriod,
    };

    UpdateTenantSettingform(finalData);
    onAddSettingModalChange(true);
    getAllSettings();
  };

  return !isAuthenticated || !user || !users ? (
    <Fragment></Fragment>
  ) : (
    <Fragment>
      <div className="row">
        <div className="row col-lg-12 col-md-9 col-sm-9 col-12 py-3">
          <div className="col-lg-4 col-md-2 col-sm-1 col-12">
            <label> Hike Percentage * :</label>
          </div>

          <div className="col-lg-5  col-md-4 col-sm-4 col-12">
            <input
              type="text"
              name="hikePercentage"
              className="form-control"
              value={hikePercentage}
              onChange={(e) => onInputChange(e)}
              required
            />
          </div>
        </div>
        <div className="row col-lg-12 col-md-9 col-sm-9 col-12 py-3">
          <div className="col-lg-4 col-md-2 col-sm-4 col-12">
            <label>Stamp Duty * :</label>
          </div>

          <div className="col-lg-5  col-md-4 col-sm-4 col-12">
            <input
              type="text"
              name="stampDuty"
              className="form-control"
              value={stampDuty}
              onChange={(e) => onInputChange(e)}
              required
            />
          </div>
        </div>
        <div className="row col-lg-12 col-md-9 col-sm-9 col-12 py-3">
          <div className="col-lg-4 col-md-2 col-sm-4 col-12">
            <label>Lease Time Period * :</label>
          </div>

          <div className="col-lg-5  col-md-4 col-sm-4 col-12">
            <input
              type="text"
              name="leaseTimePeriod"
              className="form-control"
              value={leaseTimePeriod}
              onChange={(e) => onInputChange(e)}
              required
            />
          </div>
        </div>
        <div className="col-lg-12 Savebutton" size="lg">
          {allTenantSetting && allTenantSetting.length === 0 ? (
            <button
              variant="success"
              className="btn sub_form btn_continue Save float-right"
              onClick={() => onSubmit()}
              style={
                leaseTimePeriod !== "" &&
                stampDuty !== "" &&
                hikePercentage !== ""
                  ? { opacity: "1" }
                  : { opacity: "1", pointerEvents: "none" }
              }
            >
              Save
            </button>
          ) : (
            <button
              variant="success"
              className="btn sub_form btn_continue Save float-right"
              onClick={() => onUpdate(allTenantSetting)}
              style={
                leaseTimePeriod !== "" &&
                stampDuty !== "" &&
                hikePercentage !== ""
                  ? { opacity: "1" }
                  : { opacity: "1", pointerEvents: "none" }
              }
            >
              Update
            </button>
          )}
        </div>
      </div>
    </Fragment>
  );
};

TenantSettings.propTypes = {
  getAllSettings: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  AddTenantSettingform: PropTypes.func.isRequired,
  UpdateTenantSettingform: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  tenants: state.tenants,
});

export default connect(mapStateToProps, {
  getAllSettings,
  AddTenantSettingform,
  UpdateTenantSettingform,
})(TenantSettings);
