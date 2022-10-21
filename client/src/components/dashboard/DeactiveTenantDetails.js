import React, { useState, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { deactiveTenantsDetails } from "../../actions/tenants";
import { getAllTenants } from "../../actions/tenants";
const DeactiveTenantDetails = ({
  auth: { isAuthenticated, user, users },
  tenants,
  deactiveTenantsDetails,
  onDeactiveModalChange,
  getAllTenants,
}) => {
  const [formData, setFormData] = useState({
    tenantdeactivereason: "",
    isSubmitted: false,
  });

  const { tenantdeactivereason } = formData;

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

  const onSubmit = (tenants, idx) => {
    const finalData = {
      recordId: tenants ? tenants._id : "",
      tenantstatus: "Deactive",
      tenantdeactivereason: tenantdeactivereason,
      tenantEnteredBy: user && user._id,
      tenantDate: todayDateymd,
    };
    deactiveTenantsDetails(finalData);
    onDeactiveModalChange(true);
    getAllTenants();
  };

  return !isAuthenticated || !user || !users ? (
    <Fragment></Fragment>
  ) : (
    <Fragment>
      <div className="col-lg-12 col-md-9 col-sm-9 col-12 ">
        <div className="row col-lg-12 col-md-9 col-sm-9 col-12 ">
          <div className="col-lg-12 col-md-4 col-sm-4 col-12">
            <label>Reason For Deactivation*:</label>
          </div>
          <div className="col-lg-12  col-md-4 col-sm-4 col-12">
            <textarea
              name="tenantdeactivereason"
              id="tenantdeactivereason"
              className="textarea form-control"
              rows="3"
              placeholder="Deactive Reason"
              onChange={(e) => onInputChange(e)}
              style={{ width: "100%" }}
              required
            ></textarea>
          </div>
          <div className="col-lg-12 col-md-4 col-sm-4 col-12 py-2">
            <label>Are You Sure You Want to Deactivate??</label>
          </div>
          <div
            className="col-lg-12 col-md-9 col-sm-9 col-12 Savebutton"
            size="lg"
          >
            <button
              variant="success"
              className="btn sub_form btn_continue Save float-right "
              onClick={() => onSubmit(tenants)}
              style={
                tenantdeactivereason !== ""
                  ? { opacity: "1" }
                  : { opacity: "1", pointerEvents: "none" }
              }
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

DeactiveTenantDetails.propTypes = {
  auth: PropTypes.object.isRequired,
  deactiveTenantsDetails: PropTypes.func.isRequired,
  getAllTenants: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, {
  deactiveTenantsDetails,
  getAllTenants,
})(DeactiveTenantDetails);
