import React, { useState, Fragment, useEffect, useRef } from "react";

import { connect } from "react-redux";
import {
  ParticularTenantFilter,
  getMisReport,
  getMisAmountReport,
  getMisRenewedBarReport,
} from "../../actions/tenants";
import { Link } from "react-router-dom";
import DatePicker from "react-datepicker";
import BarChart from "../dashboard/BarChart";
import PieChart from "../dashboard/PieChart";
import MonthYearPicker from "../dashboard/MonthYearPicker";
import Back from "../../static/images/Back.svg";
const MISReport = ({
  auth: { user },
  tenants: { allmisreport, allmisamountreport, allmisrenewedbarreport },

  getMisReport,
  getMisAmountReport,
  getMisRenewedBarReport,
}) => {
  const [freshpage, setFreshPage] = useState(true);
  const myuser = JSON.parse(localStorage.getItem("user"));
  var currentDate = new Date();
  useEffect(() => {
    var year1 = currentDate.getFullYear();
    var month1 = String(currentDate.getMonth() + 1).padStart(2, "0");
    //var day1 = String(currentDate.getDate()).padStart(2, "0");
    var day1 = "01";

    var CurrentformattedDate = `${year1}-${month1}-${day1}`;
    const finalData = {
      selectedY: CurrentformattedDate,
      selectedEndY: "12",
      OrganizationId: myuser && myuser.OrganizationId,
    };
    getMisReport(finalData);
    getMisAmountReport(finalData);
    getMisRenewedBarReport(finalData);
  }, []);
  //Pie chart for count
  let valuesArray = [];
  if (allmisreport) {
    valuesArray.push(
      allmisreport.renewableCount,
      allmisreport.renewedCount,
      allmisreport.activeCount
    );
  }

  console.log("valuesArray", valuesArray);

  ///////////////////////////new format date 123//////////////////////////

  //* Month Names ****************************************************
  const monthsValue = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const [selectedMonth, setSelectedMonth] = useState(
    monthsValue[currentDate.getMonth()]
  );
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  const [monthNumber, setMonthNumber] = useState("");
  const handleMonthYearChange = (month, year) => {
    setSelectedMonth(month);
    setSelectedYear(year);
  };

  //////////////////////////////////////////////////////////////////////////////////

  //Pie chart for amount
  let valuesamtArray = [];
  if (allmisamountreport) {
    valuesamtArray.push(
      allmisamountreport.renewableAmount,
      allmisamountreport.renewedAmount,
      allmisamountreport.activeAmount
    );
  }
  const [numberOfMonths, setNumberOfMonths] = useState(1);

  //Bar chart

  const renewablebarcountArray =
    allmisrenewedbarreport &&
    allmisrenewedbarreport.renewableBarCount &&
    allmisrenewedbarreport.renewableBarCount.map((item) => ({
      ...item,
    }));

  const renewedbarcountArray =
    allmisrenewedbarreport &&
    allmisrenewedbarreport.renewedBarCount &&
    allmisrenewedbarreport.renewedBarCount.map((item) => ({
      ...item,
    }));

  const activebarcountArray =
    allmisrenewedbarreport &&
    allmisrenewedbarreport.activeBarCount &&
    allmisrenewedbarreport.activeBarCount.map((item) => ({
      ...item,
    }));
  return (
    <>
      <div className="col mt-sm-4 space ">
        <div className="row col-lg-12 col-md-12 col-sm-12 col-12 no_padding  mx-0 px-0">
          <div className="row mt-5  mx-0 px-0">
            <div className="col-lg-2 mt-3">
              <h2 className="heading_color  headsize  ml-4">MIS Report</h2>
            </div>
            <div className=" row col-lg-9 text-left misreportPage  mx-0 px-0 ">
              <MonthYearPicker
                selectedMonth={selectedMonth}
                selectedYear={selectedYear}
                onChange={handleMonthYearChange}
              />

              {/* <DatePicker
                  className="form-control text-center"
                  placeholder="yyyy"
                  onChange={(date) => YearChange(date)}
                  dateFormat="yyyy"
                  selected={startMonthDate}
                  showYearPicker
                /> */}
            </div>
            <div className="col-lg-1 mt-4 pt-3">
              <Link to="/Report">
                <img
                  className=" float-right"
                  src={Back}
                  alt="Back"
                  title="Back"
                />
              </Link>
            </div>
          </div>

          <div className="container-fluid  ml-4 text-center my-0 py-0 ">
            <div className="row">
              <div className="  col-lg-6 col-sm-6 ">
                <div
                  className=" card text-left py-0"
                  id="shadow-bck"
                  style={{ width: "100%", height: "328px" }}
                >
                  {valuesArray && valuesArray.every((value) => value === 0) ? (
                    <h4 className="mt-4">No Data Found</h4>
                  ) : (
                    <PieChart
                      series={valuesArray.map((el) => el)}
                      labels={["Renewable", "Renewed", "Active"]}
                      colors={["#CC9900", "#095a4a", "#808080"]}
                      title="Statuswise Report"
                    />
                  )}
                </div>
              </div>

              <div className=" col-lg-6 col-sm-6">
                <div
                  className=" card text-left pt-0"
                  id="shadow-bck"
                  style={{ width: "100%", height: "328px" }}
                >
                  {valuesamtArray &&
                  valuesamtArray.every((value) => value === 0) ? (
                    <h4>No Data Found</h4>
                  ) : (
                    <PieChart
                      series={valuesamtArray.map((el) => el)}
                      labels={["Renewable(₹)", "Renewed(₹)", "Active(₹)"]}
                      colors={["#CC9900", "#095a4a", "#808080"]}
                      title="Rent Report"
                    />
                  )}
                </div>
              </div>
            </div>
            <div className="row">
              <div className="  col-lg-4 col-sm-6">
                <div
                  className=" card text-left pt-0"
                  id="shadow-bck"
                  style={{ width: "100%", height: "328px" }}
                >
                  {renewedbarcountArray &&
                  renewedbarcountArray.every((value) => value == 0) ? (
                    <h4>No Data Found</h4>
                  ) : (
                    <BarChart
                      title="Total Renewed Tenants"
                      series={[
                        {
                          name: "Tenants",
                          data:
                            renewedbarcountArray &&
                            renewedbarcountArray.map((el) => el.total),
                        },
                      ]}
                      categories={
                        renewedbarcountArray &&
                        renewedbarcountArray.map(
                          (el) =>
                            `${monthsValue[el.month - 1].slice(0, 3)}' ${String(
                              el.year
                            ).slice(2)}`
                        )
                      }
                      yAxisText="Tenants"
                      colors={["#095a4a"]}
                    />
                  )}
                </div>
              </div>
              <div className="  col-lg-4  col-sm-6">
                <div
                  className=" card text-left pt-0"
                  id="shadow-bck"
                  style={{ width: "100%", height: "328px" }}
                >
                  {renewablebarcountArray &&
                  renewablebarcountArray.every((value) => value === 0) ? (
                    <h4>No Data Found</h4>
                  ) : (
                    <BarChart
                      title="Total Renewable Tenant"
                      series={[
                        {
                          name: "Tenants",
                          data:
                            renewablebarcountArray &&
                            renewablebarcountArray.map((el) => el.total),
                        },
                      ]}
                      categories={
                        renewablebarcountArray &&
                        renewablebarcountArray.map(
                          (el) =>
                            `${monthsValue[el.month - 1].slice(0, 3)}' ${String(
                              el.year
                            ).slice(2)}`
                        )
                      }
                      yAxisText="Tenants"
                      colors={["#CC9900"]}
                    />
                  )}
                </div>
              </div>
              <div className="  col-lg-4  col-sm-6">
                <div
                  className=" card text-left pt-0"
                  id="shadow-bck"
                  style={{ width: "100%", height: "328px" }}
                >
                  {activebarcountArray &&
                  activebarcountArray.every((value) => value === 0) ? (
                    <h4>No Data Found</h4>
                  ) : (
                    <BarChart
                      title="Total Active Tenant"
                      series={[
                        {
                          name: "Tenants",
                          data:
                            activebarcountArray &&
                            activebarcountArray.map((el) => el.total),
                        },
                      ]}
                      categories={
                        activebarcountArray &&
                        activebarcountArray.map(
                          (el) =>
                            `${monthsValue[el.month - 1].slice(0, 3)}' ${String(
                              el.year
                            ).slice(2)}`
                        )
                      }
                      yAxisText="Tenants"
                      colors={["#808080"]}
                    />
                  )}
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
  ParticularTenantFilter,
  getMisReport,
  getMisAmountReport,
  getMisRenewedBarReport,
})(MISReport);
