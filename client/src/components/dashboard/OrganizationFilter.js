import React, { useState, Fragment, useRef, useEffect } from "react";
import { connect } from "react-redux";
import { deactiveTenantsDetails, getAllTenants } from "../../actions/tenants";
import { Form, Button } from "react-bootstrap";
import { Modal } from "react-bootstrap";
import RenewTenentAgreement from "./RenewTenentAgreement";
import RenewalReportPrint from "../printPdf/renewalReportPrint";
import { useReactToPrint } from "react-to-print";
import { useHistory } from "react-router-dom";
const TenantReport = ({
  auth: { expReport, isAuthenticated, user, users },
  tenants: { allTenants, ext_year_count_org },
  getAllTenants,
  deactiveTenantsDetails,
}) => {
  let history = useHistory();
  useEffect(() => {
    getAllTenants();
  });

  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });
  const [showEditModal, setShowEditModal] = useState(false);
  const handleEditModalClose = () => setShowEditModal(false);
  const [userData, setUserData] = useState(null);

  // Modal for Deactivation
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [tId, setId] = useState("");

  const onDelete = (id) => {
    setId(id);
    handleShow();
  };

  const [formData, setFormData] = useState({
    deactive_reason: "",
    isSubmitted: false,
  });
  const { deactive_reason } = formData;

  const onInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onRenewalOrganization = (org) => {
    setShowEditModal(true);
    setUserData(org);
    history.push("/Renewal-Org", org);
    console.log("renewal main",org);
  };
  const onRenewal = (tenants) => {
    setShowEditModal(true);
    setUserData(tenants);
    //history.push("");
  };

  const onReportModalChange = (e) => {
    if (e) {
      handleEditModalClose();
    }
  };
  const onAdd = () => {
    const reason = {
      deactive_reason: deactive_reason,
      tid: tId,
      isSubmitted: "true",
    };
    deactiveTenantsDetails(reason);
    handleClose();
  };

  return !isAuthenticated || !user || !users ? (
    <Fragment></Fragment>
  ) : (
    <>
      {user.usergroup === "Super Admin" ? (
        
          <div className="col mt-sm-5 DashBoard ">
          <div className="row col-lg-12 col-md-12 col-sm-12 col-12 no_padding mt-sm-3 ">
            
          <div>
          <h1
            style={{
              fontFamily: "Serif",
              color: "#095a4a",
            }}
            className="font-weight-bold headsize"
          >
            <span
              style={{ fontFamily: "Serif" }}
              className=" text-right font-weight-bold ml-5"
            >
              {" "}
              Dashboard
            </span>
          </h1>
          <hr className="line"></hr>
        </div>
            
                
        <div className="container-fluid d-flex align-items-center justify-content-center ">
        <div className="col">
              <div className="row">
                <div className="col-lg-11 col-md-11 col-sm-11 col-11 text-center ">
                <div className="col-lg-1"></div>
                    <div className="body-inner no-padding table-responsive ml-2">
                      <table
                        className="table table-bordered table-striped table-hover table1 mt-2 "
                        id="datatable2"
                      >
                        <thead>
                          <tr>
                            <th>Organization Name</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>StartDate</th>
                            <th>Status</th>
                            <th>End Date</th>
                            <th>Operation</th>
                          </tr>
                        </thead>
                        <tbody>
                          {ext_year_count_org &&
                            ext_year_count_org[0] &&
                            ext_year_count_org.map((org, index) => {
                              return (
                                <tr>
                                  <td>{org.OrganizationName}</td>
                                  <td>{org.OrganizationEmail}</td>
                                  <td>{org.OrganizationNumber}</td>
                                  <td>{org.OrganizationAddress}</td>
                                  <td>{org.AgreementStatus}</td>
                                  <td>{org.enddate}</td>
                                  <td>
                                    {org.AgreementStatus === "Expired" ? (
                                      <button
                                        className="rewbtn"
                                        onClick={() =>
                                          onRenewalOrganization(org)
                                        }
                                      >
                                        Renewal
                                      </button>
                                    ) : (
                                      <p></p>
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
              </div>
              </div>

              </div>
          </div>
        
      ) : (
        <Fragment>
          <div className="container container_align ">
            <section className="sub_reg">
              <div className="row col-lg-12 col-md-12 col-sm-12 col-12 no_padding">
                <div className="col-lg-10 col-md-11 col-sm-11 col-11 ">
                  <h2 className="heading_color">Tenant Reports </h2>
                </div>
                <div className="col-lg-2 col-md-1 col-sm-1 col-1 pt-4">
                  {/* <AddTenantDetails /> */}
                </div>
              </div>
              <div className="row">
                <div className="col-lg-11 col-md-11 col-sm-11 col-11 text-center ">
                  <section className="body">
                    <div className="body-inner no-padding  table-responsive fixTableHead">
                      <table
                        className="table table-bordered table-striped table-hover"
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
                            <th>Agreement Status</th>
                            <th>Expired</th>
                          </tr>
                        </thead>
                        <tbody>
                          {allTenants &&
                            allTenants[0] &&
                            allTenants.map((Val, idx) => {
                              // var ED = Val.tenantLeaseEndDate.split(/\D/g);
                              // var tenantLeaseEndDate = [ED[2], ED[1], ED[0]].join(
                              //   "-"
                              // );
                              return (
                                <tr key={idx}>
                                  <td>{Val.tenantName}</td>
                                  <td>{Val.BuildingName}</td>
                                  <td>{Val.tenantDoorNo}</td>
                                  <td>{Val.tenantFileNo}</td>
                                  <td>{Val.Location}</td>
                                  <td>{Val.tenantPhone}</td>
                                  <td>{Val.tenantLeaseEndDate}</td>
                                  <td>{Val.tenantRentAmount}</td>
                                  <td>{Val.tenantstatus}</td>
                                  {Val.AgreementStatus === "Expired" ? (
                                    <td>
                                      <center>
                                        <button
                                          variant="success"
                                          className="rewbtn"
                                          onClick={() => onRenewal(Val, idx)}
                                        >
                                          Renewal
                                        </button>
                                      </center>
                                    </td>
                                  ) : (
                                    <td></td>
                                  )}
                                </tr>
                              );
                            })}
                        </tbody>
                      </table>
                    </div>
                  </section>
                </div>
              </div>
            </section>

            {/*link to renewal page */}
            <div style={{ display: "none" }}>
              <RenewalReportPrint expReport={expReport} ref={componentRef} />
            </div>
            <Modal
              show={showEditModal}
              backdrop="static"
              keyboard={false}
              size="md"
              aria-labelledby="contained-modal-title-vcenter"
              centered
            >
              <Modal.Header>
                <div className="col-lg-10">
                  <h4
                    className="modal-title text-center"
                    style={{ fontWeight: "bold" }}
                  >
                    Renewal Tenant Agreement
                  </h4>
                </div>
                <div className="col-lg-2">
                  <button onClick={handleEditModalClose} className="close">
                    <img
                      src={require("../../static/images/close.png")}
                      alt="X"
                      style={{ height: "20px", width: "20px" }}
                    />
                  </button>
                </div>
              </Modal.Header>
              <Modal.Body>
                <RenewTenentAgreement
                  tenantsData={userData}
                  onReportModalChange={onReportModalChange}
                />
              </Modal.Body>
            </Modal>
          </div>

          {/* Deactivating the tenant start*/}
          <Modal
            show={show}
            // onHide={handleClose}
            centered
          >
            <Modal.Title>Deactivate</Modal.Title>

            <Modal.Body>
              <Form>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Label>Reason For Deactivating</Form.Label>
                  <Form.Control
                    type="text"
                    name="deactive_reason"
                    onChange={(e) => onInputChange(e)}
                    autoFocus
                  />
                </Form.Group>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button className="bg-dark" onClick={onAdd}>
                Save
              </Button>
              <Button className="bg-dark" onClick={handleClose}>
                close
              </Button>
            </Modal.Footer>
          </Modal>

          {/* Deactivating the tenant start*/}
          <Modal
            show={show}
            // onHide={handleClose}
            centered
          >
            <Modal.Title>Deactivate</Modal.Title>
            <Modal.Header className="lg" closeButton>
              x
            </Modal.Header>
            <Modal.Body>
              <Form>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Label>Reason For Deactivating</Form.Label>
                  <Form.Control
                    type="text"
                    name="deactive_reason"
                    onChange={(e) => onInputChange(e)}
                    autoFocus
                  />
                </Form.Group>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="primary" onClick={onAdd}>
                Save
              </Button>
              <Button variant="primary" onClick={handleClose}>
                close
              </Button>
            </Modal.Footer>
          </Modal>

          {/* Deactivation End */}
        </Fragment>
      )}
    </>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  tenants: state.tenants,
});

export default connect(mapStateToProps, {
  getAllTenants,
  deactiveTenantsDetails,
  //getAllOrganization,
})(TenantReport);
