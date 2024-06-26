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
import Add from "../../static/images/Add.svg";
import Edit from "../../static/images/Edit.svg";
import Deactivate from "../../static/images/Deactivate.svg";
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
    getalluser();
    // getParticularUser({
    //   OrganizationName: user && user.OrganizationName,
    //   OrganizationId: user && user.OrganizationId,
    // });
    deactivateUser();
  }, [refresh]);

  const [showadd, setShowadd] = useState(false);
  const [formData, setFormData] = useState({
    deactive_reason: "",
    isSubmitted: false,
  });

  const { deactive_reason } = formData;
  // const [errormessage, setErrorMessage] = useState("");

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

  const onDeactive = (e) => {
    e.preventDefault();
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
  //refresh
  return (
    <div>
      {!loading &&
      isAuthenticated &&
      user &&
      user.usergroup === "Super Admin" ? (
        // this is for super admin page

        <>
          <div className="col mt-sm-5">
            <div className="row col-lg-12 col-md-12 col-sm-12 col-12 no_padding  ">
              <div className="col-lg-12 col-md-12 col-sm-12 col-12">
                <h2
                  style={{
                    position: "relative",
                    top: "50px",
                  }}
                  className="heading_color  headsize  ml-3"
                >
                  {" "}
                  User Details
                </h2>
              </div>

              <div className="container-fluid d-flex align-items-center justify-content-center ">
                <div className="col">
                  <div className="refreshbtn">
                    {/* <AddOrgModal />{" "} */}

                    <img
                      onClick={() => setShowadd(true)}
                      src={Add}
                      alt="Add User"
                      title="Add User"
                      className="iconSize"
                    />
                  </div>

                  <div className="row">
                    <div className="col-lg-1  col-sm-12 col-md-12"></div>

                    <div className="body-inner no-padding table-responsive">
                      <table
                        className="table table-bordered table-striped table-hover table1 mt-5"
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
                        <tbody className="text-center">
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
                                  {allsuperuse.userStatus === "Active" &&
                                  allsuperuse.usergroup !== "Super Admin" ? (
                                    <td className="text-center">
                                      <img
                                        className="Cursor "
                                        onClick={() => onEdit(allsuperuse, idx)}
                                        src={Edit}
                                        alt="Edit"
                                        title="Edit"
                                      />
                                      &nbsp;
                                      <img
                                       className="iconSize"
                                        onClick={() =>
                                          onDelete(allsuperuse._id)
                                        }
                                        src={Deactivate}
                                        alt="delete"
                                        title="delete"
                                      />
                                    </td>
                                  ) : (
                                    <td className="blank text-center"></td>
                                  )}
                                </tr>
                              );
                            })}
                        </tbody>
                      </table>
                    </div>
                    <div className="col-lg-1 col-sm-12 col-md-12"></div>
                  </div>
                  <div className="row ">
                    <div className="col-lg-6  col-sm-12 col-md-12">
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

                    <div className="col-lg-6  col-sm-12 col-md-12 ">
                      <p className="text-end h6 font-weight-bold"
                    style={{ color: "#095a4a" }}>
                        {" "}
                        No. of Users : {allsuperuser.length}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* add model starting */}
          <Modal
            show={showadd}
            backdrop="static"
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
          >
            <AddSuperUserModal setShowadd={setShowadd} />
          </Modal>
          {/* add model ending */}

          {/* Modal for Editing the Super user */}
          <Modal
            show={showEditModal}
            backdrop="static"
            keyboard={false}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
          >
            <Modal.Header className="confirmbox-heading">
              <div className="col-lg-10  col-sm-12 col-md-12">
                <div className="ml-4">
                  <h4
                    style={{
                      color: "white",
                    }}
                    className="text-center   ml-4 "
                  >
                    Edit User Details
                  </h4>
                </div>
              </div>
              <div className="col-lg-2  col-sm-12 col-md-12">
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

          {/* this id for Deactivating the Super user starting */}
          <Modal show={Deactiveshow} centered>
            <form onSubmit={onDeactive}>
              <Modal.Header className="confirmbox-heading">
                <div className="col-lg-11  col-sm-12 col-md-12 ">
                  <div className="modal-title">
                    <h4
                      style={{
                        color: "white",
                      }}
                      className="text-center"
                    >
                      DEACTIVATE{" "}
                    </h4>
                  </div>
                </div>
                <div className="close">
                  <img
                    src={require("../../static/images/close.png")}
                    alt="X"
                    style={{ height: "20px", width: "20px" }}
                    onClick={() => setDeactiveShow(false)}
                  />
                </div>
              </Modal.Header>

              <Modal.Body>
                {/* <Form>
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                  > */}
                <div className="h5 despace">Reason For Deactivating </div>
                <textarea
                  rows="2"
                  placeholder="Deactive reason"
                  name="deactive_reason"
                  onChange={(e) => onInputChange(e)}
                  autoFocus
                  id="reason"
                  className="form-control"
                  style={{ width: "100%" }}
                  required
                ></textarea>
                {/* <p>{errormessage}</p> */}
                <div>Are you sure You Want To Deactivate..?</div>
                {/* </Form.Group>
                </Form> */}
              </Modal.Body>
              <Modal.Footer>
                <Button id="deactivebtn" type="submit">
                  <b>Deactive</b>
                </Button>
              </Modal.Footer>
            </form>
          </Modal>
          {/* Modal Ending */}
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
