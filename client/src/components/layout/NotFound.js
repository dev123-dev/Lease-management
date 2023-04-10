import React, { Fragment } from "react";

const NotFound = (props) => {
  return (
    <Fragment>
      {/*  <h1>No {props.msg} Found</h1>
        <p>Sorry, there are no {props.msg} for you</p>*/}
      <div className="container container_align">
        <div className="col-md-12 col-lg-12 col-sm-12 col-12 center_div height_full">
          <div className="col-md-12 col-lg-12 col-sm-12 col-12">
            <hr className="doted_hr" />
          </div>
          <div className="col-md-12 col-lg-12 col-sm-12 col-12 thanks_page no_padding">
            <div className="col-md-12 col-lg-12 col-sm-12 col-12 ">
              <h1>Page Not Found</h1>
            </div>

            <div className="col-md-12 col-lg-12 col-sm-12 col-12">
              <p style={{ textAlign: "center" }}>
                You have type an unspecific url in the browser.
                <br />
                <br />
                <span style={{ color: "#FF0000", fontWeight: "400" }}>
                  For the security issues, we are redirecting you to the home
                  page.
                </span>
              </p>
            </div>
          </div>
          <div className="col-md-12 col-lg-12 col-sm-12 col-12">
            <hr className="doted_hr" />
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default NotFound;
