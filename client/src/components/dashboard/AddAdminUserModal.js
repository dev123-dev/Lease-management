import React, { useEffect } from "react";
import { Modal } from "react-bootstrap";
import { useState, Fragment } from "react";
import Select from "react-select";
import { connect } from "react-redux";
import {
  get_particular_org_user,
  AddAdminuser,
  AddUserActivity,
} from "../../actions/tenants";

const AddAdminUserModal = ({
  auth: { isAuthenticated, user, users },
  tenants: { allorg },
  AddAdminuser,
  AddUserActivity,
  setShowadd,
}) => {
  const orglist = [];
  allorg.map((org) => {
    orglist.push({
      label: org.OrganizationName,
      value: org._id,
    });
  });

  const [formData, setFormData] = useState({
    username: "",
    useremail: "",
    useraddress: "",
    userphone: "",
    usergroup: "",
    OrganizationName: "",
    password: "",
  });

  const { name, email, address, phone, password, rePassword } = formData;
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
    // { value: "IT Department", label: "IT Department" },
    { value: "Manager", label: "Manager" },
  ];

  const [User, setUser] = useState("");
  const onuser = (e) => {
    setErrors({
      ...errors,
      UserGrpChecker: true,
      UserGrpErrorStyle: { color: "#000" },
    });
    setUser(e);
  };

  const onuserchange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const [errors, setErrors] = useState({
    UserGrpChecker: false,
    UserGrpErrorStyle: {},
  });
  const { UserGrpChecker, UserGrpErrorStyle } = errors;

  const checkError = () => {
    if (!UserGrpChecker) {
      setErrors({
        ...errors,
        UserGrpErrorStyle: { color: "#F00" },
      });
      return false;
    }

    return true;
  };

  // validation
  const [username, setUsername] = useState("");
  const [validationNameMessage, setValidationNameMessage] = useState(
    "Please enter valid Name"
  );
  const handleInputChange = (e) => {
    const inputValue = e.target.value;
    const filteredValue = inputValue
      .replace(/[^A-Za-z ]+/g, "")
      .replace(/ +/g, " "); // Remove non-alphabetic characters
    filteredValue === ""
      ? setValidationNameMessage("Please enter valid Name")
      : setValidationNameMessage("");

    setUsername(filteredValue);
  };

  const [userphone, setUserphone] = useState("");
  const [validationMessage, setValidationMessage] = useState(
    "Please enter valid Phone Number"
  );
 
  const handleInputPhoneChange = (e) => {
    const inputValue = e.target.value;
    const cleanedValue = inputValue.replace(/\D/g, ""); // Remove non-digit characters

    if (cleanedValue.length <= 10) {
      const isValidPhone = /^[6789]\d{9}$/;
      isValidPhone.test(cleanedValue)
        ? setValidationMessage("")
        : setValidationMessage("Please enter valid Phone Number");

      setUserphone(cleanedValue);
    }
  };

  const [useremail, setUseremail] = useState("");
  const [validationEmailMessage, setValidationEmailMessage] = useState(
    "Please enter a valid Email Address"
  );

  const handleInputEmailChange = (e) => {
    const inputValue = e.target.value;
    setUseremail(inputValue);

    // Regular expression to validate email format
    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

    if (emailRegex.test(inputValue)) {
      setValidationEmailMessage("");
    } else {
      setValidationEmailMessage("Please enter a valid email address");
    }
  };

  const [isdisabled, setIsdisabled] = useState(false);
  useEffect(() => {
    if (
      validationNameMessage === "" &&
      validationMessage === "" &&
      validationEmailMessage === ""
    ) {
      setIsdisabled(false);
    } else {
      setIsdisabled(true);
    }
  }, [validationNameMessage, validationMessage, validationEmailMessage]);

  useEffect(() => {
    if (password === rePassword) {
      setIsdisabled(false);
    } else {
      setIsdisabled(true);
    }
  }, [rePassword]);
  const onsubmitUserData = (e) => {
    e.preventDefault();
    if (checkError()) {
      const finalUserData = {
        username: username,
        useremail: useremail,
        userphone: userphone,
        useraddress: address,
        usergroup: User,
        password: rePassword,
        OrganizationName: user.OrganizationName,
        OrganizationId: user.OrganizationId,
      };
      const AdduserActivity = {
        userId: user && user._id,
        userName: user && user.username,
        Menu: "User",
        Operation: "Add",
        Name: username,
        OrganizationId: user.OrganizationId,
        expireAt: new Date().getTime() + 80,
      };

      AddUserActivity(AdduserActivity);
      // console.log(finalUserData);

      AddAdminuser(finalUserData);
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
      });
    }
  };

  return isAuthenticated && users && user && user.usergroup === "Admin" ? (
    <>
      {/* <div className=""></div> */}

      <Modal.Header className="confirmbox-heading">
        <div className=" row col-lg-10 col-md-12 col-sm-12 col-12 modhead ">
          <div className="ml-5">
            <h4
              style={{
                color: "white",
              }}
              className=" text-center ml-4"
            >
              ADD USER DETAILS
            </h4>{" "}
          </div>
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
        <form onSubmit={(e) => onsubmitUserData(e)}>
          <div className="container">
            <div className="row">
              <div className="col-lg-6 col-sm-12 col-md-12">
                <label> Name *:</label>{" "}
                <input
                  type="text"
                  name="username"
                  value={username}
                  className="form-control"
                  placeholder="Name"
                  onChange={(e) => handleInputChange(e)}
                  required
                />
                <h6 style={{ color: "red" }}>{validationNameMessage}</h6>
              </div>
              <div className="col-lg-6  col-sm-12 col-md-12">
                <label>Email *:</label>{" "}
                <input
                  type="email"
                  name="useremail"
                  placeholder="Email"
                  autoComplete="new-password"
                  value={useremail}
                  className="form-control"
                  onChange={handleInputEmailChange}
                  required
                />
                <h6 style={{ color: "red" }}>{validationEmailMessage}</h6>
              </div>

              <div className="col-lg-6  col-sm-12 col-md-12">
                <label>Phone No *:</label>
                <input
                  type="text"
                  name="userphone"
                  placeholder="Phone No"
                  value={userphone}
                  pattern="\d{10}"
                  title=" 10 Digits only"
                  className="form-control"
                  onChange={(e) => handleInputPhoneChange(e)}
                  required
                />
                <h6 style={{ color: "red" }}>{validationMessage}</h6>
              </div>
              <div className="col-lg-6  col-sm-12 col-md-12">
                {" "}
                <label>Organization belongs to*:</label>{" "}
                <input
                  type="text"
                  placeholder="{user.OrganizationName}"
                  value={user.OrganizationName}
                  className="form-control"
                  onChange={(e) => onuserchange(e)}
                  required
                />
                <br></br>
              </div>

              <div className="col-lg-6  col-sm-12 col-md-12">
                {" "}
                <label>Password*:</label>
                <input
                  type="password"
                  name="password"
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
                <br></br>
              </div>
              <div className="col-lg-6  col-sm-12 col-md-12">
                {" "}
                <label>Confirm Password *:</label>
                <input
                  placeholder="Confirm Password"
                  type="password"
                  name="rePassword"
                  value={rePassword}
                  autoComplete="new-password"
                  // autoComplete="off"
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
                <br></br>
              </div>
              <div className="col-lg-6  col-sm-12 col-md-12">
                Address:
                <textarea
                  name="address"
                  value={address}
                  onChange={(e) => onuserchange(e)}
                  className="textarea form-control"
                  rows="3"
                  cols="20"
                  placeholder="Address"
                  style={{ width: "100%" }}
                ></textarea>
                <br></br>
              </div>

              <div className="col-lg-6  col-sm-12 col-md-12">
                <label style={UserGrpErrorStyle}>UserGroup*:</label>
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
                      primary25: "#e8a317",
                      primary: "#095a4a",
                    },
                  })}
                  required
                />
                <br></br>
              </div>
            </div>
          </div>

          {/* save button  */}
          <div className="col-lg-9  col-sm-12 col-md-12 text-danger">
            * Indicates mandatory fields, Please fill mandatory fields before
            Submit
          </div>
          <div className="col-lg-3  col-sm-12 col-md-12 float-right">
            <button
              id="savebtn"
              className="btn sub_form btn_continue Save float-right  "
              disabled={isdisabled}
            >
              Save
            </button>
          </div>
        </form>
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
  AddUserActivity,
})(AddAdminUserModal);
