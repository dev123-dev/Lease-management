import React, { useState, Fragment, useEffect, useRef } from "react";

import { connect } from "react-redux";
import {
  ParticularTenantFilter,
  getMisReport,
  getMisAmountReport,
} from "../../actions/tenants";

import ReactApexChart from "react-apexcharts";
import DatePicker from "react-datepicker";

const MISReport = ({
  auth: { user },
  tenants: { allmisreport, allmisamountreport },
  ParticularTenantFilter,
  getMisReport,
  getMisAmountReport,
}) => {
  const [freshpage, setFreshPage] = useState(true);
  const myuser = JSON.parse(localStorage.getItem("user"));
  console.log("allmisamountreport", allmisamountreport);
  //Renewable/Renewed count
  let valuesArray = [];
  if (allmisreport) {
    // Push the values into the array
    valuesArray.push(allmisreport.renewableCount, allmisreport.renewedCount);
  } else {
    valuesArray.push(0, 0);
  }

  //Renewable/Renewed count
  let valuesamtArray = [];
  if (allmisamountreport) {
    // Push the values into the array
    valuesamtArray.push(
      allmisamountreport.renewableAmount,
      allmisamountreport.renewedAmount
    );
  } else {
    valuesamtArray.push(0, 0);
  }
  console.log("valuesamtArray", valuesamtArray);

  const options = {
    labels: ["Renewable", "Renewed"],
  };
  const ex1 = [
    {
      _id: "645545454",
      total: 4,
      topcat: "Exipred",
    },
    {
      _id: "645545454",
      total: 3,
      topcat: "Renewed",
    },
  ];

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
    } else {
      console.error("Invalid date selected");
    }
  };

  const optionsRenewable = {
    chart: {
      type: "bar",
      height: 350,
    },
    xaxis: {
      categories: [
        "jan",
        "feb",
        "march",
        "apr",
        "may",
        "jun",
        "jul",
        "aug",
        "sept",
        "oct",
        "nov",
        "dec",
      ],
    },
    yaxis: {
      categories: ["Renewable"],
    },
    colors: ["#CC9900"],
  };
  const optionsRenewed = {
    chart: {
      type: "bar",
      height: 350,
    },
    xaxis: {
      categories: [
        "jan",
        "feb",
        "march",
        "apr",
        "may",
        "jun",
        "jul",
        "aug",
        "sept",
        "oct",
        "nov",
        "dec",
      ],
    },
    yaxis: {
      categories: ["Renewed"],
    },
    colors: ["#095a4a"],
    yAxisText: "Earnings (₹)",
  };
  let data = [];
  let data1 = [];
  if (allmisreport) {
    // Push the values into the array
    data.push(allmisreport.renewableCount);
    data1.push(allmisreport.renewedCount);
  } else {
    data.push(0, 0);
    data1.push(0, 0);
  }

  const series = [
    {
      name: "Renewable",
      data: data,
    },
  ];
  const series1 = [
    {
      name: "Renewed",
      data: data1,
    },
  ];

  // useEffect(() => {
  //   var getYear = new Date().getFullYear;
  //   setMonthStartDate(new Date());
  //   const finalData = {
  //     selectedY: getYear,
  //     OrganizationId: myuser && myuser.OrganizationId,
  //   };
  //   getMisReport(finalData);
  // }, []);
  const chartOptions = {
    colors: ["#CC9900", "#095a4a"],
    labels: ["Renewable", "Renewed"],
    plotOptions: {
      pie: {
        donut: {
          labels: {
            show: true,
            name: {
              offsetY: 15, // Adjust the offset as needed
            },

            total: {
              show: true,
              label: "Total",
              formatter: function (w) {
                return w.globals.seriesTotals.reduce((a, b) => a + b, 0);
              },
            },
            value: {
              formatter: function (val) {
                return val;
              },
              offsetY: -30, // Adjust the offset as needed
            },
          },
        },
      },
    },
  };

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

          {/* <div
            className="container-fluid d-flex align-items-center justify-content-center mt-sm-1 "
            style={{ border: "1px solid red" }}
          >
            <div className="col">
              <>
                <div className="mt-5">
                  <h1>Propertwise Report</h1>
                  <ReactApexChart
                    options={options}
                    series={valuesArray}
                    type="donut"
                    width={500}
                  />
                </div>
              </>
            </div>
          </div> */}
          <div className="container-fluid mt-sm-1 ml-4 text-center">
            <div className="row">
              <div className="  col-lg-6 col-sm-6">
                <h4>Propertywise Rent Report</h4>
                <ReactApexChart
                  options={chartOptions}
                  series={valuesArray}
                  type="donut"
                  width={400}
                  className="ml-5"
                />
              </div>

              <div className=" col-lg-6 col-sm-6">
                {" "}
                <h4>Propertywise Report</h4>
                <ReactApexChart
                  options={chartOptions}
                  series={valuesamtArray}
                  type="donut"
                  width={400}
                  className="ml-5"
                />
              </div>
            </div>
            <div className="row">
              <div className="  col-lg-6 col-sm-6">
                {" "}
                <h4>Total Renewable properties</h4>
                {/* <ReactApexChart
                  options={options}
                  series={valuesArray}
                  type="bar"
                  width={400}
                  className="ml-5"
                /> */}
                <ReactApexChart
                  options={optionsRenewable}
                  series={series}
                  type="bar"
                  width={400}
                  className="ml-5"
                />
              </div>
              <div className="  col-lg-6  col-sm-6">
                {" "}
                <h4>Total Renewed Property</h4>
                <ReactApexChart
                  options={optionsRenewed}
                  series={series1}
                  type="bar"
                  width={400}
                  className="ml-5"
                />
                {/* <BarChart
                  title="Total Earnings (₹)"
                  series={[
                    {
                      name: "Earnings",
                      data: { valuesArray },
                    },
                  ]}
                  categories={yearReport.map(
                    (el) =>
                      `${monthsValue[el.month - 1].slice(0, 3)}' ${String(
                        el.year
                      ).slice(2)}`
                  )}
                  yAxisText="Earnings (₹)"
                  tooltip="₹ "
                  colors={["#2f9e44"]}
                  options={optionsRenewed}
                /> */}
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
})(MISReport);
