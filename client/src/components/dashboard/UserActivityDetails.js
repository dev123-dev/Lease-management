import React, { useState, Fragment, useEffect, useRef } from "react";
import { CSVLink } from "react-csv";
import { connect } from "react-redux";
import { ParticularTenantFilter, getUserActivity } from "../../actions/tenants";
import RenewalReportPrint from "../printPdf/renewalReportPrint";
import { useReactToPrint } from "react-to-print";
import Pagination from "../layout/Pagination";

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

  return (
    <>
      <div className="col mt-sm-4 space ">
        <div className="row col-lg-12 col-md-12 col-sm-12 col-12 no_padding ">
          <div className="row mt-5  ">
            <div className="col-lg-5 mt-3">
              <h2 className="heading_color  headsize  ml-4">
                User Activity of <span>{myuser.username}</span>
                (Past 30 days)
              </h2>
            </div>
            <div className="col-lg-7 mt-5 text-right ">
              {/* {myuser.usergroup === "Admin" ? (
                    <CSVLink data={csvContactReportData}>
                      <img
                        className="img_icon_size log  ml-4"
                        src={require("../../static/images/excel_icon.png")}
                        alt="Excel-Export"
                        title="Excel-Export"
                      />
                    </CSVLink>
                  ) : (
                    <></>
                  )} */}

              {/* <button
                style={{ border: "none" }}
                
              >
                <img
                  height="20px"
                 
                  src={require("../../static/images/print.png")}
                  alt="Print"
                  title="Print"
                />
              </button> */}
            </div>
          </div>

          <div className="container-fluid d-flex align-items-center justify-content-center mt-sm-1 ">
            <div className="col">
              <div>
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
                          >
                            Menu
                          </th>
                          <th>Name</th>
                          <th>Operation</th>
                          <th>Entered Date </th>
                          <th> Time</th>
                          <th> Remarks</th>
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
                                    Transferred Lease{" "}
                                    {Val.Dno.map((ele) => ele.label)} to{" "}
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
                  <p className="text-end h6">
                    No. of UserActivity : {useractivitydetail.length}
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
