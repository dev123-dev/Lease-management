import React, { useState, Fragment, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { getAllOrganization } from "../../actions/tenants";
import { useReactToPrint } from "react-to-print";
const TenantReport = ({
  auth: { isAuthenticated, user, users },
  tenants: { exp_org_detail, exp_org_report },
  getAllOrganization,
}) => {
  useEffect(() => {
    getAllOrganization();
  }, []);

  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });
  const [showEditModal, setShowEditModal] = useState(false);
  const handleEditModalClose = () => setShowEditModal(false);
  const [orgData, setOrgData] = useState(null);

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
  const history = useHistory();

  const renewal = (org) => {
    setShowEditModal(true);
    setOrgData(org);
    history.push("/Renewal-Org", org);
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
      {user.usergroup === "Super Admin" ? (
        <div>
          <div className="container container_align ">
            <section className="sub_reg">
              <div className="row col-lg-12 col-md-12 col-sm-12 col-12 no_padding">
                <div className="col-lg-10 col-md-11 col-sm-11 col-11 ">
                  <h2 className="heading_color"> Organization Report </h2>
                </div>
                <div className="col-lg-2 col-md-11 col-sm-11 col-11 py-4">
                  <img
                    className="img_icon_size log"
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
                            <th> Name</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>StartDate</th>
                            <th>End D</th>
                            <th>Status</th>
                            <th>Operation</th>
                          </tr>
                        </thead>
                        <tbody>
                          {exp_org_detail &&
                            exp_org_detail[0] &&
                            exp_org_detail.map((org, index) => {
                              var ED = org.enddate && org.enddate.split(/\D/g);
                              var EndDate = [
                                ED && ED[2],
                                ED && ED[1],
                                ED && ED[0],
                              ].join("-");
                              return (
                                <tr>
                                  <td>{org.OrganizationName}</td>
                                  <td>{org.OrganizationEmail}</td>
                                  <td>{org.OrganizationNumber}</td>
                                  <td>{org.date}</td>
                                  <td>{EndDate}</td>
                                  <td>{org.AgreementStatus}</td>

                                  <td>
                                    {org.AgreementStatus === "Expired" ? (
                                      <button
                                        className="rewbtn"
                                        onClick={() => renewal(org)}
                                      >
                                        Renewal
                                      </button>
                                    ) : (
                                      <p></p>
                                    )}
                                  </td>
                                </tr>
                              );
                            })}
                          {exp_org_detail.length < 1 && (
                            <td colSpan={10}>No Data Available</td>
                          )}
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

const mapStateToProps = (state) => ({
  auth: state.auth,
  tenants: state.tenants,
});

export default connect(mapStateToProps, {
  getAllOrganization,
})(TenantReport);
