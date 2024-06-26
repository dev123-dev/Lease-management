import React, { useEffect, useState ,useRef} from "react";
import { connect } from "react-redux";
import Select from "react-select";
import { CSVLink } from "react-csv";
import { Link } from "react-router-dom";
import Pagination from "../layout/Pagination";
import { Modal } from "react-bootstrap";
import { debounce } from "lodash";
//ACTIONS
import { getRenewalReport } from "../../actions/report";
import { useReactToPrint } from "react-to-print";
//ICONS
import Print from "../../static/images/Print.svg";
import Excel from "../../static/images/Microsoft Excel.svg";
import Refresh from "../../static/images/Refresh.svg";
import Back from "../../static/images/Back.svg";
import ShowDoorsModal from "../modal/ShowDoorsModal";
import TeanantRenewHistroyModal from "../modal/TeanantRenewHistroyModal";
import Loader from "../../static/images/loader.gif";
export const RenewalReport = ({
  auth: { user },
  report: { renewalReportList, reportLoader },
  getRenewalReport,
}) => {
  useEffect(() => {
    getRenewalReport();
  }, []);

  const myuser = JSON.parse(localStorage.getItem("user"));
  //Style State
  const [showPrint, setShowPrint] = useState({
    backgroundColor: "#095a4a",
    color: "white",
    fontWeight: "bold",
  });

  const [tenantFilter, setTenantFilter] = useState({ tName: "" });
  let { tName } = tenantFilter;

  const callFilter = (e) => {
    getRenewalReport({ tName: e });
  };
  const debouncedFilter = debounce(callFilter, 200); //Delay Int to not overwlm the Bckend

  const filterUpdate = (e, label) => {
    if (label) {
      //for select
    } else {
      setTenantFilter({ ...tenantFilter, tName: e.target.value });
      debouncedFilter(e.target.value);
    }
  };

  const [ShowDoors, setShowDoors] = useState({ status: false, data: null });

  const onShowDoorClick = (property) => {
    const occupied = property.shopDoorNo.map((e) => {
      return {
        doorNo: e.label,
        status: e.status,
      };
    });
    setShowDoors({
      status: true,
      data: { ...property, occupied: occupied, unoccupied: [] },
    });
  };

  const [RenewHistroy, setRenewHistroy] = useState({
    status: false,
    data: null,
  });

  //for count Active and DeActive
  let ActiveTenantlen = 0,
    DectiveTenantlen = 0;
  renewalReportList.forEach((e) =>
    e.tenantstatus === "Active" ? ActiveTenantlen++ : DectiveTenantlen++
  );

  //pagination code
  const [currentData, setCurrentData] = useState(1);
  const [dataPerPage] = useState(7);
  //Get Current Data
  const indexOfLastData = currentData * dataPerPage;
  const indexOfFirstData = indexOfLastData - dataPerPage;
  const currentDatas =
    renewalReportList &&
    renewalReportList.slice(indexOfFirstData, indexOfLastData);

  const paginate = (nmbr) => {
    setCurrentData(nmbr);
  };
  //pageinate End
  const onClickRefresh = () => {
    getRenewalReport();
    setTenantFilter({ tName: "" });
  };

  //Print
     const [isPrinting, setIsPrinting] = useState(false);
  useEffect(() => {

    return () => {
      setIsPrinting(false);
    };
  }, []);
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: "Property Detail",

    onAfterPrint: () => {
      setTimeout(() => {
        // setIsPrinting(false);
        setShowPrint({
          backgroundColor: "#095a4a",
          color: "white",
          fontWeight: "bold",
        });
      }, 200);
    },
  });

 
  //Excel Export
 const csvRenewalReportData = [
    ["Tenant Name", "Building", "Address", "No of Door's","Monthly Rent","Total Deposit Amount","Occupied Door No","Tenant Status"],
  ];

  renewalReportList && renewalReportList.map((renewalReportList) => {
    
  var doorNo =
      renewalReportList &&renewalReportList.shopDoorNo&&
      renewalReportList.shopDoorNo.map((e) => e.value).join(", "); 
    var fullAddress = `${renewalReportList.tenantAddr}`.replace(/,/g, ' ');
       var fullName = `${renewalReportList.tenantName}`.replace(/,/g, ' ');
    return csvRenewalReportData.push([
     fullName,
      renewalReportList.BuildingName,
      fullAddress,
renewalReportList.shopDoorNo?.length,
      renewalReportList.tenantRentAmount,
        renewalReportList.tenantDepositAmt,
      doorNo,
       renewalReportList.tenantstatus,
    ]);
  });
  

  return (
    <div className="col mt-sm-4 space">
      <div className="row col-lg-12 col-md-12 col-sm-12 col-12 no_padding ">
        <div className="row mt-5 ">
          <div className="col-lg-5 mt-3">
            <h2 className="heading_color  headsize  ml-4">Renewal Report</h2>
          </div>

          <div className="col-lg-5 col-sm-12 col-md-12 mt-4 ">
            <div className="row">
              <div className="col-lg-6 col-sm-12 col-md-12">
                <input
                  type="text"
                  placeholder="Tenant Name"
                  name="tName"
                  value={tName}
                  onChange={(e) => filterUpdate(e)}
                  className="form-control"
                  style={{
                    width: "80%",
                  }}
                />
              </div>

              <div className="col-lg-6 col-sm-12 col-md-12"></div>
            </div>
          </div>
          <div className="col-lg-2 col-sm-12 col-md-12 text-end  pt-2 iconspace">
            {reportLoader && (
              <img src={Loader} alt="Loading..." height="50px" />
            )}

            <Link to="/Report">
              <button style={{ border: "none" }}>
                <img src={Back} alt="Back" title="Back" className=" iconSize" />
              </button>
            </Link>
           

            {myuser.usergroup === "Admin" && (
              <>
                <CSVLink data={csvRenewalReportData} filename={"Renewal-Report.csv"}>
                  <img
                    src={Excel}
                    alt="Excel-Export"
                    title="Excel-Export"
                    className=" iconSize"
                  />
                </CSVLink>
                <button
                  style={{ border: "none" }}
                  onClick={async () => {
                    await setShowPrint({
                      backgroundColor: "#095a4a",
                      color: "black",
                      fontWeight: "bold",
                    });

                    handlePrint();
                  }}
                >
                  <img
                    src={Print}
                    alt="Print"
                    title="Print"
                    className=" iconSize"
                  />
                </button>
                 <img
              className="iconSize"
              style={{ cursor: "pointer" }}
              onClick={() => onClickRefresh()}
              src={Refresh}
              alt="refresh"
              title="Refresh"
            />
              </>
            )}
          </div>
        </div>

        <div className="container-fluid d-flex align-items-center justify-content-center mt-sm-1 ">
          <div
            className="col"
            // ref={componentRef}
          >
              <div ref={componentRef}>
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
                        Tenant Name
                      </th>
                      <th style={showPrint}>Building</th>
                      <th style={showPrint}>Address </th>
                      <th style={showPrint}>No of Doors</th>
                      <th style={showPrint}>Monthly Rent</th>
                      <th style={showPrint}>Total Deposit Amount</th>
                      <th style={showPrint}>Doors</th>
                    </tr>
                  </thead>
                  <tbody className="text-center">
                    {currentDatas.map((tenant, idx) => {
                      return (
                        <tr key={idx}>
                          {tenant.tenantstatus==="Active"?(    <td>
                            <div
                              style={{
                                textDecoration: "underline",
                                cursor: "pointer",
                              }}
                              onClick={() =>
                                setRenewHistroy({
                                  status: true,
                                  data: tenant.histroy,
                                })
                              }
                            >
                              {tenant.tenantName}
                            </div>
                          </td>):(    <td style={{backgroundColor:"#dda6a6",}}>
                            <div
                              style={{
                                textDecoration: "underline",
                                cursor: "pointer",
                                
                              }}
                              onClick={() =>
                                setRenewHistroy({
                                  status: true,
                                  data: tenant.histroy,
                                })
                              }
                            >
                              {tenant.tenantName}
                            </div>
                          </td>)}
                      

                          <td>{tenant.BuildingName}</td>
                          <td>{tenant.tenantAddr}</td>
                          <td>{tenant.shopDoorNo?.length}</td>
                          <td>{tenant.tenantRentAmount}</td>
                          <td>{tenant.tenantDepositAmt}</td>
                          <td>
                            <img
                              className="img_icon_size log"
                              src={require("../../static/images/info.png")}
                              alt="shop no."
                              onClick={() => {
                                onShowDoorClick(tenant);
                              }}
                            />
                          </td>
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
              <div className="col-lg-6  col-sm-12 col-md-12">
                {renewalReportList.length !== 0 ? (
                  <Pagination
                    dataPerPage={dataPerPage}
                    totalData={renewalReportList.length}
                    paginate={paginate}
                    currentPage={currentData}
                  />
                ) : (
                  <div />
                )}
              </div>
              <div className="col-lg-6  col-sm-12 col-md-12">
                <p
                  className="text-end h6 font-weight-bold"
                  style={{ color: "#095a4a" }}
                >
                  Active Property:&nbsp;{ActiveTenantlen}
                  &nbsp;&nbsp;&nbsp;
                  <span style={{ color: "red" }}>
                    Deactive Property:&nbsp;{DectiveTenantlen}
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Door NO  */}
      <Modal
        show={ShowDoors.status}
        backdrop="static"
        keyboard={false}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header className="confirmbox-heading">
          <div className="col-lg-10  col-sm-12 col-md-12">
            <div className="ml-4">
              <h4
                style={{
                  color: "white",
                }}
                className="text-center  ml-4 "
              >
                Doors
              </h4>
            </div>
          </div>
          <div className="col-lg-2  col-sm-12 col-md-12">
            <button
              onClick={() =>
                setShowDoors({ status: false, data: ShowDoors.data })
              }
              className="close"
            >
              <img
                className="editcl"
                src={require("../../static/images/close.png")}
                alt="X"
                style={{ height: "20px", width: "20px" }}
              />
            </button>
          </div>
        </Modal.Header>
        <Modal.Body>
          <ShowDoorsModal ShowDoors={ShowDoors} from={"Renewal"} />
        </Modal.Body>
      </Modal>
      {/* HISTROY */}
      <Modal
        show={RenewHistroy.status}
        backdrop="static"
        keyboard={false}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header className="confirmbox-heading">
          <div className="col-lg-10  col-sm-12 col-md-12">
            <div className="ml-4">
              <h4
                style={{
                  color: "white",
                }}
                className="text-center  ml-4 "
              >
                Renewed History
              </h4>
            </div>
          </div>
          <div className="col-lg-2  col-sm-12 col-md-12">
            <button
              onClick={() =>
                setRenewHistroy({ status: false, data: RenewHistroy.data })
              }
              className="close"
            >
              <img
                className="editcl"
                src={require("../../static/images/close.png")}
                alt="X"
                style={{ height: "20px", width: "20px" }}
              />
            </button>
          </div>
        </Modal.Header>
        <Modal.Body>
          <TeanantRenewHistroyModal RenewHistroy={RenewHistroy?.data} />
        </Modal.Body>
      </Modal>
    </div>
  );
};

const mapStateToProps = (state) => ({ auth: state.auth, report: state.report });

const mapDispatchToProps = { getRenewalReport };

export default connect(mapStateToProps, mapDispatchToProps)(RenewalReport);
