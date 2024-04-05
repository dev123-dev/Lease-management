import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import Select from "react-select";
import { CSVLink } from "react-csv";
import { Link } from "react-router-dom";
import Pagination from "../layout/Pagination";
import { Modal } from "react-bootstrap";
//ACTIONS
import { getPropertyReport } from "../../actions/report";
//ICONS
import Print from "../../static/images/Print.svg";
import Excel from "../../static/images/Microsoft Excel.svg";
import Refresh from "../../static/images/Refresh.svg";
import Back from "../../static/images/Back.svg";

export const PropertyReport = ({
  auth: { user },
  report: { propertyReportList },
  getPropertyReport,
}) => {
  const myuser = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    getPropertyReport();
  }, []);

  console.log("", propertyReportList);
  //Style State
  const [showPrint, setShowPrint] = useState({
    backgroundColor: "#095a4a",
    color: "white",
    fontWeight: "bold",
  });

  //
  const [ShowDoors, setShowDoors] = useState({ status: false, data: null });
  // const [DoorList, seDoorList] = useState({ occupied: [], unocupied: [] });

  const onShowDoorClick = (property) => {
    let { shopDoorNo } = property;
    let occupied = [],
      unoccupied = [];
    shopDoorNo.forEach((e) =>
      e.status === "Acquired" ? occupied.push(e) : unoccupied.push(e)
    );
    setShowDoors({
      status: true,
      data: { ...property, occupied: occupied, unoccupied: unoccupied },
    });
  };

  const getTotal = (array, toSumObj) => {
    try {
      return array
        .reduce((acu, cur) => (acu += Number(cur[toSumObj])), 0)
        .toLocaleString("en-IN");
    } catch (er) {
      console.log(er);
      return 0;
    }
  };
  return (
    <div className="col mt-sm-4 space">
      <div className="row col-lg-12 col-md-12 col-sm-12 col-12 no_padding ">
        <div className="row mt-5 ">
          <div className="col-lg-5 mt-3">
            <h2 className="heading_color  headsize  ml-4">Property Report</h2>
            <Select></Select>
          </div>
          <div className="col-lg-7 pt-4 iconspace">
            <Link to="/Report">
              <button style={{ border: "none" }}>
                <img src={Back} alt="Back" title="Back" className=" iconSize" />
              </button>
            </Link>
            <img
              className="iconSize"
              style={{ cursor: "pointer" }}
              // onClick={() => refresh()}
              src={Refresh}
              alt="refresh"
              title="Refresh"
            />

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
                        Building Name
                      </th>

                      <th style={showPrint}>Location</th>
                      <th style={showPrint}>Address </th>
                      <th style={showPrint}>No of Doors</th>
                      <th style={showPrint}>No of Agreements</th>
                      <th style={showPrint}>Total Monthly Rent</th>
                      <th style={showPrint}>Total Deposit Amount</th>
                      <th style={showPrint}>Doors</th>
                    </tr>
                  </thead>
                  <tbody className="text-center">
                    {propertyReportList.map((property, idx) => {
                      return (
                        <tr key={idx}>
                          <td>{property.BuildingName}</td>
                          <td>{property.Location}</td>
                          <td>{property.shopAddress}</td>
                          <td>{property.shopDoorNo.length}</td>
                          <td>{property.teanants.length}</td>
                          <td>
                            {getTotal(property.teanants, "tenantRentAmount")}
                          </td>
                          <td>
                            {getTotal(property.teanants, "tenantDepositAmt")}
                          </td>
                          <td>
                            <img
                              className="img_icon_size log"
                              src={require("../../static/images/info.png")}
                              alt="shop no."
                              onClick={() => {
                                onShowDoorClick(property);
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
        </div>
      </div>
      {/* SEE door NO  */}
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
          <>
            <div className="d-flex align-item-center justify-content-center font-weight-bold">
              {ShowDoors.data?.BuildingName}
            </div>
            <div
              className="row"
              style={{ maxHeight: "70vh", overflowY: "scroll" }}
            >
              <div className="col-6">
                <div>Occupied Door List</div>
                {ShowDoors.data &&
                  ShowDoors.data.occupied.map((e) => (
                    <div
                      className="card bg-success text-light"
                      style={{ height: "40px" }}
                    >
                      {e.doorNo}-{e.status}
                    </div>
                  ))}
              </div>
              <div className="col-6">
                <div>Un-occupied Door List</div>
                {ShowDoors.data &&
                  ShowDoors.data.unoccupied.map((e) => (
                    <div
                      className="card bg-danger text-light"
                      style={{ height: "40px" }}
                    >
                      {e.doorNo}-{e.status}
                    </div>
                  ))}
              </div>
            </div>
          </>
        </Modal.Body>
      </Modal>
    </div>
  );
};

const mapStateToProps = (state) => ({ auth: state.auth, report: state.report });

const mapDispatchToProps = {
  getPropertyReport,
};

export default connect(mapStateToProps, mapDispatchToProps)(PropertyReport);
