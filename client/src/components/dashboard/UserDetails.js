import React, { useEffect, useState, Fragment } from "react";
import AddAdminUserModal from "./AddAdminUserModal";
import { Modal, Button, Form } from "react-bootstrap";
import { connect } from "react-redux";
import "../../../src/styles/CustomisedStyle.css";
import Pagination from "../layout/Pagination";
import {
  getParticularUser,
  getAllSettings,
  getalluser,
  deactivateUser,
  get_particular_org_user,
} from "../../actions/tenants";
import EditAdminUser from "./EditAdminUser";

const UserDetails = ({
  auth: { user },
  tenants: { get_particularOrg_user }, //this is a reudcer
  get_particular_org_user,
  deactivateUser, //this is a action function to call
}) => {
  useEffect(() => {
    get_particular_org_user({
      OrganizationId: user && user.OrganizationId,
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

  const [showSuperModal, setSuperModal] = useState("");
  const SuperUpdateModalClose = () => setSuperModal(false);

  const [Deactiveshow, setDeactiveShow] = useState(false);

  const [Admindata, setAdmin] = useState("");

  const [AdminId, Setid] = useState("");

  const onEdit = (alluser, id) => {
    Setid(id);
    setAdmin(alluser);
    setSuperModal(true);
  };

  const onDelete = (id) => {
    Setid(id);
    setDeactiveShow(true);
  };

  const onDeactivate = () => {
    setDeactiveShow(false);
    const reason = {
      userId: AdminId,
      orgId: user && user.OrganizationId,
      userStatus: "Deactive",
      deactive_reason: deactive_reason,
    };
    deactivateUser(reason);
    // get_particular_org_user({ orgid: user.OrganizationId });
  };

  const [showadd, setShowadd] = useState(false);

  const refresh = () => {
    // window.location.reload(true);
    get_particular_org_user({
      OrganizationId: user && user.OrganizationId,
    });
  };
  //pagination code
  const [currentData, setCurrentData] = useState(1);
  const [dataPerPage] = useState(7);
  //Get Current Data
  const indexOfLastData = currentData * dataPerPage;
  const indexOfFirstData = indexOfLastData - dataPerPage;
  const currentDatas =
    get_particularOrg_user &&
    get_particularOrg_user.slice(indexOfFirstData, indexOfLastData);

  const paginate = (nmbr) => {
    setCurrentData(nmbr);
  };

  return (
    <>
      <div className="col mt-sm-4 space">
        <div className="col smallscreen"></div>
        <div className="col smallscreen"></div>
        <div className="col smallscreen"></div>
        <div className="col smallscreen"></div>
        <div className="col smallscreen"></div>
        <div className="col smallscreen"></div>
        <div className="row col-lg-12 col-md-12 col-sm-12 col-12 no_padding mt-sm-5 ">
          <h2 className="col mt-sm-4 h2 ml-3">User Details</h2>
          <div>
            <hr className="line"></hr>
          </div>
          <div className="text-end"></div>
          <div className="container-fluid d-flex align-items-center justify-content-center ">
            <div className="col ">
              <div className="row text-end ">
                <div className="col-lg-4"></div>
                <div className="col-lg-4"></div>
                <div className="col-lg-4 refresh">
                  <img
                    height="20px"
                    onClick={() => setShowadd(true)}
                    src={require("../../static/images/add-icon.png")}
                    alt="Add User"
                    title="Add User"
                  />
                  <img
                    className="ml-2"
                    height="20px"
                    onClick={() => refresh()}
                    src={require("../../static/images/refresh-icon.png")}
                    alt="refresh"
                    title="refresh"
                  />
                </div>
              </div>
              {/* <AddAdminUserModal /> */}

              <div className="row">
                <div className="col-lg-1"></div>

                <div className="body-inner no-padding table-responsive ">
                  <table
                    className="table table-bordered table-striped table-hover  table-active mt-1"
                    id="datatable2"
                  >
                    <thead>
                      <tr>
                        <th>Name</th>
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
                        currentDatas.map((alluser, idx) => {
                          return (
                            <tr key={idx}>
                              <td>{alluser.username}</td>
                              <td>{alluser.useremail}</td>
                              <td>{alluser.userphone}</td>
                              <td>{alluser.usergroup}</td>
                              <td>{alluser.OrganizationName}</td>
                              <td>{alluser.useraddress}</td>

                              {alluser.userStatus === "Deactive" ? (
                                <td className="blank text-center">Deactived</td>
                              ) : (
                                <td className="text-center">
                                  <img
                                    className="Cursor"
                                    onClick={() => onEdit(alluser, idx)}
                                    src={require("../../static/images/edit_icon.png")}
                                    alt="Edit"
                                    title="Edit"
                                  />
                                  &nbsp;
                                  <img
                                    className="Cursor"
                                    onClick={() => onDelete(alluser._id)}
                                    src={require("../../static/images/delete.png")}
                                    alt="Delete"
                                    title="Delete"
                                  />
                                </td>
                              )}
                            </tr>
                          );
                        })}
                    </tbody>
                  </table>
                </div>
                <div className="col-lg-1"></div>
                <div className="row">
                  <div className="col-lg-6">
                    {get_particularOrg_user &&
                    get_particularOrg_user.length !== 0 ? (
                      <Pagination
                        dataPerPage={dataPerPage}
                        totalData={get_particularOrg_user.length}
                        paginate={paginate}
                        currentPage={currentData}
                      />
                    ) : (
                      <Fragment />
                    )}
                  </div>
                  <div className="col-lg-6">
                    <p className="text-end h6">
                      No of User :{" "}
                      {get_particularOrg_user && get_particularOrg_user.length}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* this id for Deactivating the Super user starting */}
      <Modal show={Deactiveshow} centered>
        <form onSubmit={onDeactivate}>
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
            {/* <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1"> */}
            <div className="h5 despace">Reason For Deactivating </div>
            <textarea
              rows="2"
              name="deactive_reason"
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
            <Button id="deactivebtn" type="submit">
              <b>Deactive</b>
            </Button>
          </Modal.Footer>
        </form>
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
              <b className=" text-center ">Edit User Details </b>
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
          <EditAdminUser org={Admindata} />
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
        <AddAdminUserModal setShowadd={setShowadd} />
      </Modal>
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
