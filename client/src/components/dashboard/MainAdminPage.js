import React from "react";
import "../../styles/CustomisedStyle.css";

export default function MainAdminPage() {
  return (
    <>
      <div>
        <div className="container container_align ">
          <section className="sub_reg">
            <div className="row col-lg-12 col-md-12 col-sm-12 col-12 no_padding">
              <div className="col-lg-10 col-md-11 col-sm-11 col-11 ">
                <h2 className="heading_color">DashBoard </h2>
              </div>
            </div>
            <div className="container-fluid mt-5">
              <div className="row">
                <div className="col-lg-1"></div>
                <div
                  className="col-lg-5 card h2 text-center pt-5 "
                  id="shadow-bck"
                >
                  Total Property Count
                </div>
                <div
                  className="col-lg-5 card  h2 text-center pt-5"
                  id="shadow-bck"
                >
                  UnOccupied Property
                </div>
                <div className="col-lg-1"></div>
              </div>
              <div className="row">
                <div className="col-lg-1"></div>
                <div
                  className="col-lg-5 card h2 text-center pt-5"
                  id="shadow-bck"
                >
                  No Of Tenants Count
                </div>
                <div
                  className="col-lg-5 card h2 text-center pt-5 "
                  id="shadow-bck"
                >
                  Total Renewal
                </div>
                <div className="col-lg-1"></div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
