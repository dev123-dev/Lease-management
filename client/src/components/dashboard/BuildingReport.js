import React, { useEffect, useState, Fragment ,useRef} from "react";
import { connect } from "react-redux";
import { CSVLink } from "react-csv";
import AddShopDetails from "./AddShopDetails";
import { Modal, Button } from "react-bootstrap";
import { Form } from "react-bootstrap";
import EditProperty from "../dashboard/EditProperty";
import {
  getParticularProperty,
  getParticularOrg,
  deactiveProperty,
  getAllSettings,
  ParticularTenant,
  getAllShops,
  getPropertyTenantData,
} from "../../actions/tenants";
import { useReactToPrint } from "react-to-print";
import Select from "react-select";
import Pagination from "../layout/Pagination";
const BuildingReport = ({
  auth: { user },
  tenants: {
    particular_org_data,
    particular_org_loc,
    get_particular_org_tenant,
    get_property_related_tenant,
  },
  deactiveProperty,
  getParticularOrg,
  getAllSettings,
  getPropertyTenantData,
  getParticularProperty,
}) => {
  let propertyId =
    particular_org_data &&
    particular_org_data.map((ele) => {
      return ele._id;
    });
    const myuser = JSON.parse(localStorage.getItem("user"));
  useEffect(() => {
 
    fun();
    getPropertyTenantData({
      PropertyId: propertyId,
      OrganizationId: myuser.OrganizationId,
    });
    getParticularOrg({ OrganizationId: user && user.OrganizationId });
    getAllSettings({
      OrganizationId: myuser && myuser.OrganizationId,
      userId: myuser && myuser._id,
    });
    ParticularTenant({ OrganizationId: myuser && myuser.OrganizationId });
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
  const onDelete = (id, Dno) => {
    if (Dno.length >= 1) {
      SetDno(Dno);
      setPropertyId(id);
      SetDoornumber(true);
    } else {
      SetDno(Dno);
      setPropertyId(id);
      handleShow();
    }
  };
  const onchangeLocation = (e) => {
    SetLocation(e);
    const OrgainationId_Loc_name = {
      OrganizationId: user && user.OrganizationId,
      LocationName: e.value,
    };
    getParticularProperty(OrgainationId_Loc_name);
  };

  const onDeactivate = (e) => {
    // alert(checkData.length );

    if (checkData.length !== 0) {
      e.preventDefault();
      //alert(checkData);
      setShow(false);
      const reason = {
        PropertyId: PropertyId,
        OrganizationId: user && user.OrganizationId,
        Dno: checkData,
        shopStatus: "Deactive",
        deactive_reason: deactive_reason,
      };
      deactiveProperty(reason);
      getParticularOrg({ OrganizationId: user && user.OrganizationId });

      handleShowDno();
      setCheckData([]);
    } else {
      SetRoomAlreadyExist({
        display: "inline",
        color: "#FF0000",
      });
    }
  };
  const onDeactivateall = (e) => {
    if (checkData.length === 0) {
      e.preventDefault();

      setShow(false);
      const reason = {
        PropertyId: PropertyId,
        OrganizationId: user && user.OrganizationId,
        Dno: [],
        shopStatus: "Deactive",
        deactive_reason: deactive_reason,
      };
      deactiveProperty(reason);
      getParticularOrg({ OrganizationId: user && user.OrganizationId });

      handleShowDno();
    } else {
    }
  };

  const [showadd, setShowadd] = useState(false);

  //pagination code
  const [currentData, setCurrentData] = useState(1);
  const [dataPerPage] = useState(6);
  //Get Current Data
  const indexOfLastData = currentData * dataPerPage;
  const indexOfFirstData = indexOfLastData - dataPerPage;
  const currentDatas =
    get_property_related_tenant &&
    get_property_related_tenant.slice(indexOfFirstData, indexOfLastData);

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
  const csvPropertyReportData = [
    [    
      "Building Name",
      "Address",
      "Location",
      "Unoccupied Door No.",
      "occupied Door No.",
      "Monthly Rent Amount",
      "Deposit Amount",
    ],
  ];

  get_property_related_tenant && get_property_related_tenant.map((get_property_related_tenant) => {
    var unOccdoorNo =get_property_related_tenant && get_property_related_tenant.UnOccupied
      .filter((e) => e.status === "Avaiable")
      .map((ele) => ele.doorNo)
      .join(', '); // Join door numbers into a single string
      var OccdoorNo = get_property_related_tenant.shopDoorNo
      .filter((e) => e.status === "Acquired")
      .map((ele) => ele.label)
      .join(', '); // Join door numbers into a single string
  
   // You can use console.log or do something else with the result
    return csvPropertyReportData.push([
      get_property_related_tenant.BuildingName,
      get_property_related_tenant.Location,
      get_property_related_tenant.Location,
      unOccdoorNo,
      OccdoorNo,
      get_property_related_tenant.tenantRentAmount,
      get_property_related_tenant.tenantDepositAmt,
   
     
    ]);
  });
  const [showPrint, setShowPrint] = useState({
    backgroundColor: "#095a4a",
    color: "white",
    fontWeight: "bold",
  });
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: "Contact Report",
    //onAfterPrint: () => alert("print success"),
    onAfterPrint: () =>
      setShowPrint({
        backgroundColor: "#095a4a",
        color: "white",
        fontWeight: "bold",
      }),
  });
  return (
    <>
      <div className="col mt-sm-4 space ">
        <div className="row col-lg-12 col-md-12 col-sm-12 col-12 no_padding ">
          <div className="row mt-5  ">
            <div className="col-lg-5 mt-3">
              <h2 className="heading_color  headsize  ml-4">Property Report</h2>
            </div>
            <div className="col-lg-7 mt-5 text-right ">
            {myuser.usergroup === "Admin" ? (
                            <>  
            <CSVLink data={csvPropertyReportData}>
                <img
                  className="img_icon_size log float-right ml-2 mt-1"
                  src={require("../../static/images/excel_icon.png")}
                  alt="Excel-Export"
                  title="Excel-Export"
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
                    height="20px"
                    //  onClick={() => refresh()}
                    src={require("../../static/images/print.png")}
                    alt="Print"
                    title="Print"
                  />
                </button>
              </>
              ):(<></>)}
            </div>
            {/* <div className="col-lg-5 mt-3">
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
            </div> */}
            {/* <div className="col-lg-2 text-end mt-sm-5">
              {" "}
              <img
                className="ml-5"
                style={{ cursor: "pointer" }}
                height="20px"
                onClick={() => refresh()}
                src={require("../../static/images/refresh-icon.png")}
                alt="refresh"
                title="refresh"
              />{" "}
            </div> */}
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
                     
                          className="headcolstatic "
                          style={ showPrint }
                        >
                          Building Name
                        </th>

                        <th style={showPrint}>Address</th>
                        <th style={showPrint}>Location</th>
                        <th style={showPrint}> Unoccupied Door No</th>
                        <th style={showPrint}> Occupied Door No</th>
                        <th style={showPrint}>Monthly Rent Amount</th>
                        <th style={showPrint}>Deposit Amount</th>
                      </tr>
                    </thead>
                    <tbody className="text-center">
                      {currentDatas &&
                        currentDatas.map((Val, idx) => {
                          return (
                            <tr key={idx}>
                              {Val.ShopStatus === "Deactive" ? (
                                <td
                                  style={{ backgroundColor: "#dda6a6" }}
                                  className="headcolstatic secondlinebreak1"
                                >
                                  {Val.BuildingName}
                                </td>
                              ) : (
                                <td className="headcolstatic secondlinebreak1">
                                  {Val.BuildingName}
                                </td>
                              )}

                              <td>{Val.Location}</td>
                              <td>{Val.Location}</td>
                              <td>
                                {" "}
                                {Val.UnOccupied &&
                                  Val.UnOccupied.map((ele) => {
                                    <p key={idx}></p>;
                                    if (ele.status === "Avaiable") {
                                      return (
                                        <div className="dno">
                                          {ele.doorNo + ","}
                                        </div>
                                      );
                                    }
                                  })}
                              </td>
                              <td>
                                {/* <img
                                  className="img_icon_size log"
                                  src={require("../../static/images/info.png")}
                                  alt="Govt Cards"
                                  title={Val.shopDoorNo.map((e) => e.doorNo)}
                                /> */}
                                {Val.shopDoorNo &&
                                  Val.shopDoorNo.map((ele) => {
                                    <p key={idx}></p>;
                                    if (ele.status === "Acquired") {
                                      return (
                                        <div className="dno">
                                          {ele.label + ","}
                                        </div>
                                      );
                                    }
                                  })}
                              </td>
                              <td>{Val.tenantRentAmount}</td>
                              <td>{Val.tenantDepositAmt}</td>
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
                  {get_property_related_tenant &&
                  get_property_related_tenant.length !== 0 ? (
                    <Pagination
                      dataPerPage={dataPerPage}
                      totalData={get_property_related_tenant.length}
                      paginate={paginate}
                      currentPage={currentData}
                    />
                  ) : (
                    <Fragment />
                  )}
                </div>
                <div className="col-lg-6">
                  <p className="text-end h6">
                    No. of Property : {get_property_related_tenant.length}
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
  ParticularTenant,
  getAllSettings,
  getPropertyTenantData,
  getParticularProperty,
})(BuildingReport);
