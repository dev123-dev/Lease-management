import React, { useState, Fragment, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import {
  ParticularTenant,
  getParticularOrg,
  getParticularProperty,
  getTenantDetails,
  deactiveTenantsDetails,
} from "../../actions/tenants";
import { Form, Button } from "react-bootstrap";
import AddTenantDetails from "./AddTenantDetails";
import { Modal } from "react-bootstrap";
import EditTenantDetails from "./EditTenantDetails";
import Select from "react-select";
import Pagination from "../layout/Pagination";

const Tenant_Details = ({
  auth: { isAuthenticated, user, users },
  tenants: {
    particular_org_data,
    get_particular_org_tenant,
    particular_org_loc,
    allTenantSetting,
  },
  ParticularTenant,
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
    ParticularTenant({ OrganizationId: user && user.OrganizationId });
    getParticularOrg({ OrganizationId: user && user.OrganizationId });
    getParticularProperty({ OrganizationId: user && user.OrganizationId });
    // getAllSettings({
    //   OrganizationId: myuser && myuser.OrganizationId,
    //   userId: myuser && myuser._id,
    // });
    fun();
  }, [freshpage]);

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

  let output = get_particular_org_tenant.filter(
    (item) =>
      item.shopDoorNo &&
      !item.shopDoorNo.every((nameItem) => nameItem.status !== "Acquired")
  );

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
    console.log("whole find cil", Val.BuildingId);
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
    ParticularTenant({
      OrganizationId: user && user.OrganizationId,
      LocationName: loc.value,
    });
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
    console.log("ok ", reason);
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
      console.log("ok ", reason);
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
    get_particular_org_tenant &&
    get_particular_org_tenant.slice(indexOfFirstData, indexOfLastData);
  const paginate = (nmbr) => {
    setCurrentData(nmbr);
  };
  const refresh = () => {
    ParticularTenant({ OrganizationId: user && user.OrganizationId });
    getParticularOrg({ OrganizationId: user && user.OrganizationId });
    getParticularProperty({ OrganizationId: user && user.OrganizationId });
    fun();
    setselLoction(null);
  };

  const tenantCount = currentDatas.filter((ele) => {
    if (ele.tenantstatus === "Active") {
      return ele;
    }
  });

  return !isAuthenticated || !user || !users ? (
    <Fragment></Fragment>
  ) : (
    <>
      <Fragment>
        <div className="col mt-sm-4 space ">
          <div className="row col-lg-12 col-md-12 col-sm-12 col-12 no_padding ">
            <div className="row mt-5 ">
              <div className="col-lg-5 mt-3"> 
              <h2
               
                className="heading_color  headsize  ml-4"
              >

                {" "}
                Tenant Details

              </h2>
              </div>
              <div className="col-lg-5"  style={{
                  position:"relative",
                  top:"10px"
                  
                }}>
                <Select
                className="dropdown text-left mt-sm-3"
               
                placeholder="Search-Location"
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
              ></Select></div>
              <div className="col-lg-2 text-end mt-sm-5">
                <Link to="/add-tenant-details">
                  <img
                    height="20px"
                    // onClick={() => setShowadd(true)}
                    src={require("../../static/images/add-icon.png")}
                    alt="Add Tenant"
                    title="Add Tenant"
                  />
                </Link>
                <img
                  className="ml-2"
                  style={{cursor:"pointer"}}
                  height="20px"
                  onClick={() => refresh()}
                  src={require("../../static/images/refresh-icon.png")}
                  alt="refresh"
                  title="refresh"
                /></div>
            </div>




            <div className="container-fluid d-flex align-items-center justify-content-center ">
              <div className="col">

                {/* <div className="refreshbtn"></div> */}

                <div className="row">
                  <div className="col-lg-1"></div>

                  <div className="body-inner no-padding table-responsive">
                    <table
                      className="table table-bordered table-striped table-hover  "
                      id="datatable2"
                    >
                      <thead>
                        <tr>
                          <th>Name</th>
                          <th>Building Name</th>
                          <th>Door No</th>
                          <th>File No</th>
                          <th>Location</th>
                          <th>Phone Number</th>
                          <th>Expiry Date</th>
                          <th>Rent Amount</th>
                          <th>Operation</th>
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

                            if (Val.tenantstatus === "Active") {
                              return (
                                <tr key={idx}>
                                  <td>{Val.tenantName}</td>
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
                                          onDelete(Val._id, Val.shopDoorNo, Val)
                                        }
                                        src={require("../../static/images/delete.png")}
                                        alt="Delete"
                                        title="Delete"
                                      />
                                    </td>
                                  ) : (
                                    <td>
                                      <div className="blank text-center">
                                        Deactived
                                      </div>
                                    </td>
                                  )}
                                </tr>
                              );
                            }
                          })}
                      </tbody>
                    </table>
                  </div>
                </div>
                <div className="row">
                  <div className="col-lg-6 col-md-6 col-sm-11 col-11 no_padding">
                    {get_particular_org_tenant &&
                      get_particular_org_tenant.length !== 0 ? (
                      <Pagination
                        dataPerPage={dataPerPage}
                        totalData={currentDatas.length}
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
                  <div className="col-lg-6">
                    <p className="text-end h6">
                      No. of Tenants: {tenantCount.length}
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

            <div className="col-lg-10">
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
            <div className="col-lg-2 bg-danger">
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
            <div className="h5 despace">Reason For Deactivating</div>
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
            <div className="col-lg-10">
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
            <div className="col-lg-2">
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
            <div className=" despace pt-3">Reason For Deactivating</div>
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
    </>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  tenants: state.tenants,
});

export default connect(mapStateToProps, {
  ParticularTenant,
  getParticularOrg,
  getParticularProperty,
  getTenantDetails,
  deactiveTenantsDetails,
})(Tenant_Details);
