import React, { useState, Fragment, useEffect } from "react";
import DeactiveTenantDetails from "./DeactiveTenantDetails";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getAllTenants } from "../../actions/tenants";
import { Modal } from "react-bootstrap";
import Select from "react-select";
import Pagination from "../layout/Pagination";

import {
  getAllTenanatDoornoFilter,
  getAllDoorNumbers,
} from "../../actions/tenants";
import EditTenantDetails from "./EditTenantDetails";
// import EditTenantDetails from "./EditTenantDetails";
const AllTenantShopDetails = ({
  auth: { isAuthenticated, user, users },
  getAllTenants,
  getAllTenanatDoornoFilter,
  tenants: { allDoorNumber, allTenants },
  getAllDoorNumbers,
}) => {
  useEffect(() => {
    getAllTenants();
  }, [getAllTenants]);

  useEffect(() => {
    getAllDoorNumbers();
  }, [getAllDoorNumbers]);
  const [showDeactiveModal, setShowDeactiveModal] = useState(false);
  const handleDeactiveModalClose = () => setShowDeactiveModal(false);

  const onDeactiveModalChange = (e) => {
    if (e) {
      handleDeactiveModalClose();
    }
  };

  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const handleUpdateModalClose = () => setShowUpdateModal(false);

  const onUpdateModalChange = (e) => {
    if (e) {
      handleUpdateModalClose();
    }
  };

  const [userData, setUserData] = useState(null);
  const onUpdate = (tenants, idx) => {
    setShowDeactiveModal(true);
    setUserData(tenants);
  };

  const onEdit = (tenants, idx) => {
    setShowUpdateModal(true);
    setUserData(tenants);
  };
  const shopdoorNo = [];
  allDoorNumber.map((doorno) =>
    shopdoorNo.push({
      label: doorno.tenantDoorNo,
      value: doorno.tenantDoorNo,
    })
  );

  const [doorNo, getDoorNoData] = useState();

  const onDoorNoChange = (e) => {
    getDoorNoData(e);

    const finalData = {
      doornoSearch: e.value,
    };
    //console.log(finalData);
    getAllTenanatDoornoFilter(finalData);
  };

  const onClickReset = () => {
    getAllTenants();
    getDoorNoData("");
  };

  //pagination code
  const [currentData, setCurrentData] = useState(1);
  const [dataPerPage] = useState(8);
  //Get Current Data
  const indexOfLastData = currentData * dataPerPage;
  const indexOfFirstData = indexOfLastData - dataPerPage;
  const currentDatas =
    allTenants && allTenants.slice(indexOfFirstData, indexOfLastData);
  //change page
  const paginate = (nmbr) => {
    setCurrentData(nmbr);
  };
  //pagination code ends

  return !isAuthenticated || !user || !users ? (
    <Fragment></Fragment>
  ) : (
    <Fragment>
      <div className="container container_align ">
        <section className="sub_reg">
          <div className="row col-lg-12 col-md-12 col-sm-12 col-12 no_padding">
            <div className="col-lg-5 col-md-11 col-sm-11 col-11">
              <h2 className="heading_color">All Tenants Shop Details</h2>
            </div>
            <div className="col-lg-3 col-md-11 col-sm-11 col-11 py-3">
              <Select
                name="tenantDoorNo"
                options={shopdoorNo}
                isSearchable={true}
                value={doorNo}
                placeholder="Select Door No"
                onChange={(e) => onDoorNoChange(e)}
                theme={(theme) => ({
                  ...theme,
                  height: 26,
                  minHeight: 26,
                  borderRadius: 1,
                  colors: {
                    ...theme.colors,
                    primary: "black",
                  },
                })}
              />
            </div>
            <div className="col-lg-1 col-md-2 col-sm-12 col-12 pt-4">
              <img
                className="img_icon_size log"
                onClick={() => onClickReset()}
                src={require("../../static/images/refresh-icon.png")}
                alt="refresh"
                title="Refresh"
              />
            </div>
          </div>
          <div className="row">
            <div className="col-lg-11 col-md-11 col-sm-11 col-11  ">
              <section className="body">
                <div className="body-inner no-padding  table-responsive fixTableHead">
                  <table
                    className="table table-bordered table-striped table-hover"
                    id="datatable2"
                  >
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Door No</th>
                        <th>File No</th>
                        <th>Firm Name</th>
                        <th>Phone</th>
                        <th>Deposit</th>
                        <th>Rent</th>
                        <th>Lease Start</th>
                        <th>Lease End</th>
                        <th>Op</th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentDatas &&
                        currentDatas.map((tenants, idx) => {
                          var SD = tenants.tenantLeaseStartDate.split(/\D/g);
                          var tenantLeaseStartDate = [SD[2], SD[1], SD[0]].join(
                            "-"
                          );
                          var ED = tenants.tenantLeaseEndDate.split(/\D/g);
                          var tenantLeaseEndDate = [ED[2], ED[1], ED[0]].join(
                            "-"
                          );
                          return (
                            <tr key={idx}>
                              <td>{tenants.tenantName}</td>
                              <td>{tenants.tenantDoorNo}</td>
                              <td>{tenants.tenantFileNo}</td>
                              <td>{tenants.tenantFirmName}</td>
                              <td>{tenants.tenantPhone}</td>
                              <td>{tenants.tenantDepositAmt}</td>
                              <td>{tenants.tenantRentAmount}</td>
                              <td><center>{tenantLeaseStartDate}</center></td>
                              <td
                                style={
                                  tenants.AgreementStatus === "Expired"
                                    ? { color: "red" }
                                    : { color: "black" }
                                }
                              >
                                <center>{tenantLeaseEndDate}</center>
                              </td>

                              <td><center>
                                {tenants.tenantstatus &&
                                tenants.tenantstatus !== "Deactive" ? (
                                  <Fragment>
                                   
                                    <img
                                      className="img_icon_size log"
                                      onClick={() => onUpdate(tenants, idx)}
                                      src={require("../../static/images/delete.png")}
                                      alt="Deactivate"
                                      title="Deactivate"
                                    />
                                  </Fragment>
                                ) : (
                                  <Fragment></Fragment>
                                )}
                                &nbsp;

                                <img
                                  className="img_icon_size log"
                                  onClick={() => onEdit(tenants, idx)}
                                  src={require("../../static/images/edit_icon.png")}
                                  alt="Edit"
                                  title="Edit"
                                /></center>
                              </td>
                            </tr>
                          );
                        })}
                    </tbody>
                  </table>
                  <div className="row">
                    <div className="col-lg-4 col-md-6 col-sm-12 col-12 ">
                      {allTenants && allTenants.length !== 0 ? (
                        <Pagination
                          dataPerPage={dataPerPage}
                          totalData={allTenants.length}
                          paginate={paginate}
                          currentPage={currentData}
                        />
                      ) : (
                        <Fragment />
                      )}
                    </div>
                    <div className="col-lg-8 col-md-6 col-sm-12 col-12 align_right">
                      <label>
                        No of Tenants : {allTenants && allTenants.length}
                      </label>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </section>
        <Modal
          show={showDeactiveModal}
          backdrop="static"
          keyboard={false}
          size="md"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header>
            <div className="col-lg-10">
              <h3 className="modal-title text-center">Deactivate Tenant </h3>
            </div>
            <div className="col-lg-2">
              <button onClick={handleDeactiveModalClose} className="close">
                <img
                  src={require("../../static/images/close.png")}
                  alt="X"
                  style={{ height: "20px", width: "20px" }}
                />
              </button>
            </div>
          </Modal.Header>
          <Modal.Body>
            <DeactiveTenantDetails
              tenants={userData}
              onDeactiveModalChange={onDeactiveModalChange}
            />
          </Modal.Body>
        </Modal>
        <Modal
          show={showUpdateModal}
          backdrop="static"
          keyboard={false}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header>
            <div className="col-lg-10">
              <h3 className="modal-title text-center">Edit Tenant Details </h3>
            </div>
            <div className="col-lg-2">
              <button onClick={handleUpdateModalClose} className="close">
                <img
                  src={require("../../static/images/close.png")}
                  alt="X"
                  style={{ height: "20px", width: "20px" }}
                />
              </button>
            </div>
          </Modal.Header>
          <Modal.Body>
            <EditTenantDetails
              tenants={userData}
              onUpdateModalChange={onUpdateModalChange}
            />
          </Modal.Body>
        </Modal>
      </div>
    </Fragment>
  );
};

AllTenantShopDetails.propTypes = {
  auth: PropTypes.object.isRequired,
  getAllTenants: PropTypes.func.isRequired,
  getAllTenanatDoornoFilter: PropTypes.func.isRequired,
  tenants: PropTypes.object.isRequired,
  getAllDoorNumbers: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  tenants: state.tenants,
});

export default connect(mapStateToProps, {
  getAllTenants,
  getAllTenanatDoornoFilter,
  getAllDoorNumbers,
})(AllTenantShopDetails);
