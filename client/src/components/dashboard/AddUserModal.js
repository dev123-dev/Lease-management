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
  const [show, setshow] = useState("");
  const handleClose = () => setshow(false);
  const handleShow = () => setshow("true");

  const UserGroups = [
    { value: "Admin", label: "Admin" },
    { value: "Super Admin", label: "Super Admin" },
  ];
  //declaring variable for form data
  const [formData, setFormData] = useState({
    username: "",
    useremail: "",
    useraddress: "",
    usernumber: "",
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
    alert("done");
    const finalUserData = {
      username: username,
      useremail: useremail,
      usernumber: usernumber,
      useraddress: useraddress,
      usergroup: usergroup,
      password: password,
    };
    Adduser(finalUserData);
    setFormData({
      ...formData,
      username: "",
      useremail: "",
      useraddress: "",
      Usergroups: "",
      password: "",
    });
  };

  return !isAuthenticated || !user || !users ? (
    <Fragment></Fragment>
  ) : (
    <div>
      <Fragment>
        <div className="col-lg-2 col-md-11 col-sm-11 col-11 py-4">
          <img
            className="img_icon_size log"
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
          aria-labelledby="contained-modal-title-vcenter"
          centered
          className="logout-modal"
        >
          <Modal.Header>
            <div className="col-lg-5 col-md-12 col-sm-12 col-12 ">
              <h2 className="heading_color">Add User Details </h2>
            </div>
          </Modal.Header>

          <Modal.Body>
            <div className="container container_align">
              <div className="row col-lg-12 col-md-9 col-sm-9 col-12 py-3">
                <div className="col-lg-2 col-md-2 col-sm-4 col-12">
                  <label> Name:</label>
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
                  <label>Email *:</label>
                </div>
                <div className="col-lg-4  col-md-4 col-sm-4 col-12">
                  <input
                    type="email"
                    name="useremail"
                    value={useremail}
                    className="form-control"
                    onChange={(e) => onuserchange(e)}
                  />
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
                </div>

                <div className="col-lg-2 col-md-2 col-sm-4 col-12">
                  <label>Password :</label>
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
                  <label>Organization belongs to : </label>
                </div>
                <div className="col-lg-4 col-md-4 col-sm-4 col-12">
                  <input
                    type="dropdown"
                    // name="useraddr"
                    // value={useraddress}
                    className="form-control"
                    //onChange={(e) => onuserchange(e)}
                  />
                </div>
              </div>

              {/* <div className="row col-lg-12 col-md-9 col-sm-9 col-12 py-3">
            <div className="col-lg-2 col-md-2 col-sm-4 col-12">
              <label> Organization Belongs To *:</label>
            </div>

            <div className="col-lg-4 col-md-4 col-sm-6 col-12">
              <textarea
                //   name="orgbelong"
                //   value={orgbelongd}
                //    id="tenantAddr"
                className="textarea form-control"
                rows="3"
                placeholder="Organization Belongs To"
               // onChange={(e) => onInputChange(e)}
                style={{ width: "100%" }}
                required
              ></textarea>
            </div>

            <div className="col-lg-2 col-md-2 col-sm-4 col-12">
              <label>Password:</label>
            </div>
            <div className="col-lg-4 col-md-4 col-sm-4 col-12">
              <input
                type="text"
                // name="tenantPhone"
                // value={tenantPhone}
                className="form-control"
                //onChange={(e) => onInputChange(e)}
              
              />
            </div>
          </div> */}
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
          </Modal.Body>
          <Modal.Footer>
            {/* save button */}
            <div className="col-lg-12 Savebutton " size="lg">
              <button
                variant="success"
                className="btn sub_form btn_continue Save float-right"
                onClick={() => onsubmitUserData()}
              >
                Save
              </button>
            </div>
            <div className="col-lg-12 Savebutton " size="lg">
              <button
                variant="success"
                className="btn sub_form btn_continue Save float-left"
                onClick={() => handleClose()}
              >
                Close
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
    </div>
  );
};
const mapStateToProps = (state) => ({
  auth: state.auth,
  tenants: state.tenants,
});
export default connect(mapStateToProps, { Adduser })(AddUserModal);
