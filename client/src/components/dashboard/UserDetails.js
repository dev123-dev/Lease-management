import React, { useEffect, useState, Fragment } from "react";
import AddAdminUserModal from "./AddAdminUserModal";
import { Modal, Button, Form } from "react-bootstrap";
import { connect } from "react-redux";
import "../../../src/styles/CustomisedStyle.css";
import Pagination from "../layout/Pagination";
import {
  getParticularUser,
  getAllSettings,
  // getalluser,
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
  const myuser = JSON.parse(localStorage.getItem("user"));

  const [refresh, setRefresh] = useState(false);
  useEffect(() => {
    get_particular_org_user({ OrganizationId: myuser.OrganizationId });
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

  const onDeactivate = (e) => {
    e.preventDefault();
    setDeactiveShow(false);
    const reason = {
      userId: AdminId,
      orgId: myuser && myuser.OrganizationId,
      userStatus: "Deactive",
      deactive_reason: deactive_reason,
    };
    deactivateUser(reason);
    get_particular_org_user({ OrganizationId: myuser.OrganizationId });
  };

  const [showadd, setShowadd] = useState(false);

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
  // console.log(get_particularOrg_user, "get_particularOrg_user");
  return (
    <>
      <div className="col mt-sm-4 space">
        <div className="row col-lg-12 col-md-12 col-sm-12 col-12 no_padding  ">
          <h2
            style={{
              position: "relative",
              top: "60px",
            }}
            className=" heading_color  headsize  ml-4"
          >
            User Details
          </h2>
          <div></div>
          <div className="text-end"></div>
          <div className="container-fluid d-flex align-items-center justify-content-center ">
            <div className="col ">
              <div className="row text-end ">
                <div className="col-lg-4  col-sm-12 col-md-12"></div>
                <div className="col-lg-4  col-sm-12 col-md-12"></div>
                <div className="col-lg-4  col-sm-12 col-md-12 refresh">
                  <img
                    height="20px"
                    onClick={() => setShowadd(true)}
                    src={require("../../static/images/add-icon.png")}
                    alt="Add User"
                    title="Add User"
                  />
                </div>
              </div>
              {/* <AddAdminUserModal /> */}

              <div className="row">
                <div className="col-lg-1  col-sm-12 col-md-12"></div>

                <div className="body-inner no-padding table-responsive ">
                  <table
                    className="table table-bordered table-striped table-hover   mt-1"
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
                    <tbody className="text-center">
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
                <div className="col-lg-1  col-sm-12 col-md-12"></div>
                <div className="row">
                  <div className="col-lg-6  col-sm-12 col-md-12">
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
                  <div className="col-lg-6  col-sm-12 col-md-12">
                    <p className="text-end h6">
                      No. of User :{" "}
                      {get_particularOrg_user && get_particularOrg_user.length}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* add model start */}
      <Modal
        show={showadd}
        backdrop="static"
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <AddAdminUserModal setShowadd={setShowadd} />
      </Modal>
      {/* add model end */}

      {/* Modal for Editing the Super user */}
      <Modal
        show={showSuperModal}
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
                className=" text-center   ml-4 "
              >
                EDIT USER DETAILS{" "}
              </h4>
            </div>
          </div>
          <div className="col-lg-2  col-sm-12 col-md-12">
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
          <EditAdminUser
            org={Admindata}
            setSuperModal={setSuperModal}
            setRefresh={setRefresh}
            refresh={refresh}
          />
        </Modal.Body>
      </Modal>
      {/* Modal Edit Ending */}

      {/* this id for Deactivating the Super user starting */}
      <Modal show={Deactiveshow} centered>
        <form onSubmit={onDeactivate}>
          <Modal.Header className="confirmbox-heading">
            <div className="col-lg-10  col-sm-12 col-md-12">
              <div className="ml-4">
                <h4
                  style={{
                    color: "white",
                  }}
                  className=" text-center ml-4"
                >
                  DEACTIVATE
                </h4>
              </div>
            </div>
            <div className="col-lg-2  col-sm-12 col-md-12">
              <button onClick={() => setDeactiveShow(false)} className="close">
                <img
                  src={require("../../static/images/close.png")}
                  alt="X"
                  style={{ height: "20px", width: "20px" }}
                />
              </button>
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
      {/*  deactivate Modal Ending */}
    </>
  );
};

const mapStateToProps = (state) => ({
  tenants: state.tenants,
  auth: state.auth,
});
export default connect(mapStateToProps, {
  // getalluser,
  getAllSettings,
  deactivateUser,
  getParticularUser,
  get_particular_org_user,
})(UserDetails); // to connect to particular function which is getalluser
