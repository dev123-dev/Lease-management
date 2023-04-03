import React, { useState, Fragment, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Modal, Button } from "react-bootstrap";
import { useReactToPrint } from "react-to-print";
import { getAllOrganization } from "../../actions/tenants";
import RenewalOrg_mainPage from "./RenewalOrg_model";
import Pagination from "../layout/Pagination";
// import { Roller } from "react-awesome-spinners";
const MainSuperPage = ({
  auth: { expReport, isAuthenticated, user, users, loading },
  tenants: { allorg },
  getAllOrganization,
}) => {
  useEffect(() => {
    getAllOrganization();
  }, [allorg]);

  var today = new Date();
  var dd = today.getDate();
  var mm = today.getMonth() + 1;
  var yyyy = today.getFullYear();
  if (dd < 10) dd = "0" + dd;
  if (mm < 10) mm = "0" + mm;
  var todayDateymd = yyyy + "-" + mm + "-" + dd;

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
  const totallorg=allorg.filter((ele)=>ele.org_status!=="Deactive");

  return !isAuthenticated || !user || !users || loading ? (
    // <Roller />
    <></>
  ) : (
    <div className="col mt-sm-5 DashBoard">
      <div className="row col-lg-12 col-md-12 col-sm-12 col-12 no_padding  ">
        <div>
          <h2
           style={{
            position:"relative",
        top:"50px",
            }}
            className=" heading_color  headsize  ml-3"
          
            
              
             
            >
              {" "}
              Dashboard
            
          </h2>
      
        </div>
        <div className="container-fluid d-flex align-items-center justify-content-center ">
          <div className="col">
            <div className="row ">
              <div className="col-lg-1"></div>

              <div className="body-inner no-padding table-responsive">
                <table
                  className="table table-bordered table-striped table-hover table1 mt-5"
                  id="datatable2"
                >
                  <thead>
                    <tr>
                      <th>Orgnization Name</th>
                      <th>Email</th>
                      <th>Phone</th>
                      <th>Address</th>
                      <th>Org-Status</th>
                      <th>Status</th>
                      <th>Start Date</th>
                      <th>End Date</th>
                      <th>Renewal</th>
                    </tr>
                  </thead>
                  <tbody className="text-center">
                    {currentDatas &&
                      currentDatas[0] &&
                      currentDatas.map((org, index) => {
                        var ED = org.enddate && org.enddate.split(/\D/g);
                        var Enddate = [
                          ED && ED[2],
                          ED && ED[1],
                          ED && ED[0],
                        ].join("-");
                        var SD = org.date && org.date.split(/\D/g);
                        var StartDate = [
                          SD && SD[2],
                          SD && SD[1],
                          SD && SD[0],
                        ].join("-");
                        if (org.AgreementStatus !== "Deactivated") {
                          return (
                            <tr key={index}>
                              <td>{org.OrganizationName}</td>
                              <td>{org.OrganizationEmail}</td>
                              <td>{org.OrganizationNumber}</td>
                              <td>{org.OrganizationAddress}</td>
                              <td>{org.org_status}</td>
                              <td>{org.AgreementStatus}</td>
                              <td>{StartDate}</td>
                              <td>{Enddate}</td>
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
                        }
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
                <p className="text-end h6">
                  {" "}
                  No. of Organization : {totallorg.length}
                </p>
              </div>
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
        <Modal.Header className="confirmbox-heading">
          <div className="col-lg-10">
            <h3
              style={{
                fontFamily: "Sans-serif",
                color: "white",
              }}
            >
              Renewal Agreement
            </h3>
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

const mapStateToProps = (state) => ({
  auth: state.auth,
  tenants: state.tenants,
});

export default connect(mapStateToProps, { getAllOrganization })(MainSuperPage);
