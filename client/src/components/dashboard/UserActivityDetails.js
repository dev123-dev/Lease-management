import React, { useState, Fragment, useEffect, useRef } from "react";
import { CSVLink } from "react-csv";
import { connect } from "react-redux";
import { ParticularTenantFilter, getUserActivity } from "../../actions/tenants";
import RenewalReportPrint from "../printPdf/renewalReportPrint";
import { useReactToPrint } from "react-to-print";
import Pagination from "../layout/Pagination";
import { Link } from "react-router-dom";
import Back from "../../static/images/Back.svg";
import Print from "../../static/images/Print.svg";
import Excel from "../../static/images/Microsoft Excel.svg";

const UserActivityDetails = ({
  //   auth: { user },
  tenants: { useractivitydetail },
  ParticularTenantFilter,
  getUserActivity,
}) => {
  const [freshpage, setFreshPage] = useState(true);
  const myuser = JSON.parse(localStorage.getItem("user"));
  useEffect(() => {
    ParticularTenantFilter();
  }, [freshpage]);
  useEffect(() => {
    getUserActivity({ OrganizationId: myuser.OrganizationId });
  }, []);

  //pagination code
  const [currentData, setCurrentData] = useState(1);
  const [dataPerPage] = useState(10);
  //Get Current Data
  const indexOfLastData = currentData * dataPerPage;
  const indexOfFirstData = indexOfLastData - dataPerPage;
  const currentDatas =
    useractivitydetail &&
    useractivitydetail.slice(indexOfFirstData, indexOfLastData);
  const paginate = (nmbr) => {
    //nmbr is page  number
    setCurrentData(nmbr);
  };
  const csvTenantData = [
    [
      "Menu",
      "Name",
      "Activity Type",
      "Entered Date",
      "Time Stamp",
      "Lease Transfer to",
    ],
  ];

  currentDatas.map((currentDatas) => {
    var ED = currentDatas.DateTime && currentDatas.DateTime.split(/\D/g);
    var date = [ED && ED[2], ED && ED[1], ED && ED[0]].join("-");
    var dateTime = currentDatas.DateTime;
    var formattedTime = dateTime ? new Date(dateTime).toLocaleTimeString() : "";

    return csvTenantData.push([
      currentDatas.Menu,
      currentDatas.Name,
      currentDatas.Operation,
      date,
      formattedTime,
      currentDatas.Remarks,
    ]);
  });
  //Print
  const [isPrinting, setIsPrinting] = useState(false);
  useEffect(() => {
    // Clean up after component unmounts
    return () => {
      setIsPrinting(false);
    };
  }, []);

  const [showPrint, setShowPrint] = useState({
    backgroundColor: "#095a4a",
    color: "white",
    fontWeight: "bold",
  });

  const OnPrint = () => {
    setIsPrinting(true);
    handlePrint();
  };
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: "Contact Report",

    onAfterPrint: () => {
      setTimeout(() => {
        setIsPrinting(false);
        setShowPrint({
          backgroundColor: "#095a4a",
          color: "white",
          fontWeight: "bold",
        });
      }, 200);
    },
  });

  return (
    <>
      <div className="col mt-sm-4 space ">
        <div className="row col-lg-12 col-md-12 col-sm-12 col-12 no_padding ">
          <div className="row mt-5  ">
            <div className="col-lg-5 mt-3">
              <h2 className="heading_color  headsize  ml-4">
                User Activity of <span>{myuser.username} </span>
                (Past 30 days)
              </h2>
            </div>
            <div className="col-lg-7 mt-5 text-right ">
              <Link to="/Report">
                <button style={{ border: "none" }}>
                  <img
                    src={Back}
                    alt="Back"
                    title="Back"
                    className="iconSize"
                  />
                </button>
              </Link>
              {myuser.usergroup === "Admin" ? (
                <CSVLink
                  data={csvTenantData}
                  filename={"UserActivity-Report.csv"}
                >
                  <img src={Excel} alt="Excel-Export" title="Excel-Export" />
                </CSVLink>
              ) : (
                <></>
              )}

              <button
                style={{ border: "none" }}
                onClick={async () => {
                  await setShowPrint({
                    backgroundColor: "#095a4a",
                    color: "black",
                    fontWeight: "bold",
                  });

                  OnPrint();
                }}
              >
                <img src={Print} alt="Print" title="Print" />
              </button>
            </div>
          </div>

          <div className="container-fluid d-flex align-items-center justify-content-center mt-sm-1 ">
            <div className="col">
              <div ref={componentRef}>
                <div className="row ">
                  <div className="col-lg-1"></div>
                  <div className="firstrowsticky body-inner no-padding table-responsive">
                    <table
                      className="table table-bordered table-striped table-hover   mt-1  "
                      id="datatable2"
                    >
                      <thead>
                        <tr>
                          <th
                            style={showPrint}
                            className="headcolstatic"
                            // style={{ height: "-10px !important"}}
                          >
                            Menu
                          </th>
                          <th style={showPrint}>Name</th>
                          <th style={showPrint}>Activity Type</th>
                          <th style={showPrint}>Entered Date </th>
                          <th style={showPrint}>Time Stamp</th>
                          <th style={showPrint}> Remarks</th>
                        </tr>
                      </thead>
                      <tbody className="text-center">
                        {currentDatas &&
                          currentDatas.map((Val, idx) => {
                            var ED = Val.DateTime && Val.DateTime.split(/\D/g);
                            var date = [
                              ED && ED[2],
                              ED && ED[1],
                              ED && ED[0],
                            ].join("-");
                            var dateTime = Val.DateTime;
                            // var formattedDate = dateTime
                            //   ? new Date(dateTime).toLocaleDateString()
                            //   : "";
                            var formattedTime = dateTime
                              ? new Date(dateTime).toLocaleTimeString()
                              : "";
                            return (
                              <tr key={idx}>
                                <td className="headcolstatic secondlinebreak1">
                                  {Val.Menu}
                                </td>
                                <td>{Val.Name}</td>

                                <td>{Val.Operation}</td>
                                <td>{date}</td>
                                <td>{formattedTime}</td>
                                {Val.Operation === "Lease Transfer" &&
                                Val.Remarks ? (
                                  <td>
                                    Lease Transferred &nbsp;
                                    {Val.Dno.map((ele) => ele.label + ",")} to
                                    &nbsp;
                                    {Val.Remarks}
                                  </td>
                                ) : (
                                  <>
                                    <td></td>
                                  </>
                                )}
                              </tr>
                            );
                          })}
                      </tbody>
                    </table>
                  </div>
                  <div className="col-lg-1"></div>
                </div>
              </div>
              <div className="row">
                <div className="col-lg-6">
                  {useractivitydetail && useractivitydetail.length !== 0 ? (
                    <Pagination
                      dataPerPage={dataPerPage}
                      totalData={useractivitydetail.length}
                      paginate={paginate}
                      currentPage={currentData}
                    />
                  ) : (
                    <Fragment />
                  )}
                </div>
                <div className="col-lg-6">
                  <p
                    className="text-end h6 font-weight-bold"
                    style={{ color: "#095a4a" }}
                  >
                    No. of Activity : {useractivitydetail.length}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const mapStateToProps = (state) => ({
  tenants: state.tenants,
  auth: state.auth,
});
export default connect(mapStateToProps, {
  ParticularTenantFilter,
  getUserActivity,
})(UserActivityDetails);
