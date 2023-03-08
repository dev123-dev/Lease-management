import React, { useState, Fragment, useEffect } from "react";
import PropTypes from "prop-types";
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
  getParticularTenantSetting,
  onAddSettingModalChange,
}) => {
  useEffect(() => {
    getAllSettings();
    getParticularTenantSetting({
      OrganizationId: user && user.OrganizationId,
    });
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
      OrganizationId: user.OrganizationId,
      OrganizationName: user.OrganizationName,
      hikePercentage: hikePercentage,
      stampDuty: stampDuty,
      leaseTimePeriod: leaseTimePeriod,
    };
    AddTenantSettingform(finalData);
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
            <label>
              {" "}
              Hike Percentage{" "}
              <i className="text-danger ">
                <b>*</b>
              </i>{" "}
              :
            </label>
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
            <label>
              Stamp Duty{" "}
              <i className="text-danger ">
                <b>*</b>
              </i>
              :
            </label>
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
            <label>
              Lease Time Period{" "}
              <i className="text-danger ">
                <b>*</b>
              </i>{" "}
              :
            </label>
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
            >
              Save
            </button>
          ) : (
            <button
              variant="success"
              id="TenantSettingBtn"
              onClick={() => onUpdate(allTenantSetting)}
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
  getParticularTenantSetting,
  UpdateTenantSettingform,
})(TenantSettings);
