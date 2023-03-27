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
    // <Roller />
    <></>
  ) : (
    <div>
      <div className="container-fluid">
        <div className="col">
          <h2 className="heading_color mt-sm-5 pt-5">DashBoard </h2>
          <hr></hr>
        </div>

        {/* upper box */}
        <div className="row text-center">
          <div className="col-lg-6">


            
            <div className="col-lg-10 text-center card border border-secondary mt-3">
              <div>
                <img src={prop} alt="x" height="100%" width="20%" />
              </div>
              Total Property Count
              <div >
                {particular_org_data && particular_org_data.length}
              </div>
            </div>
          </div>

          <div className="col-lg-6">
            <div className="col-lg-10 text-center card border border-secondary  mt-3">
              <div>
                <img
                  src={unprop}
                  alt="x"
                  height="100%"
                  width="20%"
                  className=""
                />
              </div>
              Unoccupied Property
              <div>{ShopStatus && ShopStatus.length}</div>
            </div>
          </div>
        </div>

        {/* down boxs */}
        <div className="row mt-2">
          <div className="col-lg-6 col-sm-1">
            <div className="col-lg-10 text-center card border border-secondary">
              <div>
                <img src={people} alt="x" height="100%" width="20%" />
              </div>
              No of Tenants Count
              <div>{tenantCount.length}</div>
            </div>
          </div>

          <div className="col-lg-6 col-sm-1">
            <div className="col-lg-10 text-center card border border-secondary  mt-3">
              <div>
                <img src={money} alt="x" height="100%" width="20%" />
              </div>
              Total Renewal
              <div> {total}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
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
