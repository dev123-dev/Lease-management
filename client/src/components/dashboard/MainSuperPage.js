import React, { useState, Fragment, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { Modal } from "react-bootstrap";

import { useReactToPrint } from "react-to-print";
import { getAllOrganization } from "../../actions/tenants";
import RenewalorgAgreement from "./RenewalorgAgreement";
const MainSuperPage = ({
  auth: { expReport, isAuthenticated, user, users },
  tenants: { allorg },
  getAllOrganization,
}) => {
  useEffect(() => {
    getAllOrganization();
  }, []);
  console.log("this is all org data", allorg);
  //console.log(allorg);

  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });
  const [showEditModal, setShowEditModal] = useState(false);
  const handleEditModalClose = () => setShowEditModal(false);
  const [userData, setUserData] = useState(null);
  const [orgdata, setOrg] = useState(null);

  const handleOpen = (org) => {
    setShowEditModal(true);
    setOrg(org);
  };
  const onRenewal = (tenants) => {
    setShowEditModal(true);
    setUserData(tenants);
  };
  const onReportModalChange = (e) => {
    if (e) {
      handleEditModalClose();
    }
  };
  return !isAuthenticated || !user || !users ? (
    <Fragment></Fragment>
  ) : (
    <>
      <div>
        <div className="container container_align ">
          <section className="sub_reg">
            <div className="row col-lg-12 col-md-12 col-sm-12 col-12 no_padding">
              <div className="col-lg-10 col-md-11 col-sm-11 col-11 ">
                <h2 className="heading_color">DashBoard </h2>
              </div>
              <div className="col-lg-2 col-md-11 col-sm-11 col-11 py-4">
                <img
                  className="img_icon_size log"
                  // onClick={() => onClickHandler()}
                  src={require("../../static/images/print.png")}
                  alt="Add User"
                  title="Add User"
                />
              </div>
            </div>
            <div className="row">
              <div className="col-lg-11 col-md-11 col-sm-11 col-11 text-center ">
                <section className="body">
                  <div className="body-inner no-padding  table-responsive fixTableHead">
                    <table
                      className="table table-bordered table-striped table-hover"
                      id="datatable2"
                    >
                      <thead>
                        <tr>
                          <th>Orgnization Name</th>
                          <th>Email</th>
                          <th>Phone</th>
                          <th>Address</th>
                          <th>Org-Status</th>
                          <th>End Date</th>
                          <th>Renewal</th>
                        </tr>
                      </thead>
                      <tbody>
                        {allorg &&
                          allorg[0] &&
                          allorg.map((org, index) => {
                            return (
                              <tr>
                                <td>{org.OrganizationName}</td>
                                <td>{org.OrganizationEmail}</td>
                                <td>{org.OrganizationPhone}</td>
                                <td>{org.OrganizationAddress}</td>
                                <td>{org.org_status}</td>

                                <td>{org.enddate}</td>
                                <td>
                                  {org.AgreementStatus === "Expired" ? (
                                    <button
                                      className="rewbtn"
                                      onClick={() => handleOpen(org)}
                                    >
                                      Renewal
                                    </button>
                                  ) : (
                                    <></>
                                  )}
                                </td>
                              </tr>
                            );
                          })}
                      </tbody>
                      <td></td>
                    </table>
                  </div>
                </section>
              </div>
            </div>
          </section>
        </div>
      </div>

      {/* //renwl */}
      <Modal show={showEditModal} centered>
        <Modal.Title>
          <></>
          <div className="text-center h4">
            <b>RenewalOrg</b>
          </div>
        </Modal.Title>
        {/* <Modal.Header className="lg" ></Modal.Header> */}
        <Modal.Body>
          <RenewalorgAgreement OrgData={orgdata} />
        </Modal.Body>
        <Modal.Footer>
          {/* <Button
            // variant="primary"
            id="savebtn"
            onClick={onAdd}
          >
            Save
          </Button> */}
          {/* <Button variant="primary" onClick={handleClose} id="savebtn">
            close
          </Button> */}
        </Modal.Footer>
      </Modal>
    </>
  );
};

MainSuperPage.propTypes = {
  auth: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
  tenants: state.tenants,
});

export default connect(mapStateToProps, { getAllOrganization })(MainSuperPage);
