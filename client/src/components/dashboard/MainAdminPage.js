import React from "react";
import "../../styles/CustomisedStyle.css";
import prop from "../../static/images/property.png";
import people from "../../static/images/people.png";
import unprop from "../../static/images/unproperty.png";
import money from "../../static/images/money.png";
import {
  getParticularProperty,
  getAllRenewalAmount,
} from "../../actions/tenants";
import { connect } from "react-redux";
import { useEffect, useState } from "react";

const MainAdminPage = ({
  auth: { user },
  tenants: { particular_org_data, get_particular_org_tenant },
  getParticularProperty,
  getAllRenewalAmount,
}) => {
  useEffect(() => {
    getParticularProperty({ OrganizationId: user && user.OrganizationId });
    getAllRenewalAmount({ OrganizationId: user && user.OrganizationId });
    fun();
  }, []);
  //localStorage.setItem("", JSON.stringify(payload));
  let count = 0;
  let AvaiableShopCount = 0;
  const [PropertyCount, setPropertyCount] = useState();
  const [status, setStatus] = useState("");
  let ShopStatus = [];
  particular_org_data.map((ele) =>
    ShopStatus.push({
      label: ele.shopStatus,
    })
  );

  const fun = () => {
    particular_org_data &&
      particular_org_data.map((ind) => setPropertyCount(count + 1));
    ShopStatus.map((ele) => {
      if (ele.label === "Avaiable") {
        AvaiableShopCount = AvaiableShopCount + 1;
      }
    });
    setStatus(AvaiableShopCount);
  };
  return (
    <div>
      <div className="container container_align  ">
        <div className="col-lg-10 col-md-11 col-sm-11 col-11 ">
          <h2 className="heading_color  pt-5 ">DashBoard </h2>
          <hr></hr>
        </div>
        <section className="sub_reg mainpage ">
          <div className="1">
            {" "}
            <div className=" card h3 text-center pt-5" id="shadow-bck">
              <img
                src={prop}
                alt="x"
                height="40%"
                width="20%"
                className="mainpageimg"
              ></img>
              Total Property Count
              <div>{PropertyCount}</div>
            </div>
          </div>
          <div className="2">
            {" "}
            <div className=" card  h3 text-center pt-5" id="shadow-bck">
              <img
                src={unprop}
                alt="x"
                height="35%"
                width="15%"
                className="mainpageimg"
              ></img>
              UnOccupied Property
              <div>{status}</div>
            </div>
          </div>
          <div className="3">
            {" "}
            <div className="card h3 text-center pt-5" id="shadow-bck">
              <img
                src={people}
                alt="x"
                height="35%"
                width="15%"
                className="mainpageimg"
              ></img>
              No Of Tenants Count
              <div>{get_particular_org_tenant.length}</div>
            </div>
          </div>
          <div className="4">
            {" "}
            <div className="card h3 text-center pt-5 " id="shadow-bck">
              <img
                src={money}
                alt="x"
                height="35%"
                width="15%"
                className="mainpageimg"
              ></img>
              Total Renewal
            </div>
          </div>
        </section>
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
  getAllRenewalAmount,
})(MainAdminPage);
