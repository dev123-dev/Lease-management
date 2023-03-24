import React, { Fragment, useState, useEffect } from "react";
import { Container, Navbar, Nav, Modal } from "react-bootstrap";
import { Link, NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { logout } from "../../actions/auth";
import Login from "../auth/Login";

import "react-datepicker/dist/react-datepicker.css";
import TenantSettings from "../dashboard/TenantSettings";
import "../dashboard/SuperUserDashboard";
import {
  getAllSettings,
  getAllOrganization,
  getalluser,
} from "../../actions/tenants";

const Header = ({
  auth: { isAuthenticated, loading, user },
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
        // menu.style.display = "none";
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
            <Navbar.Toggle aria-controls="basic-navbar-nav" className="nvbar" />
            <Navbar.Collapse id="basic-navbar-nav">
              {!loading && isAuthenticated && user ? (
                <>
                  <Nav
                    className="mr-auto navbar_Collapse_content"
                    id="org_detail"
                  >
                    {/* add property & user */}
                    {!loading &&
                    isAuthenticated &&
                    user &&
                    user.usergroup === "Super Admin" ? (
                      <>
                        {/* Organization details */}
                        &nbsp; &nbsp;
                        <NavLink
                          className="p-1 ml-4 headinghover"
                          id="hea"
                          to="/Super"
                        >
                          OrganisationDetails
                        </NavLink>
                        {/* user details */}
                        <NavLink
                          className="p-1 ml-4 headinghover"
                          id="hea"
                          to="/SuperUser"
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
                          className="p-3 ml-4 headinghover"
                          id="hea"
                          // id="head"
                          to="/PropertyDetail"
                        >
                          Property
                        </NavLink>

                        {/* tenant details */}
                        <NavLink
                          className="p-3 ml-4 headinghover"
                          id="hea"
                          to="/tenant-detail"
                        >
                          Tenant
                        </NavLink>

                        {/* adding admin side user page */}
                        <NavLink
                          className="p-3 ml-4 headinghover"
                          id="hea"
                          to="/AdminUser"
                        >
                          User
                        </NavLink>
                      </>
                    )}
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
                          <div className="text-light mt-3 ml-2">
                            {user.usergroup}
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                          </div>
                        </Link>

                        <ul className="dropdown-menu second-level-menu ">
                          <li className="hwhite  drophover ">
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
                </Fragment>
              ) : (
                // starting
                <>
                  {!loading &&
                  isAuthenticated &&
                  user &&
                  user.usergroup === "Admin" ? (
                    <Nav>
                      <ul className="top-level-menu text-left ">
                        <li>
                          <Link
                            to="#"
                            onClick={() => openSecondLevelMenu2()}
                            className="navbar-right"
                          >
                            <div className="text-light mt-3 ml-2">
                              {user.username}
                              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            </div>
                          </Link>
                          <ul className="dropdown-menu second-level-menu ">
                            <li className=" hwhite  drophover ">
                              <Link
                                to="#"
                                onClick={() => handleTenantSettingModalShow()}
                              >
                                Tenant Setting
                              </Link>
                            </li>

                            <li className="hwhite drophover ">
                              <Link to="/change-password">Change Password</Link>
                            </li>
                            <li className="hwhite drophover ">
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
            <button id="logoutbtn" onClick={() => LogoutModalClose()}>
              <b>YES</b>
            </button>
            <button id="logoutbtn" onClick={() => handleLogoutModalClose()}>
              <b>NO</b>
            </button>
          </Modal.Footer>
        </Modal>
      </header>
      {/* header ending */}
    </Fragment>
  );
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
