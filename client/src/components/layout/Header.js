import React, { Fragment, useState, useEffect } from "react";
import {
  Container,
  Navbar,
  Nav,
  NavItem,
  Modal,
  Button,
} from "react-bootstrap";
import { Link, NavLink, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logout } from "../../actions/auth";
import Dropdown from "react-bootstrap/Dropdown";
import Login from "../auth/Login";

import "react-datepicker/dist/react-datepicker.css";
import TenantSettings from "../dashboard/TenantSettings";
import "../dashboard/SuperUserDashboard";
import { getAllOrganization } from "../../actions/tenants";
import { getAllSettings } from "../../actions/tenants";
import { getalluser } from "../../actions/tenants";

const Header = ({
  auth: { isAuthenticated, loading, user, allTenantSetting },
  tenants: { allorg },
  logout,
  getAllSettings,
  getalluser,
  getAllOrganization,
}) => {
  useEffect(() => {
    getAllSettings();
    getAllOrganization();
  }, [getAllSettings]);
  useEffect(() => {
    getalluser();
    getAllOrganization();
  }, []);

  const [showLogin, setShowLogin] = useState(false);
  const [showLogout, setShowLogout] = useState(false);

  const [showTenantSetting, setTenantSetting] = useState(false);

  const handleLogoutModalClose = () => setShowLogout(false);
  const handleLogoutModalShow = () => setShowLogout(true);
  const handleTenantSettingModalClose = () => setTenantSetting(false);
  const handleTenantSettingModalShow = () => setTenantSetting(true);

  const LogoutModalClose = () => {
    handleLogoutModalClose();
    logout();
  };

  const onAddSettingModalChange = (e) => {
    if (e) {
      handleTenantSettingModalClose();
    }
  };
  const openSecondLevelMenu2 = () => {
    const menu = document.getElementById("second-level-menu2");
    if (window.innerWidth <= 992) {
      if (menu) {
        if (menu.style.display === "block") {
          menu.style.display = "none";
        } else {
          menu.style.display = "block";
        }
      } else {
        menu.style.display = "none";
      }
    }
  };

  return (
    <Fragment>
      {/* header starting */}
      <header>
        <Container id="header_navbar">
          <Navbar
            className="navbar_height top_menu"
            expand="lg"
            fixed="top"
            style={{ padding: "4px 1em" }}
          >
            <Navbar.Brand>
              {!loading &&
              isAuthenticated &&
              user &&
              user.usergroup === "Super Admin" ? (
                <NavLink to="/MainSuper">
                  <img
                    className="log_size"
                    alt="Pinnacle Media"
                    src={require("../../static/images/lraLogo_wh.png")}
                  />{" "}
                </NavLink>
              ) : (
                <NavLink to="/MainAdmin">
                  <img
                    className="log_size"
                    alt="Pinnacle Media"
                    src={require("../../static/images/lraLogo_wh.png")}
                  />{" "}
                </NavLink>
              )}
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              {!loading && isAuthenticated && user ? (
                <>
                  <Nav className="mr-auto navbar_Collapse_content">
                    {/* add property & user */}
                    {!loading &&
                    isAuthenticated &&
                    user &&
                    user.usergroup === "Super Admin" ? (
                      <>
                        {/* Organization details */}
                        <NavLink
                          className=" h6 "
                          id="hea"
                          to="/Super"
                          activeStyle={{
                            color: "black",
                            textDecoration: "none",
                          }}
                        >
                          OrganisationDetails
                        </NavLink>

                        {/* user details */}
                        <NavLink
                          className="ml-5  h6 "
                          id="hea"
                          to="/SuperUser"
                          activeStyle={{
                            color: "black",
                            textDecoration: "none",
                          }}
                        >
                          UserDetails
                        </NavLink>
                      </>
                    ) : (
                      <>
                        <Navbar.Brand>
                          <NavLink to="/MainAdminPage"></NavLink>
                        </Navbar.Brand>
                        {/* PROPERTY DEtails */}
                        <NavLink
                          className="ml-5 h5  "
                          id="hea"
                          // id="head"
                          to="/PropertyDetail"
                          activeStyle={{
                            // color: "#cb9c9c",
                            textDecoration: "none",
                          }}
                        >
                          Property
                        </NavLink>

                        {/* tenant details */}
                        <NavLink
                          className="ml-5  h5 "
                          id="hea"
                          to="/tenant-detail"
                          activeStyle={{
                            color: "Black",
                            textDecoration: "none",
                          }}
                        >
                          Tenant
                        </NavLink>

                        {/* adding admin side user page */}
                        <NavLink
                          className="ml-5  h5 "
                          id="hea"
                          to="/AdminUser"
                          activeStyle={{
                            color: "Black",
                            textDecoration: "none",
                          }}
                        >
                          User
                        </NavLink>
                      </>
                    )}

                    {/*  copy paste the code for remaining headers for admin and super admin */}
                    {/* only tenant user */}

                    {/* <NavItem>
                  {!loading &&
                  isAuthenticated &&
                  user &&
                  user.usergroup == "Super Admin" ? (
                    <NavLink to="/add-tenant-details" activeStyle={{ color: "Black", textDecoration: "none" }}>
                      User
                    </NavLink>
                  ) : (
                    <NavItem></NavItem>
                  )}
                </NavItem> */}

                    {/* user */}
                    {/* <NavItem>
                  {!loading &&
                  isAuthenticated &&
                  user &&
                  user.usergroup === "Super Admin" ? (
                    <NavItem></NavItem>
                  ) : (
                    <NavItem>
                      <NavLink  to="/all-tenant-shop-Details" activeStyle={{ color: "Black", textDecoration: "none" }}>
                        User
                      </NavLink>
                    </NavItem>
                  )}
                </NavItem> */}
                  </Nav>
                </>
              ) : (
                <></>
              )}

              {!loading &&
              isAuthenticated &&
              user &&
              user.usergroup === "Super Admin" ? (
                <Fragment>
                  <Nav>
                    <ul className="top-level-menu text-left">
                      <li>
                        <Link
                          to="#"
                          onClick={() => handleLogoutModalShow()}
                          className="navbar-right "
                        >
                          {user.usergroup}
                        </Link>

                        <ul className="dropdown-menu second-level-menu ">
                          <li className="hwhite">
                            <Link
                              to="#"
                              className=""
                              onClick={() => handleLogoutModalShow()}
                            >
                              Logout
                            </Link>
                          </li>
                        </ul>
                      </li>
                    </ul>
                  </Nav>

                  <Nav>
                    <Modal
                      show={showLogin}
                      backdrop="static"
                      keyboard={false}
                      aria-labelledby="contained-modal-title-vcenter"
                      centered
                    >
                      <Modal.Header></Modal.Header>
                      <Modal.Body>
                        <button
                          onClick={() => handleLogoutModalClose()}
                          className="close"
                        >
                          <img
                            src={require("../../static/images/close.png")}
                            alt="X"
                          />
                        </button>
                        <Login />
                      </Modal.Body>
                    </Modal>
                  </Nav>
                </Fragment>
              ) : (
                // starting
                <>
                  {!loading &&
                  isAuthenticated &&
                  user &&
                  user.usergroup === "Admin" ? (
                    <Nav>
                      <h5 className="text-light">{user.username}</h5>
                      <ul className="top-level-menu text-left ">
                        <li>
                          <Link
                            to="#"
                            onClick={() => openSecondLevelMenu2()}
                            className="navbar-right"
                          >
                            {/* {user.userfullName}&nbsp; */}
                            <i className="fa fa-caret-down" />
                          </Link>

                          <ul className="dropdown-menu second-level-menu ">
                            <li className="hwhite">
                              <Link
                                to="#"
                                onClick={() => handleTenantSettingModalShow()}
                              >
                                Tenant Setting
                              </Link>
                            </li>

                            <li>
                              <Link to="/change-password">Change Password</Link>
                            </li>
                            <li>
                              <Link
                                to="#"
                                onClick={() => handleLogoutModalShow()}
                              >
                                Logout{" "}
                              </Link>
                            </li>
                          </ul>
                        </li>
                      </ul>
                    </Nav>
                  ) : (
                    <></>
                  )}
                </>
                //ending
              )}
            </Navbar.Collapse>
          </Navbar>
        </Container>

        {/*Tenant Settings Modal */}
        <Modal
          show={showTenantSetting}
          backdrop="static"
          keyboard={false}
          size="md"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header>
            <div className="col-lg-10">
              <h3 className="modal-title text-center">Tenant Setting</h3>
            </div>
            <div className="col-lg-2">
              <button onClick={handleTenantSettingModalClose} className="close">
                <img
                  src={require("../../static/images/close.png")}
                  alt="X"
                  style={{ height: "20px", width: "20px" }}
                />
              </button>
            </div>
          </Modal.Header>
          <Modal.Body>
            <TenantSettings onAddSettingModalChange={onAddSettingModalChange} />
          </Modal.Body>
        </Modal>

        {/* Logout Modal */}
        <Modal
          show={showLogout}
          backdrop="static"
          keyboard={false}
          aria-labelledby="contained-modal-title-vcenter"
          centered
          className="logout-modal"
        >
          <Modal.Header className="confirmbox-heading">
            <h4 className="mt-0 mr-5 text-center">CONFIRMATION&nbsp;&nbsp;</h4>
          </Modal.Header>
          <Modal.Body>
            <h5>
              Are you sure you want to
              logout?&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            </h5>
          </Modal.Body>
          <Modal.Footer>
            <button
              id="savebtn"
              className="btn btn_green_bg "
              onClick={() => LogoutModalClose()}
            >
              YES
            </button>
            <button
              id="savebtn"
              className="btn btn_green_bg"
              onClick={() => handleLogoutModalClose()}
            >
              NO
            </button>
          </Modal.Footer>
        </Modal>
      </header>
      {/* header ending */}
    </Fragment>
  );
};
Header.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  getAllSettings: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  tenants: state.tenants,
});

export default connect(mapStateToProps, {
  logout,
  getAllSettings,
  getalluser,
  getAllOrganization,
})(Header);
