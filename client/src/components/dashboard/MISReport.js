import React, { useState, Fragment, useEffect, useRef } from "react";

import { connect } from "react-redux";
import {
  ParticularTenantFilter,
  getMisReport,
  getMisAmountReport,
  getMisRenewedBarReport,
} from "../../actions/tenants";

import ReactApexChart from "react-apexcharts";
import DatePicker from "react-datepicker";
import BarChart from "../dashboard/BarChart";
import PieChart from "../dashboard/PieChart";

const MISReport = ({
  auth: { user },
  tenants: { allmisreport, allmisamountreport, allmisrenewedbarreport },

  getMisReport,
  getMisAmountReport,
  getMisRenewedBarReport,
}) => {
  const [freshpage, setFreshPage] = useState(true);
  const myuser = JSON.parse(localStorage.getItem("user"));

  //Pie chart for count
  let valuesArray = [];
  if (allmisreport) {
    valuesArray.push(allmisreport.renewableCount, allmisreport.renewedCount);
  }

  //Pie chart for amount
  let valuesamtArray = [];
  if (allmisamountreport) {
    valuesamtArray.push(
      allmisamountreport.renewableAmount,
      allmisamountreport.renewedAmount
    );
  }

  const [startMonthDate, setMonthStartDate] = useState(new Date());
  const YearChange = (dt) => {
    const getYear = new Date(dt).getFullYear();
    if (!isNaN(getYear)) {
      setMonthStartDate(dt);
      const finalData = {
        selectedY: getYear,
        OrganizationId: myuser && myuser.OrganizationId,
      };
      getMisReport(finalData);
      getMisAmountReport(finalData);
      getMisRenewedBarReport(finalData);
    } else {
      console.error("Invalid date selected");
    }
  };
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

  useEffect(() => {
    var getYear = new Date().getFullYear();

    setMonthStartDate(new Date());
    const finalData = {
      selectedY: getYear,
      OrganizationId: myuser && myuser.OrganizationId,
    };
    getMisReport(finalData);
    getMisAmountReport(finalData);
    getMisRenewedBarReport(finalData);
  }, []);

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

  return (
    <>
      <div className="col mt-sm-4 space ">
        <div className="row col-lg-12 col-md-12 col-sm-12 col-12 no_padding ">
          <div className="row mt-5  ">
            <div className="col-lg-4 mt-3">
              <h2 className="heading_color  headsize  ml-4">MIS Report</h2>
            </div>
            <div className=" row col-lg-8 text-right mt-4 ">
              <div className="col-lg-3 mt-2"> Select Year</div>
              <div className="col-lg-3">
                <DatePicker
                  className="form-control text-center"
                  placeholder="yyyy"
                  onChange={(date) => YearChange(date)}
                  dateFormat="yyyy"
                  selected={startMonthDate}
                  showYearPicker
                />
              </div>
            </div>
          </div>

          <div className="container-fluid  ml-4 text-center ">
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
                      labels={["Renewable", "Renewed"]}
                      colors={["#CC9900", "#095a4a"]}
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
                      labels={["Renewable", "Renewed"]}
                      colors={["#CC9900", "#095a4a"]}
                      title="Rent Report"
                    />
                  )}
                </div>
              </div>
            </div>
            <div className="row">
              {/* <div className="  col-lg-6 col-sm-6">
                <div
                  className=" card text-left pt-0"
                  id="shadow-bck"
                  style={{ width: "100%", height: "328px" }}
                >
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
                </div>
              </div>
              <div className="  col-lg-6  col-sm-6">
                <div
                  className=" card text-left pt-0"
                  id="shadow-bck"
                  style={{ width: "100%", height: "328px" }}
                >
                  <BarChart
                    title="Total Renewable Property"
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
                </div>
              </div> */}
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
