import React, { Fragment, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import TenantReport from "../dashboard/TenantReport";

import DatePicker from "react-datepicker";
import {
  getMonthExpCount,
  getPreviousYearsExpCount,
  getTenantReportYearMonth,
  getTenantReportOldExp,
  getOrganizationExpiryReport,
  ParticularTenant,
  getOrgExpCount,
  getPreviousYearsExpCountOfOrg,
} from "../../actions/tenants";

const optName = [
  { value: "01", label: "JAN" },
  { value: "02", label: "FEB" },
  { value: "03", label: "MAR" },
  { value: "04", label: "APR" },
  { value: "05", label: "MAY" },
  { value: "06", label: "JUN" },
  { value: "07", label: "JUL" },
  { value: "08", label: "AUG" },
  { value: "09", label: "SEP" },
  { value: "10", label: "OCT" },
  { value: "11", label: "NOV" },
  { value: "12", label: "DEC" },
];

const TenantFilters = ({
  auth: { isAuthenticated, user, users, monthExpCnt, yearExpCnt },
  tenants: { exp_org_count, ext_year_count_org },
  getMonthExpCount,
  getPreviousYearsExpCount,
  getTenantReportYearMonth,
  getTenantReportOldExp,
  ParticularTenant,
  getOrgExpCount,
  getOrganizationExpiryReport,
  getPreviousYearsExpCountOfOrg,
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
      OrganizationId: user && user.OrganizationId,
    };
    getTenantReportYearMonth(finalDataReport);
    const data = {
      OrganizationId: user && user.OrganizationId,
      LocationName: user && user.OrganizationName,
    };
    ParticularTenant(data);
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
        OrganizationId: user && user.OrganizationId,
      };
      setSearchData({
        ...searchData,
        monthSearch: "",
      });
      getMonthExpCount(finalData);
      getPreviousYearsExpCount(finalData);
    }
  };

  const OrgainzationmonthYearChange = (dt) => {
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
      getOrgExpCount(finalData);
      getPreviousYearsExpCountOfOrg(finalData);
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
    }
  };

  const onSelectOrgChange = (optFiltrVal) => {
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
      getOrganizationExpiryReport(finalDataReport);
    }
  };

  const oldExpCountFetch = () => {
    const finalDataReportOld = {
      yearSearch: new Date(startMonthDate).getFullYear(),
    };
  };

  return !isAuthenticated || !user || !users ? (
    <Fragment></Fragment>
  ) : (
    <>
      {user.usergroup === "Super Admin" ? (
        //super admin filter
        <Fragment>
          <div className="container_align top_menu  ">
            <div className="row pb-2  ml-2 responsiveDiv">
              <div className="col-lg-12 col-md-1 col-sm-1 col-1 text-center  ">
                <div className=" ">
                  {/* this is for textbox below image for showing the total count of Renewal */}
                  <Link
                    to="/Organization-report"
                    className="btn btn_more"
                    onClick={() => oldExpCountFetch()}
                  >
                    {" "}
                    {ext_year_count_org &&
                    ext_year_count_org[0] &&
                    ext_year_count_org[0].count > 0
                      ? ext_year_count_org[0].count
                      : 0}
                  </Link>
                </div>
                <div className="py-2 ">
                  <DatePicker
                    className="form-control yearpicker"
                    placeholder="yyyy"
                    onChange={(date) => OrgainzationmonthYearChange(date)}
                    dateFormat="yyyy"
                    selected={startMonthDate}
                    style={{ textAlign: "center" }}
                    showYearPicker
                  />
                </div>

                {optName &&
                  optName.map((optFiltr, idx) => {
                    let countVal = 0;
                    exp_org_count &&
                      exp_org_count.map((monthExpCntVal) => {
                        if (
                          Number(monthExpCntVal._id.month) ===
                          Number(optFiltr.value)
                        ) {
                          countVal = monthExpCntVal.count;
                        }
                        return <></>;
                      });
                    return (
                      <div className="py-2 " key={idx}>
                        <div
                          className="tenantfil"
                          style={{ color: "#fff", padding: "0px 0px 0px 5px" }}
                        >
                          {" "}
                          <Link
                            to="/Organization-report"
                            name="alphaSearch"
                            // className="btnLink"
                            onClick={() => onSelectOrgChange(optFiltr.value)}
                            style={
                              Number(monthSearch) === Number(optFiltr.value)
                                ? {
                                    fontWeight: "200",
                                    color: "black",
                                    fontSize: "115%",
                                  }
                                : { fontWeight: "", fontSize: "115%" }
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
      ) : (
        <>
          {/* TENANT FILTER */}
          <Fragment>
            <div className="container_align top_menu ">
              <div className="row pb-5 responsiveDiv years">
                <div className="container_align top_menu ">
                  <div className="row pb-5  ml-2 responsiveDiv">
                    <div className="col-lg-12 col-md-1 col-sm-1 col-1 text-center  ">
                      {/* brdr-clr-styles */}
                      {/* <form> */}
                      <div className=" ">
                        <Link
                          to="/tenant-report"
                          className="btn btn_more"
                          onClick={() => oldExpCountFetch()}
                        >
                          {yearExpCnt &&
                          yearExpCnt[0] &&
                          yearExpCnt[0].count > 0
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
                              Number(monthExpCntVal._id.month) ===
                              Number(optFiltr.value)
                            ) {
                              countVal = monthExpCntVal.count;
                            }
                            return <></>;
                          });
                          return (
                            <div className="py-2" key={idx}>
                              <div
                                style={{
                                  color: "#fff",
                                  padding: "0px 0px 0px 5px",
                                }}
                              >
                                {" "}
                                <Link
                                  to="/tenant-report"
                                  name="alphaSearch"
                                  // className="btnLink"
                                  onClick={() => onSelectChange(optFiltr.value)}
                                  style={
                                    Number(monthSearch) ===
                                    Number(optFiltr.value)
                                      ? {
                                          fontWeight: "200",
                                          color: "black",
                                          fontSize: "115%",
                                        }
                                      : { fontWeight: "", fontSize: "115%" }
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
              </div>
            </div>
          </Fragment>
        </>
      )}
    </>
  );
};

TenantFilters.propTypes = {
  auth: PropTypes.object.isRequired,
  getMonthExpCount: PropTypes.func.isRequired,
  //getMonthExpCountFilter: PropTypes.func.isRequired,
  getPreviousYearsExpCount: PropTypes.func.isRequired,
  getTenantReportYearMonth: PropTypes.func.isRequired,
  getTenantReportOldExp: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
  tenants: state.tenants,
});

export default connect(mapStateToProps, {
  getMonthExpCount,
  // getMonthExpCountFilter,
  getPreviousYearsExpCount,
  getTenantReportYearMonth,
  getTenantReportOldExp,
  ParticularTenant,
  getOrgExpCount,
  getOrganizationExpiryReport,
  getPreviousYearsExpCountOfOrg,
})(TenantFilters);
