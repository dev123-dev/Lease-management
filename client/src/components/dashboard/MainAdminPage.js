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
  useEffect(() => {
    fun();
    getParticularProperty({ OrganizationId: user && user.OrganizationId });
    ParticularTenant({ OrganizationId: user && user.OrganizationId });
  }, []);
  const total = JSON.parse(localStorage.getItem("total"));

  let count = 0;
  let AvaiableShopCount = 0;
  const [PropertyCount, setPropertyCount] = useState(0);
  const [status, setStatus] = useState("");
  let ShopStatus = [];
  particular_org_data.map((ele) =>
    ShopStatus.push({
      label: ele.shopStatus,
    })
  );

  const fun = () => {
    // particular_org_data.map((ind) => setPropertyCount(count + 1));
    let pCount =
      particular_org_data &&
      particular_org_data.reduce((acu, cur) => acu + 1, 0);
    setPropertyCount(pCount);

    ShopStatus.map((ele) => {
      if (ele.label === "Avaiable") {
        AvaiableShopCount = AvaiableShopCount + 1;
      }
    });
    setStatus(AvaiableShopCount);
  };
  return !isAuthenticated || !user || loading ? (
    // <Roller />
    <></>
  ) : (
    <div>
      <div className="container-fluid">
        <div className="col">
          <h2 className="heading_color mt-sm-5 pt-5 ">DashBoard </h2>
          <hr></hr>
        </div>
        <div className="row">
          <div className="col-lg-1"></div>
          <div className="col-lg-5">
            <div
              className="  row card h3 text-center pt-5  col-sm-12"
              id="shadow-bck"
            >
              <div className="col-lg-1"></div>
              <div className="col-lg-10 text-center">
                {" "}
                <img src={prop} alt="x" height="40%" width="20%"></img>
                <br></br>
                Total Property Count
                <div>{PropertyCount}</div>
              </div>
              <div className="col-lg-1"></div>
            </div>
          </div>
          <div className="col-lg-5">
            {" "}
            <div
              className="  row card h3 text-center pt-5  col-sm-12"
              id="shadow-bck"
            >
              <div className="col-lg-1"></div>
              <div className="col-lg-10 text-center">
                {" "}
                <img src={unprop} alt="x" height="35%" width="15%"></img>
                <br></br>
                Unoccupied Property
                <div>{status}</div>
              </div>
              <div className="col-lg-1"></div>
            </div>
          </div>
          <div className="col-lg-1"></div>
        </div>
        <div className="row">
          <div className="col-lg-1"></div>
          <div className="col-lg-5">
            {" "}
            <div
              className="  row card h3 text-center pt-5  col-sm-12"
              id="shadow-bck"
            >
              <div className="col-lg-1"></div>
              <div className="col-lg-10 text-center">
                {" "}
                <img src={people} alt="x" height="35%" width="15%"></img>
                <br></br>
                No of Tenants Count
                <div>{get_particular_org_tenant.length}</div>
              </div>
              <div className="col-lg-1"></div>
            </div>
          </div>
          <div className="col-lg-5">
            {" "}
            <div
              className="  row card h3 text-center pt-5  col-sm-12"
              id="shadow-bck"
            >
              <div className="col-lg-1"></div>
              <div className="col-lg-10 text-center">
                {" "}
                <img src={money} alt="x" height="35%" width="15%"></img>
                <br></br>
                Total Renewal
                <div> {total}</div>
              </div>
              <div className="col-lg-1"></div>
            </div>
          </div>
          <div className="col-lg-1"></div>
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
