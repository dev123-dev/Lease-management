import React from "react";
import { Modal, Button } from "react-bootstrap";
import { useState, Fragment } from "react";
import Select from "react-select";
import { connect } from "react-redux";
import { AddAdminuser } from "../../actions/tenants";
import { getalluser } from "../../actions/tenants";
import { Form } from "react-bootstrap";

const AddAdminUserModal = ({
  auth: { isAuthenticated, user, users, finalDataRep },
  tenants: { allorg },
  AddAdminuser,
  getalluser,
}) => {
  const [showEditModal, setShowEditModal] = useState(false);
  const [Deactiveshow, setDeactiveShow] = useState(false);

  const onClickReset = () => {
    alert("refersh working");
  };

  const orglist = [];
  console.log(allorg);
  allorg.map((org) => {
    orglist.push({
      label: org.OrganizationName,
      value: org._id,
    });
  });

  const [orgname, setOrgname] = useState({});
  const onchangeOrg = (e) => {
    setOrgname(e);
    console.log(orgname);
  };

  const [formData, setFormData] = useState({
    username: "",
    useremail: "",
    useraddress: "",
    userphone: "",
    usergroup: "",
    OrganizationName: "",
    password: "",
  });

  const { name, email, address, phone, group, OrganizationName, password } =
    formData;

  const UserGroups = [
    { value: "Admin", label: "Admin" },
    { value: "Clerk", label: "Clerk" },
  ];

  const [User, setUser] = useState("");
  const onuser = (e) => {
    setUser(e);
  };

  const onuserchange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onsubmitUserData = () => {
    const finalUserData = {
      username: name,
      useremail: email,
      userphone: phone,
      useraddress: address,
      usergroup: User,
      password: password,
      OrganizationName: user.OrganizationName,
      OrganizationId: user.OrganizationId,
    };

    AddAdminuser(finalUserData);
    handleClose();
    setFormData({
      ...formData,
      name: "",
      phone: "",
      email: "",
      address: "",
      group: "",
      OrganizationName: "",
      password: "",
    });
  };
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [supershow, setSuperShow] = useState(false);
  const superhandleClose = () => setSuperShow(false);
  const superhandleShow = () => setSuperShow(true);

  return isAuthenticated && users && user && user.usergroup === "Admin" ? (
    <>
      <div className="col-lg-2 col-md-11 col-sm-11 col-11 py-4">
        <img
          className=" log"
          onClick={handleShow}
          src={require("../../static/images/add-icon.png")}
          alt="Add User"
          title="Add User"
        />
      </div>
      <Modal
        show={show}
        backdrop="static"
        keyboard={false}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        className="logout-modal"
      >
        <Modal.Header>
          <div className="col-lg-12 col-md-12 col-sm-12 col-12 ">
            <h2>
              <b className="heading_color h1 text-center">Add User</b>{" "}
            </h2>
          </div>
          <div className="  col-lg-2 ">
            <button className=" cluser" onClick={handleClose}>
              <img
                src={require("../../static/images/close.png")}
                alt="X"
                style={{ height: "20px", width: "20px", color: "black" }}
              />
            </button>
          </div>
        </Modal.Header>

        <Modal.Body>
          <div className="container">
            <div className="row">
              <div className="col-lg-6">
                <label>
                  {" "}
                  Name
                  <i className="text-danger ">
                    <b>*</b>
                  </i>
                  :
                </label>{" "}
                <input
                  type="text"
                  name="name"
                  value={name}
                  className="form-control"
                  placeholder="Name"
                  onChange={(e) => onuserchange(e)}
                />
              </div>
              <div className="col-lg-6">
                <label>
                  Email{" "}
                  <i className="text-danger ">
                    <b>*</b>
                  </i>
                  :
                </label>{" "}
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={email}
                  className="form-control"
                  onChange={(e) => onuserchange(e)}
                />
              </div>

              <div className="col-lg-6">
                PhoneNo
                <input
                  type="number"
                  name="phone"
                  placeholder="PhoneNo"
                  value={phone}
                  className="form-control"
                  onChange={(e) => onuserchange(e)}
                />
              </div>
              <div className="col-lg-6">
                {" "}
                <label>
                  Organization belongs to{" "}
                  <i className="text-danger ">
                    <b>*</b>
                  </i>
                  :{" "}
                </label>{" "}
                <input
                  type="text"
                  placeholder="{user.OrganizationName}"
                  value={user.OrganizationName}
                  className="form-control"
                  onChange={(e) => onuserchange(e)}
                />
              </div>

              <div className="col-lg-6">
                {" "}
                <label>
                  Password{" "}
                  <i className="text-danger ">
                    <b>*</b>
                  </i>
                  :
                </label>
                <input
                  type="password"
                  name="password"
                  value={password}
                  placeholder="Password"
                  className="form-control"
                  onChange={(e) => onuserchange(e)}
                />
              </div>
              <div className="col-lg-6">
                {" "}
                <label>
                  ConfirmPassword{" "}
                  <i className="text-danger ">
                    <b>*</b>
                  </i>
                  :
                </label>
                <input
                  type="password"
                  name="password"
                  placeholder="ConfirmPassword"
                  value={password}
                  className="form-control"
                  onChange={(e) => onuserchange(e)}
                />
              </div>
              <div className="col-lg-6">
                Address
                <textarea
                  name="address"
                  value={address}
                  onChange={(e) => onuserchange(e)}
                  className="textarea form-control"
                  rows="5"
                  cols="20"
                  placeholder="Address"
                  style={{ width: "100%" }}
                  required
                ></textarea>{" "}
              </div>

              <div className="col-lg-6">
                <label>
                  UserGroup{" "}
                  <i className="text-danger ">
                    <b>*</b>
                  </i>
                  :{" "}
                </label>
                <Select
                  name="usergroup"
                  options={UserGroups}
                  isSearchable={false}
                  placeholder="Select"
                  onChange={(e) => onuser(e)}
                  theme={(theme) => ({
                    ...theme,
                    height: 26,
                    minHeight: 26,
                    borderRadius: 1,
                    colors: {
                      ...theme.colors,
                      primary: "black",
                    },
                  })}
                />
              </div>
            </div>
          </div>
        </Modal.Body>

        <Modal.Footer>
          {/* save button  */}
          <div className="col-lg-1 Savebutton ">
            <button
              variant="success"
              id="savebtn"
              className="btn sub_form btn_continue Save "
              onClick={() => onsubmitUserData()}
            >
              Save
            </button>
          </div>
        </Modal.Footer>
      </Modal>
    </>
  ) : (
    //for admin side

    <></>
  );
};
const mapStateToProps = (state) => ({
  auth: state.auth,
  tenants: state.tenants,
});
export default connect(mapStateToProps, { AddAdminuser, getalluser })(
  AddAdminUserModal
);
