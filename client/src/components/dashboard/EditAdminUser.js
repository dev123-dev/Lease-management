import React, { useState, useEffect, Fragment } from "react";
import { connect } from "react-redux";
import AddOrgModal from "./AddOrgModal";
import { Props } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Select from "react-select";
import "../../../../client/src/styles/CustomisedStyle.css";
import { UpdateUser } from "../../actions/tenants";
import { getalluser } from "../../actions/tenants";

const EditAdminUser = ({
  auth: { isAuthenticated, user, users },
  tenants: { allorg },
  org,
  UpdateUser,
  getalluser,
}) => {
  const [orgname, setOrgname] = useState({});

  const orglist = [];
  allorg.map((org) => {
    orglist.push({
      label: org.OrganizationName,
      value: org._id,
    });
  });

  const onchangeOrg = (e) => {
    setOrgname(e);
  };
  const UserGroups = [
    { value: "Admin", label: "Admin" },
    { value: "Super Admin", label: "Super Admin" },
  ];

  const [showEditModal, setShowEditModal] = useState(false);
  const handleEditModalClose = () => setShowEditModal(false);
  const handleOpen = () => setShowEditModal(true);
  const onAddStaffModalChange = (e) => {
    if (e) {
      handleEditModalClose();
    }
  };
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [userid, setId] = useState("");

  const onedit = (id) => {
    setId(id);
    handleOpen();
  };

  // adding multiple location start
  const [inputdata, setinput] = useState("");
  const [items, setitem] = useState();

  const addItem = () => {
    if (!inputdata) {
    } else {
      setitem([...items, inputdata]);
      setinput("");
    }
  };
  //multiple location end

  const [userData, setuserData] = useState({
    //  userid : org[0]._id,
    username: org.username,
    useremail: org.useremail,
    usergroup: org.usergroup,
    useraddress: org.useraddress,
    userphone: org.userphone,
    OrganizationName: org.OrganizationName,
  });
  const {
    username,
    useremail,
    usergroup,
    useraddress,
    userphone,
    OrganizationName,
  } = userData;
  const onInputChange = (e) => {
    setuserData({ ...userData, [e.target.name]: e.target.value });
  };

  const [us, setus] = useState("");

  const onuser = (e) => {
    setus(e);
  };

  const onUpdate = () => {
    const updateUSER = {
      userid: org._id,
      username: username,
      userphone: userphone,
      useraddress: useraddress,
      useremail: useremail,
      usergroup: us,
      OrganizationName: orgname,
    };
    UpdateUser(updateUSER);
    getalluser();
  };
  return !isAuthenticated || !user || !users ? (
    <Fragment></Fragment>
  ) : (
    <Fragment>
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-6">
            <label> Name:</label>

            {/* <div className="col-lg-3 col-md-4 col-sm-4 col-12"> */}
            <input
              type="text"
              name="username"
              value={username}
              // onChange={(e) => onORGchange(e)}
              className="form-control"
              onChange={(e) => onInputChange(e)}
            />
          </div>
          <div className="col-lg-6">
            <label> Email </label>
            {/* <div className="col-lg-3  col-md-4 col-sm-4 col-12"> */}
            <input
              type="email"
              name="useremail"
              value={useremail}
              // onChange={(e) => onORGchange(e)}
              className="form-control"
              onChange={(e) => onInputChange(e)}
              required
            />{" "}
          </div>
          <div className="col-lg-6">
            <label>Phone No:</label>

            {/* <div className="col-lg-4 col-md-4 col-sm-4 col-12"> */}
            <input
              type="number"
              name="userphone"
              value={userphone}
              // onChange={(e) => onORGchange(e)}
              className="form-control"
              onChange={(e) => onInputChange(e)}
            />
          </div>
          <div className="col-lg-6">
            <label>
              Organization belongs to{" "}
              <i className="text-danger ">
                <b>*</b>
              </i>
              :{" "}
            </label>

            <Select
              name="orgname"
              options={orglist}
              value={orgname}
              onChange={(e) => onchangeOrg(e)}
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
            >
              select Organization
            </Select>
          </div>
          <div className="col-lg-6">
            <label>
              User Group
              <i className="text-danger ">
                <b>*</b>
              </i>
              :{" "}
            </label>

            <Select
              name="group"
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
          <div className="col-lg-6">
            <label> Address *:</label>
            {/* <div className="col-lg-3 col-md-4 col-sm-6 col-12"> */}
            <textarea
              name="useraddress"
              value={useraddress}
              // onChange={(e) => onORGchange(e)}
              // id="tenantAddr"
              className="textarea form-control"
              rows="5"
              cols="20"
              placeholder="Address"
              onChange={(e) => onInputChange(e)}
              style={{ width: "100%" }}
              required
            ></textarea>{" "}
          </div>
        </div>
      </div>

      {/* </div> */}
      <div className="col-lg-12 Savebutton " size="lg">
        <button
          id="savebtn"
          variant="success"
          className="btn sub_form btn_continue Save float-right"
          onClick={() => onUpdate()}
        >
          Update
        </button>
      </div>
    </Fragment>
  );
};
const mapStateToProps = (state) => ({
  tenants: state.tenants,
  auth: state.auth,
});
export default connect(mapStateToProps, {
  // getalluser,
  //getAllSettings,
  //  deactivateUser,
  UpdateUser,
  getalluser,
})(EditAdminUser); // to connect to particular function which is getalluser
