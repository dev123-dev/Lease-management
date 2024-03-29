import React, { useState, Fragment, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { getAllOrganization } from "../../actions/tenants";
import { useReactToPrint } from "react-to-print";
const TenantReport = ({
  auth: { isAuthenticated, user, users },
  tenants: { exp_org_detail, exp_org },
  getAllOrganization,
}) => {
  const [refresh, SetRefresh] = useState("");

  useEffect(() => {
    getAllOrganization();
  }, [refresh]);

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
    // alert("");
    setShowEditModal(true);
    setOrgData(org);
    history.push("/Renewal-Org", { org: org, SetRefresh: refresh });
    //history.push("/Renewal-Org", org);
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
        <div className="col mt-sm-5">
          <div className="row col-lg-12 col-md-12 col-sm-12 col-12 no_padding mt-sm-2 ">
            <div className="col-lg-12 col-md-12 col-sm-12 col-12  ">
              <h2
                style={{
                  position: "relative",
                  top: "60px",
                }}
                className=" heading_color  headsize  ml-4"
              >
                Organization Report
              </h2>
            </div>

            <div className="row table1">
              <div className="col-lg-1  col-sm-12 col-md-12"></div>
              <div className="body-inner no-padding table-responsive fixTableHead ml-4">
                <table
                  className="table table-bordered table-striped table-hover table1 mt-5 "
                  id="datatable2"
                >
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Phone</th>
                      <th>StartDate</th>
                      <th>EndDate</th>
                      <th>Status</th>
                      <th>Operation</th>
                    </tr>
                  </thead>

                  <tbody className="text-center">
                    {exp_org &&
                      exp_org[0] &&
                      exp_org.map((org, index) => {
                        var ED1 = org.date.split(/\D/g);
                        var startDate = [ED1[2], ED1[1], ED1[0]].join("-");
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
                            <td>{startDate}</td>
                            <td>{EndDate}</td>
                            <td>{org.AgreementStatus}</td>

                            <td>
                              {org.AgreementStatus === "Expired" ? (
                                <i>Renewal</i>
                              ) : (
                                <p></p>
                              )}
                            </td>
                          </tr>
                        );
                      })}
                    {exp_org_detail.length < 1 && (
                      <td className="text-center" colSpan={10}>
                        No Data Available
                      </td>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
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
