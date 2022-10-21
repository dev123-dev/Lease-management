import React, { useState, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
import Login from "../auth/Login";

const Homepage = ({ auth: { isAuthenticated, user } }) => {
  const [showLogin, setShowLogin] = useState(true);

  const handleLoginModalClose = () => setShowLogin(false);
  const handleLoginModalShow = () => setShowLogin(true);

  return (
    <div>
      {isAuthenticated && user ? (
        <Fragment></Fragment>
      ) : (
        <Fragment>
          <div className="container container_align"></div>
          <Link
            className="log btn btn_submit"
            style={{ padding: "10px 39px" }}
            onClick={handleLoginModalShow}
            to="#"
          >
            LOGIN
          </Link>

          <Modal
            show={showLogin}
            backdrop="static"
            keyboard={false}
            aria-labelledby="contained-modal-title-vcenter"
            centered
          >
            <Modal.Header></Modal.Header>
            <Modal.Body>
              {/* <button onClick={handleLoginModalClose} className="close">
                <img src={require("../../static/images/close.png")} alt="X" />
              </button> */}
              <Login />
            </Modal.Body>
          </Modal>
        </Fragment>
      )}
    </div>
  );
};

Homepage.propTypes = {
  auth: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(Homepage);
