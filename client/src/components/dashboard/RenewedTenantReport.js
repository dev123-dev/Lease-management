import React, { useState, Fragment, useEffect, useRef } from "react";
import { CSVLink } from "react-csv";
import { connect } from "react-redux";
import { ParticularTenantFilterContactReport } from "../../actions/tenants";
import RenewalReportPrint from "../printPdf/renewalReportPrint";
import { useReactToPrint } from "react-to-print";
import Pagination from "../layout/Pagination";
import { Link } from "react-router-dom";
import DatePicker from "react-datepicker";

const RenewedTenantReport = ({
  auth: { user },
  tenants: { sortContactReport },
  ParticularTenantFilterContactReport,
}) => {
  const [freshpage, setFreshPage] = useState(true);
  const myuser = JSON.parse(localStorage.getItem("user"));
  useEffect(() => {
    ParticularTenantFilterContactReport();
  }, [freshpage]);

  //year picker start

  const [selectedYear, setSelectedYear] = useState("2024");
  const populateYears = (startYear, endYear) => {
    const years = [];
    for (let year = startYear; year <= endYear; year++) {
      years.push(year);
    }
    return years;
  };
  const handleYearChange = (e) => {
    setSelectedYear(e.target.value);
  };
  const years = populateYears(2000, new Date().getFullYear());

  //end

  //pagination code
  const [currentData, setCurrentData] = useState(1);
  const [dataPerPage] = useState(8);
  //Get Current Data
  const indexOfLastData = currentData * dataPerPage;
  const indexOfFirstData = indexOfLastData - dataPerPage;
  const activeData =
    sortContactReport &&
    sortContactReport.filter(
      (ele) =>
        ele.tenantstatus === "Active" &&
        ele.output.AgreementStatus === "Renewed" &&
        // (!ele.output.tenantRenewedDate || new Date(ele.output.tenantRenewedDate).getFullYear() === parseInt(selectedYear))
        new Date(ele.tenantLeaseStartDate).getFullYear() ===
          parseInt(selectedYear)
    );

  const currentDatas =
    activeData && activeData.slice(indexOfFirstData, indexOfLastData);
  const paginate = (nmbr) => {
    //nmbr is page  number
    setCurrentData(nmbr);
  };
  const csvContactReportData = [
    [
      "Tenant Name",
      "Building Name",
      "Door No.",
      "Location",
      "Rent Amount",
      "Phone No",
      "Firm Name",
      "leaseStartDate",
      "lease End Date",
      "Agreement Status",
    ],
  ];

  sortContactReport &&
    sortContactReport.map((sortContactReport) => {
      var doorNo =
        sortContactReport &&
        sortContactReport.shopDoorNo &&
        sortContactReport.shopDoorNo.map((e) => e.value).join(", "); // Join door numbers into a single string
      var ED = sortContactReport.tenantLeaseEndDate.split(/\D/g);
      var tenantLeaseEndDate = [ED[2], ED[1], ED[0]].join("-");

      var ED1 = sortContactReport.tenantLeaseStartDate.split(/\D/g);
      var tenantLeaseStartDate = [ED1[2], ED1[1], ED1[0]].join("-");
      return csvContactReportData.push([
        sortContactReport.tenantName,
        sortContactReport.BuildingName,
        doorNo,
        sortContactReport.Location,
        sortContactReport.tenantRentAmount,
        sortContactReport.tenantPhone,
        sortContactReport.tenantFirmName,
        tenantLeaseStartDate,
        tenantLeaseEndDate,
        sortContactReport.output.AgreementStatus,
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
            <div className="col-lg-4 mt-3">
              <h2 className="heading_color  headsize  ml-4">
                Renewed Tenant Report
              </h2>
            </div>
            <div className="col-lg-4 mt-3">
              <div>
                <select value={selectedYear} onChange={handleYearChange}>
                  <option value="">Select Year</option>
                  {years &&
                    years.map((year) => (
                      <option key={year} value={year}>
                        {year}
                      </option>
                    ))}
                </select>
              </div>
            </div>
            <div className="col-lg-4 mt-5 text-right ">
              <Link to="/Report">
                <img
                  height={28}
                  src={require("../../static/images/back.png")}
                  alt="Back"
                  title="Back"
                />
              </Link>
              {myuser.usergroup === "Admin" ? (
                <CSVLink data={csvContactReportData}>
                  <img
                    className="img_icon_size log  ml-1"
                    src={require("../../static/images/excel_icon.png")}
                    alt="Excel-Export"
                    title="Excel-Export"
                  />
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
                <img
                  height="20px"
                  //  onClick={() => refresh()}
                  src={require("../../static/images/print.png")}
                  alt="Print"
                  title="Print"
                />
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
                            className="headcolstatic"
                            // style={{ height: "-10px !important"}}
                            style={showPrint}
                          >
                            Tenant Name
                          </th>

                          <th style={showPrint}>Building Name</th>
                          <th style={showPrint}>Door No</th>
                          <th style={showPrint}> Location</th>
                          <th style={showPrint}>Rent Amount</th>
                          <th style={showPrint}>Phone No</th>
                          {/* <th style={showPrint}>Pan No</th>
                          <th style={showPrint}>Aadhaar no</th> */}
                          <th style={showPrint}>Firm Name</th>
                          {/* <th style={showPrint}>Deposite Amount</th> */}

                          <th style={showPrint}>lease Start Date</th>
                          <th style={showPrint}>lease End Date</th>
                          <th style={showPrint}>Agreement Status</th>
                        </tr>
                      </thead>
                      <tbody className="text-center">
                        {currentDatas &&
                          currentDatas.map((Val, idx) => {
                            var ED =
                              Val.tenantLeaseEndDate &&
                              Val.tenantLeaseEndDate.split(/\D/g);
                            var tenant = [
                              ED && ED[2],
                              ED && ED[1],
                              ED && ED[0],
                            ].join("-");
                            var ED1 =
                              Val.tenantLeaseStartDate &&
                              Val.tenantLeaseStartDate.split(/\D/g);
                            var tenantStart = [
                              ED1 && ED1[2],
                              ED1 && ED1[1],
                              ED1 && ED1[0],
                            ].join("-");

                            return (
                              <>
                                <tr key={idx}>
                                  <td className="headcolstatic secondlinebreak1">
                                    {Val.tenantName}
                                  </td>
                                  <td>{Val.BuildingName}</td>
                                  {/* <td>
                                  <img
                                    className="img_icon_size log"
                                    src={require("../../static/images/info.png")}
                                    alt="Govt Cards"
                                    title={Val.shopDoorNo.map((e) => e.value)}
                                  />
                                </td> */}
                                  <td>
                                    {isPrinting ? (
                                      Val.shopDoorNo
                                        .map((e) => e.value)
                                        .join(", ")
                                    ) : (
                                      <img
                                        className="img_icon_size log"
                                        src={require("../../static/images/info.png")}
                                        alt="shop no."
                                        title={Val.shopDoorNo.map(
                                          (e) => e.value
                                        )}
                                      />
                                    )}
                                  </td>
                                  <td>{Val.Location}</td>
                                  <td>{Val.tenantRentAmount}</td>
                                  <td>{Val.tenantPhone}</td>
                                  {/* <td>{Val.tenantPanNo}</td>
                                  <td>{Val.tenantAdharNo}</td> */}
                                  <td>{Val.tenantFirmName}</td>
                                  {/* <td>{Val.tenantDepositAmt}</td> */}

                                  <td>{tenantStart}</td>
                                  <td>{tenant}</td>
                                  <td>{Val.output.AgreementStatus}</td>
                                </tr>
                              </>
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
                  {activeData && activeData.length !== 0 ? (
                    <Pagination
                      dataPerPage={dataPerPage}
                      totalData={activeData.length}
                      paginate={paginate}
                      currentPage={currentData}
                    />
                  ) : (
                    <Fragment />
                  )}
                </div>
                <div className="col-lg-6">
                  <p className="text-end h6">
                    No. of Tenants : {activeData.length}
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
  ParticularTenantFilterContactReport,
})(RenewedTenantReport);
