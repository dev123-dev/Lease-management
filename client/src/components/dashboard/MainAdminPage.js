import React from "react";
import "../../styles/CustomisedStyle.css";
import prop from "../../static/images/property.png";
import people from "../../static/images/people.png";
import unprop from "../../static/images/unproperty.png";
import money from "../../static/images/money.png";
import door from "../../static/images/door.png";
import {
  getParticularProperty,
  ParticularTenant,
  getAllSettings,
  get_particular_org_user,
} from "../../actions/tenants";
import { connect } from "react-redux";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
// import { Roller } from "react-awesome-spinners";

const MainAdminPage = ({
  auth: { user, isAuthenticated, loading, yearExpCnt },
  tenants: { particular_org_data, get_particular_org_tenant },
  getParticularProperty,
  getAllSettings,
  ParticularTenant,
  get_particular_org_user,
}) => {
  const myuser = JSON.parse(localStorage.getItem("user"));
  const myorg = JSON.parse(localStorage.getItem("Org"));
  //console.log("myorg", myorg);
  useEffect(() => {
    if (myuser) {
      fun();
      getParticularProperty({
        OrganizationId: myuser && myuser.OrganizationId,
      });
      ParticularTenant({ OrganizationId: myuser && myuser.OrganizationId });
      getAllSettings({
        OrganizationId: myuser && myuser.OrganizationId,
        userId: myuser && myuser._id,
      });
      get_particular_org_user({ OrganizationId: myuser.OrganizationId });
    }
  }, []);

  let TotalRenewalCount = 0;
  get_particular_org_tenant &&
    get_particular_org_tenant.filter((ele) => {
      if (ele.AgreementStatus === "Expired") {
        TotalRenewalCount += 1;
      }
    });
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
      <div className="col mt-sm-5 ">
        <div className="row col-lg-12 col-md-12 col-sm-12 col-12 no_padding mt-sm-2 ">
          <div className="row col-lg-12 col-md-12 col-sm-12 col-12 ml-5">
            <h2
              style={{
                position: "relative",
                top: "60px",
              }}
              className="heading_color  headingdashboard  ml-5"
            >
              {user && user.orgName} Dashboard
            </h2>
            {/* <br />
          <br /> */}
          </div>
        </div>
        <section className="sub_reg" style={{ backgroundColor: "transparent" }}>
          <div className="row">
            <div className="col-lg-1  col-sm-12 col-md-12"></div>
            <div
              className="col-lg-5   col-sm-12 col-md-12 ml-2 card h2 text-center pt-5"
              id="shadow-bck"
            >
              <div className="text-center">
                <Link to="/PropertyDetail">
                  {" "}
                  <img
                    className="img_icon_sizeDashboard log "
                    src={prop}
                    alt="Property"
                  />
                </Link>
                <p>
                  <center>
                    <p
                      style={{
                        // fontFamily: "Serif",
                        color: "black",
                      }}
                      // className="h3"
                    >
                      <b className="h4">
                        Total properties<br></br>{" "}
                        {particular_org_data && particular_org_data.length}
                      </b>
                    </p>
                  </center>
                </p>
              </div>
            </div>
            <div
              className="col-lg-5  col-sm-12 col-md-12 card ml-2 h2 text-center pt-5"
              id="shadow-bck"
            >
              <div className="text-center">
                <Link to="/tenant-detail">
                  <img
                    className="img_icon_sizeDashboard log "
                    src={people}
                    alt="Tenant Count"
                  />
                </Link>
                <p>
                  <center>
                    <p
                      style={{
                        // fontFamily: "Serif",
                        color: "black",
                      }}
                    >
                      <b className="h4">
                        Total Tenants <br></br>
                        {tenantCount.length}
                      </b>
                    </p>
                  </center>
                </p>
              </div>
            </div>
            <div className="col-lg-1  col-sm-12 col-md-12"></div>
          </div>
          <div className="row">
            <div className="col-lg-1  col-sm-12 col-md-12"></div>
            <div
              className="col-lg-5  col-sm-12 col-md-12  ml-2  h2 text-center pt-5"
              id="shadow-bck"
            >
              <div className="text-center">
                <img
                  className="img_icon_sizeDashboard  "
                  src={door}
                  alt="Unoccupied property"
                />
                <p>
                  <center>
                    <p
                      style={{
                        // fontFamily: "Serif",
                        color: "black",
                      }}
                    >
                      <b className="h4">
                        Unoccupied Properties <br></br>
                        {tenantCount.length}
                      </b>
                    </p>
                  </center>
                </p>
              </div>
            </div>
            <div className="col-lg-5  col-sm-12 col-md-12 ml-2 h2 text-center pt-5" id="shadow-bck">
              <div className="text-center">
                <img
                  className="img_icon_sizeDashboard  "
                  src={money}
                  alt="Renewal"
                />
                <p>
                  <center>
                    <p
                      style={{
                        // fontFamily: "Serif",
                        color: "black",
                      }}
                    >
                      {" "}
                      <b className="h4">
                       Renewable Properties <br></br>
                        {TotalRenewalCount}
                      </b>
                    </p>
                  </center>
                </p>
              </div>
            </div>
            <div className="col-lg-1  col-sm-12 col-md-12"></div>
          </div>

          {/* <div className="container fluid">
            <div className="row col-lg-12 col-md-12 col-sm-12 ml-2">
              <div className="col-lg-1"></div>
              <div
                className="col-lg-5 card2 ml-2 h2 text-center pt-5"
                id="shadow-bck"
              >
                <div className="text-center">
                  <Link to="/tenant-detail">
                    <img
                      className="img_icon_sizeDashboard log "
                      src={people}
                      alt="Tenant Count"
                    />
                  </Link>
                  <p>
                    <center>
                      <p
                        style={{
                          // fontFamily: "Serif",
                          color: "black",
                        }}
                      >
                        <b className="h4">
                          Unoccupied property <br></br>
                          {tenantCount.length}
                        </b>
                      </p>
                    </center>
                  </p>
                </div>
              </div>

              {/* <div
            className="col-lg-4 col-md-12 col-sm-12  "
           
          ></div> */}
          {/* <div className="text-center">
              <img
                className="img_icon_sizeDashboard  "
                src={door}
                alt="Unoccupied property"
              />
              <p>
                <center>
                  <p
                    style={{ */}
          {/* fontFamily: "Serif",
                      color: "black",
                    }}
                  >
                    <b className="h4">
                      Occupied Door No<br></br> */}
          {/* {ShopStatus && ShopStatus.length} */}
          {/* </b>
                  </p>
                </center>
              </p>
            </div>
          </div> */}

          {/* <div
                className="col-lg-5 col-md-12 col-sm-12 h2 text-center card2 "
                id="shadow-bck"
                style={{ left: "10px" }}
              >
                <div className="text-center">
                  <img
                    className="img_icon_sizeDashboard  "
                    src={money}
                    alt="Renewal"
                  />
                  <p>
                    <center>
                      <p
                        style={{
                          // fontFamily: "Serif",
                          color: "black",
                        }}
                      >
                        {" "}
                        <b className="h4">
                          Total Renewal count <br></br>
                          {TotalRenewalCount}
                        </b>
                      </p>
                    </center>
                  </p>
                </div>
              </div>
              <div className="col-lg-1"></div>
            </div> */}
          {/* </div>  */}
        </section>
      </div>
    </>
  );
};
const mapStateToProps = (state) => ({
  tenants: state.tenants,
  auth: state.auth,
});
export default connect(mapStateToProps, {
  getParticularProperty,
  ParticularTenant,
  getAllSettings,
  get_particular_org_user,
})(MainAdminPage);
