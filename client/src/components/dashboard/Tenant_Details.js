import React, { useState, Fragment, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getAllTenants } from "../../actions/tenants";
import { deactiveTenantsDetails } from "../../actions/tenants";
import { Form, Button } from "react-bootstrap";
import AddTenantDetails from "./AddTenantDetails";
import { Modal } from "react-bootstrap";
import EditTenantDetails from "./EditTenantDetails";

const Tenant_Details = ({
  auth: { isAuthenticated, user, users },
  tenants: { allTenants },
  getAllTenants,
  deactiveTenantsDetails,
}) => {
  useEffect(() => {
    getAllTenants();
  }, []);

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
  const onAddStaffModalChange = (e) => {
    if (e) {
      handleEditModalClose();
    }
  };

  const [formData, setFormData] = useState({
    deactive_reason: "",
    isSubmitted: false,
  });
  const { deactive_reason } = formData;

  const onInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
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
      {" "}
      <Fragment>
        <div className="container container_align ">
          <section className="sub_reg">
            <div className="row col-lg-12 col-md-12 col-sm-12 col-12 no_padding">
              <div className="col-lg-10 col-md-11 col-sm-11 col-11 ">
                <h2 className="heading_color">TenantDetails </h2>
                <hr></hr>
              </div>

              <div className="col-lg-2 col-md-1 col-sm-1 col-1 pt-4">
                <AddTenantDetails />
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
                          <th>Operation</th>
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
                                <td>
                                  <img
                                    className="img_icon_size log"
                                    onClick={() => onEdit(Val)}
                                    src={require("../../static/images/edit_icon.png")}
                                    alt="Edit"
                                    title="Edit User"
                                  />
                                  &nbsp;
                                  <img
                                    className="img_icon_size log"
                                    onClick={() => onDelete(Val._id)}
                                    src={require("../../static/images/delete.png")}
                                    alt="delete User"
                                    title="delete User"
                                  />
                                </td>
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
                  name="Tenant_deactive_reason"
                  onChange={(e) => onInputChange(e)}
                  autoFocus
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={onAdd} id="savebtn">
              Save
            </Button>
            <Button variant="primary" onClick={handleClose} id="savebtn">
              close
            </Button>
          </Modal.Footer>
        </Modal>

        {/* Deactivation End */}

        {/* Edit start */}
        <Modal show={showEditModal} centered>
          <Modal.Header>
            <div className="col-lg-10">
              <h3 className="h3">Edit Tenant Details </h3>
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
            <EditTenantDetails tenants={EditTenant} />
          </Modal.Body>
        </Modal>
      </Fragment>
    </>
  );
};

Tenant_Details.propTypes = {
  auth: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
  tenants: state.tenants,
});

export default connect(mapStateToProps, {
  getAllTenants,
  deactiveTenantsDetails,
})(Tenant_Details);
