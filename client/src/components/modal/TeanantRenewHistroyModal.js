import React from "react";
import { connect } from "react-redux";
import { indianFormatDate } from "../../utils/GlobalFunctions";
export const TeanantRenewHistroyModal = ({ RenewHistroy }) => {
  console.log("RenewHistroy", RenewHistroy);
  return (
    <div>
      <table
        className="table table-bordered table-striped table-hover mt-1"
        id="datatable2"
      >
        <thead>
          <tr>
            <th className="headcolstatic">Prev Lease Start Date</th>
            <th>Prev Lease End Date</th>
            <th>Prev Rent Amount </th>
          </tr>
        </thead>
        <tbody>
          {RenewHistroy.map((ele) => {
            return (
              <tr>
                <td>{indianFormatDate(ele.tenantLeaseStartDate)}</td>
                <td>{indianFormatDate(ele.tenantLeaseEndDate)}</td>
                <td>{ele.tenantRentAmount}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TeanantRenewHistroyModal);
