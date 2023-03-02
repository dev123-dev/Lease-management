import React, { useEffect, useState } from "react";
import AddAdminUserModal from "./AddAdminUserModal";
import { Modal, Button, Form } from "react-bootstrap";
import tenants from "../../reducers/tenants";
import { getAllSettings } from "../../actions/tenants";
import { connect } from "react-redux";
import { getalluser } from "../../actions/tenants";
import PropTypes from "prop-types";
import { deactivateUser } from "../../actions/tenants";
import Edituser from "./Edituser";

import { getParticularUser } from "../../actions/tenants";
import EditAdminUser from "./EditAdminUser";

const UserDetails = ({
  auth: { isAuthenticated, loading, user },
  tenants: { allsuperuser, particular_user }, //this is a reudcer
  getalluser,
  getParticularUser,
  deactivateUser, //this is a action function to call
}) => {
  //point to remember that this includes code for both Super user list and Admin user List it is based on condition
  //const userlist = [];
  // user.map((us) => {
  //   userlist.push({
  //     label: us.OrganizationName,
  //     value: us._id,
  //   });
  // });

  useEffect(() => {
    getParticularUser({
      OrganizationName: user.OrganizationName,
      OrganizationId: user.OrganizationId,
    });
    getalluser();
    deactivateUser();
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

  const onUpdateModalChange = (e) => {
    if (e) {
      handleUpdateModalClose();
    }
  };

  const [showSuperModal, setSuperModal] = useState("");
  const SuperUpdateModalClose = () => setSuperModal(false);
  const SuperUpdateModalOpen = () => setSuperModal(true);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [Deactiveshow, setDeactiveShow] = useState(false);
  const DeactivehandleClose = () => setDeactiveShow(false);
  const DeactivehandleShow = () => setDeactiveShow(true);

  const [userdata, setuser] = useState("");
  const [OrgId, setId] = useState("");

  const onDelete = (id) => {
    setId(id);
    DeactivehandleShow();
  };

  const onEdit = (allsuperuse, id) => {
    setId(id);
    setuser(allsuperuse);
    setSuperModal(true);
  };

  const [Admindata, setAdmin] = useState("");
  const [AdminId, Setid] = useState("");

  const onAdminEdit = (user, id) => {
    setShowUpdateModal(true);
    Setid(id);
    setAdmin(user);
  };

  const onAdd = () => {
    const reason = {
      Org_id: OrgId,
      userStatus: "Deactive",
      deactive_reason: deactive_reason,
    };
    deactivateUser(reason);
  };

  const onAdminAdd = () => {
    const reason = {
      Org_id: AdminId,
      userStatus: "Deactive",
      deactive_reason: deactive_reason,
    };
    deactivateUser(reason);
  };
  return (
    <>
      <div>
        {!loading && isAuthenticated && user && user.usergroup === "Admin" ? (
          // this is for super admin page
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
                            <th>Status</th>
                            <th>Operation</th>
                          </tr>
                        </thead>
                        <tbody>
                          {allsuperuser &&
                            allsuperuser[0] &&
                            allsuperuser.map((allsuperuse, idx) => {
                              return (
                                <tr key={idx}>
                                  <td>{allsuperuse.username}</td>
                                  <td>{allsuperuse.useremail}</td>
                                  <td>{allsuperuse.userphone}</td>
                                  <td>{allsuperuse.usergroup}</td>
                                  <td>{allsuperuse.OrganizationName}</td>
                                  <td>{allsuperuse.useraddress}</td>
                                  <td>{allsuperuse.userStatus}</td>
                                  <td>
                                    <img
                                      className=""
                                      // onClick={() => onClickHandler()}
                                      onClick={() => onEdit(allsuperuse, idx)}
                                      src={require("../../static/images/edit_icon.png")}
                                      alt="Edit"
                                      title="Add User"
                                    />
                                    <img
                                      className=""
                                      // onClick={() => onClickHandler()}
                                      onClick={() => onDelete(allsuperuse._id)}
                                      src={require("../../static/images/delete.png")}
                                      alt="Add User"
                                      title="Add User"
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
            {/* this id for Deactivating the Super user starting */}
            <Modal
              show={Deactiveshow}
              // onHide={handleClose}
              centered
            >
              <Modal.Title className="text-center">
                <b> Deactivate</b>
              </Modal.Title>
              {/* <Modal.Header className="lg" ></Modal.Header> */}
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
                <Button id="savebtn" onClick={onAdd}>
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
                  superuser={userdata}
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
})(UserDetails); // to connect to particular function which is getalluser
