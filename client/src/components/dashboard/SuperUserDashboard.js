import React, { useEffect, useState, Fragment } from "react";
import AddSuperUserModal from "./AddSuperUserModel";
import { Modal, Button, Form } from "react-bootstrap";
import tenants from "../../reducers/tenants";
import { getAllSettings } from "../../actions/tenants";
import { connect } from "react-redux";
import { getalluser } from "../../actions/tenants";
import PropTypes from "prop-types";
import { deactivateUser } from "../../actions/tenants";
import Edituser from "./Edituser";
import AddAdminModal from "./AddAdminUserModal";
import { getParticularUser } from "../../actions/tenants";
import EditAdminUser from "./EditAdminUser";
import Pagination from "../layout/Pagination";
const SuperUserDashboard = ({
  auth: { isAuthenticated, loading, user },
  tenants: { allsuperuser, particular_user }, //this is a reudcer
  getalluser,
  getParticularUser,
  deactivateUser, //this is a action function to call
}) => {
  useEffect(() => {
    getParticularUser({
      OrganizationName: user && user.OrganizationName,
      OrganizationId: user && user.OrganizationId,
    });
    deactivateUser();
  }, []);
  useEffect(() => {
    getalluser("");
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

  const [showEditModal, setShowEditModal] = useState(false);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [Deactiveshow, setDeactiveShow] = useState(false);

  const [userdata, setuser] = useState("");
  const [OrgId, setId] = useState("");

  const onDelete = (id) => {
    setId(id);
    setDeactiveShow(true);
  };

  const onEdit = (allsuperuse, id) => {
    setId(id);
    setuser(allsuperuse);
    setShowEditModal(true);
  };

  const [Admindata, setAdmin] = useState("");
  const [AdminId, Setid] = useState("");

  const onAdminEdit = (user, id) => {
    setShowUpdateModal(true);
    Setid(id);
    setAdmin(user);
  };

  const onClickReset = () => {
    getalluser("");
  };

  const onAdd = () => {
    setDeactiveShow(false);
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

  //pagination code
  const [currentData, setCurrentData] = useState(1);
  const [dataPerPage] = useState(8);
  //Get Current Data
  const indexOfLastData = currentData * dataPerPage;
  const indexOfFirstData = indexOfLastData - dataPerPage;
  const currentDatas =
    allsuperuser && allsuperuser.slice(indexOfFirstData, indexOfLastData);
  const paginate = (nmbr) => {
    setCurrentData(nmbr);
  };

  return (
    <div>
      {!loading &&
      isAuthenticated &&
      user &&
      user.usergroup === "Super Admin" ? (
        // this is for super admin page
        <div className="container container_align ">
          <section className="sub_reg">
            <div className="row col-lg-12 col-md-12 col-sm-12 col-12 no_padding">
              <div className="col-lg-10 col-md-11 col-sm-11 col-11 ">
                <h2 className="heading_color"> User Details </h2>
                <hr></hr>
              </div>
              <AddSuperUserModal />
            </div>
            <div className="row orgtable">
              <div className="col-lg-11 col-md-11 col-sm-11 col-11 text-center ">
                <section className="body">
                  <div className="body-inner no-padding  ">
                    <table
                      className="table table-bordered table-striped table-hover table-active"
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
                        {currentDatas &&
                          currentDatas[0] &&
                          currentDatas.map((allsuperuse, idx) => {
                            return (
                              <tr key={idx}>
                                <td>{allsuperuse.username}</td>
                                <td>{allsuperuse.useremail}</td>
                                <td>{allsuperuse.userphone}</td>
                                <td>{allsuperuse.usergroup}</td>
                                <td>{allsuperuse.OrganizationName}</td>
                                <td>{allsuperuse.useraddress}</td>
                                <td>
                                  {allsuperuse.userStatus === "Active" ? (
                                    <td>
                                      <img
                                        className="Cursor"
                                        onClick={() => onEdit(allsuperuse, idx)}
                                        src={require("../../static/images/edit_icon.png")}
                                        alt="Edit"
                                        title="Edit"
                                      />
                                      &nbsp;
                                      <img
                                        className="Cursor"
                                        onClick={() =>
                                          onDelete(allsuperuse._id)
                                        }
                                        src={require("../../static/images/delete.png")}
                                        alt="delete"
                                        title="delete"
                                      />
                                    </td>
                                  ) : (
                                    <div className="blank">DeActivated</div>
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
            <div className="row">
              <div className="col-lg-6 col-md-6 col-sm-11 col-11 no_padding">
                {allsuperuser && allsuperuser.length !== 0 ? (
                  <Pagination
                    dataPerPage={dataPerPage}
                    totalData={allsuperuser.length}
                    paginate={paginate}
                    currentPage={currentData}
                  />
                ) : (
                  <Fragment />
                )}
              </div>
              <div className="col-lg-5 col-md-6 col-sm-11 col-11 align_right">
                <label>No of User : {allsuperuser.length}</label>
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
              <Button
                variant="primary"
                onClick={() => setDeactiveShow(false)}
                id="Deactiveclose"
              >
                <img
                  src={require("../../static/images/close.png")}
                  alt="X"
                  style={{ height: "20px", width: "20px" }}
                />
              </Button>
            </Modal.Title>
            {/* <Modal.Header className="lg" ></Modal.Header> */}
            <Modal.Body>
              <Form>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Label>Reason For Deactivating </Form.Label>
                  <textarea
                    rows="2"
                    name="deactive_reason"
                    onChange={(e) => onInputChange(e)}
                    autoFocus
                    id="org_reason"
                    className="form-control "
                    required
                  ></textarea>
                  <Form.Label>
                    Are you sure You Want To DeActivate..?
                  </Form.Label>
                </Form.Group>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button id="deactivebtn" onClick={onAdd}>
                <b>DeActivate</b>
              </Button>
            </Modal.Footer>
          </Modal>
          {/* Modal Ending */}

          {/* Modal for Editing the Super user */}
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
                  <b className="modal-title text-center h3">
                    Edit User Details{" "}
                  </b>
                </h3>
              </div>
              <div className="col-lg-2">
                <button
                  onClick={() => setShowEditModal(false)}
                  className="close"
                >
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
                EditModal={setShowEditModal}
                //onUpdateModalChange={onUpdateModalChange}
              />
            </Modal.Body>
          </Modal>
          {/* Modal Edit Ending */}
        </div>
      ) : (
        <></>
      )}
    </div>
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
})(SuperUserDashboard); // to connect to particular function which is getalluser
