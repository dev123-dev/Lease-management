import React from "react";

const printComponent = React.forwardRef((propsVal, ref) => {
  var expReport = propsVal.expReport;
  return (
    <div ref={ref}>
          <h2 className="heading_color">Tenant Reports </h2>
      <div className="row">

     
        <div className="col-lg-12 col-md-11 col-sm-11 col-11 ">
          <table className="table table-bordered pt-3">
            <thead className="pt-3">
              <tr style={{ fontWeight: "bold" }}>
                <td>Name</td>
                <td>Door No</td>
                <td>File No</td>
                <td>Expiry Date</td>
                <td>Rent</td>
                <td>Revised Rent</td>
                <td>Stamp Duty</td>
                <td>Agreement Status</td>
              </tr>
            </thead >
            <tbody>
              {expReport &&
                expReport[0] &&
                expReport.map((expReportVal, idx) => {
                  var ED = expReportVal.tenantLeaseEndDate.split(/\D/g);
                  var tenantLeaseEndDate = [ED[2], ED[1], ED[0]].join("-");
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
                    </tr>
                  );
                })}
               
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
});

export default printComponent;
