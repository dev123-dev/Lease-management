import React from "react";
import AddUserModal from "./AddUserModal";
export default function AddSuperUser() {
  const clicking = () => {
    alert("done");
  };

  return (
    <div>
      <div className="container container_align ">
        <section className="sub_reg">
          <div className="row col-lg-12 col-md-12 col-sm-12 col-12 no_padding">
            <div className="col-lg-10 col-md-11 col-sm-11 col-11 ">
              <h2 className="heading_color">User Report </h2>
            </div>
            <AddUserModal />
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
                        <th>Address</th>
                        <th>Organization</th>
                        <th>Operation</th>
                      </tr>
                    </thead>
                    {/* <tbody>
                      {expReport &&
                        expReport[0] &&
                        expReport.map((expReportVal, idx) => {
                          var ED = expReportVal.tenantLeaseEndDate.split(/\D/g);
                          var tenantLeaseEndDate = [ED[2], ED[1], ED[0]].join(
                            "-"
                          );
                          return (
                            <tr key={idx}>
                              <td>{expReportVal.tenantName}</td>
                              <td>{expReportVal.tenantDoorNo}</td>
                              <td>{expReportVal.tenantFileNo}</td>
                              <td>{tenantLeaseEndDate}</td>
                              <td>{expReportVal.tenantRentAmount}</td>
                              <td>{expReportVal.chargesCal.toFixed(2)}</td>
                              <td>{expReportVal.stampDuty.toFixed(2)}</td>
                              <td>{expReportVal.AgreementStatus}</td>
                              {expReportVal.AgreementStatus === "Expired" ? (
                                <td>
                                  <center>
                                    <button
                                      variant="success"
                                      className="btn sub_form"
                                      onClick={() =>
                                        onRenewal(expReportVal, idx)
                                      }
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
                    </tbody> */}
                    <td>abc</td>
                    <td>abc@gmail.com</td>
                    <td>985685896</td>
                    <td>manipal</td>
                    <td>abc</td>
                    <td>
                      <center>
                        <img
                          className="img_icon_size log"
                          // onClick={() => onClickHandler()}

                          src={require("../../static/images/edit_icon.png")}
                          alt="edit User"
                          title="editUser"
                        />
                        <img
                          className="img_icon_size log"
                          // onClick={() => onClickHandler()}
                          onClick={() => clicking()}
                          src={require("../../static/images/delete.png")}
                          alt="Deactivate User"
                          title="Deactivate User"
                        />
                      </center>
                    </td>
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
