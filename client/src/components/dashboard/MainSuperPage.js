import React, { useState, Fragment, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { Modal, Button } from "react-bootstrap";

import { useReactToPrint } from "react-to-print";
import { getAllOrganization } from "../../actions/tenants";
import RenewalOrg_mainPage from "./RenewalOrg_model";
import Pagination from "../layout/Pagination";
const MainSuperPage = ({
  auth: { expReport, isAuthenticated, user, users },
  tenants: { allorg },
  getAllOrganization,
}) => {
  useEffect(() => {
    getAllOrganization();
  }, []);

  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });
  const [showRenewalModal, setShowRenewalModal] = useState(false);
  const handleEditModalClose = () => setShowRenewalModal(false);
  const [userData, setUserData] = useState(null);

  const onRenewal = (organization) => {
    setShowRenewalModal(true);
    setUserData(organization);
  };
  const onReportModalChange = (e) => {
    if (e) {
      handleEditModalClose();
    }
  };

  const handleRenewalModalClose = () => setShowRenewalModal(false);

  const onUpdateModalChange = (e) => {
    if (e) {
      handleRenewalModalClose();
    }
  };
  //pagination code
  const [currentData, setCurrentData] = useState(1);
  const [dataPerPage] = useState(7);
  //Get Current Data
  const indexOfLastData = currentData * dataPerPage;
  const indexOfFirstData = indexOfLastData - dataPerPage;
  const currentDatas =
    allorg && allorg.slice(indexOfFirstData, indexOfLastData);

  const paginate = (nmbr) => {
    setCurrentData(nmbr);
  };
  return !isAuthenticated || !user || !users ? (
    <Fragment></Fragment>
  ) : (
    <div className="col mt-5">
      <div className="col"></div>
      <div className="col"></div>
      <div className="col"></div>
      <div className="col"></div>
      <div className="col"></div>
      <div className="col mt-5 h2">DashBaord</div>
      <div className="container-fluid d-flex align-items-center justify-content-center ">
        <div className="col">
          <div className="row ">
            <div className="col-lg-1"></div>

            <div className="body-inner no-padding table-responsive">
              <table
                className="table table-bordered table-striped table-hover  table-active mt-5"
                id="datatable2"
              >
                <thead>
                  <tr>
                    <th>Orgnization Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Address</th>
                    <th>Org-Status</th>
                    <th>Agreement Status</th>
                    <th>Start Date</th>
                    <th>End Date</th>
                    <th>Renewal</th>
                  </tr>
                </thead>
                <tbody>
                  {currentDatas &&
                    currentDatas[0] &&
                    currentDatas.map((org, index) => {
                      return (
                        <tr>
                          <td>{org.OrganizationName}</td>
                          <td>{org.OrganizationEmail}</td>
                          <td>{org.OrganizationNumber}</td>
                          <td>{org.OrganizationAddress}</td>
                          <td>{org.org_status}</td>
                          <td>{org.AgreementStatus}</td>
                          <td>{org.date}</td>
                          <td>{org.enddate}</td>
                          <td>
                            {org.AgreementStatus === "Expired" ? (
                              <button
                                className="rewbtn"
                                onClick={() => onRenewal(org, index)}
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
                </tbody>
              </table>
            </div>
            <div className="col-lg-1"></div>
          </div>
          <div className="row ">
            <div className="col-lg-6">
              {allorg && allorg.length !== 0 ? (
                <Pagination
                  dataPerPage={dataPerPage}
                  totalData={allorg.length}
                  paginate={paginate}
                  currentPage={currentData}
                />
              ) : (
                <Fragment />
              )}
            </div>

            <div className="col-lg-6  ">
              <p className="text-end"> No of Organization : {allorg.length}</p>
            </div>
          </div>
        </div>
      </div>

      <Modal
        show={showRenewalModal}
        backdrop="static"
        keyboard={false}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header>
          <div className="col-lg-10">
            <h4 className=" text-center">
              <b>Renewal Agreement</b>
            </h4>
          </div>
          <div className="col-lg-2">
            <button onClick={handleEditModalClose} className="close">
              <img
                src={require("../../static/images/close.png")}
                alt="X"
                style={{ height: "20px", width: "20px" }}
              />
            </button>
          </div>
        </Modal.Header>
        <Modal.Body>
          <RenewalOrg_mainPage
            orgData={userData}
            onReportModalChange={onReportModalChange}
            setShowRenewalModal={setShowRenewalModal}
          />
        </Modal.Body>
      </Modal>
    </div>
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
