import React, { useState, Fragment } from "react";
import { connect } from "react-redux";
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
  const [formData, setFormData] = useState({
    username: "",
    useremail: "",
    useraddress: "",
    userphone: "",
    usergroup: "",
    OrganizationName: "",
    password: "",
  });

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
  const onuserchange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  return !isAuthenticated || !user || !users ? (
    <Fragment></Fragment>
  ) : (
    <Fragment>
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-6">
            <label> Name*:</label>
            <input
              type="text"
              name="username"
              value={username}
              className="form-control"
              onChange={(e) => onInputChange(e)}
            />
          </div>
          <div className="col-lg-6">
            <label> Email*: </label>
            <input
              type="email"
              name="useremail"
              value={useremail}
              className="form-control"
              onChange={(e) => onInputChange(e)}
              required
            />{" "}
          </div>
          <div className="col-lg-6">
            <label>Phone No:</label>

            <input
              type="number"
              name="userphone"
              value={userphone}
              className="form-control"
              onChange={(e) => onInputChange(e)}
            />
          </div>
          <div className="col-lg-6">
            <label>Organization belongs to*: </label>
            <input
              type="text"
              placeholder="{OrganizationName}"
              value={OrganizationName}
              className="form-control"
              onChange={(e) => onuserchange(e)}
            />
          </div>
          <div className="col-lg-6">
            <label>User Group*:</label>

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
            <label> Address</label>
            <textarea
              name="useraddress"
              value={useraddress}
              className="textarea form-control"
              rows="3"
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
          Save
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
  UpdateUser,
  getalluser,
})(EditAdminUser);
