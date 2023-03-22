import React, { Fragment, useEffect, useState } from "react";
import { Redirect, Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { login, removeError } from "../../actions/auth";
import "../../styles/CustomisedStyle.css";
// import { Roller } from "react-awesome-spinners";

const Login = ({
  login,
  isAuthenticated,
  errorResponse,
  removeError,
  loading,
}) => {
  useEffect(() => {
    removeError();
  }, [removeError]);

  let modalTitle = { marginTop: "-30px", marginBottom: "20px" };
  let inputBox = {
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    flexDirection: "row",
    width: "28vw",
    padding: 5,
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "",
    borderRadius: 5,
    borderBottom: "",
    borderLeft: "none",
    borderRight: "none",
    borderTop: "none",
    color: "black",
  };

  const [formData, setFormData] = useState({
    useremail: "",
    password: "",
  });

  // W7'Um34BrCxzQNR?
  const { useremail, password } = formData;

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
      default:
        " "();
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
      login(useremail, password);
    }
    setFormData({ ...formData, submitted: true });
  };

  // const getOtp = async () => {
  //   if (checkErrors(formData)) {
  //     sendOTP(useremail, password);
  //   }
  // };

  if (isAuthenticated) {
    // <Roller />;
    // if (loading === false) {
    //   <Roller />;
    // }
    return <Redirect to="/route-driver" />;
  }

  return (
    <Fragment>
      <div className="col-md-12 col-lg-12 col-sm-12 col-12 py-3">
        <div className="modal-header ">
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
        <form onSubmit={(e) => onSubmit(e)}>
          <div className="form-group form_top email">
            <label className="pop_up">
              <span className="label-content">Email</span>
            </label>
            <input
              type="text"
              name="useremail"
              value={useremail}
              // style={inputBox}
              //style={userEmailInptErrStyle}
              className="form-control form_contct emailtextbox"
              onChange={(e) => onInputChange(e)}
            />{" "}
          </div>
          {userEmailValChecker && (
            <span style={userEmailValStyle}>
              {userEmailValResult}
              <br />
            </span>
          )}

          <div className="form-group form_top">
            <label className="pop_up">Password </label>
            <input
              type="password"
              name="password"
              value={password}
              // style={inputBox}
              // style={passwordInptErrStyle}
              className="form-control form_contct "
              onChange={(e) => onInputChange(e)}
              autoComplete="false"
            />
            {passwordValChecker && (
              <span style={passwordValStyle}>
                {passwordValResult}
                <br />
              </span>
            )}
          </div>

          <div className="col-md-12 col-sm-12 col-lg-12 col-12 text-center">
            <button
              className="btn contact_reg"
              onClick={(e) => onSubmit(e)}
              id="signin"
            >
              SIGN IN
            </button>
          </div>
        </form>
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
  //otpMessage: PropTypes.string,
  removeError: PropTypes.func.isRequired,
  //sendOTP: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  loading: state.auth.loading,
  errorResponse: state.auth.errorResponse,
  //otpMessage: state.auth.otpMessage,
});

export default connect(mapStateToProps, { login, removeError })(Login);
