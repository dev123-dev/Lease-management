import React, { Fragment, useEffect, useState } from "react";
import { Redirect, Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { login, removeError, sendOTP } from "../../actions/auth";

const Login = ({
  login,
  isAuthenticated,
  errorResponse,
  removeError,
  loading,
  sendOTP,
  otpMessage,
}) => {
  useEffect(() => {
    removeError();
  }, [removeError]);

  let modalTitle = { marginTop: "-30px", marginBottom: "20px" };

  const [formData, setFormData] = useState({
    useremail: "",
    password: "",
  });

  // W7'Um34BrCxzQNR?
  const { useremail, password, userOTP } = formData;

  const onInputChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case "useremail":
        if (value === "") {
          setError({
            ...error,
            userEmailValChecker: true,
            userEmailValResult: "Please Enter Your useremail",
            userEmailValStyle: { color: "#FF0000" },
            userEmailInptErrStyle: { borderBottom: "1px solid #FF0000" },
          });
          setFormData({ ...formData, [e.target.name]: "" });
        } else {
          setError({
            ...error,
            userEmailValChecker: false,
            userEmailInptErrStyle: { borderBottom: "1px solid #0086dc" },
          });
          setFormData({ ...formData, [e.target.name]: value });
        }
        break;
      case "password":
        if (value === "") {
          setError({
            ...error,
            passwordValChecker: true,
            passwordValResult: "Please Enter Your Password",
            passwordValStyle: { color: "#FF0000" },
            passwordInptErrStyle: { borderBottom: "1px solid #FF0000" },
          });
          setFormData({ ...formData, [e.target.name]: "" });
        } else {
          setError({
            ...error,
            passwordValChecker: false,

            passwordInptErrStyle: { borderBottom: "1px solid #0086dc" },
          });
          setFormData({ ...formData, [e.target.name]: value });
        }
        break;
      case "userOTP":
        setFormData({ ...formData, [e.target.name]: value });
        break;
      default:
        break;
    }
  };

  const [error, setError] = useState({
    userEmailValChecker: false,
    userEmailValResult: "",
    userEmailValStyle: {},
    userEmailInptErrStyle: {},

    passwordValChecker: false,
    passwordValResult: "",
    passwordValStyle: {},
    passwordInptErrStyle: {},
  });

  const {
    userEmailValChecker,
    userEmailValResult,
    userEmailValStyle,
    userEmailInptErrStyle,

    passwordValChecker,
    passwordValResult,
    passwordValStyle,
    passwordInptErrStyle,
  } = error;

  const checkErrors = (formData) => {
    if (formData && formData.useremail === "") {
      setError({
        ...error,
        userEmailValChecker: true,
        userEmailValResult: "Please Enter Your email",
        userEmailValStyle: { color: "#FF0000" },
        userEmailInptErrStyle: { borderBottom: "1px solid #FF0000" },
      });
      return false;
    } else {
      const userEmailFilter =
        /^(\d*[a-zA-Z][a-zA-Z\d_.+-]*)\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})*$/;
      if (!userEmailFilter.test(formData && formData.useremail)) {
        setError({
          ...error,
          userEmailValChecker: true,
          userEmailValResult: "Please Enter Valid email",
          userEmailValStyle: { color: "#FF0000" },
          userEmailInptErrStyle: { borderBottom: "1px solid #FF0000" },
        });
        return false;
      }
    }
    if (formData && formData.password === "") {
      setError({
        ...error,
        passwordValChecker: true,
        passwordValResult: "Please Enter Your Password",
        passwordValStyle: { color: "#FF0000" },
        passwordInptErrStyle: { borderBottom: "1px solid #FF0000" },
      });
      return false;
    }
    return true;
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (checkErrors(formData)) {
      login(useremail, password, userOTP);
    }
    setFormData({ ...formData, submitted: true });
  };

  const getOtp = async () => {
    if (checkErrors(formData)) {
      sendOTP(useremail, password);
    }
  };

  if (isAuthenticated) {
    return <Redirect to="/route-driver" />;
  }

  return (
    <Fragment>
      <div className="col-md-12 col-lg-12 col-sm-12 col-12 py-3">
        <div className="modal-header pt-1">
          {loading ? (
            <h2 className="modal-title " id="myModalLabel" style={modalTitle}>
              Please Wait
            </h2>
          ) : (
            <h2 className="modal-title " id="myModalLabel" style={modalTitle}>
              SIGN IN
            </h2>
          )}
        </div>
        {errorResponse && <p style={{ color: "red" }}>{errorResponse}</p>}
        {/* <!-- form --> */}
        {/* <form> */}
        <div className="form-group form_top">
          <input
            type="text"
            name="useremail"
            value={useremail}
            style={userEmailInptErrStyle}
            className="form-control form_contct"
            onChange={(e) => onInputChange(e)}
          />
          {userEmailValChecker && (
            <span style={userEmailValStyle}>
              {userEmailValResult}
              <br />
            </span>
          )}
          <label className="pop_up">
            <span className="label-content">Email *</span>
          </label>
        </div>

        <div className="form-group form_top">
          <input
            type="password"
            name="password"
            value={password}
            style={passwordInptErrStyle}
            className="form-control form_contct"
            onChange={(e) => onInputChange(e)}
            autoComplete="false"
          />
          {passwordValChecker && (
            <span style={passwordValStyle}>
              {passwordValResult}
              <br />
            </span>
          )}
          <label className="pop_up">Password *</label>
        </div>

        <div className="col-md-12 col-sm-12 col-lg-12 col-12 text-center">
          {loading ? (
            <button
              className="btn contact_reg"
              disabled
              onClick={() => getOtp()}
            >
              Loading...
            </button>
          ) : (
            <button className="btn contact_reg" onClick={() => getOtp()}>
              Get OTP
            </button>
          )}
        </div>

        <div className="form-group form_top">
          <input
            type="text"
            name="userOTP"
            maxLength={4}
            value={userOTP}
            // style={userEmailInptErrStyle}
            className="form-control form_contct"
            onChange={(e) => onInputChange(e)}
          />
          <label className="pop_up">
            <span className="label-content">OTP</span>
          </label>
        </div>

        <div className="col-md-12 col-sm-12 col-lg-12 col-12 text-center">
          <button className="btn contact_reg" onClick={(e) => onSubmit(e)}>
            SIGN IN
          </button>
        </div>
        {otpMessage && (
          <>
            <center>
              <p style={{ color: "blue", fontSize: "18px" }}>
                {otpMessage}
                <span
                  style={{
                    color: "gray",
                    fontSize: "13px",
                    fontStyle: "italic",
                  }}
                >
                  &nbsp;&nbsp;&nbsp;Please check in spam if not received!
                </span>
              </p>
            </center>
          </>
        )}
        {/* </form> */}
      </div>
    </Fragment>
  );
};

Login.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
  loading: PropTypes.bool,
  errorResponse: PropTypes.string,
  otpMessage: PropTypes.string,
  removeError: PropTypes.func.isRequired,
  sendOTP: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  loading: state.auth.loading,
  errorResponse: state.auth.errorResponse,
  otpMessage: state.auth.otpMessage,
});

export default connect(mapStateToProps, { login, removeError, sendOTP })(Login);
