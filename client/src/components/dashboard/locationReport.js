import React, { useEffect, useState, Fragment, useRef } from "react";
import { connect } from "react-redux";
import AddShopDetails from "./AddShopDetails";
import { Modal, Button } from "react-bootstrap";
import { Form } from "react-bootstrap";
import EditProperty from "../dashboard/EditProperty";
import { CSVLink } from "react-csv";
import { Link } from "react-router-dom";
import {
  getParticularProperty,
  getParticularOrg,
  deactiveProperty,
  getAllSettings,
  getAllShops,
} from "../../actions/tenants";
import Select from "react-select";
import Pagination from "../layout/Pagination";
import { useReactToPrint } from "react-to-print";
import Print from "../../static/images/Print.svg";
import Excel from "../../static/images/Microsoft Excel.svg";
import Refresh from "../../static/images/Refresh.svg";
import Back from "../../static/images/Back.svg";
const LocationReport = ({
  auth: { user },
  tenants: { particular_org_data, particular_org_loc },
  deactiveProperty,
  getParticularOrg,
  getAllSettings,
  getParticularProperty,
}) => {
  // console.log("data", particular_org_data);
  const myuser = JSON.parse(localStorage.getItem("user"));
  useEffect(() => {
    fun();
    getParticularOrg({ OrganizationId: user && user.OrganizationId });
    getAllSettings({
      OrganizationId: myuser && myuser.OrganizationId,
      userId: myuser && myuser._id,
    });
  }, []);

  const [RoomAlreadyExist, SetRoomAlreadyExist] = useState({
    color: "white",

    display: "none",
  });

  const [formData, setFormData] = useState({
    deactive_reason: "",
    isSubmitted: false,
  });
  const [LOCATION, SetLocation] = useState(null);
  const [Sellocation, SetselLoction] = useState([]);
  const Loc = [];

  const { Location } = particular_org_loc && particular_org_loc[0];
  const fun = () => {
    particular_org_loc[0] &&
      Location.map((ele) => {
        Loc.push({
          label: ele,
          value: ele,
        });
        SetselLoction(Loc);
      });
  };
  // let output = particular_org_data.filter(
  //   (item) =>
  //     item.shopDoorNo &&
  //     !item.shopDoorNo.every((nameItem) => nameItem.status !== "Avaiable")
  // );

  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const handleUpdateModalOpen = () => setShowUpdateModal(!showUpdateModal);
  const [property, setProperty] = useState([]);

  // const onEdit = (ele) => {
  //   let propertydata = {
  //     OrganizationId: ele.OrganizationId,
  //     PropertyId: ele._id,
  //     OrganizationName: ele.OrganizationName,
  //     BuildingName: ele.BuildingName,
  //     hike: ele.hike,
  //     leaseTimePeriod: ele.leaseTimePeriod,
  //     shopAddress: ele.shopAddress,
  //     shopDoorNo: ele.shopDoorNo,
  //     Location: ele.Location,
  //     stampDuty: ele.stampDuty,
  //   };
  //   setProperty(propertydata);
  //   handleUpdateModalOpen();
  // };

  const { deactive_reason } = formData;

  const onInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);

  const [checkData, setCheckData] = useState([]);

  const HandelCheck = (e) => {
    var updatedlist = [...checkData];
    if (e.target.checked) {
      updatedlist = [...checkData, e.target.value];
    } else {
      updatedlist.splice(checkData.indexOf(e.target.value), 1);
    }
    setCheckData(updatedlist);
  };
  const [dno, SetDno] = useState([]);
  const [PropertyId, setPropertyId] = useState([]);
  const [selectDno, SetDoornumber] = useState();
  const handleShowDno = () => SetDoornumber(false);
  const handleCloseDno = () => {
    SetDoornumber(false);
    setCheckData([]);
  };
  // const onDelete = (id, Dno) => {
  //   if (Dno.length >= 1) {
  //     SetDno(Dno);
  //     setPropertyId(id);
  //     SetDoornumber(true);
  //   } else {
  //     SetDno(Dno);
  //     setPropertyId(id);
  //     handleShow();
  //   }
  // };
  const onchangeLocation = (e) => {
    SetLocation(e);
    const OrgainationId_Loc_name = {
      OrganizationId: user && user.OrganizationId,
      LocationName: e.value,
    };
    getParticularProperty(OrgainationId_Loc_name);
  };

  // const onDeactivate = (e) => {
  //   // alert(checkData.length );

  //   if (checkData.length !== 0) {
  //     e.preventDefault();
  //     //alert(checkData);
  //     setShow(false);
  //     const reason = {
  //       PropertyId: PropertyId,
  //       OrganizationId: user && user.OrganizationId,
  //       Dno: checkData,
  //       shopStatus: "Deactive",
  //       deactive_reason: deactive_reason,
  //     };
  //     deactiveProperty(reason);
  //     getParticularOrg({ OrganizationId: user && user.OrganizationId });

  //     handleShowDno();
  //     setCheckData([]);
  //   } else {
  //     SetRoomAlreadyExist({
  //       display: "inline",
  //       color: "#FF0000",
  //     });
  //   }
  // };

  // const onDeactivateall = (e) => {
  //   if (checkData.length === 0) {
  //     e.preventDefault();

  //     setShow(false);
  //     const reason = {
  //       PropertyId: PropertyId,
  //       OrganizationId: user && user.OrganizationId,
  //       Dno: [],
  //       shopStatus: "Deactive",
  //       deactive_reason: deactive_reason,
  //     };
  //     deactiveProperty(reason);
  //     getParticularOrg({ OrganizationId: user && user.OrganizationId });

  //     handleShowDno();
  //   } else {
  //   }
  // };

  const [showadd, setShowadd] = useState(false);

  //pagination code
  const [currentData, setCurrentData] = useState(1);
  const [dataPerPage] = useState(6);
  //Get Current Data
  const indexOfLastData = currentData * dataPerPage;
  const indexOfFirstData = indexOfLastData - dataPerPage;
  const currentDatas =
    particular_org_data &&
    particular_org_data.slice(indexOfFirstData, indexOfLastData);

  const paginate = (nmbr) => {
    setCurrentData(nmbr);
  };
  const refresh = () => {
    fun();
    const OrganizationId = {
      OrganizationId: user && user.OrganizationId,
    };
    getParticularOrg(OrganizationId);
    SetLocation(null);
  };
  const dnolen = dno.filter((ele) => ele.status === "Avaiable");

  const csvLocationData = [
    ["Building Name", "Address", "Location", "Door No."],
  ];
  particular_org_data &&
    particular_org_data.map((particular_org_data) => {
      var doorNo =
        particular_org_data &&
        particular_org_data.shopDoorNo.map((e) => e.doorNo).join(", "); // Join door numbers into a single string
      return csvLocationData.push([
        particular_org_data.BuildingName,
        particular_org_data.shopAddress,
        particular_org_data.Location,
        doorNo,
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
    documentTitle: "Location Report",

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
              <h2 className="heading_color  headsize  ml-4">Location Report</h2>
            </div>
            <div className="col-lg-5 mt-3">
              <Select
                className="dropdown text-left mt-sm-3"
                placeholder="Search-Location"
                name="location"
                options={Sellocation}
                value={LOCATION}
                onChange={(e) => onchangeLocation(e)}
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
              ></Select>
            </div>
            <div className="col-lg-2 text-end pt-4 iconspace">
              {" "}
              <Link to="/Report">
                <button style={{ border: "none" }}>
                  <img src={Back} alt="Back" title="Back" />
                </button>
              </Link>
              {myuser.usergroup === "Admin" ? (
                <>
                  <CSVLink
                    data={csvLocationData}
                    filename={"Location-Report.csv"}
                  >
                    <img src={Excel} alt="Excel-Export" title="Excel-Export" />
                  </CSVLink>
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
                </>
              ) : (
                <></>
              )}
              <img
                className="ml-1"
                style={{ cursor: "pointer" }}
                onClick={() => refresh()}
                src={Refresh}
                alt="Refresh"
                title="Refresh"
              />
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
                            style={showPrint}
                            // style={{ height: "-10px !important" }}
                          >
                            Building Name
                          </th>
                          {/* <th>Door Number</th> */}

                          <th style={showPrint}>Address</th>
                          <th style={showPrint}>Location</th>
                          <th style={showPrint}> Total Door No</th>
                        </tr>
                      </thead>
                      <tbody className="text-center">
                        {currentDatas &&
                          currentDatas.map((Val, idx) => {
                            return (
                              <tr key={idx}>
                                <td className="headcolstatic secondlinebreak1">
                                  {Val.BuildingName}
                                </td>

                                <td>{Val.shopAddress}</td>
                                {/* <td title={AddDetail.shopDoorNo}> */}
                                <td>
                                  {/* {Val.shopDoorNo &&
                                  Val.shopDoorNo.map((ele) => {
                                    <p key={idx}></p>;
                                    if (ele.status === "Avaiable") {
                                      return (
                                        <div className="dno">
                                          {ele.doorNo + ","}
                                        </div>
                                      );
                                    }
                                  })} */}
                                  {Val.Location}
                                </td>

                                <td>
                                  {isPrinting ? (
                                    Val.shopDoorNo
                                      .map((e) => e.doorNo)
                                      .join(", ")
                                  ) : (
                                    <img
                                      className="img_icon_size log"
                                      src={require("../../static/images/info.png")}
                                      alt="shop no."
                                      title={Val.shopDoorNo.map(
                                        (e) => e.doorNo
                                      )}
                                    />
                                  )}
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
                <div className="col-lg-6">
                  {particular_org_data && particular_org_data.length !== 0 ? (
                    <Pagination
                      dataPerPage={dataPerPage}
                      totalData={particular_org_data.length}
                      paginate={paginate}
                      currentPage={currentData}
                    />
                  ) : (
                    <Fragment />
                  )}
                </div>
                <div className="col-lg-6">
                  <p className="text-end h6">
                    No. of Property : {particular_org_data.length}
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
  getAllShops,
  deactiveProperty,
  getParticularOrg,
  getAllSettings,
  getParticularProperty,
})(LocationReport);
