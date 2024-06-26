import React, { Fragment, useState, useEffect } from "react";
import { Container, Navbar, Nav, Modal } from "react-bootstrap";

import { connect } from "react-redux";
import { logout } from "../../actions/auth";
import Login from "../auth/Login";
import lralogo from "../../static/images/lraLogo_wh.png";
import { NavItem } from "react-bootstrap";

import { Link, NavLink } from "react-router-dom";
import NavDropdown from "react-bootstrap/NavDropdown";

import "react-datepicker/dist/react-datepicker.css";
import TenantSettings from "../dashboard/TenantSettings";
import "../dashboard/SuperUserDashboard";
import {
  getAllSettings,
  getAllOrganization,
  getalluser,
  get_particular_org_user,
} from "../../actions/tenants";

const Header = ({
  auth: { isAuthenticated, loading, user },
  tenants: { get_particularOrg_user },
  logout,
  getAllSettings,
  get_particular_org_user,
  getalluser,
  getAllOrganization,
}) => {
  const myuser = JSON.parse(localStorage.getItem("user"));
  const myorg = JSON.parse(localStorage.getItem("Org"));

  useEffect(() => {
    if (myuser) {
      getAllSettings({
        OrganizationId: myuser && myuser.OrganizationId,
        userId: myuser && myuser._id,
      });
      getAllOrganization();
      get_particular_org_user({
        OrganizationId: myuser && myuser.OrganizationId,
      });
    }
  }, [getAllSettings]);
  useEffect(() => {
    getalluser();
    getAllOrganization();
  }, []);
  const [showLogin, setShowLogin] = useState(false);
  const [showLogout, setShowLogout] = useState(false);

  const [showTenantSetting, setTenantSetting] = useState(false);

  const handleLogoutModalClose = () => setShowLogout(false);

  const handleLogoutModalShow = () => {
    setShowLogout(true);
  };
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
  const openSecondLevelMenu2 = () => {};

  const imgurl = "../../static/images/lraLogo_wh.png";

  return (
    <Fragment>
      <header>
        <Navbar
          className="navbar_height top_menu "
          expand="lg"
          fixed="top"
          style={{ padding: "0px 1em" }}
        >
          {(!loading && isAuthenticated && user && user.usergroup === "Admin")||(!loading && isAuthenticated && user && user.usergroup === "Manager") ? (
            <Navbar.Brand>
              <NavLink to="/AdminProfile">
                <div>
                  <img
                    className=" log_size log"
                    alt="Pinnacle Media"
                    src={myuser && myuser.output ? myuser.output.Logo : lralogo}
                    //{imgurl}
                    //{myuser &&  myuser.output ? myuser.output.Logo :lralogo}
                    title="Dashboard"
                  />
                </div>
              </NavLink>
            </Navbar.Brand>
          ) : (
            <></>
          )}
          {!loading &&
          isAuthenticated &&
          user &&
          user.usergroup === "Super Admin" ? (
            <Navbar.Brand>
              <NavLink to="/AdminProfile">
                <div className=" logostyle">
                  <img
                    className="log_size1 log"
                    alt="Pinnacle Media"
                    src={myuser.output.Logo}
                    title="Dashboard"
                  />
                </div>
              </NavLink>
            </Navbar.Brand>
          ) : (
            <Navbar.Brand></Navbar.Brand>
          )}
          {(!loading &&
          isAuthenticated &&
          user &&
          user.usergroup === "IT Department")? (
            <Navbar.Brand>
              <div className=" logostyle">
                <img
                  className="log_size logg"
                  alt="Pinnacle Media"
                  src={myuser.output.Logo}
                  title="Dashboard"
                />
              </div>
            </Navbar.Brand>
          ) : (
            <Navbar.Brand></Navbar.Brand>
          )}

          <Navbar.Toggle aria-controls="basic-navbar-nav" className="nvbar" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav
              className="mr-auto navbar_Collapse_content mt-1 mb-3"
              id="org_detail"
            >
              <NavItem>
                {!loading &&
                isAuthenticated &&
                user &&
                user.usergroup === "Super Admin" ? (
                  <NavLink
                    to="/MainSuper"
                    id="hea"
                    activeStyle={{
                      color: "#e8a317",
                      textDecoration: "none",
                      fontWeight: "bold",
                    }}
                    className="navlink headinghover"
                  >
                    Dashboard
                  </NavLink>
                ) : (
                  <></>
                  // <NavItem></NavItem>
                )}
              </NavItem>

              {/* <NavItem>
                {!loading &&
                isAuthenticated &&
                user &&
                user.usergroup === "Super Admin" ? (
                  <NavLink
                    to="/Super"
                    id="hea"
                    className="navlink headinghover   "
                    activeStyle={{
                      color: "#e8a317",
                      textDecoration: "none",
                    }}
                  >
                    OrganizationDetails
                  </NavLink>
                ) : (
                  <></>
                  // <NavItem></NavItem>
                )}
              </NavItem> */}

              <NavItem>
                {!loading &&
                isAuthenticated &&
                user &&
                user.usergroup === "Super Admin" ? (
                  <NavLink
                    to="/Super"
                    id="hea"
                    activeStyle={{
                      color: "#e8a317",
                      textDecoration: "none",
                      fontWeight: "bold",
                    }}
                    className="navlink headinghover   "
                  >
                    Organization Details
                  </NavLink>
                ) : (
                  <></>
                  // <NavItem></NavItem>
                )}
              </NavItem>

              <NavItem>
                {!loading &&
                isAuthenticated &&
                user &&
                user.usergroup === "Super Admin" ? (
                  <NavLink
                    to="/SuperUser"
                    id="hea"
                    activeStyle={{
                      color: "#e8a317",
                      textDecoration: "none",
                      fontWeight: "bold",
                    }}
                    className="navlink"
                  >
                    User Details
                  </NavLink>
                ) : (
                  <></>
                )}
              </NavItem>

              <NavItem>
                {(!loading &&
                isAuthenticated &&
                user &&
                user.usergroup === "Admin")||(!loading &&
                isAuthenticated &&
                user &&
                user.usergroup === "Manager") ? (
                  <NavLink
                    to="/MainAdmin"
                    className="navlink  headinghover navbar-right"
                    id="hea"
                    activeStyle={{
                      color: "#e8a317",
                      textDecoration: "none",
                      fontWeight: "bold",
                    }}
                  >
                    Dashboard
                  </NavLink>
                ) : (
                  <></>
                  // <NavItem>gg</NavItem>
                )}
              </NavItem>

              {/* admin page */}
              <NavItem>
                {(!loading &&
                  isAuthenticated &&
                  user &&
                  user.usergroup === "Admin") ||
                (!loading &&
                  isAuthenticated &&
                  user &&
                  user.usergroup === "Manager") ? (
                  <NavLink
                    to="/PropertyDetail"
                    className="navlink   headinghover  navbar-right"
                    id="hea"
                    activeStyle={{
                      color: "#e8a317",
                      textDecoration: "none",
                      fontWeight: "bold",
                    }}
                  >
                    Property
                  </NavLink>
                ) : (
                  <></>
                  // <NavItem></NavItem>
                )}
              </NavItem>

              <NavItem>
                {(!loading &&
                  isAuthenticated &&
                  user &&
                  user.usergroup === "Admin") ||
                (!loading &&
                  isAuthenticated &&
                  user &&
                  user.usergroup === "Manager") ? (
                  <NavLink
                    to="/tenant-detail"
                    className="navlink  headinghover  navbar-right  "
                    id="hea"
                    activeStyle={{
                      color: "#e8a317",
                      textDecoration: "none",
                      fontWeight: "bold",
                    }}
                  >
                    Tenant
                  </NavLink>
                ) : (
                  <></>
                  // <NavItem>gg</NavItem>
                )}
              </NavItem>

              <NavItem>
                {(!loading &&
                isAuthenticated &&
                user &&
                user.usergroup === "Admin")||(!loading &&
                isAuthenticated &&
                user &&
                user.usergroup === "Manager") ? (
                  <NavLink
                    to="/AdminUser"
                    className="navlink  headinghover navbar-right"
                    id="hea"
                    activeStyle={{
                      color: "#e8a317",
                      textDecoration: "none",
                      fontWeight: "bold",
                    }}
                  >
                    User
                  </NavLink>
                ) : (
                  <></>
                )}
              </NavItem>

              <NavItem>
                {(!loading &&
                isAuthenticated &&
                user &&
                user.usergroup === "Admin")||(!loading &&
                isAuthenticated &&
                user &&
                user.usergroup === "Manager") ? (
                  <NavLink
                    to="/Report"
                    className="navlink  headinghover navbar-right "
                    id="hea"
                    activeStyle={{
                      color: "#e8a317",
                      textDecoration: "none",
                      fontWeight: "bold",
                    }}
                  >
                    Report
                  </NavLink>
                ) : (
                  <></>
                  // <NavItem>gg</NavItem>
                )}
              </NavItem>
            </Nav>

            {!loading && isAuthenticated && user ? (
              <>
                {user.usergroup === "Super Admin" ? (
                  <>
                    <Nav>
                      <ul className="top-level-menu text-left ">
                        <li>
                          <Link
                            to="#"
                            // onClick={() => handleLogoutModalShow()}
                            className="navbar-right pt-3 onnamehvr "
                          >
                            <inline
                              style={{
                                position: "relative",
                                // backgroundColor: "red",

                                bottom: "10px",
                              }}
                            >
                              {" "}
                              <span style={{ fontWeight: "bold" }}>
                                {user.username}
                              </span>{" "}
                              &nbsp;
                              <i className="fa fa-caret-down" />
                              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            </inline>
                          </Link>

                          <ul className="dropdown-menu second-level-menu mb-3 ">
                            <li className="hwhite drophover">
                              <Link
                                to="/AdminProfile"
                                className="navlinkitem"
                                // onClick={() => handleLogoutModalShow()}
                              >
                                My Profile
                              </Link>
                            </li>
                            <li className="hwhite drophover">
                              <Link
                                to="#"
                                className="navlinkitem"
                                onClick={() => handleLogoutModalShow()}
                              >
                                Logout
                              </Link>
                            </li>
                          </ul>
                        </li>
                      </ul>
                    </Nav>
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
                        <h4 className="mt-0 mr-5 text-center">
                          CONFIRMATION&nbsp;&nbsp;
                        </h4>
                      </Modal.Header>
                      <Modal.Body>
                        <h5>
                          Are you sure you want to
                          logout?&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        </h5>
                      </Modal.Body>
                      <Modal.Footer>
                        <button
                          id="logoutbtn"
                          onClick={() => LogoutModalClose()}
                        >
                          <b>YES</b>
                        </button>
                        <button
                          id="logoutbtn"
                          onClick={() => handleLogoutModalClose()}
                        >
                          <b>NO</b>
                        </button>
                      </Modal.Footer>
                    </Modal>
                  </>
                ) : (
                  <>
                    <Nav>
                      <ul className="top-level-menu text-left">
                        <li>
                          <Link
                            to="#"
                            onClick={() => openSecondLevelMenu2()}
                            className="navbar-right pt-3 pb-1 onnamehvr "
                          >
                            <inline
                              style={{
                                position: "relative",
                                // backgroundColor: "red",
                                bottom: "10px",
                              }}
                            >
                              {" "}
                              <span style={{ fontWeight: "bold" }}>
                                {user.username}
                              </span>{" "}
                              &nbsp;
                              <i className="fa fa-caret-down" />
                              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            </inline>
                          </Link>

                          <ul className="dropdown-menu second-level-menu ">
                            {(!loading &&
                            isAuthenticated &&
                            user &&
                            user.usergroup === "Admin")||(!loading &&
                            isAuthenticated &&
                            user &&
                            user.usergroup === "Manager") ? (
                              <li className="hwhite">
                                <Link
                                  to="/AdminProfile"
                                  className="navlinkitem"
                                  //onClick={() => handleTenantSettingModalShow()}
                                >
                                  My Profile
                                </Link>
                              </li>
                            ) : (
                              <></>
                            )}
                            {!loading &&
                            isAuthenticated &&
                            user &&
                            user.usergroup === "Admin" ? (
                              <li className="hwhite">
                                <Link
                                  to="#"
                                  className="navlinkitem"
                                  onClick={() => handleTenantSettingModalShow()}
                                >
                                  Tenant Setting
                                </Link>
                              </li>
                            ) : (
                              <></>
                            )}
                            {/* {!loading &&
                            isAuthenticated &&
                            user &&
                            user.usergroup === "Admin" ? (
                              <li className="hwhite">
                                <Link
                                  to="/user-activity"
                                  className="navlinkitem"
                                 
                                >
                                  User Activity
                                </Link>
                              </li>
                            ) : (
                              <></>
                            )} */}
                            {!loading &&
                            isAuthenticated &&
                            user &&
                            user.usergroup === "Admin" ? (
                              <li className="hwhite">
                                <Link
                                  to="/change-password"
                                  className="navlinkitem"
                                >
                                  Reset Password
                                </Link>
                              </li>
                            ) : (
                              <></>
                            )}

                            <li className="hwhite">
                              <Link
                                to="#"
                                className="navlinkitem"
                                onClick={() => handleLogoutModalShow()}
                              >
                                Logout
                              </Link>
                            </li>
                          </ul>
                        </li>
                      </ul>
                    </Nav>
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
                        <h4 className="mt-0 mr-5 text-center">
                          CONFIRMATION&nbsp;&nbsp;
                        </h4>
                      </Modal.Header>
                      <Modal.Body>
                        <h5>
                          Are you sure you want to
                          logout?&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        </h5>
                      </Modal.Body>
                      <Modal.Footer>
                        <button
                          id="logoutbtn"
                          onClick={() => LogoutModalClose()}
                        >
                          <b>YES</b>
                        </button>
                        <button
                          id="logoutbtn"
                          onClick={() => handleLogoutModalClose()}
                        >
                          <b>NO</b>
                        </button>
                      </Modal.Footer>
                    </Modal>
                    {/*Tenant Settings Modal */}
                    <Modal
                      show={showTenantSetting}
                      backdrop="static"
                      keyboard={false}
                      size="md"
                      aria-labelledby="contained-modal-title-vcenter"
                      centered
                    >
                      <Modal.Header className="confirmbox-heading">
                        <div className="col-lg-10">
                          <h3
                            style={{
                              color: "white",
                            }}
                            className="text-center  ml-4"
                          >
                            Tenant Setting
                          </h3>
                        </div>
                        <div className="col-lg-2">
                          <button
                            onClick={handleTenantSettingModalClose}
                            className="close"
                          >
                            <img
                              src={require("../../static/images/close.png")}
                              alt="X"
                              style={{ height: "20px", width: "20px" }}
                            />
                          </button>
                        </div>
                      </Modal.Header>
                      <Modal.Body>
                        <TenantSettings
                          onAddSettingModalChange={onAddSettingModalChange}
                        />
                      </Modal.Body>
                    </Modal>
                  </>
                )}
              </>
            ) : (
              <Fragment>
                <Nav>
                  <NavItem></NavItem>

                  <Modal
                    //className="back"
                    //style={{ background: "red" }}
                    show={showLogin}
                    backdrop="static"
                    keyboard={false}
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                  >
                    <Modal.Header></Modal.Header>
                    <Modal.Body>
                      <Login />
                    </Modal.Body>
                  </Modal>
                </Nav>
              </Fragment>
            )}
          </Navbar.Collapse>
        </Navbar>
      </header>
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
  get_particular_org_user,
  getAllOrganization,
})(Header);
