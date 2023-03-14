import React, { useEffect } from "react";
import { Modal } from "react-bootstrap";
import { useState, Fragment } from "react";
import Select from "react-select";
import { connect } from "react-redux";
import { get_particular_org_user, AddAdminuser } from "../../actions/tenants";

const AddAdminUserModal = ({
  auth: { isAuthenticated, user, users },
  tenants: { allorg },
  AddAdminuser,
  setShowadd,
}) => {
  useEffect(() => {});

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
  });

  // validation for Password starting

  // validation

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
  // validation for password starting
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
  // validation for password ending
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
  const [fill, setfill] = useState(false);
  const onsubmitUserData = () => {
    if (name === "" || email === "" || user === "") {
      setfill(true);
    } else {
      const finalUserData = {
        username: name,
        useremail: email,
        userphone: phone,
        useraddress: address,
        usergroup: User,
        password: rePassword,
        OrganizationName: user.OrganizationName,
        OrganizationId: user.OrganizationId,
      };
      setShowadd(false);
      AddAdminuser(finalUserData);

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
    }
  };

  return isAuthenticated && users && user && user.usergroup === "Admin" ? (
    <>
      <div className=""></div>

      <Modal.Header>
        <div className="col-lg-12 col-md-12 col-sm-12 col-12 ">
          <h3>
            <b className=" text-center ml-5">ADD USER DETAILS</b>{" "}
          </h3>
        </div>
        <div className="  col-lg-2 ">
          <button
            className=" close"
            onClick={() => {
              setShowadd(false);
            }}
          >
            <img
              className="mr-5"
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
              </label>
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={password}
                className="form-control"
                style={passwordInptErrStyle}
                onChange={(e) => onPasswordChange(e)}
              />
              {passwordValChecker && (
                <span className="form-input-info" style={passwordValStyle}>
                  {passwordValResult}
                </span>
              )}
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
                name="rePassword"
                value={rePassword}
                autoComplete="off"
                className="form-control"
                style={repwdInptErrStyle}
                onChange={(e) => onPasswordChange(e)}
              />
              {repwdValChecker && (
                <Fragment>
                  <span className="form-input-info" style={repwdValStyle}>
                    {repwdValResult}
                  </span>
                </Fragment>
              )}
            </div>
            <div className="col-lg-6">
              Address
              <textarea
                name="address"
                value={address}
                onChange={(e) => onuserchange(e)}
                className="textarea form-control"
                rows="3"
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
        <h5 className="Uservalidation">
          {fill ? <>Please fill all Mandatory(*) fields..!!</> : <></>}
        </h5>
        {/* save button  */}
        <div className="col-lg-12 ">
          <button
            id="savebtn"
            className="btn sub_form btn_continue Save float-right  "
            onClick={() => onsubmitUserData()}
          >
            Save
          </button>
        </div>
      </Modal.Body>
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
export default connect(mapStateToProps, {
  AddAdminuser,
  get_particular_org_user,
})(AddAdminUserModal);
