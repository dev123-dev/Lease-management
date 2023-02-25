import React from "react";
import { Modal, Button } from "react-bootstrap";
import { useState, Fragment } from "react";
import Select from "react-select";
import { connect } from "react-redux";
import { Adduser } from "../../actions/tenants";

const AddUserModal = ({
  auth: { isAuthenticated, user, users, finalDataRep },
  Adduser,
}) => {
  // const [show, setshow] = useState("");
  // const handleClose = () => setshow(false);
  // const handleShow = () => setshow("true");
  console.log("this is user data");
  //console.log(user.usergroup);
  const UserGroups = [
    { value: "Admin", label: "Admin" },
    { value: "Super Admin", label: "Super Admin" },
  ];
  //declaring variable for form data
  const [formData, setFormData] = useState({
    username: "",
    useremail: "",
    useraddress: "",
    userphone: "",
    usergroup: "",
    password: "",
  });
  const { username, useremail, useraddress, usernumber, usergroup, password } =
    formData;
  const onuserChange = (e) => {
    if (e) {
      setFormData({ ...formData, usergroup: e.value });
    }
  };

  const onuserchange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const onsubmitUserData = () => {
    const finalUserData = {
      username: username,
      useremail: useremail,
      userphone: usernumber,
      useraddress: useraddress,
      usergroup: usergroup,
      password: password,
    };
    handleClose();
    Adduser(finalUserData);
    setFormData({
      ...formData,
      username: "",
      userphone: "",
      useremail: "",
      useraddress: "",
      Usergroups: "",
      password: "",
    });
  };
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [supershow, setSuperShow] = useState(false);
  const superhandleClose = () => setSuperShow(false);
  const superhandleShow = () => setSuperShow(true);
  //should not remove below the console statement otherwise it will cause an error saying user.usergroup is undefined.
  console.log("this is admin", user);
  // if (x === " Super Admin") {
  //   superhandleShow();
  // } else {
  //   handleShow();
  // }

  return isAuthenticated &&
    users &&
    user &&
    user.usergroup === "Super Admin" ? (
    <Fragment>
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
            <h2 className="heading_color h3 text-center">
              Add for SUPER admin User{" "}
            </h2>
          </div>
          <div className=" close-btn-wrapper col-lg-2 close">
            <button className=" ml-5  close-btn" onClick={handleClose}>
              <img
                src={require("../../static/images/close.png")}
                alt="X"
                style={{ height: "20px", width: "20px", color: "black" }}
              />
            </button>
          </div>
        </Modal.Header>

        <Modal.Body>
          <div className="container container_align">
            <div className="row col-lg-12 col-md-9 col-sm-9 col-12 py-3">
              <div className="col-lg-2 col-md-2 col-sm-4 col-12">
                <label>
                  {" "}
                  Name
                  <i className="text-danger ">
                    <b>*</b>
                  </i>
                  :
                </label>
              </div>
              <div className="col-lg-4 col-md-4 col-sm-4 col-12">
                <input
                  type="text"
                  name="username"
                  value={username}
                  className="form-control"
                  onChange={(e) => onuserchange(e)}
                />
              </div>

              <div className="col-lg-2 col-md-2 col-sm-4 col-12">
                <label>
                  Email{" "}
                  <i className="text-danger ">
                    <b>*</b>
                  </i>
                  :
                </label>
              </div>
              <div className="col-lg-4  col-md-4 col-sm-4 col-12">
                <input
                  type="email"
                  name="useremail"
                  value={useremail}
                  className="form-control"
                  onChange={(e) => onuserchange(e)}
                />
                <br></br>
              </div>

              <div className="col-lg-2 col-md-2 col-sm-4 col-12">
                <label>Phone No:</label>
              </div>
              <div className="col-lg-4 col-md-4 col-sm-4 col-12">
                <input
                  type="number"
                  name="usernumber"
                  value={usernumber}
                  className="form-control"
                  onChange={(e) => onuserchange(e)}
                />
              </div>

              <div className="col-lg-2 col-md-2 col-sm-4 col-12">
                <label>Address:</label>
              </div>
              <div className="col-lg-4 col-md-4 col-sm-4 col-12">
                <input
                  type="text"
                  name="useraddress"
                  value={useraddress}
                  className="form-control"
                  onChange={(e) => onuserchange(e)}
                />
                <br></br>
              </div>

              <div className="col-lg-2 col-md-2 col-sm-4 col-12">
                <label>
                  Password{" "}
                  <i className="text-danger ">
                    <b>*</b>
                  </i>
                  :
                </label>
              </div>
              <div className="col-lg-4 col-md-4 col-sm-4 col-12">
                <input
                  type="text"
                  name="password"
                  value={password}
                  className="form-control"
                  onChange={(e) => onuserchange(e)}
                />
              </div>

              {/* organization belongs to this need to be connected to database pending */}

              <div className="col-lg-2 col-md-2 col-sm-4 col-12">
                <label>
                  Organization belongs to{" "}
                  <i className="text-danger ">
                    <b>*</b>
                  </i>
                  :{" "}
                </label>
              </div>

              <div className="col-lg-4  col-md-4 col-sm-4 col-12">
                <Select
                  name="usergroup"
                  options={UserGroups}
                  isSearchable={false}
                  placeholder="Select"
                  onChange={(e) => onuserChange(e)}
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
          {/* save button */}
          <div className="col-lg-1 Savebutton ">
            <button
              variant="success"
              className="btn sub_form btn_continue Save "
              onClick={() => onsubmitUserData()}
            >
              Save
            </button>
          </div>
        </Modal.Footer>
      </Modal>

      {/* <Modal
          show={showInformationModal}
          backdrop="static"
          keyboard={false}
          aria-labelledby="contained-modal-title-vcenter"
          centered
          className="logout-modal"
        >
          <Modal.Header className="confirmbox-heading">
            <h4 className="mt-0">Information</h4>
          </Modal.Header>
          <Modal.Body>
            <h5>Details Added!!</h5>
          </Modal.Body>
          <Modal.Footer>
            <button
              className="btn btn_green_bg"
              onClick={() => LogoutModalClose()}
            >
              OK
            </button>
          </Modal.Footer>
        </Modal> */}
    </Fragment>
  ) : (
    <div>
      {/* <Fragment> */}
      <div className="col-lg-2 col-md-11 col-sm-11 col-11 py-4">
        <img
          className=" log"
          onClick={superhandleShow}
          src={require("../../static/images/add-icon.png")}
          alt="Add User"
          title="Add User"
        />
      </div>
      <Modal
        show={supershow}
        backdrop="static"
        keyboard={false}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        className="logout-modal"
      >
        <Modal.Header>
          <div className="col-lg-12 col-md-12 col-sm-12 col-12 ">
            <h2 className="heading_color h1 text-center">
              <b>Add User</b>{" "}
            </h2>
          </div>
          <div className="  col-lg-2 ">
            <button className=" ml-5  close cl" onClick={superhandleClose}>
              <img
                src={require("../../static/images/close.png")}
                alt="X"
                style={{ height: "20px", width: "20px", color: "black" }}
              />
            </button>
          </div>
        </Modal.Header>
        <Modal.Body>
          <div className="container-fluid">
            <div className="row">
              <div className="col-lg-6">
                {" "}
                <label>
                  {" "}
                  Name
                  <i className="text-danger ">
                    <b>*</b>
                  </i>
                </label>
                <input
                  type="text"
                  name="username"
                  value={username}
                  className="form-control"
                  onChange={(e) => onuserchange(e)}
                />
              </div>
              <div className="col-lg-6">
                <label>
                  Email{" "}
                  <i className="text-danger ">
                    <b>*</b>
                  </i>
                </label>
                <input
                  type="email"
                  name="useremail"
                  value={useremail}
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
                  value={password}
                  className="form-control"
                  onChange={(e) => onuserchange(e)}
                />
              </div>
              <div className="col-lg-6">
                PhoneNo
                <input
                  type="number"
                  name="usernumber"
                  value={usernumber}
                  className="form-control"
                  onChange={(e) => onuserchange(e)}
                />
              </div>
              <div className="col-lg-6">
                {" "}
                <label>
                  UserGroup{" "}
                  <i className="text-danger ">
                    <b>*</b>
                  </i>
                </label>
                <Select
                  name="usergroup"
                  options={UserGroups}
                  isSearchable={false}
                  placeholder="Select"
                  onChange={(e) => onuserChange(e)}
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
              <div className="col-lg-6">
                Address
                <textarea
                  name="useraddress"
                  value={useraddress}
                  id="useraddress"
                  className="textarea form-control"
                  rows="4"
                  placeholder="Address"
                  onChange={(e) => onuserChange(e)}
                  style={{ width: "100%" }}
                  required
                ></textarea>
              </div>

              <div className="col-lg-6"></div>
            </div>
          </div>
        </Modal.Body>

        <Modal.Footer>
          {/* save button */}
          <div className="col-lg-1 Savebutton ">
            <button
              variant="success"
              id="savebtnt"
              className="btn sub_form btn_continue Save "
              onClick={() => onsubmitUserData()}
            >
              Save
            </button>
          </div>
        </Modal.Footer>
      </Modal>

      {/* <Modal
      show={showInformationModal}
      backdrop="static"
      keyboard={false}
      aria-labelledby="contained-modal-title-vcenter"
      centered
      className="logout-modal"
    >
      <Modal.Header className="confirmbox-heading">
        <h4 className="mt-0">Information</h4>
      </Modal.Header>
      <Modal.Body>
        <h5>Details Added!!</h5>
      </Modal.Body>
      <Modal.Footer>
        <button
          className="btn btn_green_bg"
          onClick={() => LogoutModalClose()}
        >
          OK
        </button>
      </Modal.Footer>
    </Modal> */}
      {/* </Fragment> */}
    </div>
  );
};
const mapStateToProps = (state) => ({
  auth: state.auth,
  tenants: state.tenants,
});
export default connect(mapStateToProps, { Adduser })(AddUserModal);
