import React, { Fragment, useState } from "react";
import { Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { changeUsersPwd } from "../../actions/auth";

let UserNameFont = {
  fontSize: "23px",
  lineHeight: "12px",
};

const ChangeUsersPwd = ({ user, changeUsersPwd, onPwdChange }) => {
  let passwrdTooltip = {
    marginLeft: "-16em",
    position: "absolute",
    marginTop: "1.5em",
    pointerEvents: "none",
    zIndex: "999",
    width: "300px",
  };

  const [formData, setFormData] = useState({
    password: "",
    rePassword: "",
    isSubmitted: false,
  });

  const { password, rePassword, isSubmitted } = formData;

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
        repwdValResult: "DOES NOT MATCH",
        //repwdValResult: 'REQUIRED',
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

  const onSubmit = async (e) => {
    e.preventDefault();
    if (checkErrors(formData)) {
      const finalData = {
        email: user.email,
        password: password,
      };
      changeUsersPwd(finalData);
      onPwdChange(true);
      setFormData({ ...formData, isSubmitted: true });
    }
  };

  if (isSubmitted) {
    return <Redirect to="/users" />;
  }

  return (
    <Fragment>
      <form onSubmit={(e) => onSubmit(e)}>
        <div className="row">
          <div className="col-lg-12 col-md-12 col-sm-12 col-12">
            <h4 style={UserNameFont}>
              User Name: <span className="colorGreen">{user && user.name}</span>
            </h4>
          </div>
          <div className="col-lg-11 col-md-11 col-sm-12 col-12">
            <label className="label-control">Password *</label>
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
              style={{ top: "60px" }}
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

        <div className="row">
          <div className="col-lg-11 col-md-11 col-sm-12 col-12">
            <label className="label-control">Confirm Password *</label>
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

        <div className="col-md-12 col-lg-12 col-sm-12 col-12 text-center">
          <input
            type="submit"
            name="Submit"
            value="UPDATE"
            className="btn sub_form reg_continue blackbrd"
            id="updatePswd"
          />
        </div>
      </form>
    </Fragment>
  );
};

ChangeUsersPwd.propTypes = {
  changeUsersPwd: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, { changeUsersPwd })(ChangeUsersPwd);
