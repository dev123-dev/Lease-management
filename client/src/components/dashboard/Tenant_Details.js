import React, { useState, Fragment, useEffect } from "react";
import { connect } from "react-redux";
import {
  ParticularTenant,
  getParticularOrg,
  getParticularProperty,
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
  tenants: { get_particular_org_tenant, particular_org_loc },
  ParticularTenant,
  getParticularOrg,
  getParticularProperty,
  deactiveTenantsDetails,
}) => {
  const [freshpage, setFreshPage] = useState(true);
  useEffect(() => {
    ParticularTenant({ OrganizationId: user && user.OrganizationId });
    getParticularOrg({ OrganizationId: user && user.OrganizationId });
    getParticularProperty({ OrganizationId: user && user.OrganizationId });
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

  // Modal for Deactivation
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [tId, setId] = useState("");

  const onDelete = (id, Dno) => {
    setId(id);
    handleShow();
  };
  // Edit model state
  const [EditTenant, setEditTenant] = useState(null);

  const [showEditModal, setShowEditModal] = useState(false);
  const onEdit = (val) => {
    setShowEditModal(true);
    setEditTenant(val);
  };

  // const [showEditModal, setShowEditModal] = useState(false);
  const handleEditModalClose = () => setShowEditModal(false);
  const handleOpen = () => setShowEditModal(true);

  const [formData, setFormData] = useState({
    deactive_reason: "",
    isSubmitted: false,
  });
  const { deactive_reason } = formData;

  const onInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onchangeLocation = (loc) => {
    setselLoction(loc);
    ParticularTenant({
      OrganizationId: user && user.OrganizationId,
      LocationName: loc.value,
    });
  };

  const onDeactivate = () => {
    const reason = {
      deactive_reason: deactive_reason,
      tid: tId,
      isSubmitted: "true",
    };
    deactiveTenantsDetails(reason);
    handleClose();
    setFreshPage(!freshpage);
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
    window.location.reload(true);
  };

  return !isAuthenticated || !user || !users ? (
    <Fragment></Fragment>
  ) : (
    <>
      {" "}
      <Fragment>
        <div className="col mt-5 ">
          <div className="col"></div>
          <div className="col"></div>
          <div className="col"></div>
          <div className="col"></div>
          <div className="col"></div>

          <div className="row col-lg-12 col-md-12 col-sm-12 col-12 no_padding">
            <h2 className="col mt-5 h2 ml-2">Tenant Details </h2>
            <div className="text-end"> </div>
            <div className="w-25 ml-3 ">
              <Select
                className="dropdown"
                placeholder="Search-Location"
                name="location"
                options={location}
                value={sellocation}
                onChange={(e) => onchangeLocation(e)}
              ></Select>
            </div>
            <div className="container-fluid d-flex align-items-center justify-content-center ">
              <div className="col">
                <div className="refreshbtn">
                  {/* <AddTenantDetails /> */}
                  <img
                    className="mr-2"
                    height="25px"
                    onClick={() => setShowadd(true)}
                    src={require("../../static/images/add-icon.png")}
                    alt="Add Tenant"
                    title="Add Tenant"
                  />
                  <img
                    className=""
                    height="25px"
                    onClick={() => refresh()}
                    src={require("../../static/images/refresh-icon.png")}
                    alt="refresh"
                    title="refresh"
                  />
                </div>

                <div className="row">
                  <div className="col-lg-1"></div>

                  <div className="body-inner no-padding table-responsive">
                    <table
                      className="table table-bordered table-striped table-hover  table-active mt-5"
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
                      <tbody>
                        {currentDatas &&
                          currentDatas[0] &&
                          currentDatas.map((Val, idx) => {
                            var ED = Val.tenantLeaseEndDate.split(/\D/g);
                            var tenant = [ED[2], ED[1], ED[0]].join("-");
                            return (
                              <tr key={idx}>
                                <td>{Val.tenantName}</td>
                                <td>{Val.BuildingName}</td>
                                <td>{(Val.shopDoorNo, ",")}</td>
                                <td>{Val.tenantFileNo}</td>
                                <td>{Val.Location}</td>
                                <td>{Val.tenantPhone}</td>
                                <td>{tenant}</td>
                                <td>{Val.tenantRentAmount}</td>

                                {Val.tenantstatus === "Active" ? (
                                  <td className=" text-center">
                                    <img
                                      className="Cursor  "
                                      onClick={() => onEdit(Val)}
                                      src={require("../../static/images/edit_icon.png")}
                                      alt="Edit"
                                      title="Edit"
                                    />{" "}
                                    &nbsp;
                                    <img
                                      className="Cursor "
                                      onClick={() =>
                                        onDelete(Val._id, Val.DoorId)
                                      }
                                      src={require("../../static/images/delete.png")}
                                      alt="Delete"
                                      title="Delete"
                                    />
                                  </td>
                                ) : (
                                  <td>
                                    <div className="blank text-center">
                                      Deactive
                                    </div>
                                  </td>
                                )}
                              </tr>
                            );
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
                        totalData={get_particular_org_tenant.length}
                        paginate={paginate}
                        currentPage={currentData}
                      />
                    ) : (
                      <Fragment />
                    )}
                  </div>
                  <div className="col-lg-6 col-md-6 col-sm-11 col-11 align_right">
                    <label>
                      No of Tenants: {get_particular_org_tenant.length}
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Deactivating the tenant start*/}
        <Modal show={show} centered>
          <Modal.Header>
            <div className="col-lg-11 ">
              <h3 className="modal-title text-center">
                <b>DEACTIVATE</b>
              </h3>
            </div>
            <div className="col-lg-1 closeicon">
              <img
                src={require("../../static/images/close.png")}
                alt="X"
                style={{ height: "20px", width: "20px" }}
                onClick={handleClose}
              />
            </div>
          </Modal.Header>

          <Modal.Body>
            <Form>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Reason For Deactivating</Form.Label>
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
                <Form.Label>Are you sure You Want To Deactivate..?</Form.Label>
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={onDeactivate} id="deactivebtn">
              <b>Deactive</b>
            </Button>
          </Modal.Footer>
        </Modal>

        {/* Deactivation End */}

        {/* Edit start */}
        <Modal
          show={showEditModal}
          backdrop="static"
          keyboard={false}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header>
            <div className="col-lg-10">
              <h3>
                <b className="text-center">Edit Tenant Details </b>
              </h3>
            </div>
            <div className="col-lg-2">
              <button onClick={() => handleEditModalClose()} className="close">
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
            <EditTenantDetails
              tenantsdetails={EditTenant}
              setFreshPage={setFreshPage}
              freshpage={freshpage}
              setShowEditModal={setShowEditModal}
            />
          </Modal.Body>
        </Modal>
        {/* add model */}
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
      </Fragment>
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
  deactiveTenantsDetails,
})(Tenant_Details);
