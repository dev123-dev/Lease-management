import React, { Fragment, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { loadUser } from "../../actions/auth";

const RouteDriver = ({ auth: { user }, loadUser }) => {
  useEffect(() => {
    loadUser();
  }, [loadUser]);

  if (user) {
    if (user.usergroup === "Admin") {
      return <Redirect to="/MainAdmin" />;
    } else {
      return <Redirect to="/MainSuper" />;
    }
  }
  return <Fragment>loading...</Fragment>;
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { loadUser })(RouteDriver);
