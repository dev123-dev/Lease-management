import React, { useState, Fragment, useEffect, useRef } from "react";

import { connect } from "react-redux";
import {
  ParticularTenantFilter,
  getMisReport,
  getMisAmountReport,
  getMisRenewedBarReport,
} from "../../actions/tenants";
import { Link } from "react-router-dom";
const MonthYearPicker = ({
  auth: { user },
  tenants: { allmisreport, allmisamountreport, allmisrenewedbarreport },

  getMisReport,
  getMisAmountReport,
  getMisRenewedBarReport,

  selectedMonth,
  selectedYear,
  onChange,
}) => {
  const months = [
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

  ///////////////////////////

  const monthsLabelValue = {
    January: "01",
    February: "02",
    March: "03",
    April: "04",
    May: "05",
    June: "06",
    July: "07",
    August: "08",
    September: "09",
    October: 10,
    November: 11,
    December: 12,
  };

  function getMonthValue(monthLabel) {
    return monthsLabelValue[monthLabel];
  }

  const [selectedEndMonth, setSelectedEndMonth] = useState("12");
  /////////////////////////////////////////////

  //////////////////
  const myuser = JSON.parse(localStorage.getItem("user"));
  const currentYear = new Date().getFullYear();
  const startYear = 1970;
  const endYear = 2100;
  const years = Array.from(
    { length: endYear - startYear + 1 },
    (_, index) => startYear + index
  );

  const handleMonthChange = (e) => {
    var selectedMonthIndex = e.target.value;
    var selectedMonth = months[selectedMonthIndex];
    onChange(selectedMonth, selectedYear, selectedEndMonth);
    const day = "01";
    var monthValue = getMonthValue(selectedMonth);
    //const monthNumber = months.indexOf(monthName).toString().padStart(2, "0");
    var formattedDate = `${selectedYear.toString()}-${monthValue.toString()}-${day.toString()}`;
    
    const finalData = {
      selectedY: formattedDate,
      selectedEndY: selectedEndMonth,
      OrganizationId: myuser && myuser.OrganizationId,
    };
    getMisReport(finalData);
    getMisAmountReport(finalData);
    getMisRenewedBarReport(finalData);
   
  };

  const handleYearChange = (e) => {
    var selectedYear = e.target.value;
    onChange(selectedMonth, selectedYear, selectedEndMonth);
    var day = "01";
    var monthValue = getMonthValue(selectedMonth);
    //const monthNumber = months.indexOf(monthName).toString().padStart(2, "0");
    var formattedDate = `${selectedYear.toString()}-${monthValue.toString()}-${day.toString()}`;
   

    const finalData = {
      selectedY: formattedDate,
      selectedEndY: selectedEndMonth,
      OrganizationId: myuser && myuser.OrganizationId,
    };
    getMisReport(finalData);
    getMisAmountReport(finalData);
    getMisRenewedBarReport(finalData);
  
  };
  //select month

  const handleChange = (event) => {
    setSelectedEndMonth(event.target.value);
    // onChange(selectedMonth, selectedYear);
    const day = "01";
    var monthValue = getMonthValue(selectedMonth);
    //const monthNumber = months.indexOf(monthName).toString().padStart(2, "0");
    var formattedDate = `${selectedYear.toString()}-${monthValue.toString()}-${day.toString()}`;
    const finalData = {
      selectedY: formattedDate,
      selectedEndY: event.target.value,
      OrganizationId: myuser && myuser.OrganizationId,
    };
    getMisReport(finalData);
    getMisAmountReport(finalData);
    getMisRenewedBarReport(finalData);
   
  };

  return (
    <>
      <div >
        <select
          value={months.indexOf(selectedMonth)}
          onChange={handleMonthChange}
        >
          {months.map((month, index) => (
            <option key={index} value={index}>
              {month}
            </option>
          ))}
        </select>
        <select value={selectedYear} onChange={handleYearChange}>
          {years.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
        &emsp;&emsp;
        <label htmlFor="monthSelect">No. of Months :</label>&nbsp;
        <select
          id="monthSelect"
          name="month"
          value={selectedEndMonth}
          onChange={handleChange}
        >
          {[...Array(12).keys()].map((month) => (
            <option key={month + 1} value={month + 1}>
              {month + 1}
            </option>
          ))}
        </select>
        <Link to="/Report">
                  <img
                    height={30}
                     className=" float-right"
                    src={require("../../static/images/back.png")}
                    alt="Back"
                    title="Back"
                  />
                </Link>
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
})(MonthYearPicker);
