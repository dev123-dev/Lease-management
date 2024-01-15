import React, { useState, Fragment, useEffect, useRef } from "react";

import { connect } from "react-redux";
import {
  // ParticularTenant,
  getParticularOrg,
  getParticularProperty,
  getTenantDetails,
  ParticularTenantFilter,
} from "../../actions/tenants";

import Pagination from "../layout/Pagination";

const ContactReport = ({
  auth: { user },
  tenants: { sortetenantdetails },
  ParticularTenantFilter,
  getParticularOrg,
  getParticularProperty,
  getTenantDetails,
}) => {
  const [freshpage, setFreshPage] = useState(true);

  useEffect(() => {
    ParticularTenantFilter();
    getParticularOrg({ OrganizationId: user && user.OrganizationId });
    getParticularProperty({ OrganizationId: user && user.OrganizationId });
  }, [freshpage]);
  useEffect(() => {
    getTenantDetails();
    getParticularProperty();
  }, []);

  //pagination code
  const [currentData, setCurrentData] = useState(1);
  const [dataPerPage] = useState(8);
  //Get Current Data
  const indexOfLastData = currentData * dataPerPage;
  const indexOfFirstData = indexOfLastData - dataPerPage;
  const currentDatas =
    sortetenantdetails &&
    sortetenantdetails.slice(indexOfFirstData, indexOfLastData);
  const paginate = (nmbr) => {
    //nmbr is page  number
    setCurrentData(nmbr);
  };

  console.log("currentDatas", currentDatas);
  return (
    <>
      <div className="col mt-sm-4 space ">
        <div className="row col-lg-12 col-md-12 col-sm-12 col-12 no_padding ">
          <div className="row mt-5  ">
            <div className="col-lg-5 mt-3">
              <h2 className="heading_color  headsize  ml-4">Contact Report</h2>
            </div>
          </div>

          <div className="container-fluid d-flex align-items-center justify-content-center mt-sm-1 ">
            <div className="col">
              <div className="row ">
                <div className="col-lg-1"></div>
                <div className="firstrowsticky body-inner no-padding table-responsive">
                  <table
                    className="table table-bordered table-striped table-hover   mt-1  "
                    id="datatable2"
                  >
                    <thead>
                      <tr>
                        <th
                          className="headcolstatic"
                          style={{ height: "-10px !important" }}
                        >
                          Tenant Name
                        </th>
                        {/* <th>Door Number</th> */}
                        <th>Building Name</th>
                        <th>Door No</th>
                        <th> Location</th>
                        <th>Rent Amount</th>
                        <th>Phone No</th>
                        <th>Pan No</th>
                        <th>Aadhaar no</th>
                        <th>Firm Name</th>
                        <th>leaseEndDate</th>
                      </tr>
                    </thead>
                    <tbody className="text-center">
                      {currentDatas &&
                        currentDatas.map((Val, idx) => {
                          return (
                            <tr key={idx}>
                              <td className="headcolstatic secondlinebreak1">
                                {Val.tenantName}
                              </td>
                              <td>{Val.BuildingName}</td>
                              <td>
                                <img
                                  className="img_icon_size log"
                                  src={require("../../static/images/info.png")}
                                  alt="Govt Cards"
                                  title={Val.shopDoorNo.map((e) => e.value)}
                                />
                              </td>
                              <td>{Val.Location}</td>
                              <td>{Val.tenantRentAmount}</td>
                              <td>{Val.tenantPhone}</td>
                              <td>{Val.tenantPanNo}</td>
                              <td>{Val.tenantAdharNo}</td>
                              <td>{Val.tenantFirmName}</td>
                              {/* <td title={AddDetail.shopDoorNo}> */}
                              <td>{Val.tenantLeaseEndDate}</td>
                            </tr>
                          );
                        })}
                    </tbody>
                  </table>
                </div>
                <div className="col-lg-1"></div>
              </div>

              <div className="row">
                <div className="col-lg-6">
                  {sortetenantdetails && sortetenantdetails.length !== 0 ? (
                    <Pagination
                      dataPerPage={dataPerPage}
                      totalData={sortetenantdetails.length}
                      paginate={paginate}
                      currentPage={currentData}
                    />
                  ) : (
                    <Fragment />
                  )}
                </div>
                <div className="col-lg-6">
                  <p className="text-end h6">
                    No. of Property : {sortetenantdetails.length}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const mapStateToProps = (state) => ({
  tenants: state.tenants,
  auth: state.auth,
});
export default connect(mapStateToProps, {
  //getAllShops,
  // deactiveProperty,
  ParticularTenantFilter,
  getParticularOrg,
  //getAllSettings,
  getParticularProperty,
  getTenantDetails,
})(ContactReport);
