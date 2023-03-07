import React, { useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import { useState, Fragment } from "react";
import Select from "react-select";
import { connect } from "react-redux";
import { Adduser } from "../../actions/tenants";

const AddSuperUserModel = ({
  auth: { isAuthenticated, user, users, finalDataRep },
  tenants: { allorg },
  Adduser,
}) => {
  const orglist = [];
  allorg.map((org) => {
    orglist.push({
      label: org.OrganizationName,
      value: org._id,
    });
  });

  const [orgname, setOrgname] = useState({});
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

  const onuser = (e) => {
    setus(e);
  };

  const [PASSWORD, SETPASSWORD] = useState("");
  const [finalPass, Setpass] = useState("");
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
    { value: "Super Admin", label: "Super Admin" },
  ];

  const onuserchange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  //fill all field state
  const [fill, setfill] = useState(false);
  const onsubmitUserData = () => {
    if (
      name === "" ||
      email === "" ||
      address === "" ||
      us === "" ||
      password === "" ||
      orgname === ""
    ) {
      setfill(true);
    } else {
      const finalUserData = {
        username: name,
        useremail: email,
        userphone: phone,
        useraddress: address,
        usergroup: us,
        password: rePassword,
        OrganizationName: orgname,
      };

      setShowAdd(false);
      Adduser(finalUserData);
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
  const [showAdd, setShowAdd] = useState(false);

  const [supershow, setSuperShow] = useState();
  const superhandleClose = () => setSuperShow(false);
  const superhandleShow = () => setSuperShow(true);
  //should not remove below the console statement otherwise it will cause an error saying user.usergroup is undefined.
  const con = () => {
    alert("hii");
  };
  return isAuthenticated &&
    users &&
    user &&
    user.usergroup === "Super Admin" ? (
    //for super admin
    <Fragment>
      <div className="addicon ml-5">
        <img
          height="25px"
          className="ml-5"
          src={require("../../static/images/add-icon.png")}
          onClick={() => superhandleShow()}
          alt="Add User"
          title="Add User"
        />
      </div>

      <form>
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
            <Modal.Title className="container">
              <h1 className="text-center h2 orghea ">Add user</h1>
            </Modal.Title>
            <div className="  col-lg-2 ">
              <button className="close ml-5" onClick={() => superhandleClose()}>
                <img
                  src={require("../../static/images/close.png")}
                  alt="X"
                  style={{
                    height: "20px",
                    width: "20px",
                    color: "black",
                    marginLeft: "4.5rem",
                  }}
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
                  <Select
                    name="orgname"
                    className=""
                    placeholder="---Select---"
                    isSearchable={false}
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
                    required
                  ></Select>
                </div>
                <div className="col-lg-6">
                  <label className="control-label">
                    Password <span>*</span>
                  </label>
                  <div className="controls">
                    <input
                      name="password"
                      id="user_password"
                      type="password"
                      autoComplete="off"
                      value={password}
                      className="form-control"
                      style={passwordInptErrStyle}
                      onChange={(e) => onPasswordChange(e)}
                      required
                    />
                    {passwordValChecker && (
                      <span
                        className="form-input-info"
                        style={passwordValStyle}
                      >
                        {passwordValResult}
                      </span>
                    )}
                  </div>
                </div>

                <div className="col-lg-6">
                  <label className="control-label">
                    Confirm Password <span>*</span>
                  </label>
                  <div className="controls">
                    <input
                      name="rePassword"
                      id="user_confpass"
                      type="password"
                      value={rePassword}
                      autoComplete="off"
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
                    <span
                      id="category_result"
                      className="form-input-info"
                    ></span>
                  </div>
                </div>

                {/* <div className="col-lg-6">
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
                    autoComplete="off"
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
                    name="cnfrmpassword"
                    placeholder="ConfirmPassword"
                    value={cpassword}
                    className="form-control"
                    onChange={(e) => onuserchange(e)}
                  />
                </div> */}
                <div className="col-lg-6">
                  Address
                  <textarea
                    name="OrganizationAddress"
                    value={address}
                    onChange={(e) => onuserchange(e)}
                    // id="tenantAddr"
                    className="textarea form-control"
                    rows="4"
                    cols="20"
                    placeholder="Address"
                    // onChange={(e) => onInputChange(e)}
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
                    className=""
                    options={UserGroups}
                    isSearchable={false}
                    placeholder="------------------Select--------------------"
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

                <h5 className="Uservalidation">
                  {fill ? <>Please fill all Mandatory(*) fields..!!</> : <> </>}
                </h5>
                <div className="col-lg-1 Savebutton ">
                  <button
                    type="submit"
                    variant="success"
                    id="savebtn"
                    className="btn sub_form btn_continue Save "
                    onClick={() => onsubmitUserData()}
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>
          </Modal.Body>
        </Modal>
      </form>
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
