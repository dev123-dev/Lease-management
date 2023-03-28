import React from "react";
import "../../styles/CustomisedStyle.css";
import prop from "../../static/images/property.png";
import people from "../../static/images/people.png";
import unprop from "../../static/images/unproperty.png";
import money from "../../static/images/money.png";
import { getParticularProperty, ParticularTenant } from "../../actions/tenants";
import { connect } from "react-redux";
import { useEffect, useState } from "react";
// import { Roller } from "react-awesome-spinners";

const MainAdminPage = ({
  auth: { user, isAuthenticated, loading },
  tenants: { particular_org_data, get_particular_org_tenant },
  getParticularProperty,
  ParticularTenant,
}) => {
  const myuser = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (myuser) {
      fun();
      getParticularProperty({
        OrganizationId: myuser && myuser.OrganizationId,
      });
      ParticularTenant({ OrganizationId: myuser && myuser.OrganizationId });
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
          
          <div className="row col-lg-12 col-md-12 col-sm-12 col-12 ">
            <h1
              style={{
                fontFamily: "Serif",
                color: "#095a4a",
              }}
              className="font-weight-bold headsize"
            >
              <span
                className="font-weight-bold "
                style={{
                  fontFamily: "Serif",
                }}
              >
                {user && user.orgName}
              </span>
              <span
                style={{ fontFamily: "Serif" }}
                className=" text-right font-weight-bold"
              >
                {" "}
                Dashboard
              </span>
            </h1>
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
              <div className="col-lg-1"></div>
              <div
                className="col-lg-5 card h2 text-center pt-5 "
                id="shadow-bck"
              >
                <div className="text-center">
                  <img
                    className="img_icon_sizeDashboard log "
                    src={prop}
                    alt="Property"
                  />
                   <p align="center"><h2>Property Count<br></br>  {particular_org_data && particular_org_data.length}</h2></p>
                </div>
               
              </div>
              <div
                className="col-lg-5 card  h2 text-center pt-5"
                id="shadow-bck"
              >
                <div className="text-center">
                  <img
                    className="img_icon_sizeDashboard log "
                    src={unprop}
                    alt="Unoccupied property"
                  />
                   <p align="center"><h2>Unoccupied Property<br></br>{ShopStatus && ShopStatus.length}</h2></p>
                </div>
                <div>
                 
                
                </div>
              </div>
              <div className="col-lg-1"></div>
            </div>
            <div className="row">
              <div className="col-lg-1"></div>
              <div
                className="col-lg-5 card h2 text-center pt-5"
                id="shadow-bck"
              >
                <div className="text-center">
                  <img
                    className="img_icon_sizeDashboard log "
                    src={people} 
                    alt="Tenant Count"
                  />
                   <p ><h2>No of Tenant Count<br></br>{tenantCount.length}</h2></p>
                </div>
                
              </div>
              <div
                className="col-lg-5 card h2 text-center pt-5 "
                id="shadow-bck"
              >
                <div className="text-center">
                  <img
                    className="img_icon_sizeDashboard log "
                    src={money}
                    alt="Renewal"
                  /> 
                   <p align="center"><h2 align="center"> Total Renewal<br></br>{total}</h2></p>
                  
                </div>
               
              </div>
              <div className="col-lg-1"></div>
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
export default connect(mapStateToProps, {
  getParticularProperty,
  ParticularTenant,
})(MainAdminPage);
