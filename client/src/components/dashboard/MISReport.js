import React, { useState, Fragment, useEffect, useRef } from "react";
import { CSVLink } from "react-csv";
import { connect } from "react-redux";
import { ParticularTenantFilter,getMisReport } from "../../actions/tenants";
import RenewalReportPrint from "../printPdf/renewalReportPrint";
import { useReactToPrint } from "react-to-print";
import Pagination from "../layout/Pagination";
import ReactApexChart from "react-apexcharts";
import DatePicker from "react-datepicker";

const MISReport = ({
  auth: { user },
  tenants: { sortetenantdetails,allmisreport },
  ParticularTenantFilter,
  getMisReport,
}) => {
  const [freshpage, setFreshPage] = useState(true);
  const myuser = JSON.parse(localStorage.getItem("user"));
  useEffect(() => {
    ParticularTenantFilter();
  }, [freshpage]);



//   console.log("allmisreport",allmisreport &&  allmisreport.renewableCount, allmisreport && allmisreport.renewedCount)
// let arr1 = []
// arr1.push()
// Assuming allmisreport is an object with properties renewableCount and renewedCount

// Create an empty array
let valuesArray = [];

// Check if allmisreport is defined to avoid errors
if (allmisreport) {
  // Push the values into the array
  valuesArray.push(allmisreport.renewableCount, allmisreport.renewedCount);
}

// Log the array
console.log("Values Array:", valuesArray);

  const options = {
    labels: [
      "Renewable",
      "Renewed",
    
    ],
  };
const ex1=[{
    _id:"645545454",
    total:4,
    topcat:"Exipred"
},{
    _id:"645545454",
    total:3,
    topcat:"Renewed"
}]
//    const series = [30, 40, 25, 20, 15]; 
const [startMonthDate, setMonthStartDate] = useState(new Date());
const OrgainzationmonthYearChange = (dt) => {
    var getYear = new Date(dt).getFullYear();
  
    if (getYear) {
      setMonthStartDate(getYear);
      const finalData = {
        selectedY: getYear,
        // selectedVal: dt,
        OrganizationId: myuser && myuser.OrganizationId,
      };
      getMisReport(finalData);
    }
  
    
  };



//   console.log("startMonthDate",startMonthDate)
  return (
    <>
      <div className="col mt-sm-4 space ">
        <div className="row col-lg-12 col-md-12 col-sm-12 col-12 no_padding ">
          <div className="row mt-5  ">
            <div className="col-lg-5 mt-3">
              <h2 className="heading_color  headsize  ml-4">MIS Report</h2>
            </div>
            <div className="col-lg-7 mt-5 text-right ">
              {/* {myuser.usergroup === "Admin" ? (
                <CSVLink data={csvContactReportData}>
                  <img
                    className="img_icon_size log  ml-4"
                    src={require("../../static/images/excel_icon.png")}
                    alt="Excel-Export"
                    title="Excel-Export"
                  />
                </CSVLink>
              ) : (
                <></>
              )} */}

              {/* <button
                style={{ border: "none" }}
                onClick={async () => {
                  await setShowPrint({
                    backgroundColor: "#095a4a",
                    color: "black",
                    fontWeight: "bold",
                  });

                  OnPrint();
                }}
              >
                <img
                  height="20px"
                  //  onClick={() => refresh()}
                  src={require("../../static/images/print.png")}
                  alt="Print"
                  title="Print"
                />
              </button> */}
            </div>
          </div>

          <div className="container-fluid d-flex align-items-center justify-content-center mt-sm-1 ">
            <div className="col">
            <>
          <div className="col-lg-2 mt-5" style={{marginTop:"200px"}}>
            <label> Select Year</label>
                  <DatePicker
                    className="form-control text-center"
                    placeholder="yyyy"
                    onChange={(date) => OrgainzationmonthYearChange(date)}
                    dateFormat="yyyy"
                    selected={startMonthDate}
                    showYearPicker
                  />
                </div>
        <div className='mt-5'>
          <h1>React ApexCharts Pie Chart</h1>
          <ReactApexChart
            options={options}
            series={valuesArray}
            type="donut"
            width={500}
          />
        </div>
        </>
             
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
})(MISReport);
