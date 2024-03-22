import React, { useState, Fragment, useEffect, useRef } from "react";
import { CSVLink } from "react-csv";
import { connect } from "react-redux";
import {
  getParticularProperty,
  ParticularTenant,
  getAllSettings,
  get_particular_org_user,
} from "../../actions/tenants";
import { useReactToPrint } from "react-to-print";
import Pagination from "../layout/Pagination";
import { Link } from "react-router-dom";
import Print from "../../static/images/Print.svg";
import Excel from "../../static/images/Microsoft Excel.svg";
import Refresh from "../../static/images/Refresh.svg";
import Back from "../../static/images/Back.svg";

const UnOccupiedUnits = ({
  auth: { user },
  tenants: { particular_org_data, get_particular_org_tenant },

  getParticularProperty,
  getAllSettings,
  ParticularTenant,
  get_particular_org_user,
}) => {
  const [freshpage, setFreshPage] = useState(true);
  const myuser = JSON.parse(localStorage.getItem("user"));
  const [PropertyCount, setPropertyCount] = useState(0);
  useEffect(() => {
    if (myuser) {
      fun();
      getParticularProperty({
        OrganizationId: myuser && myuser.OrganizationId,
      });
      ParticularTenant({ OrganizationId: myuser && myuser.OrganizationId });
      getAllSettings({
        OrganizationId: myuser && myuser.OrganizationId,
        userId: myuser && myuser._id,
      });
      get_particular_org_user({ OrganizationId: myuser.OrganizationId });
    }
  }, []);
  //pagination code
  const [currentData, setCurrentData] = useState(1);
  const [dataPerPage] = useState(10);
  //Get Current Data
  const indexOfLastData = currentData * dataPerPage;
  const indexOfFirstData = indexOfLastData - dataPerPage;

  const TotalRenewedCount =
    get_particular_org_tenant &&
    get_particular_org_tenant.filter((ele) => {
      if (
        ele.AgreementStatus === "Renewed" &&
        ele.tenantstatus !== "Deactive" &&
        new Date(ele.tenantLeaseStartDate).getFullYear() ===
          parseInt(new Date().getFullYear())
      ) {
        return ele;
      }
    });
  let ShopStatus = [];
  particular_org_data &&
    particular_org_data.map((ele) => {
      ele.shopDoorNo &&
        ele.shopDoorNo.map((ele1) => {
          if (ele1.status === "Avaiable") {
            ShopStatus.push({
              ele1,
            });
          }
        });
    });

  // const mappedStatus = ShopStatus.map((item) => item.ele1.BuildingName);
  const mappedStatus = ShopStatus.map((item) => ({
    doorNo: item.ele1.doorNo,
    status: item.ele1.status,
    BuildingName: item.ele1.BuildingName,
  }));

  const fun = () => {
    let pCount =
      particular_org_data &&
      particular_org_data.reduce((acu, cur) => acu + 1, 0);
    setPropertyCount(pCount);
  };

  const currentDatas =
    mappedStatus && mappedStatus.slice(indexOfFirstData, indexOfLastData);
  const paginate = (nmbr) => {
    //nmbr is page  number
    setCurrentData(nmbr);
  };
  const csvUnOccupiedData = [["Building Name", "Door No.", "Status"]];

  mappedStatus &&
    mappedStatus
      .reduce((acc, currentValue) => {
        const existingBuilding = acc.find(
          (item) => item.BuildingName === currentValue.BuildingName
        );

        if (existingBuilding) {
          existingBuilding.doorNo += `, ${currentValue.doorNo}`;
        } else {
          acc.push({
            ...currentValue,
            doorNo: currentValue.doorNo.toString(),
          });
        }

        return acc;
      }, [])
      .map((Val, idx) =>
        csvUnOccupiedData.push([Val.BuildingName, Val.doorNo, Val.status])
      );

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
                Unoccupied Units
              </h2>
            </div>

            <div className="col-lg-8 mt-3 iconspace ">
              <Link to="/MainAdmin">
                <button style={{ border: "none" }}>
                  <img src={Back} alt="Back" title="Back" className="iconSize"/>
                </button>
              </Link>
              {myuser.usergroup === "Admin" ? (
                <CSVLink
                  data={csvUnOccupiedData}
                  filename={"Unoccupied-Units.csv"}
                >
                  <img src={Excel} alt="Excel-Export" title="Excel-Export" className="iconSize" />
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
                <img src={Print} alt="Print" title="Print" className="iconSize" />
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
                          <th style={showPrint}>Building Name</th>
                          <th style={showPrint}>Door No's</th>
                          <th style={showPrint}>Status</th>
                        </tr>
                      </thead>
                      <tbody className="text-center">
                        {mappedStatus &&
                          mappedStatus
                            .reduce((acc, currentValue) => {
                              const existingBuilding = acc.find(
                                (item) =>
                                  item.BuildingName ===
                                  currentValue.BuildingName
                              );

                              if (existingBuilding) {
                                existingBuilding.doorNo += `, ${currentValue.doorNo}`;
                              } else {
                                acc.push({
                                  ...currentValue,
                                  doorNo: currentValue.doorNo.toString(),
                                });
                              }

                              return acc;
                            }, [])
                            .map((Val, idx) => (
                              <tr key={idx}>
                                <td>{Val.BuildingName}</td>
                                <td>{Val.doorNo}</td>
                                <td>Available</td>
                              </tr>
                            ))}
                      </tbody>
                    </table>
                  </div>
                  <div className="col-lg-1"></div>
                </div>
              </div>
              <div className="row">
                <div className="col-lg-6">
                  {mappedStatus && mappedStatus.length !== 0 ? (
                    <Pagination
                      dataPerPage={dataPerPage}
                      totalData={mappedStatus.length}
                      paginate={paginate}
                      currentPage={currentData}
                    />
                  ) : (
                    <Fragment />
                  )}
                </div>
                <div className="col-lg-6">
                  <p className="text-end h6 font-weight-bold"
                      style={{ color: "#095a4a" }}>
                    No. of Units : {mappedStatus.length}
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
  getParticularProperty,
  ParticularTenant,
  getAllSettings,
  get_particular_org_user,
})(UnOccupiedUnits);
