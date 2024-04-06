import React from "react";
import { connect } from "react-redux";
import { Link, useHistory } from "react-router-dom";

// LOGOS
import propreport from "../../static/images/propreport.png";
import location from "../../static/images/location.png";
import Contactreport from "../../static/images/contactreport.png";
import Useractivity from "../../static/images/Useractivity.png";
import MISReport from "../../static/images/MIS_report.png";
import renewable from "../../static/images/renewable.png";
import renewedTenant from "../../static/images/renewedTenant.png";

// Actions
import { ParticularTenant, getPropertyTenantData } from "../../actions/tenants";

//cust CSS
import "../../styles/CustomisedStyle.css";

const AllReport = ({ auth: { user, isAuthenticated, loading } }) => {
  const history = useHistory();
  const handleRenewedTenantClick = () => {
    history.push("/renewed-report", { from: "report" });
  };

  return !isAuthenticated || !user || loading ? (
    <></>
  ) : (
    <>
      <div className="col mt-sm-4 space">
        <div className="row col-lg-12 col-md-12 col-sm-12 col-12 no_padding ">
          <div className="row mt-5 ">
            <div className="col-lg-5  col-sm-12 col-md-12 mt-3">
              <h2 className="heading_color  headsize  ml-4">All Report</h2>
            </div>
          </div>
        </div>

        <div className=" ml-5">
          {/* <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
            <li className="nav-item" role="presentation">
              <button
                className="nav-link active"
                id="pills-home-tab"
                data-bs-toggle="pill"
                data-bs-target="#pills-home"
                type="button"
                role="tab"
                aria-controls="pills-home"
                aria-selected="true"
              >
                General
              </button>
            </li>
            <li className="nav-item" role="presentation">
              <button
                className="nav-link"
                id="pills-profile-tab"
                data-bs-toggle="pill"
                data-bs-target="#pills-profile"
                type="button"
                role="tab"
                aria-controls="pills-profile"
                aria-selected="false"
              >
                Finance
              </button>
            </li>
          </ul> */}

          <div className="tab-content" id="pills-tabContent">
            <div
              className="tab-pane fade show active"
              id="pills-home"
              role="tabpanel"
              aria-labelledby="pills-home-tab"
            >
              <div className="row">
                <div
                  className="col-lg-3  col-sm-12 col-md-12 card ml-2 h2 text-center pt-5"
                  id="shadow-bck"
                >
                  <div className="text-center">
                    <Link to="/property-report">
                      <img
                        className="img_icon_repDashboard log"
                        src={propreport}
                        alt="loc report"
                      />
                    </Link>
                    <p>
                      <center>
                        <p
                          style={{
                            color: "black",
                          }}
                        >
                          <b className="h4">
                            Property Report
                            <br />
                          </b>
                        </p>
                      </center>
                    </p>
                  </div>
                </div>
                {/* <div
                  className="col-lg-3 col-sm-12 col-md-12 ml-2 card h2 text-center pt-5"
                  id="shadow-bck"
                >
                  <div className="text-center">
                    <Link to="/user-activity">
                      <img
                        className="img_icon_repDashboard log "
                        src={Useractivity}
                        alt="User Activity Report"
                      />
                    </Link>

                    <p>
                      <center>
                        <p
                          style={{
                            color: "black",
                          }}
                        >
                          <b className="h4">
                            Property Report<br></br> {""}
                          </b>
                        </p>
                      </center>
                    </p>
                  </div>
                </div> */}
                {/* <div
                  className="col-lg-3  col-sm-12 col-md-12  ml-2 card h2 text-center pt-5  "
                  id="shadow-bck"
                >
                  <div className="text-center">
                    <Link to="/Contact-Report">
                      {" "}
                      <img
                        className="img_icon_repDashboard log "
                        src={Contactreport}
                        alt="IMG1"
                      />
                    </Link>

                    <p>
                      <center>
                        <p
                          style={{
                            color: "black",
                          }}
                        >
                          <b className="h4">
                            Contact Report<br></br> {""}
                          </b>
                        </p>
                      </center>
                    </p>
                  </div>
                </div> */}
                <div
                  className="col-lg-3  col-sm-12 col-md-12  ml-2 card h2 text-center pt-5  "
                  id="shadow-bck"
                >
                  <div className="text-center">
                    <Link to="/user-activity">
                      {" "}
                      <img
                        className="img_icon_repDashboard log "
                        src={Useractivity}
                        alt="IMG1"
                      />
                    </Link>

                    <p>
                      <center>
                        <p
                          style={{
                            color: "black",
                          }}
                        >
                          <b className="h4">
                            User Activity
                            <br /> {""}
                          </b>
                        </p>
                      </center>
                    </p>
                  </div>
                </div>
                <div
                  className="col-lg-3  col-sm-12 col-md-12  ml-2 card h2 text-center pt-5 "
                  id="shadow-bck"
                >
                  <div className="text-center">
                    <Link to="/renewal-report">
                      <button
                        // onClick={handleRenewedTenantClick}
                        style={{ border: "none" }}
                      >
                        <img
                          className="img_icon_repDashboard log"
                          src={renewedTenant}
                          alt="IMG1"
                        />
                      </button>
                    </Link>
                    <p>
                      <center>
                        <p
                          style={{
                            color: "black",
                          }}
                        >
                          <b className="h4">
                            Renewal Report<br></br>
                          </b>
                        </p>
                      </center>
                    </p>
                  </div>
                </div>

                {/* <div
                  className="col-lg-3  col-sm-12 col-md-12  ml-2 card h2 text-center pt-5  "
                  id="shadow-bck"
                >
                  <div className="text-center">
                    <Link to="/renewable-report">
                      {" "}
                      <img
                        className="img_icon_repDashboard log "
                        src={renewable}
                        alt="IMG1"
                      />
                    </Link>
                    <p>
                      <center>
                        <p
                          style={{
                            color: "black",
                          }}
                        >
                          <b className="h4">
                            Renewable Report<br></br> {""}
                          </b>
                        </p>
                      </center>
                    </p>
                  </div>
                </div> */}

                {/* <div className="col-lg-3  col-sm-12 col-md-12"></div> */}
              </div>
            </div>

            <div
              className="tab-pane fade"
              id="pills-profile"
              role="tabpanel"
              aria-labelledby="pills-profile-tab"
            >
              <div className="row ">
                <div
                  className="col-lg-3  col-sm-12 col-md-12  ml-2 card h2 text-center pt-5  "
                  id="shadow-bck"
                >
                  <div className="text-center">
                    <Link to="/mis-Report">
                      {" "}
                      <img
                        className="img_icon_repDashboard log "
                        src={MISReport}
                        alt="IMG1"
                      />
                    </Link>

                    <p>
                      <center>
                        <p
                          style={{
                            color: "black",
                          }}
                        >
                          <b className="h4">
                            MIS Report<br></br> {""}
                          </b>
                        </p>
                      </center>
                    </p>
                  </div>
                </div>

                <div className="col-lg-3  col-sm-12 col-md-12"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
const mapStateToProps = (state) => ({
  tenants: state.tenants,
  auth: state.auth,
});
export default connect(mapStateToProps, {
  ParticularTenant,
  getPropertyTenantData,
})(AllReport);
