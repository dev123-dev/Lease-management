import React, { useState } from "react";
import { connect } from "react-redux";
import Select from "react-select";
import { CSVLink } from "react-csv";
import { Link } from "react-router-dom";
import Pagination from "../layout/Pagination";
import Print from "../../static/images/Print.svg";
import Excel from "../../static/images/Microsoft Excel.svg";
import Refresh from "../../static/images/Refresh.svg";
import Back from "../../static/images/Back.svg";

export const PropertyReport = ({ auth: { user } }) => {
  const myuser = JSON.parse(localStorage.getItem("user"));

  //Style State
  const [showPrint, setShowPrint] = useState({
    backgroundColor: "#095a4a",
    color: "white",
    fontWeight: "bold",
  });

  return (
    <div className="col mt-sm-4 space">
      <div className="row col-lg-12 col-md-12 col-sm-12 col-12 no_padding ">
        <div className="row mt-5 ">
          <div className="col-lg-5 mt-3">
            <h2 className="heading_color  headsize  ml-4">Property Report</h2>
          </div>
          <div className="col-lg-7 pt-4 iconspace">
            <Link to="/Report">
              <button style={{ border: "none" }}>
                <img src={Back} alt="Back" title="Back" className=" iconSize" />
              </button>
            </Link>
            {myuser.usergroup === "Admin" && (
              <>
                <CSVLink data={[]} filename={"Property-Report.csv"}>
                  <img
                    src={Excel}
                    alt="Excel-Export"
                    title="Excel-Export"
                    className=" iconSize"
                  />
                </CSVLink>
                <button
                  style={{ border: "none" }}
                  // onClick={async () => {
                  //   await setShowPrint({
                  //     backgroundColor: "#095a4a",
                  //     color: "black",
                  //     fontWeight: "bold",
                  //   });

                  //   handlePrint();
                  // }}
                >
                  <img
                    src={Print}
                    alt="Print"
                    title="Print"
                    className=" iconSize"
                  />
                </button>
              </>
            )}
          </div>
        </div>

        <div className="container-fluid d-flex align-items-center justify-content-center mt-sm-1 ">
          <div
            className="col"
            // ref={componentRef}
          >
            <div className="row ">
              <div className="col-lg-1"></div>
              <div className="firstrowsticky body-inner no-padding table-responsive">
                <table
                  className="table table-bordered table-striped table-hover mt-1"
                  id="datatable2"
                >
                  <thead>
                    <tr>
                      <th style={showPrint} className="headcolstatic">
                        Menu
                      </th>
                      <th style={showPrint}>Name</th>
                      <th style={showPrint}>Activity Type</th>
                      <th style={showPrint}>Entered Date </th>
                      <th style={showPrint}>Time Stamp</th>
                      <th style={showPrint}> Remarks</th>
                    </tr>

                    <tbody className="text-center">{}</tbody>
                  </thead>
                </table>
              </div>
              <div className="col-lg-1"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({ auth: state.auth });

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(PropertyReport);
