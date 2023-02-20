
import React, { useEffect } from "react";
import { connect } from "react-redux";
import { getAllOrganization } from "../../actions/tenants";

export default function Tenant_Details() {
  console.log("property page")
  return (
    <div>
      <div className="container container_align ">
        <section className="sub_reg">
          <div className="row col-lg-12 col-md-12 col-sm-12 col-12 no_padding">
            <div className="col-lg-10 col-md-11 col-sm-11 col-11 ">
              <h2 className="heading_color">Tenant Reports </h2>
            </div>

           {/* here addd the modal code for adding the tenant */}

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
                        <th>Tenant Name</th>
                        <th>Tenant Number</th>
                        <th>Tenant Location</th>
                        <th>Tenant Address</th>
                        <th>Stamp Duty</th>
                        <th>Lease Time Period</th>
                        <th>Lease something</th>
                        <th>Operation</th>
                      </tr>
                    </thead>
                      {/* <tbody>
                      {allorg &&
                        allorg[0] &&
                        allorg.map((orgVal, idx) => {
                          return (
                            <tr key={idx}>
                              <td>{orgVal.OrganizationName}</td>
                              <td>{orgVal.OrganizationEmail}</td>
                              <td>{orgVal.OrganizationNumber}</td>
                              <td>{orgVal.OrganizationAddress}</td>
                              <td>{orgVal.AgreementStatus}</td>
                              <td>
                        
                              {orgVal.AgreementStatus === "Expired" ? (
                                <td>
                                  <center>
                                     <button
                                      variant="success"
                                      className="btn sub_form"
                                      // onClick={() =>
                                      //   onRenewal(orgVal, idx)
                                      // }
                                    >
                                      Renewal
                                    </button> 
                                  </center>
                                </td>
                              
                              ) : (
                                <td></td>
                              )}
                            </tr>
                          );
                        })}
                    </tbody>   */}
                    <td>1</td>
                    <td>2</td>
                    <td>3</td>
                    <td>4</td>
                    <td>5</td>
                    <td>6</td>
                    <td>7</td>

                     <td>
                    <img className="img_icon_size log"
                         // onClick={() => clicking()}
                          src={require("../../static/images/edit_icon.png")}
                          alt="Edit"
                          title="Add User"
                        />
                          <img
                          className="img_icon_size log"
                          // onClick={() => onClickHandler()}
                          //onClick={()=>onondelet()}
                          src={require("../../static/images/delete.png")}
                          alt="Add User"
                          title="Add User"
                        /></td> 
                  </table>
                </div>
              </section>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}


