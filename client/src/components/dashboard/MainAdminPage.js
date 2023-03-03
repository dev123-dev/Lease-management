import React from "react";
import "../../styles/CustomisedStyle.css";
import prop from "../../static/images/property.png";
import people from "../../static/images/people.png";
import unprop from "../../static/images/unproperty.png";
import money from "../../static/images/money.png";

export default function MainAdminPage() {
  return (
    <>
      <div>
        <div className="container container_align ">
          <div className="col-lg-10 col-md-11 col-sm-11 col-11 ">
            <h2 className="heading_color">DashBoard </h2>
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
    </>
  );
}
