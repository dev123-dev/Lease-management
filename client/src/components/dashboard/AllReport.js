import React from "react";
import "../../styles/CustomisedStyle.css";
import {} from "../../actions/tenants";
import { connect } from "react-redux";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import locreport from '../../static/images/locrep.png'
import propreport from '../../static/images/propreport.png'
// import { Roller } from "react-awesome-spinners";

const AllReport = ({
  auth: { user, isAuthenticated, loading },
  tenants: { particular_org_data, get_particular_org_tenant },
}) => {
  const myuser = JSON.parse(localStorage.getItem("user"));
  const myorg = JSON.parse(localStorage.getItem("Org"));
  //console.log("myorg", myorg);
  useEffect(() => {
    if (myuser) {
      fun();
      //   getParticularProperty({
      //     OrganizationId: myuser && myuser.OrganizationId,
      //   });
      //   ParticularTenant({ OrganizationId: myuser && myuser.OrganizationId });
      //   getAllSettings({
      //     OrganizationId: myuser && myuser.OrganizationId,
      //     userId: myuser && myuser._id,
      //   });
      //   get_particular_org_user({ OrganizationId: myuser.OrganizationId });
    }
  }, []);
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
                right:"70px"
              }}
              className="heading_color  headingdashboard  "
            >
              {user && user.orgName}  All Report
            </h2>
            {/* <br />
          <br /> */}
          </div>
        </div>

        <section
          className="sub_reg"
          style={{
            backgroundColor: "transparent",
          }}
        >
          <div className="row">
            
           
            <div
              className="col-lg-3 card ml-2 h2 text-center pt-5"
              id="shadow-bck"
            >
              <div className="text-center">
                <Link to="/LocationReport">
                  <img
                    className="img_icon_repDashboard log  "
                    src={locreport}
                    alt="IMG2"
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
              className="col-lg-3  ml-2 card h2 text-center pt-5  "
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
                        // fontFamily: "Serif",
                        color: "black",
                      }}
                      // className="h3"
                    >
                      <b className="h4">
                        Property Report<br></br> {""}
                      </b>
                    </p>
                  </center>
                </p>
              </div>
            </div>
            <div className="col-lg-3"></div>
            <div className="col-lg-3"></div>
          </div>
         
        </section>
      </div>
    </>
  );
};
const mapStateToProps = (state) => ({
  tenants: state.tenants,
  auth: state.auth,
});
export default connect(mapStateToProps, {})(AllReport);
