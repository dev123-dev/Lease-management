import React, { useEffect, useState } from "react";
import AddUserModal from "./AddUserModal";
import { Modal, Button, Form } from "react-bootstrap";
import tenants from "../../reducers/tenants";
import { getAllSettings } from "../../actions/tenants";
import { connect } from "react-redux";
import { getalluser } from "../../actions/tenants";
import PropTypes from "prop-types";
import { deactivateUser } from "../../actions/tenants";
import Edituser from "./Edituser";
import AddAdminModal from "./AddAdminModal";
import { getParticularUser } from "../../actions/tenants";
import EditAdminUser from "./EditAdminUser";

const AddSuperUser = ({
  auth: { isAuthenticated, loading, user},
  tenants: { allsuperuser,particular_user }, //this is a reudcer
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

console.log(user,particular_user);

  useEffect(() => {
    getParticularUser({OrganizationName : user.OrganizationName,OrganizationId : user.OrganizationId});
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

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [userdata, setuser] = useState("");
  const [OrgId, setId] = useState("");

  const onDelete = (id) => {
    setId(id);
    handleShow();
  };

  const onEdit = (allsuperuse, id) => {
  console.log("in edit",allsuperuse);
    setShowUpdateModal(true);
    setId(id);
    setuser(allsuperuse);
    setShowUpdateModal(true);
  };

  const[Admindata,setAdmin]=useState('');
  const[AdminId,Setid]=useState('');
  const onAdminEdit = (user,id)=>{
    setShowUpdateModal(true);
    Setid(id);
    setAdmin(user);
    setShowUpdateModal(true);
  }

  const onAdd = () => {
    const reason = {
      Org_id: OrgId,
      userStatus: "Deactive",
      deactive_reason: deactive_reason,
    };
    console.log("deactive reason",reason)
    deactivateUser(reason);
  };

  const onAdminAdd = () => {
    const reason = {
      Org_id: AdminId,
      userStatus: "Deactive",
      deactive_reason: deactive_reason,
    };
    console.log("deactive reason",reason)
    deactivateUser(reason);
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
                <h2 className="heading_color">User Details </h2>
              </div>
              <AddUserModal />
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
                            console.log(allsuperuse);
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

                                {/* {orgVal.AgreementStatus === "Expired" ? (
                                <td>
                                  <center>
                                     <button
                                      variant="success"
                                      className="btn sub_form"
                                      // onClick={() =>
                                      //   onRenewal(orgVal, idx)
                                      // }
                                    >
                                      Renewal
                                    </button> 
                                  </center>
                                </td>
                              
                              ) : (
                                <td></td>
                              )} */}
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
            show={show}
            // onHide={handleClose}
            centered
          >
            <Modal.Title className="text-center">
              <b>Deactivate</b>
            </Modal.Title>
            {/* <Modal.Header className="lg" ></Modal.Header> */}
            <Modal.Body>
              <Form>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Label>Reason For Deactivating</Form.Label>
                  <textarea
                    rows="2"
                    name="Organization_DE_Reason"
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
                onClick={onAdd}
              >
                Save
              </Button>
              <Button variant="primary" onClick={handleClose} id="savebtn">
                close
              </Button>
            </Modal.Footer>
          </Modal>
          {/* Modal Ending */}

          {/* Modal for Editing the Super user */}
          <Modal
            show={showUpdateModal}
            backdrop="static"
            keyboard={false}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
          >
            <Modal.Header>
              <div className="col-lg-10">
                <h3 className="modal-title text-center h3">
                  <b>Edit User Details </b>
                </h3>
              </div>
              <div className="col-lg-2">
                <button onClick={handleUpdateModalClose} className="close">
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
                // onUpdateModalChange={onUpdateModalChange}
              />
            </Modal.Body>
          </Modal>
          {/* Modal Edit Ending */}
        </div>
      ) : (
        // this is for admin page listing
          <div className="container container_align ">
            <section className="sub_reg">
              <div className="row col-lg-12 col-md-12 col-sm-12 col-12 no_padding">
                <div className="col-lg-10 col-md-11 col-sm-11 col-11 ">
                  <h2 className="heading_color">Add Admin User Details </h2>
                </div>
                <AddAdminModal/>
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
                            <th>Operation</th>
                          </tr>
                        </thead>
                        <tbody>
                          {particular_user &&
                            particular_user[0] &&
                            particular_user.map((adminuser, idx) => {
                              return (
                                <tr key={idx}>
                                  <td>{adminuser.username}</td>
                                  <td>{adminuser.useremail}</td>
                                  <td>{adminuser.userphone}</td>
                                  <td>{adminuser.usergroup}</td>
                                  <td>{adminuser.OrganizationName}</td>
                                  <td>{adminuser.userStatus}</td>
                                  <td>
                                    <img
                                      className="img_icon_size log"
                                      // onClick={() => onClickHandler()}
                                      onClick={() => onAdminEdit(adminuser, idx)()}
                                      src={require("../../static/images/edit_icon.png")}
                                      alt="Edit"
                                      title="Add User"
                                    />
                                    <img
                                      className="img_icon_size log"
                                      // onClick={() => onClickHandler()}
                                      onClick={() => onDelete()}
                                      src={require("../../static/images/delete.png")}
                                      alt="Add User"
                                      title="Add User"
                                    />
                                  </td>

                                  {/* {orgVal.AgreementStatus === "Expired" ? (
                                <td>
                                  <center>
                                     <button
                                      variant="success"
                                      className="btn sub_form"
                                      // onClick={() =>
                                      //   onRenewal(orgVal, idx)
                                      // }
                                    >
                                      Renewal
                                    </button> 
                                  </center>
                                </td>
                              
                              ) : (
                                <td></td>
                              )} */}
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
      )}
       {/* deactivating the Super User */}
       <Modal
        show={show}
        centered
      >
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
      </Modal>
      {/*  End Deactivating the user  */}
       {/* edit org old code starting */}
       <Modal
        show={showUpdateModal}
        backdrop="static"
        keyboard={false}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header>
          <div className="col-lg-10">
            <h3 className="modal-title text-center h3">
              <b>Edit Organization Details </b>
            </h3>
          </div>
          <div className="col-lg-2">
            <button onClick={handleUpdateModalClose} className="close">
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
      {/* edit old code end */}
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
})(AddSuperUser); // to connect to particular function which is getalluser
