import React, { useState, Fragment, useRef } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { Form, Button } from "react-bootstrap";
import { Modal } from "react-bootstrap";
import { getAllOrganization } from "../../actions/tenants";
import { useReactToPrint } from "react-to-print";
const TenantReport = ({
  auth: { expReport, isAuthenticated, user, users },
  tenants: { allorg },
  getAllOrganization,
}) => {
  getAllOrganization();
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });
  const [showEditModal, setShowEditModal] = useState(false);
  const handleEditModalClose = () => setShowEditModal(false);
  const [userData, setUserData] = useState(null);

  // Modal for Deactivation
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [tId, setId] = useState("");

  const onDelete = (id) => {
    setId(id);
    handleShow();
  };

  const [formData, setFormData] = useState({
    deactive_reason: "",
    isSubmitted: false,
  });
  const { deactive_reason } = formData;

  const onInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
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
  const onAdd = () => {
    const reason = {
      deactive_reason: deactive_reason,
      tid: tId,
      isSubmitted: "true",
    };
    // deactiveTenantsDetails(reason);
    handleClose();
  };

  return !isAuthenticated || !user || !users ? (
    <Fragment></Fragment>
  ) : (
    <>
      {user.usergroup === "Super Admin" ? (
        <div>
          <div className="container container_align ">
            <section className="sub_reg">
              <div className="row col-lg-12 col-md-12 col-sm-12 col-12 no_padding">
                <div className="col-lg-10 col-md-11 col-sm-11 col-11 ">
                  <h2 className="heading_color"> DashBoard </h2>
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
                            <th>Main page Name</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>StartDate</th>
                            <th>Org-Status</th>
                            <th>End D</th>
                            <th>Operation</th>
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
                                  <td>{org.OrganizationNumber}</td>
                                  <td>{org.OrganizationAddress}</td>
                                  <td>{org.AgreementStatus}</td>
                                  <td>{org.enddate}</td>
                                  <td>
                                    {org.AgreementStatus === "Expired" ? (
                                      <button className="rewbtn">
                                        Renewal
                                      </button>
                                    ) : (
                                      <p></p>
                                    )}
                                  </td>
                                </tr>
                              );
                            })}
                        </tbody>
                      </table>
                    </div>
                  </section>
                </div>
              </div>
            </section>
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

TenantReport.propTypes = {
  auth: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
  tenants: state.tenants,
});

export default connect(mapStateToProps, {
  getAllOrganization,
})(TenantReport);
