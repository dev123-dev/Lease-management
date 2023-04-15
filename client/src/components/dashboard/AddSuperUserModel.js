import React, { useEffect } from "react";
import { Modal, Button, ModalFooter } from "react-bootstrap";
import { useState, Fragment } from "react";
import Select from "react-select";
import { connect } from "react-redux";
import { Adduser } from "../../actions/tenants";

const AddSuperUserModel = ({
  auth: { isAuthenticated, user, users, finalDataRep },
  tenants: { allorg },
  Adduser,
  setShowadd,
}) => {
  const orglist = [];
  allorg.map((org) => {
    if (org.org_status != "Deactive") {
      orglist.push({
        label: org.OrganizationName,
        value: org._id,
      });
    }
  });

  const [orgname, setOrgname] = useState({});

  const [formData, setFormData] = useState({
    username: "",
    useremail: "",
    address: "",
    userphone: "",
    usergroup: "",
    OrganizationName: "",
    password: "",
    cpassword: "",
  });

  const {
    name,
    email,
    address,
    phone,
    group,
    OrganizationName,
    password,
    rePassword,
  } = formData;

  const [us, setus] = useState("");

  // password validation starting
  const [error, setError] = useState({
    passwordValChecker: false,
    passwordValResult: "",
    passwordValStyle: {},
    passwordInptErrStyle: {},

    repwdValChecker: false,
    repwdValResult: "",
    repwdValStyle: {},
    repwdInptErrStyle: {},
  });
  const onPasswordChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case "password":
        if (value === "") {
          setError({
            ...error,
            passwordValChecker: true,
            passwordValResult: "REQUIRED",
            passwordValStyle: { color: "#FF0000", marginTop: "30px" },
            passwordInptErrStyle: { border: "1px solid #FF0000" },
          });
          setFormData({ ...formData, [e.target.name]: "" });
        } else {
          const pwdFilter =
            /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,20}$/;
          if (pwdFilter.test(value)) {
            setError({
              ...error,
              passwordValChecker: true,
              passwordValResult: "STRONG",
              passwordValStyle: { color: "#43b90f", marginTop: "30px" },
              passwordInptErrStyle: { border: "1px solid #43b90f" },
            });
          } else {
            setError({
              ...error,
              passwordValChecker: true,
              passwordValResult: "WEAK",
              passwordValStyle: { color: "#FF0000", marginTop: "30px" },
              passwordInptErrStyle: { border: "1px solid #FF0000" },
            });
          }
          setFormData({ ...formData, [e.target.name]: value });
        }
        break;

      case "rePassword":
        if (value === "") {
          setError({
            ...error,
            repwdValChecker: true,
            repwdValResult: "REQUIRED",
            repwdValStyle: { color: "#FF0000", marginTop: "30px" },
            repwdInptErrStyle: { border: "1px solid #FF0000" },
          });
          setFormData({ ...formData, [e.target.name]: "" });
        } else {
          if (value === formData.password) {
            setError({
              ...error,
              repwdValChecker: true,
              repwdValResult: "MATCHED",
              repwdValStyle: { color: "#43b90f", marginTop: "30px" },
              repwdInptErrStyle: { border: "1px solid #43b90f" },
            });
          } else {
            setError({
              ...error,
              repwdValChecker: true,
              repwdValResult: "DOES NOT MATCH",
              repwdValStyle: { color: "#FF0000", marginTop: "30px" },
              repwdInptErrStyle: { border: "1px solid #FF0000" },
            });
          }
          setFormData({ ...formData, [e.target.name]: value });
        }
        break;

      default:
        break;
    }
  };
  const {
    passwordValChecker,
    passwordValResult,
    passwordValStyle,
    passwordInptErrStyle,

    repwdValChecker,
    repwdValResult,
    repwdValStyle,
    repwdInptErrStyle,
  } = error;

  const checkErrors = (formData) => {
    if (formData && formData.password === "") {
      setError({
        ...error,
        passwordValChecker: true,
        passwordValResult: "REQUIRED",
        passwordValStyle: { color: "#FF0000", marginTop: "-20px" },
        passwordInptErrStyle: { border: "1px solid #FF0000" },
      });
      return false;
    }
    if (formData && formData.rePassword !== formData.password) {
      setError({
        ...error,
        repwdValChecker: true,
        repwdValResult: "DOES NOT MATCH",
        //repwdValResult: 'REQUIRED',
        repwdValStyle: { color: "#FF0000", marginTop: "10px" },
        repwdInptErrStyle: { border: "1px solid #FF0000" },
      });
      return false;
    }

    if (formData && formData.rePassword === "") {
      setError({
        ...error,
        repwdValChecker: true,
        repwdValResult: "REQUIRED",
        repwdValStyle: { color: "#FF0000", marginTop: "10px" },
        repwdInptErrStyle: { border: "1px solid #FF0000" },
      });
      return false;
    }

    return true;
  };

  // password validation is ending
  const UserGroups = [
    { value: "Admin", label: "Admin" },
    // { value: "Super Admin", label: "Super Admin" },
  ];

  const onuserchange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  //Required Validation Starts
  const [errors, setErrors] = useState({
    orgChecker: false,
    orgErrorStyle: {},
    userGroupChecker: false,
    userGroupErrorStyle: {},
  });
  const { orgChecker, orgErrorStyle, userGroupChecker, userGroupErrorStyle } =
    error;

  const checkError = () => {
    if (!orgChecker) {
      setError({
        ...error,
        orgErrorStyle: { color: "#F00" },
      });
      return false;
    }
    if (!userGroupChecker) {
      setError({
        ...error,
        userGroupErrorStyle: { color: "#F00" },
      });
      return false;
    }

    return true;
  };

  const onchangeOrg = (e) => {
    setError({
      ...error,
      orgChecker: true,
      orgErrorStyle: { color: "#000" },
    });
    setOrgname(e);
  };

  const onuser = (e) => {
    setError({
      ...error,
      userGroupChecker: true,
      userGroupErrorStyle: { color: "#000" },
    });
    setus(e);
  };

  //fill all field state

  const onsubmitUserData = (e) => {
    e.preventDefault();
    if (checkError()) {
      const finalUserData = {
        username: name,
        useremail: email,
        userphone: phone,
        useraddress: address,
        usergroup: us,
        password: rePassword,
        OrganizationName: orgname,
      };

      Adduser(finalUserData);
      setShowadd(false);
      setFormData({
        ...formData,
        name: "",
        phone: "",
        email: "",
        address: "",
        group: "",
        OrganizationName: "",
        password: "",
        password: "",
      });
    }
  };

  //should not remove below the console statement otherwise it will cause an error saying user.usergroup is undefined.

  return isAuthenticated &&
    users &&
    user &&
    user.usergroup === "Super Admin" ? (
    //for super admin
    <Fragment>
      <Modal.Header className="confirmbox-heading">
        <div className="col-lg-10  col-sm-12 col-md-12 ">
          <div className="ml-5">
            <h4
              style={{
                color: "white",
              }}
              className="text-center  ml-4 "
            >
              ADD USER DETAILS{" "}
            </h4>
          </div>
        </div>
        <div className="col-lg-2  col-sm-12 col-md-12 ">
          <button onClick={() => setShowadd(false)} className="close">
            <img
              className="editcl"
              src={require("../../static/images/close.png")}
              alt="X"
              style={{ height: "20px", width: "20px" }}
            />
          </button>
        </div>
      </Modal.Header>

      <Modal.Body>
        <form onSubmit={(e) => onsubmitUserData(e)}>
          <div className="container">
            <div className="row">
              <div className="col-lg-6  col-sm-12 col-md-12">
                <label> Name*:</label>{" "}
                <input
                  type="text"
                  name="name"
                  value={name}
                  className="form-control"
                  placeholder="Name"
                  onChange={(e) => onuserchange(e)}
                  required
                />
                <br></br>
              </div>
              <div className="col-lg-6  col-sm-12 col-md-12">
                <label>Email*:</label>{" "}
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={email}
                  className="form-control"
                  autoComplete="new-password"
                  onChange={(e) => onuserchange(e)}
                  required
                />
              </div>
              <div className="col-lg-6  col-sm-12 col-md-12">
                <label>Phone No:</label>
                <input
                  type="text"
                  name="phone"
                  placeholder="Phone No"
                  value={phone}
                  pattern="\d{10}"
                  title=" 10 Digits only"
                  className="form-control"
                  onChange={(e) => onuserchange(e)}
                />
                <br></br>
              </div>
              <div className="control-group col-md-6 col-lg-6 col-sm-6 col-xs-6">
                <label className="control-label" style={orgErrorStyle}>
                  Organization Belong<span>*</span>
                </label>
                <div className="controls">
                  <Select
                    name="orgname"
                    options={orglist}
                    theme={(theme) => ({
                      ...theme,
                      borderRadius: 0,
                      colors: {
                        ...theme.colors,
                        primary25: "#e8a317",
                        primary: "#095a4a",
                        
                      },
                    })}
                    isSearchable={true}
                    value={orgname}
                    placeholder="Select Organization"
                    onChange={(e) => onchangeOrg(e)}
                  />

                  <span className="form-input-info"></span>
                </div>
              </div>
              
              <div className="col-lg-6  col-sm-12 col-md-12">
                <label className="control-label">Password*:</label>
                <div className="controls">
                  <input
                    name="password"
                    id="user_password"
                    type="password"
                    placeholder="Password"
                    autoComplete="new-password"
                    value={password}
                    className="form-control"
                    style={passwordInptErrStyle}
                    onChange={(e) => onPasswordChange(e)}
                    required
                  />
                  {passwordValChecker && (
                    <span className="form-input-info" style={passwordValStyle}>
                      {passwordValResult}
                    </span>
                  )}
                </div>
              </div>

              <div className="col-lg-6  col-sm-12 col-md-12">
                <label className="control-label">Confirm Password*:</label>
                <div className="controls">
                  <input
                    name="rePassword"
                    id="user_confpass"
                    placeholder="Confirm Password"
                    type="password"
                    value={rePassword}
                    autoComplete="new-password"
                    className="form-control"
                    style={repwdInptErrStyle}
                    onChange={(e) => onPasswordChange(e)}
                    required
                  />
                  {repwdValChecker && (
                    <Fragment>
                      <span className="form-input-info" style={repwdValStyle}>
                        {repwdValResult}
                      </span>
                    </Fragment>
                  )}
                  <span id="category_result" className="form-input-info"></span>
                </div>
              </div>

              <div className="col-lg-6  col-sm-12 col-md-12">
                <label>Address:</label>
                <textarea
                  name="address"
                  value={address}
                  onChange={(e) => onuserchange(e)}
                  className="textarea form-control"
                  rows="3"
                  cols="20"
                  placeholder="Address"
                  style={{ width: "100%" }}
                ></textarea>{" "}
              </div>
              <div className="col-lg-6  col-sm-12 col-md-12">
                <label style={userGroupErrorStyle}>UserGroup*:</label>
                <Select
                  name="usergroup"
                  className=""
                  options={UserGroups}
                  isSearchable={false}
                  placeholder="Select...."
                  onChange={(e) => onuser(e)}
                  theme={(theme) => ({
                    ...theme,
                    height: 26,
                    minHeight: 26,
                    borderRadius: 1,

                    colors: {
                      ...theme.colors,
                      primary25: "#e8a317",
                      primary: "#095a4a",
                      
                    },
                  })}
                  required
                />
              </div>
              <div className="col-lg-9  col-sm-12 col-md-12 text-danger">
                * Indicates mandatory fields, Please fill mandatory fields
                before Submit
              </div>
              <div className="col-lg-3  col-sm-12 col-md-12">
                <ModalFooter>
                  <div className="Savebutton " size="lg">
                    <button
                      variant="success"
                      id="savebtn"
                      className="btn sub_form btn_continue Save float-right "
                    >
                      Save
                    </button>
                  </div>
                </ModalFooter>
              </div>
            </div>
          </div>
        </form>
      </Modal.Body>
    </Fragment>
  ) : (
    //for admin side

    <></>
  );
};
const mapStateToProps = (state) => ({
  auth: state.auth,
  tenants: state.tenants,
});
export default connect(mapStateToProps, { Adduser })(AddSuperUserModel);
