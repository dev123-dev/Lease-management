import React, { useState, Fragment, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { connect } from "react-redux";
import { CSVLink } from "react-csv";
import { useReactToPrint } from "react-to-print";
import {
  // ParticularTenant,
  getParticularOrg,
  getParticularProperty,
  getTenantDetails,
  ParticularTenantFilter,
  deactiveTenantsDetails,
  AddUserActivity,
  ParticularTenantFilterContactReport,
  TenantCount,
} from "../../actions/tenants";
import { Form, Button } from "react-bootstrap";
import AddTenantDetails from "./AddTenantDetails";
import { Modal } from "react-bootstrap";
import EditTenantDetails from "./EditTenantDetails";
import Select from "react-select";
import Pagination from "../layout/Pagination";
import TenantLeaseTransfer from "./TenantLeaseTransfer";
import ActivateTenantModal from "./ActivateTenantModal";
import leaseTransfer from "../../static/images/Leasetransfer.svg";
import Edit from "../../static/images/Edit.svg";
import Deactivate from "../../static/images/Deactivate.svg";
import Add from "../../static/images/Add.svg";
import Print from "../../static/images/Print.svg";
import Excel from "../../static/images/Microsoft Excel.svg";
import Refresh from "../../static/images/Refresh.svg";

const Tenant_Details = ({
  auth: { isAuthenticated, user, users },
  tenants: {
    particular_org_data,
    sortetenantdetails,
    tenantdetailscount,
    particular_org_loc,
    allTenantSetting,
    sortContactReport,
  },
  ParticularTenant,
  AddUserActivity,
  TenantCount,
  ParticularTenantFilter,
  getParticularOrg,
  getParticularProperty,
  ParticularTenantFilterContactReport,
  getTenantDetails,
  deactiveTenantsDetails,
  getAllSettings,
}) => {
  const [freshpage, setFreshPage] = useState(true);
  const checkboxRef = useRef(null);
  const myuser = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    // ParticularTenant();
    ParticularTenantFilter();
    TenantCount();

    ParticularTenantFilterContactReport();
    getParticularOrg({ OrganizationId: user && user.OrganizationId });
    getParticularProperty({ OrganizationId: user && user.OrganizationId });

    // getParticularOrg();
    // getParticularProperty();

    // getAllSettings({
    //   OrganizationId: myuser && myuser.OrganizationId,
    //   userId: myuser && myuser._id,
    // });
    fun();
  }, [freshpage]);

  // useEffect(() => {
  //   ParticularTenant({ OrganizationId: user && user.OrganizationId });
  //   getParticularOrg({ OrganizationId: user && user.OrganizationId });
  //   getParticularProperty({ OrganizationId: user && user.OrganizationId });

  //   // getAllSettings({
  //   //   OrganizationId: myuser && myuser.OrganizationId,
  //   //   userId: myuser && myuser._id,
  //   // });
  //   fun();
  // }, []);
  const [doorNumber, SetDoorNumber] = useState("");
  const [tenantName, SetTenantName] = useState("");
  const [tenantStatus, SetTenantStatus] = useState("");
  const [PropertyName, SetPropertyName] = useState("");
  const [sellocation, setselLoction] = useState(null);
  const [location, setlocation] = useState([]);
  const Loc = [];
  const { Location } = particular_org_loc[0];

  const fun = () => {
    getParticularOrg({ OrganizationId: user && user.OrganizationId });
    particular_org_loc[0] &&
      Location.map((ele) => {
        Loc.push({
          label: ele,
          value: ele,
        });
        setlocation(Loc);
      });
  };

  // let output = sortetenantdetails.filter(
  //   (item) =>
  //     item.shopDoorNo &&
  //     !item.shopDoorNo.every((nameItem) => nameItem.status !== "Acquired")
  // );

  //modal for lease transfer

  const [userData, setUserData] = useState(null);

  const [showLeaseTranferModal, setshowLeaseTranferModal] = useState(false);
  const handleLeaseTranferModalClose = () => setshowLeaseTranferModal(false);
  const onLeaseTransfer = (Val) => {
    setshowLeaseTranferModal(true);
    setUserData(Val);
    // setId(id);

    // setDeactiveThisBiuldingID(Val.BuildingId);
    // if (Dno.length >= 1) {
    //   SetDno(Dno);
    //   SetDoornumber(true);
    // } else {
    //   SetDno(Dno);
    //   handleShow();
    // }
  };

  const [activateData, setActivateData] = useState(null);

  const [showActivateModal, setshowActivateModal] = useState(false);
  const handleActivateTenantModalClose = () => setshowActivateModal(false);
  const onActivate = (val) => {
    setActivateData(val);
    setshowActivateModal(true);
  };

  // Modal for Deactivation
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [selectDno, SetDoornumber] = useState();
  const handleShowDno = () => SetDoornumber(false);
  const [DeactiveThisBiuldingID, setDeactiveThisBiuldingID] = useState("");
  const handleCloseDno = () => {
    SetDoornumber(false);
    setCheckData([]);
  };

  const [tId, setId] = useState("");
  const [tName, settname] = useState("");
  const [dno, SetDno] = useState([]);
  const onDelete = (id, Dno, Val) => {
    setId(id);
    settname(Val.tenantName);

    setDeactiveThisBiuldingID(Val.BuildingId);
    if (Dno.length >= 1) {
      SetDno(Dno);
      SetDoornumber(true);
    } else {
      SetDno(Dno);
      handleShow();
    }
  };
  // Edit model state
  const [EditTenant, setEditTenant] = useState(null);

  const [showEditModal, setShowEditModal] = useState(false);
  const onEdit = (val) => {
    getTenantDetails(val);
    setEditTenant(val);
  };

  // const [showEditModal, setShowEditModal] = useState(false);
  const handleEditModalClose = () => setShowEditModal(false);
  const handleOpen = () => setShowEditModal(true);

  const [formData, setFormData] = useState({
    deactive_reason: "",
    DoorNumber: "",
    isSubmitted: false,
  });
  const { deactive_reason } = formData;

  const onInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const [selectedDoorNumber, SetSelectedDoorNumber] = useState([]);
  const [isChecked, setIsChecked] = useState(false);
  const handleOnChange = () => {
    setIsChecked(!isChecked);
  };

  const [checkData, setCheckData] = useState([]);
  const HandelCheck = (e) => {
    var updatedlist = [...checkData];
    if (e.target.checked) {
      updatedlist = [...checkData, { label: e.target.value }];
    } else {
      updatedlist.splice(checkData.indexOf(e.target.value), 1);
    }
    setCheckData(updatedlist);
  };

  const onchangeLocation = (loc) => {
    setselLoction(loc);
    ParticularTenantFilter({
      LocationName: loc.label,
    });
    SetDoorNumber("");
  };

  const onDeactivateall = (e) => {
    e.preventDefault();
    SetDoornumber(false);
    const reason = {
      OrganizationId: user && user.OrganizationId,
      Dno: checkData.length !== 0 ? checkData : dno,
      deactive_reason: deactive_reason,
      tid: tId,
      isSubmitted: "true",
      BiuldingID: DeactiveThisBiuldingID,
    };
    const AdduserActivity = {
      userId: user && user._id,
      userName: user && user.username,
      Menu: "Tenant",
      Operation: "Deactive",
      NameId: tId,
      Name: tName,
      Dno: checkData.length !== 0 ? checkData : dno,
      OrganizationId: user.OrganizationId,
      expireAt: new Date().getTime() + 80,
    };
    AddUserActivity(AdduserActivity);

    deactiveTenantsDetails(reason);
    handleClose();
    setFreshPage(!freshpage);
    setCheckData([]);
  };
  const [Error, setError] = useState("");
  const onDeactivate = (e) => {
    e.preventDefault();
    if (checkData.length == 0) {
      setError("Please Select DoorNumber");
      //alert();
    } else {
      SetDoornumber(false);
      const reason = {
        OrganizationId: user && user.OrganizationId,
        Dno: checkData.length !== 0 ? checkData : dno,
        deactive_reason: deactive_reason,
        tid: tId,
        isSubmitted: "true",
        BiuldingID: DeactiveThisBiuldingID,
      };
      const AdduserActivity = {
        userId: user && user._id,
        userName: user && user.username,
        Menu: "Tenant",
        Operation: "Deactive",
        Dno: checkData.length !== 0 ? checkData : dno,
        NameId: tId,
        Name: tName,
        OrganizationId: user.OrganizationId,
        expireAt: new Date().getTime() + 80,
      };
      AddUserActivity(AdduserActivity);

      deactiveTenantsDetails(reason);
      handleClose();
      setFreshPage(!freshpage);
      setCheckData([]);
    }
  };

  const [showadd, setShowadd] = useState(false);

  const location1 = useLocation();
  const { currentPagefromedit } = location1.state || { currentPagefromedit: 1 };

  //pagination code
  const [currentData, setCurrentData] = useState(
    currentPagefromedit ? currentPagefromedit : 1
  );
  const [dataPerPage] = useState(10);
  //Get Current Data
  const indexOfLastData = currentData * dataPerPage;
  const indexOfFirstData = indexOfLastData - dataPerPage;
  const currentDatas =
    sortetenantdetails &&
    sortetenantdetails.slice(indexOfFirstData, indexOfLastData);
  const paginate = (nmbr) => {
    //nmbr is page  number
    setCurrentData(nmbr);
  };
  const refresh = () => {
    // ParticularTenant("");
    ParticularTenantFilter("");
    getParticularOrg("");
    getParticularProperty("");
    fun();
    SetDoorNumber("");
    setselLoction(null);
    SetTenantName("");
    SetPropertyName("");
    SetTenantStatus("");
    setCurrentData(1);
  };

  const onchangeDoorNumberChange = (e) => {
    SetDoorNumber(e);

    ParticularTenantFilter({
      // LocationName: sellocation,
      DoorNumber: e.value,
    });
    setselLoction(null);
    SetTenantName("");
    SetPropertyName("");
    SetTenantStatus("");
  };

  //propertywise

  const onchangePrperty = (e) => {
    SetPropertyName(e);

    ParticularTenantFilter({
      propertyname: e.label,
    });

    SetDoorNumber("");
    setselLoction("");
    SetTenantName("");
    SetTenantStatus("");
  };

  //namewise

  // const onchangeTenantNames = (e) => {
  //   SetTenantName(e);

  //   ParticularTenantFilter({
  //     // LocationName: sellocation,
  //     // propertyname: PropertyName,
  //     // DoorNumber: doorNumber,
  //     tenantName: e.label,
  //   });
  //   SetPropertyName("");
  //   SetDoorNumber("");
  //   setselLoction("");
  //   SetTenantStatus("");
  // };
  const onchangeTenantNames = (selectedOption) => {
    SetTenantName(selectedOption);
    ParticularTenantFilter({
      tenantName: selectedOption.value,
    });
    SetPropertyName("");
    SetDoorNumber("");
    setselLoction("");
    SetTenantStatus("");
  };

  const onchangeTenantStatus = (e) => {
    SetTenantStatus(e);
    ParticularTenantFilter({
      tenantStatus: e.value,
    });
    SetPropertyName("");
    SetDoorNumber("");
    setselLoction("");
    SetTenantName("");
  };

  //propertywise
  const propertyname = [];
  particular_org_data &&
    particular_org_data.map((ele) =>
      propertyname.push({
        label: ele.BuildingName,
        value: ele.BuildingId,
      })
    );
  // let Dno = [];
  // particular_org_data &&
  //   particular_org_data.map(
  //     (ele) =>
  //       ele.shopDoorNo &&
  //       ele.shopDoorNo.map((dno) => {
  //         console.log("dno", dno);
  //         Dno.push({
  //           label: dno.doorNo,
  //           value: dno.doorNo,
  //         });
  //       })
  //   );
  let Dno = [];
  particular_org_data &&
    particular_org_data.forEach((ele) => {
      ele.shopDoorNo &&
        ele.shopDoorNo.forEach((dno) => {
          if (dno.status === "Acquired") {
            Dno.push({
              label: dno.doorNo,
              value: dno.doorNo,
            });
          }
        });
    });

  let TenantNames = [];
  let cntDeActiveTenant = 0;
  tenantdetailscount &&
    tenantdetailscount.map((ele) => {
      if (ele.tenantstatus !== "Active") cntDeActiveTenant++;
      TenantNames.push({
        label: ele.tenantName,
        value: ele._id,
      });
    });

  let Tenantstatus = [
    { label: "Active", value: "Active" },
    { label: "Deactive", value: "Deactive" },
  ];
  const csvTenantData = [
    [
      "Tenant Name",
      "Building Name",
      "Location",
      "Door No.",
      "File No",
      "Rent Amount",
      "leaseStartDate",
      "leaseEndDate",
      "Firm Name",
      "Phone No",
      // "Pan No",
      // "Aadhar No.",
      "Tenant Status",
    ],
  ];

  sortetenantdetails.map((sortetenantdetails) => {
    var doorNo = sortetenantdetails.shopDoorNo.map((e) => e.value).join(", "); // Join door numbers into a single string
    var ED = sortetenantdetails.tenantLeaseEndDate.split(/\D/g);
    var tenantLeaseEndDate = [ED[2], ED[1], ED[0]].join("-");
    var ED2 = sortetenantdetails.tenantLeaseStartDate.split(/\D/g);
    var tenantLeaseStartDate = [ED2[2], ED2[1], ED2[0]].join("-");
    return csvTenantData.push([
      sortetenantdetails.tenantName,
      sortetenantdetails.BuildingName,
      sortetenantdetails.Location,
      doorNo,
      sortetenantdetails.tenantFileNo,
      sortetenantdetails.tenantRentAmount,
      tenantLeaseStartDate,
      tenantLeaseEndDate,
      sortetenantdetails.tenantFirmName,
      sortetenantdetails.tenantPhone,
      // sortetenantdetails.tenantPanNo,
      // sortetenantdetails.tenantAdharNo,
      sortetenantdetails.tenantstatus,
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
  const [showSuccess, setshowSuccess] = useState(false);
  const onCloseSuccess = () => {
    setshowSuccess(false);
  };

  const [transferredTo, setTransferredto] = useState("");
  const handleDataFromLeaseTransfer = (data, data2) => {
    if (data === "true") {
      setshowSuccess(true);
      setTransferredto(data2);
    }
  };
  useEffect(() => {
    var timer = setTimeout(() => {
      setshowSuccess(false);
    }, 2000);

    return () => {
      clearTimeout(timer);
    };
  }, [handleDataFromLeaseTransfer]);

  return !isAuthenticated || !user || !users ? (
    <Fragment></Fragment>
  ) : (
    <>
      <Fragment>
        <div className="col mt-sm-4 space ">
          <div className="row col-lg-12 col-md-12 col-sm-12 col-12 no_padding ">
            <div className="row mt-5 ">
              <div className="col-lg-2  col-sm-12 col-md-12 mt-3">
                <h2 className="heading_color headsize ml-4"> Tenant Details</h2>
              </div>
              <div
                className="col-lg-2 col-sm-12 col-md-12"
                style={{
                  position: "relative",
                  top: "10px",
                }}
              >
                <Select
                  className="dropdown text-left mt-sm-3"
                  placeholder="Location"
                  name="location"
                  options={location}
                  value={sellocation}
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
              <div
                className="col-lg-2 col-sm-12 col-md-12"
                style={{
                  position: "relative",
                  top: "10px",
                }}
              >
                <Select
                  className="dropdown text-left mt-sm-3"
                  placeholder="Door No"
                  name="doorNumber"
                  options={Dno}
                  value={doorNumber}
                  onChange={(e) => onchangeDoorNumberChange(e)}
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

              <div
                className="col-lg-2 col-sm-12 col-md-12"
                style={{
                  position: "relative",
                  top: "10px",
                }}
              >
                <Select
                  className="dropdown text-left mt-sm-3"
                  placeholder="Property"
                  name="PropertyName"
                  options={propertyname}
                  value={PropertyName}
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
                  onChange={(e) => onchangePrperty(e)}
                ></Select>
              </div>
              <div
                className="col-lg-2 col-sm-12 col-md-12"
                style={{
                  position: "relative",
                  top: "10px",
                }}
              >
                <Select
                  className="dropdown text-left mt-sm-3"
                  placeholder="Name"
                  name="tenantName"
                  options={TenantNames}
                  value={tenantName}
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
                  onChange={(e) => onchangeTenantNames(e)}
                ></Select>
              </div>
              {/* <div
                className="col-lg-2 col-sm-12 col-md-12"
                style={{
                  position: "relative",
                  top: "10px",
                }}
              >
                <Select
                  className="dropdown text-left mt-sm-3"
                  placeholder="Status"
                  name="tenantstatus"
                  options={Tenantstatus}
                  value={tenantStatus}
                  onChange={(e) => onchangeTenantStatus(e)}
                ></Select>
              </div> */}

              <div className="col-lg-2  col-sm-12 col-md-12 text-end  pt-2 iconspace">
                <button style={{ border: "none" }}>
                  {" "}
                  <Link to="/add-tenant-details">
                    <img
                      src={Add}
                      alt="Add Tenant"
                      title="Add Tenant"
                      className="iconSize"
                      style={{ cursor: "pointer" }}
                    />
                  </Link>
                </button>
                {myuser.usergroup === "Admin" ? (
                  <CSVLink data={csvTenantData} filename={"Tenant-Details.csv"}>
                    <img
                      src={Excel}
                      alt="Excel-Export"
                      title="Excel-Export"
                      className="iconSize"
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

                    handlePrint();
                  }}
                >
                  <img
                    //  onClick={() => refresh()}
                    src={Print}
                    alt="Print"
                    title="Print"
                    className="iconSize"
                  />
                </button>

                <img
                  style={{ cursor: "pointer" }}
                  onClick={() => refresh()}
                  src={Refresh}
                  className="iconSize"
                  alt="refresh"
                  title="Refresh"
                />
              </div>
            </div>
            {/* <div className="col-lg-2 col-md-2 col-sm-4 mt-5"> */}
            {/* <h2
              className="heading_color headsize ml-4"
              style={{ marginTop: "70px" }}
            >
              Tenant Details
            </h2> */}
            {/* </div> */}
            {/* <div className="row col-lg-12 ml-2">
              <div className="col-lg-2 col-md-2 col-sm-4 ">
                <Select
                  className="dropdown text-left "
                  placeholder="Location"
                  name="location"
                  options={location}
                  value={sellocation}
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
              <div className="col-lg-2 col-md-2 col-sm-4">
                <Select
                  className="dropdown text-left "
                  placeholder="Door No"
                  name="doorNumber"
                  options={Dno}
                  value={doorNumber}
                  onChange={(e) => onchangeDoorNumberChange(e)}
                ></Select>
              </div>
              <div className="col-lg-2 col-md-2 col-sm-4 ">
                <Select
                  className="dropdown text-left "
                  placeholder="Property"
                  name="PropertyName"
                  options={propertyname}
                  value={PropertyName}
                  onChange={(e) => onchangePrperty(e)}
                ></Select>
              </div>
              <div className="col-lg-2 col-md-2 col-sm-4 ">
                <Select
                  className="dropdown text-left"
                  placeholder="Name"
                  name="tenantName"
                  options={TenantNames}
                  value={tenantName}
                  onChange={(e) => onchangeTenantNames(e)}
                ></Select>
              </div>
              <div className="col-lg-2 col-md-2 col-sm-4 ">
                <Select
                  className="dropdown text-left "
                  placeholder="Status"
                  name="tenantstatus"
                  options={Tenantstatus}
                  value={tenantStatus}
                  onChange={(e) => onchangeTenantStatus(e)}
                ></Select>
              </div>
              <div className="col-lg-2 col-md-1 col-sm-2 pt-2 text-right">
                <Link to="/add-tenant-details">
                  <img
                    height="20px"
                    src={require("../../static/images/add-icon.png")}
                    alt="Add Tenant"
                    title="Add Tenant"
                  />
                </Link>
                {myuser.usergroup === "Admin" ? (
                  <CSVLink data={csvTenantData}>
                    <img
                      className="img_icon_size log ml-2"
                      src={require("../../static/images/excel_icon.png")}
                      alt="Excel-Export"
                      style={{ cursor: "pointer" }}
                      height="20px"
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

                    handlePrint();
                  }}
                >
                  <img
                    height="20px"
                    src={require("../../static/images/print.png")}
                    alt="Print"
                    title="Print"
                  />
                </button>

                <img
                  className="mr-1"
                  style={{ cursor: "pointer" }}
                  height="20px"
                  onClick={() => refresh()}
                  src={require("../../static/images/refresh-icon.png")}
                  alt="refresh"
                  title="Refresh"
                />
              </div>
            </div> */}
            <div className="container-fluid d-flex align-items-center justify-content-center ">
              <div className="col">
                {/* <div className="refreshbtn"></div> */}
                <div ref={componentRef}>
                  <div className="row">
                    <div className="col-lg-1  col-sm-12 col-md-12"></div>

                    <div className="body-inner no-padding table-responsive">
                      <table
                        className="table table-bordered table-striped table-hover mt-1  "
                        id="datatable2"
                      >
                        <thead>
                          <tr>
                            <th style={showPrint}>Name</th>
                            <th style={showPrint}>Building Name</th>

                            <th style={showPrint}>Door No</th>
                            <th style={showPrint}>File No</th>
                            <th style={showPrint}>Location</th>
                            <th style={showPrint}>Phone Number</th>
                            <th style={showPrint}>Expiry Date</th>
                            <th style={showPrint}>Rent Amount</th>
                            <th style={showPrint}>Tenant Status</th>
                            {myuser.usergroup === "IT Department" ? (
                              <></>
                            ) : (
                              <>
                                <th style={showPrint}>Operation</th>
                              </>
                            )}
                          </tr>
                        </thead>
                        <tbody className="text-center  ">
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

                              // if (Val.tenantstatus === "Active") {
                              return (
                                <tr key={idx}>
                                  {Val.tenantstatus === "Deactive" ? (
                                    <td style={{ backgroundColor: "#dda6a6" }}>
                                      {Val.tenantName}
                                    </td>
                                  ) : (
                                    <td>{Val.tenantName}</td>
                                  )}

                                  <td>{Val.BuildingName}</td>
                                  <td>
                                    {Val.shopDoorNo.map((ele) => {
                                      <p key={idx}></p>;
                                      if (
                                        ele.status === "Avaiable" ||
                                        ele.status === "Acquired"
                                      ) {
                                        return <>{ele.label + ","}</>;
                                      } else {
                                        return <>{""}</>;
                                      }
                                    })}
                                  </td>
                                  <td>{Val.tenantFileNo}</td>
                                  <td>{Val.Location}</td>
                                  <td>{Val.tenantPhone}</td>
                                  <td>{tenant}</td>
                                  <td>{Val.tenantRentAmount}</td>
                                  <td>{Val.tenantstatus}</td>
                                  {myuser.usergroup === "IT Department" ? (
                                    <></>
                                  ) : (
                                    <>
                                      {" "}
                                      {Val.tenantstatus === "Active" ? (
                                        // <td className=" text-center">
                                        //   <Link to="/edit-tenant-details">
                                        //     <img
                                        //       className="Cursor  "
                                        //       onClick={() => onEdit(Val)}
                                        //       src={Edit}
                                        //       alt="Edit"
                                        //       title="Edit"
                                        //     />{" "}
                                        //     &nbsp;
                                        //   </Link>
                                        //   <img
                                        //     className="Cursor "
                                        //     onClick={() =>
                                        //       onDelete(
                                        //         Val._id,
                                        //         Val.shopDoorNo,
                                        //         Val
                                        //       )
                                        //     }
                                        //     src={Deactivate}
                                        //     alt="Deactivate"
                                        //     title="Deactivate"
                                        //   />
                                        //   &nbsp;
                                        //   {Val.shopDoorNo.length === 0 ? (
                                        //     <></>
                                        //   ) : (
                                        //     <img
                                        //       className="Cursor "
                                        //       onClick={() =>
                                        //         onLeaseTransfer(Val)
                                        //       }
                                        //       height="25px"
                                        //       width="25px"
                                        //       src={leaseTransfer}
                                        //       alt="lease transfer"
                                        //       title="Lease Transfer"
                                        //     />
                                        //   )}
                                        // </td>
                                        <td className="text-center">
                                          {/* <div className="icon-container"> */}
                                          <Link
                                            to={{
                                              pathname: "/edit-tenant-details",
                                              state: {
                                                currentPage: currentData,
                                              },
                                            }}
                                          >
                                            <img
                                              onClick={() => onEdit(Val)}
                                              src={Edit}
                                              style={{ cursor: "pointer" }}
                                              alt="Edit"
                                              title="Edit"
                                              className="iconSize ml-1"
                                            />
                                          </Link>
                                          <img
                                            onClick={() =>
                                              onDelete(
                                                Val._id,
                                                Val.shopDoorNo,
                                                Val
                                              )
                                            }
                                            src={Deactivate}
                                            alt="Deactivate"
                                            style={{ cursor: "pointer" }}
                                            title="Deactivate"
                                            className="iconSize ml-1"
                                          />
                                          {Val.shopDoorNo.length !== 0 && (
                                            <img
                                              onClick={() =>
                                                onLeaseTransfer(Val)
                                              }
                                              src={leaseTransfer}
                                              alt="lease transfer"
                                              title="Lease Transfer"
                                              className="iconSize ml-1"
                                              style={{ cursor: "pointer" }}
                                            />
                                          )}
                                          {/* </div> */}
                                        </td>
                                      ) : (
                                        <td>
                                          <button
                                            className="activebtn"
                                            title="Activate Tenant"
                                            // style={{
                                            //   backgroundColor: "#095a4a",
                                            //   color: "white",
                                            // }}
                                            // onClick=()=>{onActivate(Val)}
                                            onClick={() => {
                                              onActivate(Val);
                                            }}
                                          >
                                            Activate
                                          </button>
                                        </td>
                                      )}
                                    </>
                                  )}
                                </tr>
                              );
                              // }
                            })}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-lg-6 col-md-6 col-sm-11 col-11 no_padding">
                    {sortetenantdetails && sortetenantdetails.length !== 0 ? (
                      <Pagination
                        dataPerPage={dataPerPage}
                        totalData={sortetenantdetails.length}
                        paginate={paginate}
                        currentPage={currentData}
                      />
                    ) : (
                      <Fragment />
                    )}
                  </div>
                  {/* <div className="col-lg-6 col-md-6 col-sm-11 col-11 align_right">
                    <label>No.of Tenants: {tenantCount.length}</label>
                  </div> */}
                  <div className="col-lg-6  col-sm-12 col-md-12">
                    <p
                      className="text-end h6 font-weight-bold"
                      style={{ color: "#095a4a" }}
                    >
                      Active Tenants:{" "}
                      {tenantdetailscount.length - cntDeActiveTenant}{" "}
                      &nbsp;&nbsp;&nbsp;
                      <span style={{ color: "red" }}>
                        Deactive Tenants: {cntDeActiveTenant}
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* add model start*/}
        <Modal
          show={showadd}
          backdrop="static"
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <AddTenantDetails
            setShowadd={setShowadd}
            setFreshPage={setFreshPage}
            freshpage={freshpage}
          />
        </Modal>
        {/* add model end */}

        {/* Edit end*/}
      </Fragment>

      {/* deactivate all */}
      <Modal show={show} centered>
        <form
          onSubmit={(e) => {
            onDeactivateall(e);
          }}
        >
          <Modal.Header className="confirmbox-heading">
            {/* <div className="col-lg-11 ">
              <div className="modal-title">
                <h3 style={{
                  color: "white",
                }} className="text-center mr-3 ">DEACTIVATE</h3>
              </div>
            </div>
            <div className="close">
              <img
                src={require("../../static/images/close.png")}
                alt="X"
                style={{ height: "20px", width: "20px" }}
               
              />
            </div> */}

            <div className="col-lg-10  col-sm-12 col-md-12">
              <div className="ml-4">
                <h3
                  style={{
                    color: "white",
                  }}
                  className=" text-center ml-4"
                >
                  DEACTIVATE
                </h3>
              </div>
            </div>
            <div className="col-lg-2  col-sm-12 col-md-12 ">
              <button onClick={handleClose} className="close">
                <img
                  src={require("../../static/images/close.png")}
                  alt="X"
                  style={{ height: "20px", width: "20px", marginLeft: "-12px" }}
                />
              </button>
            </div>
          </Modal.Header>

          <Modal.Body>
            {/* <Form>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              > */}
            <div className="h5 despace">Reason For Deactivating *</div>
            <textarea
              rows="2"
              name="deactive_reason"
              value={deactive_reason}
              onChange={(e) => onInputChange(e)}
              style={{ width: "100%" }}
              id="org_reason"
              className="form-control "
              required
            ></textarea>
            <div>Are you sure You Want To Deactivate..?</div>
            {/* </Form.Group>
            </Form> */}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" type="submit" id="deactivebtn">
              <b>Deactive</b>
            </Button>
          </Modal.Footer>
        </form>
      </Modal>

      <Modal show={selectDno} centered>
        <form onSubmit={onDeactivate}>
          <Modal.Header className="confirmbox-heading">
            <div className="col-lg-10  col-sm-12 col-md-12">
              <div className="ml-4">
                <h3
                  style={{
                    color: "white",
                  }}
                  className="text-center  "
                >
                  DEACTIVATE
                </h3>
              </div>
            </div>
            <div className="col-lg-2  col-sm-12 col-md-12">
              <button onClick={handleCloseDno} className="close">
                <img
                  src={require("../../static/images/close.png")}
                  alt="X"
                  style={{ height: "20px", width: "20px", marginLeft: "-12px" }}
                />
              </button>
            </div>

            {/* <div className="col-lg-11 ">
              <div className="modal-title ">
                <h3 style={{
                  color: "white",
                }} className="text-center mr-3 ">DEACTIVATE</h3>
              </div>
            </div>
            <div className="close">
              <img
                src={require("../../static/images/close.png")}
                alt="X"
                style={{ height: "20px", width: "20px" }}
               
              />
            </div> */}
          </Modal.Header>

          <Modal.Body>
            {/* <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1"> */}
            <div className="text-dark">Choose Door No for Deactivate</div>

            <div className="checkbox mx-5">
              {dno.map((ele, index) => {
                if (ele.status === "Acquired" || ele.status === "Avaiable") {
                  return (
                    <>
                      <input
                        type="checkbox"
                        id="checkbox"
                        value={ele.label}
                        onChange={(e) => HandelCheck(e)}
                      />{" "}
                      &nbsp;
                      <label for="doorNumber">{ele.label}&nbsp; &nbsp;</label>
                    </>
                  );
                }
              })}
            </div>
            <div className=" despace pt-3">Reason For Deactivating *</div>
            <textarea
              rows="2"
              name="deactive_reason"
              value={deactive_reason}
              onChange={(e) => onInputChange(e)}
              autoFocus
              id="org_reason"
              className="form-control "
              required
            ></textarea>
            <div>Are you sure You Want To Deactivate..?</div>
            <div style={{ color: "red" }}>{Error}</div>
            {/* </Form.Group>
          </Form> */}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" id="deactivebtn" type="submit">
              <b>Deactive</b>
            </Button>
          </Modal.Footer>
        </form>
      </Modal>
      {/* deactivate end */}

      {/* lease transfer start  */}

      <Modal
        show={showLeaseTranferModal}
        backdrop="static"
        keyboard={false}
        // size="lg"
        dialogClassName="my-modal2"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header className="confirmbox-heading">
          <div className="col-lg-10  col-sm-12 col-md-12">
            <h3
              style={{
                color: "white",
              }}
            >
              Lease Transfer
            </h3>
          </div>
          <div className="col-lg-2  col-sm-12 col-md-12">
            <button onClick={handleLeaseTranferModalClose} className="close">
              <img
                src={require("../../static/images/close.png")}
                alt="X"
                style={{ height: "20px", width: "20px" }}
              />
            </button>
          </div>
        </Modal.Header>
        <Modal.Body>
          <TenantLeaseTransfer
            leaseTransferData={userData}
            ModalClose={handleLeaseTranferModalClose}
            sendDataToParent={handleDataFromLeaseTransfer}
          />
          {/* <RenewTenentAgreement
                  tenantsData={userData}
                  onReportModalChange={onReportModalChange}
                /> */}
        </Modal.Body>
      </Modal>
      {/* lease transfer end  */}

      {/* Activate tenant */}
      <Modal
        show={showActivateModal}
        backdrop="static"
        keyboard={false}
        size="xl"
        dialogClassName="my-modal2"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header className="confirmbox-heading">
          <div className="col-lg-10  col-sm-12 col-md-12">
            <h3
              style={{
                color: "white",
              }}
            >
              Activate Tenant
            </h3>
          </div>
          <div className="col-lg-2  col-sm-12 col-md-12">
            <button onClick={handleActivateTenantModalClose} className="close">
              <img
                src={require("../../static/images/close.png")}
                alt="X"
                style={{ height: "20px", width: "20px" }}
              />
            </button>
          </div>
        </Modal.Header>
        <Modal.Body>
          <ActivateTenantModal
            ActivateTenant={activateData}
            ModalClose={handleActivateTenantModalClose}
          />
        </Modal.Body>
      </Modal>
      {/* 
      SUCCESS MODAL */}

      {/* <Modal
        show={showSuccess}
        backdrop="static"
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        onHide={onCloseSuccess}
      >
        <Modal.Header
          style={{ backgroundColor: "#28a745", color: "white" }}
          closeButton
        >
          <Modal.Title>Success</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p
            style={{ color: "#28a745", textAlign: "center", fontSize: "18px" }}
          >
            Transferred Successfully
          </p>
        </Modal.Body>
      </Modal> */}
      <Modal
        show={showSuccess}
        backdrop="static"
        size="md" // Set size to small
        aria-labelledby="contained-modal-title-vcenter"
        onHide={onCloseSuccess}
        className="slide-fade-in"
      >
        <div className="float-right mr-3">
          <button className="close-button " onClick={onCloseSuccess}>
            &times;
          </button>
        </div>
        <Modal.Body>
          <h2>Success</h2>
          <p>Lease Transferred Successfully to {transferredTo}</p>
        </Modal.Body>
      </Modal>
    </>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  tenants: state.tenants,
});

export default connect(mapStateToProps, {
  // ParticularTenant,
  ParticularTenantFilter,
  getParticularOrg,
  getParticularProperty,
  getTenantDetails,
  AddUserActivity,
  TenantCount,
  deactiveTenantsDetails,
  ParticularTenantFilterContactReport,
})(Tenant_Details);
