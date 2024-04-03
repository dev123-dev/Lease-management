import React from "react";
import "../../styles/CustomisedStyle.css";
import {} from "../../actions/tenants";
import { connect } from "react-redux";
import { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import locreport from "../../static/images/locrep.png";

import propreport from "../../static/images/propreport.png";
import location from "../../static/images/location.png";
import Contactreport from "../../static/images/contactreport.png";
import Useractivity from "../../static/images/Useractivity.png";
import MISReport from "../../static/images/MIS_report.png";
import renewable from "../../static/images/renewable.png";

import renewedTenant from "../../static/images/renewedTenant.png";
// import { Roller } from "react-awesome-spinners";
import { ParticularTenant, getPropertyTenantData } from "../../actions/tenants";
const AllReport = ({
  auth: { user, isAuthenticated, loading },
  tenants: { particular_org_data, get_particular_org_tenant },
  getPropertyTenantData,
}) => {
  const myuser = JSON.parse(localStorage.getItem("user"));
  const myorg = JSON.parse(localStorage.getItem("Org"));
  //console.log("myorg", myorg);
  useEffect(() => {
    let propertyId =
      particular_org_data &&
      particular_org_data.map((ele) => {
        return ele._id;
      });
    if (myuser) {
      fun();

      getPropertyTenantData({
        PropertyId: propertyId,
        OrganizationId: myuser.OrganizationId,
      });
      //   getParticularProperty({
      //     OrganizationId: myuser && myuser.OrganizationId,
      //   });
      //   ParticularTenant({ OrganizationId: myuser && myuser.OrganizationId });
      //   getAllSettings({
      //     OrganizationId: myuser && myuser.OrganizationId,
      //     userId: myuser && myuser._id,
      //   });
      //   get_particular_org_user({ OrganizationId: myuser.OrganizationId });
      ParticularTenant({ OrganizationId: myuser && myuser.OrganizationId });
    }
  }, []);
  const history = useHistory();
  const handleRenewedTenantClick = () => {
    history.push("/renewed-report", { from: "report" });
  };

  //console.log("get_particular_org_tenant", get_particular_org_tenant);

  const total = JSON.parse(localStorage.getItem("total"));
  let count = 0;
  let AvaiableShopCount = 0;
  const [PropertyCount, setPropertyCount] = useState(0);
  const [TenantCount, setTenantCount] = useState(0);

  const [status, setStatus] = useState("");
  let ShopStatus = [];
  // particular_org_data.map((ele) =>
  //   ShopStatus.push({
  //     label: ele.shopStatus,
  //   })
  // );

  particular_org_data &&
    particular_org_data.map((ele) => {
      ele.shopDoorNo &&
        ele.shopDoorNo.map((ele1) => {
          if (ele1.status === "Avaiable") {
            ShopStatus.push({
              ele1,
            });
          }
        });
    });

  const tenantCount = get_particular_org_tenant.filter((ele) => {
    if (ele.tenantstatus === "Active") {
      return ele;
    }
  });
  const fun = () => {
    let pCount =
      particular_org_data &&
      particular_org_data.reduce((acu, cur) => acu + 1, 0);
    setPropertyCount(pCount);
  };
  return !isAuthenticated || !user || loading ? (
    <></>
  ) : (
    <>
      <div className="col mt-sm-4 space ">
        <div className="row col-lg-12 col-md-12 col-sm-12 col-12 no_padding ">
          <div className="row mt-5 ">
            <div className="col-lg-5  col-sm-12 col-md-12 mt-3">
              <h2 className="heading_color  headsize  ml-4">All Report</h2>
            </div>
          </div>
        </div>

        <div class=" ml-5">
          <ul class="nav nav-pills mb-3" id="pills-tab" role="tablist">
            {/* <li class="nav-item" role="presentation">
              <button
                class="nav-link active"
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
            </li> */}
            {/* <li class="nav-item" role="presentation">
              <button
                class="nav-link"
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
            </li> */}
          </ul>

          <div class="tab-content" id="pills-tabContent">
            <div
              class="tab-pane fade show active"
              id="pills-home"
              role="tabpanel"
              aria-labelledby="pills-home-tab"
            >
              <div className="row ">
                <div
                  className="col-lg-3  col-sm-12 col-md-12 card ml-2 h2 text-center pt-5"
                  id="shadow-bck"
                >
                  <div className="text-center">
                    <Link to="/LocationReport">
                      <img
                         className="img_icon_repDashboard log "
                        // src={require("../../static/images/loc.png")}
                        src={location}
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
                            Location Report<br></br>
                            {""}
                          </b>
                        </p>
                      </center>
                    </p>
                  </div>

                  <div></div>
                </div>
                <div
                  className="col-lg-3  col-sm-12 col-md-12  ml-2 card h2 text-center pt-5  "
                  id="shadow-bck"
                >
                  <div className="text-center">
                    <Link to="/BuildingReport">
                      {" "}
                      <img
                        className="img_icon_repDashboard log "
                        src={propreport}
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
                            Property Report<br></br> {""}
                          </b>
                        </p>
                      </center>
                    </p>
                  </div>
                </div>
                <div
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
                </div>
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
                            User Activity<br></br> {""}
                          </b>
                        </p>
                      </center>
                    </p>
                  </div>
                </div>
                <div
                  className="col-lg-3  col-sm-12 col-md-12  ml-2 card h2 text-center pt-5  "
                  id="shadow-bck"
                >
                  <div className="text-center">
                    {/* <Link to="/renewed-report"> */}
                    <button
                      onClick={handleRenewedTenantClick}
                      style={{ border: "none" }}
                    >
                      <img
                        className="img_icon_repDashboard log "
                        src={renewedTenant}
                        alt="IMG1"
                      />
                    </button>
                    {/* </Link> */}
                    <p>
                      <center>
                        <p
                          style={{
                            color: "black",
                          }}
                        >
                          <b className="h4">
                            Renewed Report<br></br> {""}
                          </b>
                        </p>
                      </center>
                    </p>
                  </div>
                </div>

                <div
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
                </div>

                {/* <div className="col-lg-3  col-sm-12 col-md-12"></div> */}
              </div>
            </div>
            {/* <div
              class="tab-pane fade"
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
            </div> */}
          </div>
        </div>

        {/* <section
          className="sub_reg  "
          style={{
            backgroundColor: "transparent",
          }}
        >
          <div className="row ml-5">
            <div
              className="col-lg-3  col-sm-12 col-md-12 card ml-2 h2 text-center pt-5"
              id="shadow-bck"
            >
              <div className="text-center">
                <Link to="/LocationReport">
                  <img
                    className="img_icon_repDashboard log "
                    src={require("../../static/images/loc.png")}
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
                        Location Report<br></br>
                        {""}
                      </b>
                    </p>
                  </center>
                </p>
              </div>

              <div></div>
            </div>
            <div
              className="col-lg-3  col-sm-12 col-md-12  ml-2 card h2 text-center pt-5  "
              id="shadow-bck"
            >
              <div className="text-center">
                <Link to="/BuildingReport">
                  {" "}
                  <img
                    className="img_icon_repDashboard log "
                    src={propreport}
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
                        Property Report<br></br> {""}
                      </b>
                    </p>
                  </center>
                </p>
              </div>
            </div>
            <div
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
            </div>
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
        </section> */}
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
