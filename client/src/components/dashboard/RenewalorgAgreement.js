import React, { useState, useEffect, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

const RenewTenentAgreement = ({
  auth: { isAuthenticated, user, users },
  OrgData,
}) => {
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
            <label>{OrgData.OrganizationName}</label>
          </div>
        </div>

        <div className="row py-2">
          <div className="col-lg-4 col-md-2 col-sm-4 col-12">
            <label>Email</label>
          </div>

          <div className="col-lg-6  col-md-4 col-sm-4 col-12">
            <label>{OrgData.OrganizationEmail}</label>
          </div>
        </div>
      </section>
    </Fragment>
  );
};

RenewTenentAgreement.propTypes = {
  auth: PropTypes.object.isRequired,

  RenewTenantDetailsform: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, {})(RenewTenentAgreement);
