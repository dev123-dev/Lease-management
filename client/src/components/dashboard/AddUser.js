import React, { useState, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Select from "react-select";
import { AddUserDetailsform } from "../../actions/auth";

const AddUser = ({
  auth: { isAuthenticated, user, users },
  AddUserDetailsform,
  errorResponse,

  onAddUserModalChange,
}) => {
  let passwrdTooltip = {
    marginLeft: "-16em",
    position: "absolute",
    marginTop: "1.5em",
    pointerEvents: "none",
    zIndex: "999",
    width: "300px",
  };

  //formData
  const [formData, setFormData] = useState({
    password: "",
    userfullName: "",
    useremail: "",
    userphone: "",
    usergroup: "",
    useraddr: "",

    isSubmitted: false,
  });

  const UserGroups = [
    { value: "Admin", label: "Admin" },
    { value: "Assistant", label: "Assistant" },
  ];

  const {
    password,
    rePassword,
    userfullName,
    useremail,
    userphone,
    usergroup,
    useraddr,
  } = formData;

  const onInputChange2 = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const onPaymentModeChange = (e) => {
    if (e) {
      setFormData({
        ...formData,
        usergroup: e.value,
      });
    }
  };
  const onSubmit = () => {
    const finalData = {
      password: password,
      userfullName: userfullName,
      useremail: useremail,
      userphone: userphone,
      usergroup: usergroup,
      useraddr: useraddr,
    };
    AddUserDetailsform(finalData);
    onAddUserModalChange(true);
  };

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
  const onInputChange = (e) => {
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

  const checkErrors = (formData) => {
    if (formData && formData.password === "") {
      setError({
        ...error,
        passwordValChecker: true,
        passwordValResult: "REQUIRED",
        passwordValStyle: { color: "#FF0000", marginTop: "30px" },
        passwordInptErrStyle: { border: "1px solid #FF0000" },
      });
      return false;
    }
    if (formData && formData.rePassword !== formData.password) {
      setError({
        ...error,
        repwdValChecker: true,
        repwdValResult: "DOESNOT MATCH",
        // repwdValResult: "REQUIRED",
        repwdValStyle: { color: "#FF0000", marginTop: "30px" },
        repwdInptErrStyle: { border: "1px solid #FF0000" },
      });
      return false;
    }

    if (formData && formData.rePassword === "") {
      setError({
        ...error,
        repwdValChecker: true,
        repwdValResult: "REQUIRED",
        repwdValStyle: { color: "#FF0000", marginTop: "30px" },
        repwdInptErrStyle: { border: "1px solid #FF0000" },
      });
      return false;
    }

    return true;
  };

  return !isAuthenticated || !user || !users ? (
    <Fragment></Fragment>
  ) : (
    <Fragment>
      <>
        {errorResponse && <p style={{ color: "red" }}>{errorResponse}</p>}
        <div className="row col-lg-12 col-md-9 col-sm-9 col-12 py-4">
          <div className="col-lg-2 col-md-2 col-sm-1 col-12">
            <label>Full Name* :</label>
          </div>

          <div className="col-lg-4  col-md-4 col-sm-4 col-12">
            <input
              type="text"
              name="userfullName"
              className="form-control"
              onChange={(e) => onInputChange2(e)}
              required
            />
          </div>
          <div className="col-lg-2 col-md-2 col-sm-4 col-12">
            <label>Email* :</label>
          </div>

          <div className="col-lg-4  col-md-4 col-sm-4 col-12">
            <input
              type="text"
              name="useremail"
              className="form-control"
              onChange={(e) => onInputChange2(e)}
              required
            />
          </div>
        </div>

        <div className="row col-lg-12 col-md-9 col-sm-9 col-12 py-4">
          <div className="col-lg-2 col-md-2 col-sm-1 col-12">
            <label> Phone* :</label>
          </div>

          <div className="col-lg-4  col-md-4 col-sm-4 col-12">
            <input
              type="Number"
              name="userphone"
              className="form-control"
              onChange={(e) => onInputChange2(e)}
              onKeyDown={(e) =>
                (e.keyCode === 69 || e.keyCode === 190) && e.preventDefault()
              }
              required
            />
          </div>
          <div className="col-lg-2 col-md-2 col-sm-1 col-12">
            <label>User Group*:</label>
          </div>

          <div className="col-lg-4  col-md-4 col-sm-4 col-12">
            <Select
              name="usergroup"
              options={UserGroups}
              isSearchable={false}
              placeholder="Select"
              onChange={(e) => onPaymentModeChange(e)}
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

        <div className="row col-lg-12 col-md-9 col-sm-9 col-12 py-4">
          <div className="col-lg-2 col-md-2 col-sm-1 col-12">
            <label> Address* :</label>
          </div>

          <div className="col-lg-10  col-md-4 col-sm-4 col-12">
            <textarea
              name="useraddr"
              id="useraddr"
              className="textarea form-control"
              rows="3"
              placeholder="Address"
              onChange={(e) => onInputChange2(e)}
              style={{ width: "100%" }}
              required
            ></textarea>
          </div>
        </div>

        <div className="row ">
          <div className=" col-lg-6 col-md-9 col-sm-9 col-12 py-4">
            <label> Password* :</label>
            <div className="">
              <input
                type="password"
                name="password"
                className="form-control "
                value={password}
                style={passwordInptErrStyle}
                onChange={(e) => onInputChange(e)}
                autoComplete="false"
              />
              {passwordValChecker && (
                <span
                  className="form-input-info positioning"
                  style={passwordValStyle}
                >
                  {passwordValResult}
                </span>
              )}
              <div
                className="cstm-hint"
                id="pass_admin_help"
                //   style={{ top: "100px" }}
              >
                <img
                  src={require("../../static/images/help1.png")}
                  alt="help"
                  id="img_tool_admin"
                  className="pass_admin_help_icon_question"
                />
                <div
                  id="tooltipPassAdmin"
                  className="syle-hint"
                  style={passwrdTooltip}
                  data-hint="Password  at least 1 uppercase and 1 lowercase, 1 digit, 1 symbol, length from 8 to 20"
                ></div>
              </div>
            </div>
          </div>

          <div className="col-lg-6 col-md-9 col-sm-9 col-12 py-4">
            <label className="">Confirm Password</label>

            <div>
              <input
                type="password"
                name="rePassword"
                className="form-control "
                value={rePassword}
                style={repwdInptErrStyle}
                onChange={(e) => onInputChange(e)}
                autoComplete="false"
              />
              {repwdValChecker && (
                <Fragment>
                  <span
                    className="form-input-info positioning"
                    style={repwdValStyle}
                  >
                    {repwdValResult}
                  </span>
                </Fragment>
              )}
            </div>
          </div>
        </div>

        <div className="col-lg-12 Savebutton " size="lg">
          <button
            variant="success"
            className="btn sub_form btn_continue Save float-right"
            onClick={() => onSubmit()}
            style={
              userfullName !== "" &&
              useremail !== "" &&
              userphone !== "" &&
              usergroup !== "" &&
              useraddr !== "" &&
              password !== ""
                ? { opacity: "1" }
                : { opacity: "1", pointerEvents: "none" }
            }
          >
            Save
          </button>
        </div>
      </>
    </Fragment>
  );
};

AddUser.propTypes = {
  auth: PropTypes.object.isRequired,
  AddUserDetailsform: PropTypes.func.isRequired,

  errorResponse: PropTypes.string,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  errorResponse: state.auth.errorResponse,
});

export default connect(mapStateToProps, {
  AddUserDetailsform,
})(AddUser);
