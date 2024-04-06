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
  const startYear = 2020;
  const endYear = new Date().getFullYear() + 1;
  const years = Array.from(
    { length: endYear - startYear + 1 },
    (_, index) => startYear + index
  ).reverse();

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
  const [isFocused, setIsFocused] = useState(false);
  const [isFocused1, setIsFocused1] = useState(false);
  const [isFocused2, setIsFocused2] = useState(false);

  const handleFocus = (focused) => {
    setIsFocused(focused);
  };
  const handleFocus1 = (focused) => {
    setIsFocused1(focused);
  };
  const handleFocus2 = (focused) => {
    setIsFocused2(focused);
  };

  useEffect(() => {
    const selectElement = document.getElementById("mySelect");

    if (isFocused) {
      selectElement.style.borderColor = "#095A4A";
    } else {
      selectElement.style.borderColor = "#ccc";
    }
  }, [isFocused]);
  useEffect(() => {
    const selectElement1 = document.getElementById("mySelect2");

    if (isFocused1) {
      selectElement1.style.borderColor = "#095A4A";
    } else {
      selectElement1.style.borderColor = "#ccc";
    }
  }, [isFocused1]);
  useEffect(() => {
    const selectElement2 = document.getElementById("mySelect3");

    if (isFocused2) {
      selectElement2.style.borderColor = "#095A4A";
    } else {
      selectElement2.style.borderColor = "#ccc";
    }
  }, [isFocused2]);

  return (
    <>
      <div className="row ">
        <div className="col-lg-6 row d-flex align-items-center  ">
          <div className="col-lg-12 text-right">
            <label htmlFor="startMonthYear " className="reportDropdown pb-2">
              Start Month & Year :
            </label>
            &emsp;&nbsp;
            <select
              id="mySelect"
              style={{
                backgroundColor: "#fff",
                border: "1px solid #C9C9C9",
                borderRadius: "4px",
                transition: "border 0.3s ease",
                outline: "none",
                padding: " 8px 40px 8px 12px",
              }}
              onFocus={() => handleFocus(true)}
              onBlur={() => handleFocus(false)}
              value={months.indexOf(selectedMonth)}
              onChange={handleMonthChange}
            >
              {months.map((month, index) => (
                <option key={index} value={index}>
                  {month}
                </option>
              ))}
            </select>
            <select
              style={{
                backgroundColor: "#fff",
                border: "1px solid #C9C9C9",
                borderRadius: "4px",
                transition: "border-color 0.3s ease",
                outline: "none",
                padding: " 8px 40px 8px 12px",
              }}
              id="mySelect2"
              value={selectedYear}
              onChange={handleYearChange}
              onFocus={() => handleFocus1(true)}
              onBlur={() => handleFocus1(false)}
            >
              {years.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="col-lg-4 row d-flex align-items-center">
          <div className="col-lg-7  text-right">
            <label htmlFor="monthSelect" className="reportDropdown">
              No. of Months :
            </label>
          </div>
          <div className="col-lg-5 mx-0 px-0">
            <select
              style={{
                backgroundColor: "#fff",
                border: "1px solid  #C9C9C9",
                borderRadius: "4px",
                transition: "border-color 0.3s ease",
                outline: "none",
                padding: " 8px 40px 8px 12px",
              }}
              id="mySelect3"
              name="month"
              onFocus={() => handleFocus2(true)}
              onBlur={() => handleFocus2(false)}
              value={selectedEndMonth}
              onChange={handleChange}
            >
              {[...Array(12).keys()].map((month) => (
                <option key={month + 1} value={month + 1}>
                  {month + 1}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="col-lg-2"></div>
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
