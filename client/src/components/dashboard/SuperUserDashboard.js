import React, { useEffect, useState, Fragment } from "react";
import AddSuperUserModal from "./AddSuperUserModel";
import { Modal, Button, Form } from "react-bootstrap";
import { connect } from "react-redux";
import Edituser from "./Edituser";
import {
  getParticularUser,
  deactivateUser,
  getalluser,
  getAllSettings,
} from "../../actions/tenants";
import Pagination from "../layout/Pagination";
const SuperUserDashboard = ({
  auth: { isAuthenticated, loading, user },
  tenants: { allsuperuser }, //this is a reudcer
  getalluser,
  getParticularUser,
  deactivateUser, //this is a action function to call
}) => {
  const [refresh, setrefresh] = useState(false);
  useEffect(() => {
    getParticularUser({
      OrganizationName: user && user.OrganizationName,
      OrganizationId: user && user.OrganizationId,
    });
    deactivateUser();
  }, [refresh]);
  useEffect(() => {
    getalluser("");
  }, [refresh]);

  const [showadd, setShowadd] = useState(false);
  const [formData, setFormData] = useState({
    deactive_reason: "",
    isSubmitted: false,
  });

  const { deactive_reason } = formData;

  const onInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const [showEditModal, setShowEditModal] = useState(false);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [Deactiveshow, setDeactiveShow] = useState(false);

  const [userdata, setuser] = useState("");
  const [UserId, setId] = useState("");

  const onDelete = (id) => {
    setId(id);
    setDeactiveShow(true);
  };

  const onEdit = (allsuperuse, id) => {
    setId(id);
    setuser(allsuperuse);
    setShowEditModal(true);
  };

  const onDeactive = () => {
    setDeactiveShow(false);
    const reason = {
      userId: UserId,
      userStatus: "Deactive",
      deactive_reason: deactive_reason,
    };

    deactivateUser(reason);
  };

  //pagination code
  const [currentData, setCurrentData] = useState(1);
  const [dataPerPage] = useState(7);
  //Get Current Data
  const indexOfLastData = currentData * dataPerPage;
  const indexOfFirstData = indexOfLastData - dataPerPage;
  const currentDatas =
    allsuperuser && allsuperuser.slice(indexOfFirstData, indexOfLastData);
  const paginate = (nmbr) => {
    setCurrentData(nmbr);
  };
  const refreshbtn = () => {
    window.location.reload(true);
  };

  return (
    <div>
      {!loading &&
      isAuthenticated &&
      user &&
      user.usergroup === "Super Admin" ? (
        // this is for super admin page

        <>
          <div className="col mt-5">
            <div className="col"></div>
            <div className="col"></div>
            <div className="col"></div>
            <div className="col"></div>
            <div className="col"></div>
            <div className="col mt-5 h2">User Details</div>
            <div className="text-end"> </div>

            <div className="container-fluid d-flex align-items-center justify-content-center ">
              <div className="col">
                <div className="refreshbtn">
                  {/* <AddOrgModal />{" "} */}

                  <img
                    height="25px"
                    className="mx-2 plusicon"
                    onClick={() => setShowadd(true)}
                    src={require("../../static/images/add-icon.png")}
                    alt="Add User"
                    title="Add User"
                  />
                  <img
                    className="mt-1"
                    height="25px"
                    onClick={() => refreshbtn()}
                    src={require("../../static/images/refresh-icon.png")}
                    alt="Add User"
                    title="Refresh User"
                  />
                </div>

                <div className="row ">
                  <div className="col-lg-1"></div>

                  <div className="body-inner no-padding table-responsive">
                    <table
                      className="table table-bordered table-striped table-hover  table-active mt-5"
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

                                {allsuperuse.userStatus === "Active" ? (
                                  <td className="text-center">
                                    <img
                                      className="Cursor "
                                      onClick={() => onEdit(allsuperuse, idx)}
                                      src={require("../../static/images/edit_icon.png")}
                                      alt="Edit"
                                      title="Edit"
                                    />

                                    <img
                                      className="Cursor "
                                      onClick={() => onDelete(allsuperuse._id)}
                                      src={require("../../static/images/delete.png")}
                                      alt="delete"
                                      title="delete"
                                    />
                                  </td>
                                ) : (
                                  <td className="blank text-center">
                                    Deactive
                                  </td>
                                )}
                              </tr>
                            );
                          })}
                      </tbody>
                    </table>
                  </div>
                  <div className="col-lg-1"></div>
                </div>
                <div className="row ">
                  <div className="col-lg-6">
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

                  <div className="col-lg-6  ">
                    <p className="text-end h6">
                      {" "}
                      No of Property : {allsuperuser.length}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* this id for Deactivating the Super user starting */}
          <Modal show={Deactiveshow} centered>
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
                  onClick={() => setDeactiveShow(false)}
                />
              </div>
            </Modal.Header>

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
                    Are you sure You Want To Deactivate..?
                  </Form.Label>
                </Form.Group>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button id="deactivebtn" onClick={onDeactive}>
                <b>Deactive</b>
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
                  <b className="text-center ">Edit User Details </b>
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
              <Edituser superuser={userdata} EditModal={setShowEditModal} />
            </Modal.Body>
          </Modal>
          {/* Modal Edit Ending */}

          <Modal
            show={showadd}
            backdrop="static"
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
          >
            <AddSuperUserModal setShowadd={setShowadd} />
          </Modal>
        </>
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
