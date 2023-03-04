import React, { useEffect, useState } from "react";
import AddAdminUserModal from "./AddAdminUserModal";
import { Modal, Button, Form } from "react-bootstrap";
import tenants from "../../reducers/tenants";
import { getAllSettings } from "../../actions/tenants";
import { connect } from "react-redux";
import { getalluser } from "../../actions/tenants";
import PropTypes from "prop-types";
import { deactivateUser, get_particular_org_user } from "../../actions/tenants";
import Edituser from "../dashboard/Edituser";
import "../../../src/styles/CustomisedStyle.css";

import { getParticularUser } from "../../actions/tenants";
import EditAdminUser from "./EditAdminUser";

const UserDetails = ({
  auth: { isAuthenticated, loading, user },
  tenants: { get_particularOrg_user }, //this is a reudcer
  get_particular_org_user,
  deactivateUser, //this is a action function to call
}) => {
  useEffect(() => {
    get_particular_org_user({
      orgid: user && user.OrganizationId,
    });
  }, []);
  const [formData, setFormData] = useState({
    deactive_reason: "",
    isSubmitted: false,
  });

  const { deactive_reason } = formData;

  const onInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const handleUpdateModalClose = () => setShowUpdateModal(false);

  const [showSuperModal, setSuperModal] = useState("");
  const SuperUpdateModalClose = () => setSuperModal(false);
  const SuperUpdateModalOpen = () => setSuperModal(true);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [Deactiveshow, setDeactiveShow] = useState(false);
  const DeactivehandleClose = () => setDeactiveShow(false);
  const DeactivehandleShow = () => setDeactiveShow(true);

  const [Admindata, setAdmin] = useState("");

  const [AdminId, Setid] = useState("");

  const onEdit = (alluser, id) => {
    Setid(id);
    setAdmin(alluser);
    setSuperModal(true);
  };

  const onDelete = (id) => {
    Setid(id);
    DeactivehandleShow();
  };

  const onAdminAdd = () => {
    const reason = {
      userId: AdminId,
      orgId: user && user.OrganizationId,
      userStatus: "Deactive",
      deactive_reason: deactive_reason,
    };
    console.log(reason);
    deactivateUser(reason);
    // get_particular_org_user({ orgid: user.OrganizationId });
  };

  return (
    <>
      <div>
        {!loading && isAuthenticated && user && user.usergroup === "Admin" ? (
          <div className="container container_align ">
            <section className="sub_reg">
              <div className="row col-lg-12 col-md-12 col-sm-12 col-12 no_padding">
                <div className="col-lg-10 col-md-11 col-sm-11 col-11 ">
                  <h2 className="heading_color">User Details </h2>
                </div>
                <AddAdminUserModal />
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
                            <th> Name</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Group</th>
                            <th>Organization</th>
                            <th>Address</th>
                            <th>Operation</th>
                          </tr>
                        </thead>
                        <tbody>
                          {get_particularOrg_user &&
                            get_particularOrg_user[0] &&
                            get_particularOrg_user.map((alluser, idx) => {
                              return (
                                <tr key={idx}>
                                  <td>{alluser.username}</td>
                                  <td>{alluser.useremail}</td>
                                  <td>{alluser.userphone}</td>
                                  <td>{alluser.usergroup}</td>
                                  <td>{alluser.OrganizationName}</td>
                                  <td>{alluser.useraddress}</td>
                                  <td>
                                    {alluser.userStatus == "Deactive" ? (
                                      <div className="deactive"></div>
                                    ) : (
                                      <>
                                        <img
                                          className=""
                                          onClick={() => onEdit(alluser, idx)}
                                          src={require("../../static/images/edit_icon.png")}
                                          alt="Edit"
                                          title="Add User"
                                        />
                                        <img
                                          className=""
                                          onClick={() => onDelete(alluser._id)}
                                          src={require("../../static/images/delete.png")}
                                          alt="Add User"
                                          title="Add User"
                                        />
                                      </>
                                    )}
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
            {/* this id for Deactivating the Super user starting */}
            <Modal show={Deactiveshow} centered>
              <Modal.Title className="text-center">
                <b> Deactivate</b>
              </Modal.Title>
              <Modal.Body>
                <Form>
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Label className="text-center">
                      Reason For Deactivating{" "}
                    </Form.Label>
                    <textarea
                      rows="2"
                      name="deactive_reason"
                      onChange={(e) => onInputChange(e)}
                      autoFocus
                      id="org_reason"
                      className="form-control "
                      required
                    ></textarea>
                  </Form.Group>
                </Form>
              </Modal.Body>
              <Modal.Footer>
                <Button id="savebtn" onClick={onAdminAdd}>
                  DeActivate
                </Button>
                <Button
                  variant="primary"
                  onClick={DeactivehandleClose}
                  id="savebtn"
                >
                  close
                </Button>
              </Modal.Footer>
            </Modal>
            {/* Modal Ending */}

            {/* Modal for Editing the Super user */}
            <Modal
              show={showSuperModal}
              backdrop="static"
              keyboard={false}
              size="lg"
              aria-labelledby="contained-modal-title-vcenter"
              centered
            >
              <Modal.Header>
                <div className="col-lg-10">
                  <h3>
                    <b className="modal-title text-center h3">
                      Edit User Details{" "}
                    </b>
                  </h3>
                </div>
                <div className="col-lg-2">
                  <button onClick={SuperUpdateModalClose} className="close">
                    <img
                      src={require("../../static/images/close.png")}
                      alt="X"
                      style={{ height: "20px", width: "20px" }}
                    />
                  </button>
                </div>
              </Modal.Header>
              <Modal.Body>
                <Edituser
                  superuser={Admindata}
                  //onUpdateModalChange={onUpdateModalChange}
                />
              </Modal.Body>
            </Modal>
            {/* Modal Edit Ending */}
          </div>
        ) : (
          <></>
        )}
        {/* deactivating the Super User */}
        {/* <Modal show={show} centered>
        <Modal.Title>
          <></>
          <div className="text-center h4">
            <b>Deactivate</b>
          </div>
        </Modal.Title>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label className="h5">Reason For Deactivating</Form.Label>
              <textarea
                rows="2"
                name="deactive_reason"
                onChange={(e) => onInputChange(e)}
                autoFocus
                id="org_reason"
                className="form-control "
                required
              ></textarea>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            // variant="primary"
            id="savebtn"
            onClick={onAdminAdd}
          >
            Save
          </Button>
          <Button variant="primary" onClick={handleClose} id="savebtn">
            close
          </Button>
        </Modal.Footer>
      </Modal> */}
        {/*  End Deactivating the user  */}
      </div>
    </>
  );
};

const mapStateToProps = (state) => ({
  tenants: state.tenants,
  auth: state.auth,
});
export default connect(mapStateToProps, {
  getalluser,
  getAllSettings,
  deactivateUser,
  getParticularUser,
  get_particular_org_user,
})(UserDetails); // to connect to particular function which is getalluser
