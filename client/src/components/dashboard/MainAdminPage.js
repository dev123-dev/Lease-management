import React from "react";
import "../../styles/CustomisedStyle.css";
import prop from "../../static/images/property.png";
import people from "../../static/images/people.png";
import unprop from "../../static/images/unproperty.png";
import money from "../../static/images/money.png";
import door from "../../static/images/door.png";
import { Modal } from "react-bootstrap";
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
  year,
}) => {
  const myuser = JSON.parse(localStorage.getItem("user"));
  const myorg = JSON.parse(localStorage.getItem("Org"));

  var yearcurrent = new Date(year).getFullYear();

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

  //Renewable Tenant Records

  // const TotalRenewalCount =
  //   get_particular_org_tenant &&
  //   get_particular_org_tenant.filter((ele) => {
  //     if (
  //       ele.AgreementStatus === "Expired" &&
  //       ele.tenantstatus !== "Deactive"
  //     ) {
  //       return ele;
  //     }
  //   });

  //Renewed Tenant Records
  const TotalRenewedCount =
    get_particular_org_tenant &&
    get_particular_org_tenant.filter((ele) => {
      if (
        ele.AgreementStatus === "Renewed" &&
        ele.tenantstatus !== "Deactive" &&
        new Date(ele.tenantLeaseStartDate).getFullYear() ===
          parseInt(new Date().getFullYear())
      ) {
        return ele;
      }
    });

  //modal to display unoccupied shops
  const [show, setShow] = useState(false);
  const onClickUnocc = () => {
    setShow(true);
  };
  const handleclose = () => {
    setShow(false);
  };

  const total = JSON.parse(localStorage.getItem("total"));
  let count = 0;
  let AvaiableShopCount = 0;
  const [PropertyCount, setPropertyCount] = useState(0);
  const [TenantCount, setTenantCount] = useState(0);

  const [status, setStatus] = useState("");
  let ShopStatus = [];
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

  // const mappedStatus = ShopStatus.map((item) => item.ele1.BuildingName);
  const mappedStatus = ShopStatus.map((item) => ({
    doorNo: item.ele1.doorNo,
    status: item.ele1.status,
    BuildingName: item.ele1.BuildingName,
  }));

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
  //Display current year
  var currentYear = new Date().getFullYear();

  return !isAuthenticated || !user || loading ? (
    <></>
  ) : (
    <>
      <div className="col mt-sm-4 space ">
        <div className="row col-lg-12 col-md-12 col-sm-12 col-12 no_padding ">
          <div className="row mt-5 ">
            <div className="col-lg-5  col-sm-12 col-md-12 mt-3">
              <h2 className="heading_color  headsize  ml-4">Dashboard</h2>
            </div>
          </div>
        </div>
        <section className="sub_reg" style={{ backgroundColor: "transparent" }}>
          <div className="row">
            <div className="col-lg-1  col-sm-12 col-md-12"></div>
            <div
              className="col-lg-5   col-sm-12 col-md-12 ml-2 card h2 text-center pt-5 log"
              id="shadow-bck"
            >
              <div className="text-center">
                <Link to="/PropertyDetail">
                  {" "}
                  <img
                    className="img_icon_sizeDashboard log"
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
              className="col-lg-5  col-sm-12 col-md-12 card ml-2 h2 text-center pt-5 log"
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
                        color: "black",
                      }}
                    >
                      <b className="h4">
                        Total Active Tenants <br></br>
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
              className="col-lg-5  col-sm-12 col-md-12  ml-2 card  h2 text-center pt-5"
              id="shadow-bck"
            >
              <div className="text-center">
                <img
                  className="img_icon_sizeDashboard  "
                  src={door}
                  alt="Unoccupied property"
                  onClick={onClickUnocc}
                  style={{ cursor: "pointer" }}
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
                        Unoccupied Shops <br></br>
                        {ShopStatus.length}
                      </b>
                    </p>
                  </center>
                </p>
              </div>
            </div>
            <div
              className="col-lg-5  col-sm-12 col-md-12 ml-2 h2 card text-center pt-5 ml-4 card2"
              id="shadow-bck"
            >
              <div className="text-center">
                <Link to="/renewed-report">
                  <img
                    className="img_icon_sizeDashboard  "
                    src={money}
                    alt="Renewal"
                    style={{ cursor: "pointer" }}
                  />
                </Link>
                {/* <p>
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
                        {TotalRenewalCount && TotalRenewalCount.length}
                      </b>
                    </p>
                  </center>
                </p> */}
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
                        Total Renewed Properties({currentYear} )<br></br>
                        {TotalRenewedCount && TotalRenewedCount.length}
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
      <Modal
        show={show}
        backdrop="static"
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header className="confirmboxleasetransfer">
          <div className="col-lg-10 col-sm-10 col-md-10 ">
            <h3
              style={{
                color: "white",
              }}
              className=" text-center "
            >
              UnOccupied Shops
            </h3>
          </div>

          <div className="col-lg-2  col-sm-12 col-md-12 ">
            <button onClick={handleclose} className="close">
              <img
                src={require("../../static/images/close.png")}
                alt="X"
                style={{ height: "20px", width: "20px", marginLeft: "-15px" }}
              />
            </button>
          </div>
        </Modal.Header>
        <Modal.Body>
          <table className="table table-bordered table-striped table-hover mt-1">
            <thead>
              <tr>
                <th style={{ textAlign: "center" }}>Building Name</th>
                <th style={{ textAlign: "center" }}>Door No</th>
                <th style={{ textAlign: "center" }}>Status</th>
              </tr>
            </thead>
            <tbody className="text-center">
              {mappedStatus &&
                mappedStatus
                  .reduce((acc, currentValue) => {
                    const existingBuilding = acc.find(
                      (item) => item.BuildingName === currentValue.BuildingName
                    );

                    if (existingBuilding) {
                      existingBuilding.doorNo += `, ${currentValue.doorNo}`;
                    } else {
                      acc.push({
                        ...currentValue,
                        doorNo: currentValue.doorNo.toString(),
                      });
                    }

                    return acc;
                  }, [])
                  .map((Val, idx) => (
                    <tr key={idx}>
                      <td>{Val.BuildingName}</td>
                      <td>{Val.doorNo}</td>
                      <td>Available</td>
                    </tr>
                  ))}
            </tbody>
          </table>
        </Modal.Body>
      </Modal>
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
