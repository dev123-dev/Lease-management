import React, { useState, Fragment, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
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
} from "../../actions/tenants";
import { Form, Button } from "react-bootstrap";
import AddTenantDetails from "./AddTenantDetails";
import { Modal } from "react-bootstrap";
import EditTenantDetails from "./EditTenantDetails";
import Select from "react-select";
import Pagination from "../layout/Pagination";
import TenantLeaseTransfer from "./TenantLeaseTransfer";

const Tenant_Details = ({
  auth: { isAuthenticated, user, users },
  tenants: {
    particular_org_data,
    sortetenantdetails,
    particular_org_loc,
    allTenantSetting,
  },
  ParticularTenant,
  ParticularTenantFilter,
  getParticularOrg,
  getParticularProperty,
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
const onLeaseTransfer = ( Val) => {
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
  const [dno, SetDno] = useState([]);
  const onDelete = (id, Dno, Val) => {
    setId(id);

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

      deactiveTenantsDetails(reason);
      handleClose();
      setFreshPage(!freshpage);
      setCheckData([]);
    }
  };

  const [showadd, setShowadd] = useState(false);

  //pagination code
  const [currentData, setCurrentData] = useState(1);
  const [dataPerPage] = useState(8);
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
  };

  //propertywise

  const onchangePrperty = (e) => {
    SetPropertyName(e);
    console.log(e);
    ParticularTenantFilter({
      propertyname: e.label,
    });

    SetDoorNumber("");
    setselLoction("");
    SetTenantName("");
  };

  //namewise

  const onchangeTenantNames = (e) => {
    SetTenantName(e);
    ParticularTenantFilter({
      // LocationName: sellocation,
      // propertyname: PropertyName,
      // DoorNumber: doorNumber,
      tenantName: e.value,
    });
    SetPropertyName("");
    SetDoorNumber("");
    setselLoction("");
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
  let Dno = [];
  particular_org_data &&
    particular_org_data.map(
      (ele) =>
        ele.shopDoorNo &&
        ele.shopDoorNo.map((dno) =>
          Dno.push({
            label: dno.doorNo,
            value: dno.doorNo,
          })
        )
    );
  let TenantNames = [];
  let cntDeActiveTenant = 0;
  sortetenantdetails &&
    sortetenantdetails.map((ele) => {
      if (ele.tenantstatus !== "Active") cntDeActiveTenant++;
      TenantNames.push({
        label: ele.tenantName,
        value: ele._id,
      });
    });
  const csvTenantData = [
    [
      "Tenant Name",
      "Building Name",
      "Location",
      "Door No.",
      "Rent Amount",
      "leaseEndDate",
      "Firm Name",
      "Phone No",
      "Pan No",
      "Aadhar No.",
    ],
  ];

  sortetenantdetails.map((sortetenantdetails) => {
    var doorNo = sortetenantdetails.shopDoorNo.map((e) => e.value).join(", "); // Join door numbers into a single string
    var ED = sortetenantdetails.tenantLeaseEndDate.split(/\D/g);
    var tenantLeaseEndDate = [ED[2], ED[1], ED[0]].join("-");
    return csvTenantData.push([
      sortetenantdetails.tenantName,
      sortetenantdetails.BuildingName,
      sortetenantdetails.Location,
      doorNo,
      sortetenantdetails.tenantRentAmount,
      tenantLeaseEndDate,
      sortetenantdetails.tenantFirmName,
      sortetenantdetails.tenantPhone,
      sortetenantdetails.tenantPanNo,
      sortetenantdetails.tenantAdharNo,
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

  return !isAuthenticated || !user || !users ? (
    <Fragment></Fragment>
  ) : (
    <>
      <Fragment>
        <div className="col mt-sm-4 space ">
          <div className="row col-lg-12 col-md-12 col-sm-12 col-12 no_padding ">
            <div className="row mt-5 ">
              <div className="col-lg-2  col-sm-12 col-md-12 mt-3">
                <h2 className="heading_color  headsize  ml-4">
                  {" "}
                  Tenant Details
                </h2>
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
                  onChange={(e) => onchangeTenantNames(e)}
                ></Select>
              </div>

              <div className="col-lg-2  col-sm-12 col-md-12 text-end mt-4 pt-3">
                <Link to="/add-tenant-details">
                  <img
                    height="20px"
                    // onClick={() => setShowadd(true)}
                    src={require("../../static/images/add-icon.png")}
                    alt="Add Tenant"
                    title="Add Tenant"
                  />
                </Link>
                {myuser.usergroup === "Admin" ? (
                  <CSVLink data={csvTenantData}>
                    <img
                      className="img_icon_size log  ml-2"
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
                    //  onClick={() => refresh()}
                    src={require("../../static/images/print.png")}
                    alt="Print"
                    title="Print"
                  />
                </button>

                <img
                  className="ml-2"
                  style={{ cursor: "pointer" }}
                  height="20px"
                  onClick={() => refresh()}
                  src={require("../../static/images/refresh-icon.png")}
                  alt="refresh"
                  title="Refresh"
                />
              </div>
            </div>

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
                            {myuser.usergroup === "IT Department" ? (
                              <></>
                            ) : (
                              <>
                                {" "}
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
                                  {myuser.usergroup === "IT Department" ? (
                                    <></>
                                  ) : (
                                    <>
                                      {" "}
                                      {Val.tenantstatus === "Active" ? (
                                        <td className=" text-center">
                                          <Link to="/edit-tenant-details">
                                            <img
                                              className="Cursor  "
                                              onClick={() => onEdit(Val)}
                                              src={require("../../static/images/edit_icon.png")}
                                              alt="Edit"
                                              title="Edit"
                                            />{" "}
                                            &nbsp;
                                          </Link>
                                          <img
                                            className="Cursor "
                                            onClick={() =>
                                              onDelete(
                                                Val._id,
                                                Val.shopDoorNo,
                                                Val
                                              )
                                            }
                                            src={require("../../static/images/delete.png")}
                                            alt="Deactivate"
                                            title="Deactivate"
                                          />
                                           <img
                                            className="Cursor "
                                            onClick={() =>
                                              onLeaseTransfer(
                                                Val
                                              )
                                            }
                                            src={require("../../static/images/delete.png")}
                                            alt="lease transfer"
                                            title="lease transfer"
                                          />
                                        </td>
                                      ) : (
                                        <td></td>
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
                      {sortetenantdetails.length - cntDeActiveTenant}{" "}
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
                <TenantLeaseTransfer leaseTransferData={userData}/>
                {/* <RenewTenentAgreement
                  tenantsData={userData}
                  onReportModalChange={onReportModalChange}
                /> */}
              </Modal.Body>
            </Modal>
      {/* lease transfer end  */}
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
  deactiveTenantsDetails,
})(Tenant_Details);
