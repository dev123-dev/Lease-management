import React, { Fragment, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
// import TenantReport from "./TenantReport";

import DatePicker from "react-datepicker";
import {
  getMonthExpCount,
  getMonthExpCountFilter,
  getPreviousYearsExpCount,
  getTenantReportYearMonth,
  getTenantReportOldExp,
} from "../../actions/tenants";

const optName = [
  { value: "01", label: "Jan" },
  { value: "02", label: "Feb" },
  { value: "03", label: "Mar" },
  { value: "04", label: "Apr" },
  { value: "05", label: "May" },
  { value: "06", label: "Jun" },
  { value: "07", label: "Jul" },
  { value: "08", label: "Aug" },
  { value: "09", label: "Sep" },
  { value: "10", label: "Oct" },
  { value: "11", label: "Nov" },
  { value: "12", label: "Dec" },
];

const TenantFilters = ({
  auth: { isAuthenticated, user, users, monthExpCnt, yearExpCnt, expReport },
  getMonthExpCount,
  getMonthExpCountFilter,
  getPreviousYearsExpCount,
  getTenantReportYearMonth,
  getTenantReportOldExp,
}) => {
  useEffect(() => {
    getMonthExpCount();
  }, [getMonthExpCount]);
  useEffect(() => {
    const finalData = {
      selectedVal: new Date(),
    };
    getPreviousYearsExpCount(finalData);
  }, [getPreviousYearsExpCount]);
  useEffect(() => {
    const finalDataReport = {
      monthSearch: new Date().getMonth() + 1,
      yearSearch: new Date().getFullYear(),
    };
    getTenantReportYearMonth(finalDataReport);
  }, [getTenantReportYearMonth]);

  const [searchData, setSearchData] = useState({
    monthSearch: new Date().getMonth() + 1,
    yearSearch: "",
  });

  const { monthSearch, yearSearch } = searchData;

  const [startMonthDate, setMonthStartDate] = useState(new Date());
  const monthYearChange = (dt) => {
    var getYear = new Date(dt).getFullYear();
    if (getYear) {
      setMonthStartDate(dt);
      const finalData = {
        selectedY: getYear,
        selectedVal: dt,
      };
      setSearchData({
        ...searchData,
        monthSearch: "",
      });
      getMonthExpCountFilter(finalData);
      getPreviousYearsExpCount(finalData);
    }
  };

  const onSelectChange = (optFiltrVal) => {
    if (optFiltrVal) {
      setSearchData({
        ...searchData,
        monthSearch: optFiltrVal,
        yearSearch: new Date(startMonthDate).getFullYear(),
      });
      const finalDataReport = {
        monthSearch: optFiltrVal,
        yearSearch: new Date(startMonthDate).getFullYear(),
      };
      getTenantReportYearMonth(finalDataReport);
      // <Redirect to="/tenant-report" />;
    }
  };
  const oldExpCountFetch = () => {
    const finalDataReportOld = {
      yearSearch: new Date(startMonthDate).getFullYear(),
    };
    getTenantReportOldExp(finalDataReportOld);
    // <Redirect to="/tenant-report" />;
  };

  return !isAuthenticated || !user || !users ? (
    <Fragment></Fragment>
  ) : (
    <Fragment>
      <div className="container_align top_menu ">
        <div className="row pb-5 responsiveDiv">
          <div className="col-lg-12 col-md-1 col-sm-1 col-1 text-center ">
            {/* brdr-clr-styles */}
            {/* <form> */}
            <div className="">
              <Link
                to="/tenant-report"
                className="btn btn_more"
                onClick={() => oldExpCountFetch()}
              >
                {yearExpCnt && yearExpCnt[0] && yearExpCnt[0].count > 0
                  ? yearExpCnt[0].count
                  : 0}
              </Link>
              {/* className="btn-rou" */}
            </div>
            <div className="py-2">
              <DatePicker
                className="form-control yearpicker"
                placeholder="yyyy"
                //   maxDate={subMonths(new Date(), -1)}
                onChange={(date) => monthYearChange(date)}
                dateFormat="yyyy"
                selected={startMonthDate}
                style={{ textAlign: "center" }}
                showYearPicker
              />
            </div>

            {optName &&
              optName.map((optFiltr, idx) => {
                let countVal = 0;
                monthExpCnt.map((monthExpCntVal) => {
                  if (
                    Number(monthExpCntVal._id.month) === Number(optFiltr.value)
                  ) {
                    countVal = monthExpCntVal.count;
                  }
                  return <></>;
                });
                return (
                  <div className="py-1" key={idx}>
                    <div style={{ color: "#fff" }}>
                      {" "}
                      <Link
                        to="/tenant-report"
                        name="alphaSearch"
                        // className="btnLink"
                        onClick={() => onSelectChange(optFiltr.value)}
                        style={
                          Number(monthSearch) === Number(optFiltr.value)
                            ? {
                                fontWeight: "bold",
                                color: "black",
                                fontSize: "120%",
                              }
                            : { fontWeight: "bold", fontSize: "120%" }
                        }
                      >
                        {optFiltr.label}
                      </Link>{" "}
                      &nbsp;
                      <label
                        className="btn-roun"
                        style={
                          countVal !== 0
                            ? {
                                fontSize: "80%",
                                color: "#000",
                                background: "#fff",
                              }
                            : {
                                fontSize: "80%",
                                color: "#429f8c",
                                background: "#fff",
                              }
                        }
                      >
                        {countVal}
                      </label>
                    </div>
                    <div> </div>
                  </div>
                );
              })}
            {/* </form> */}
          </div>

          {/* <div className="col-lg-10 col-md-7 col-sm-8 col-8">
            <TenantReport />
          </div> */}
        </div>
      </div>
    </Fragment>
  );
};

TenantFilters.propTypes = {
  auth: PropTypes.object.isRequired,
  getMonthExpCount: PropTypes.func.isRequired,
  getMonthExpCountFilter: PropTypes.func.isRequired,
  getPreviousYearsExpCount: PropTypes.func.isRequired,
  getTenantReportYearMonth: PropTypes.func.isRequired,
  getTenantReportOldExp: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, {
  getMonthExpCount,
  getMonthExpCountFilter,
  getPreviousYearsExpCount,
  getTenantReportYearMonth,
  getTenantReportOldExp,
})(TenantFilters);
