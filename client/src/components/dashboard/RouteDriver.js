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

  useEffect(() => {
    const myuser = JSON.parse(localStorage.getItem("user"));

    return () => {
      get_particular_org_user({
        OrganizationId: myuser && myuser.OrganizationId,
      });
      const myorg = JSON.parse(localStorage.getItem("Org"));
      console.log(myorg, "unmount");
    };
  }, [loadUser]);

  if (user) {
    if (user.usergroup === "Admin") {
      return <Redirect to="/MainAdmin" />;
    } else {
      return <Redirect to="/MainSuper" />;
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
