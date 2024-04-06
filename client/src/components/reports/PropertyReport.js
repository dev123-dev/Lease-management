import React, { useEffect, useState, useRef } from "react";
import { connect } from "react-redux";
import Select from "react-select";
import { CSVLink } from "react-csv";
import { Link } from "react-router-dom";
import Pagination from "../layout/Pagination";
import { useReactToPrint } from "react-to-print";
import { Modal } from "react-bootstrap";
//ACTIONS
import { getPropertyReport } from "../../actions/report";
//ICONS
import Print from "../../static/images/Print.svg";
import Excel from "../../static/images/Microsoft Excel.svg";
import refresh from "../../static/images/Refresh.svg";
import Back from "../../static/images/Back.svg";
import ShowDoorsModal from "../modal/ShowDoorsModal";

export const PropertyReport = ({
  auth: { user },
  report: { propertyReportList },
  getPropertyReport,
}) => {
  const myuser = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    getPropertyReport();
  }, []);

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
    } catch (error) {
      console.log(error);
      return 0;
    }
  };

  const [Location, setLocation] = useState(null);
  const onchangeLocation = (e) => {
    setLocation(e);
    const LocationName = {
      OrganizationId: user && user.OrganizationId,
      LocationName: e.value,
    };
    getPropertyReport(LocationName);
  };

  //pagination code
  const [currentData, setCurrentData] = useState(1);
  const [dataPerPage] = useState(8);
  //Get Current Data
  const indexOfLastData = currentData * dataPerPage;
  const indexOfFirstData = indexOfLastData - dataPerPage;
  const currentDatas =
    propertyReportList &&
    propertyReportList.slice(indexOfFirstData, indexOfLastData);

  const paginate = (nmbr) => {
    setCurrentData(nmbr);
  };
  let ActiveProperty =
    propertyReportList &&
    propertyReportList.filter((ele) => {
      if (ele.shopStatus === "Active") {
        return ele;
      }
    });
  let DeactiveProperty =
    propertyReportList &&
    propertyReportList.filter((ele) => {
      if (ele.shopStatus === "Deactive") {
        return ele;
      }
    });

  //   const [isPrinting, setIsPrinting] = useState(false);
  // useEffect(() => {

  //   return () => {
  //     setIsPrinting(false);
  //   };
  // }, []);
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

  const Refresh = () => {
    getPropertyReport("");
    setLocation(null);
  };

  const locations = myuser.output.Location.map((item) => ({
    label: item,
    value: item,
  }));

  return (
    <div className="col mt-sm-4 space">
      <div className="row col-lg-12 col-md-12 col-sm-12 col-12 no_padding ">
        <div className="row mt-5 ">
          <div className="col-lg-5  col-sm-12 col-md-12 mt-3">
            <h2 className="heading_color  headsize  ml-4">Property Report</h2>
          </div>

          <div className="col-lg-5  col-sm-12 col-md-12 mt-4 ">
            <div className="row">
              <div className="col-lg-6 col-sm-12 col-md-12">
                <Select
                  className="py-0"
                  name="Property name"
                  placeholder="Select Location"
                  options={locations}
                  value={Location}
                  onChange={(e) => onchangeLocation(e)}
                  styles={{
                    control: (provided) => ({
                      ...provided,
                    }),
                  }}
                  theme={(theme) => ({
                    ...theme,
                    height: 26,
                    minHeight: 26,
                    borderRadius: 1,
                    colors: {
                      ...theme.colors,
                      primary25: "#e8a317",
                      primary: "#095a4a",
                    },
                  })}
                  required
                ></Select>
              </div>
              <div className="col-lg-6 col-sm-12 col-md-12"></div>
            </div>
          </div>

          <div className="col-lg-2  col-sm-12 col-md-12 text-end  pt-2 iconspace  ">
            {" "}
            <>
              <Link to="/Report">
                <button style={{ border: "none" }}>
                  <img
                    src={Back}
                    alt="Back"
                    title="Back"
                    className=" iconSize"
                  />
                </button>
              </Link>

              <CSVLink data={[]} filename={"Property-Report.csv"}>
                <img
                  src={Excel}
                  alt="Excel-Export"
                  title="Excel-Export"
                  className=" iconSize"
                />
              </CSVLink>
            </>
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
            <button style={{ border: "none" }} className="mx-0 px-0">
              <img
                className="iconSize"
                // className=" float-right "
                style={{ cursor: "pointer" }}
                onClick={() => Refresh()}
                src={refresh}
                alt="refresh"
                title="Refresh"
              />
            </button>
          </div>
        </div>

        <div className="container-fluid d-flex align-items-center justify-content-center mt-sm-1 ">
          <div className="col" ref={componentRef}>
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
                    {currentDatas &&
                      currentDatas.map((property, idx) => {
                        return (
                          <tr key={idx}>
                            {property.shopStatus === "Active" ? (
                              <td>{property.BuildingName}</td>
                            ) : (
                              <td
                                style={{ backgroundColor: "#dda6a6" }}
                                className="headcolstatic secondlinebreak1"
                              >
                                {property.BuildingName}
                              </td>
                            )}

                            <td>{property.Location}</td>
                            <td>{property.shopAddress}</td>
                            <td>{property.shopDoorNo.length}</td>
                            <td>{property.tenants.length}</td>
                            <td>
                              {getTotal(property.tenants, "tenantRentAmount")}
                            </td>
                            <td>
                              {getTotal(property.tenants, "tenantDepositAmt")}
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
                              {/* {isPrinting ? (
                                    Val.shopDoorNo
                                      .map((e) => e.doorNo)
                                      .join(", ")
                                  ) : (
                                    <img
                                      className="img_icon_size "
                                      src={require("../../static/images/info.png")}
                                      alt="shop no."
                                      title={Val.shopDoorNo.map(
                                        (e) => e.doorNo
                                      )}
                                    />
                                  )} */}
                            </td>
                          </tr>
                        );
                      })}
                  </tbody>
                </table>
              </div>
              <div className="col-lg-1"></div>
            </div>
            <div className="row">
              <div className="col-lg-6  col-sm-12 col-md-12">
                {propertyReportList && propertyReportList.length !== 0 ? (
                  <Pagination
                    dataPerPage={dataPerPage}
                    totalData={propertyReportList.length}
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
                  Active Property:&nbsp;{ActiveProperty.length}{" "}
                  &nbsp;&nbsp;&nbsp;
                  <span style={{ color: "red" }}>
                    Deactive Property:&nbsp;{DeactiveProperty.length}
                  </span>
                </p>

                {/* <p
                    className="text-end h6 font-weight-bold"
                    style={{ color: "#095a4a" }}
                  >
                    No. of Property : {particular_org_data.length}
                  </p> */}
              </div>
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
          <ShowDoorsModal ShowDoors={ShowDoors} />
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
