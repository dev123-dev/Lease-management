import React, { Fragment, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { loadUser } from "../../actions/auth";
import { get_particular_org_user } from "../../actions/tenants";
// import { Roller } from "react-awesome-spinners";

const RouteDriver = ({ auth: { user }, loadUser }) => {
  //const myuser = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    loadUser();
    get_particular_org_user({ OrganizationId: user && user.OrganizationId });
  }, [loadUser]);

  if (user) {
    if (user.usergroup === "Admin") {
      return <Redirect to="/MainAdmin" />;
    } else if (user.usergroup === "Super Admin") {
      return <Redirect to="/MainSuper" />;
    } else {

      return <Redirect to="/MainAdmin" />;
    }
  }
  return <Fragment></Fragment>;
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  tenants: state.tenants,
});

export default connect(mapStateToProps, { loadUser, get_particular_org_user })(
  RouteDriver
);
