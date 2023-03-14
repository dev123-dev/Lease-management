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
  tenants: { get_Particular_org_Tenantsetting },
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
    recordId: get_Particular_org_Tenantsetting[0]
      ? get_Particular_org_Tenantsetting[0]._id
      : "",
    hikePercentage: get_Particular_org_Tenantsetting[0]
      ? get_Particular_org_Tenantsetting[0].hikePercentage
      : "",
    stampDuty: get_Particular_org_Tenantsetting[0]
      ? get_Particular_org_Tenantsetting[0].stampDuty
      : "",
    leaseTimePeriod: get_Particular_org_Tenantsetting[0]
      ? get_Particular_org_Tenantsetting[0].leaseTimePeriod
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

  const onUpdate = (get_Particular_org_Tenantsetting) => {
    const finalData = {
      recordId: get_Particular_org_Tenantsetting
        ? get_Particular_org_Tenantsetting[0]._id
        : "",
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
          {get_Particular_org_Tenantsetting &&
          get_Particular_org_Tenantsetting.length === 0 ? (
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
              onClick={() => onUpdate(get_Particular_org_Tenantsetting)}
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
