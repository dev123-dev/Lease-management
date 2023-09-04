import React, { Fragment, useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link, useHistory } from "react-router-dom";

import DatePicker from "react-datepicker";
import {
  getMonthExpCount,
  getPreviousYearsExpCount,
  getTenantReportYearMonth,
  getTenantReportOldExp,
  getOrganizationExpiryReport,
  ParticularTenant,
  getOrgExpCount,
  getOrgExp,
  getPreviousYearsExpCountOfOrg,
} from "../../actions/tenants";

const TenantFilters = ({
  auth: { isAuthenticated, optName, user, users, monthExpCnt, yearExpCnt },
  tenants: { exp_org_count, ext_year_count_org, blnSearchOld, blnSearchCurr },
  getMonthExpCount,
  getPreviousYearsExpCount,
  getTenantReportYearMonth,
  getTenantReportOldExp,
  ParticularTenant,
  getOrgExpCount,
  getOrgExp,
  getOrganizationExpiryReport,
  getPreviousYearsExpCountOfOrg,
}) => {
  const history = useHistory();

  const logUser = JSON.parse(localStorage.getItem("user"));
  useEffect(() => {
    getMonthExpCount({ OrganizationId: logUser && logUser.OrganizationId });
  }, [user]);

  useEffect(() => {
    const finalData = {
      selectedVal: new Date(),
      OrganizationId: logUser && logUser.OrganizationId,
    };
    getPreviousYearsExpCount(finalData);
  }, [user]);

  useEffect(() => {
    setMonthStartDate(new Date());
    localStorage.setItem("monthSearch", new Date().getMonth());
    const finalDataReport = {
      monthSearch: new Date().getMonth() + 1,
      yearSearch: new Date().getFullYear(),
      OrganizationId: logUser && logUser.OrganizationId,
    };
    getTenantReportYearMonth(finalDataReport);
    const data = {
      LocationName: logUser && logUser.OrganizationName,
    };
    ParticularTenant(data);
  }, [user]);

  const [searchData, setSearchData] = useState({
    monthSearch: new Date().getMonth() + 1,
    yearSearch: "",
  });

  const { monthSearch, yearSearch } = searchData;

  const [startMonthDate, setMonthStartDate] = useState(new Date());
  const monthYearChange = (dt) => {
    var getYear = new Date(dt).getFullYear();
    localStorage.setItem("monthSearch", "");
    if (getYear) {
      setMonthStartDate(dt);
      const finalData = {
        selectedY: getYear,
        selectedVal: dt,
        OrganizationId: logUser && logUser.OrganizationId,
      };
      setSearchData({
        ...searchData,
        monthSearch: "",
      });
      getMonthExpCount(finalData); //Done
      getPreviousYearsExpCount(finalData);
    }

    history.push("/nocontent");
  };

  const OrgainzationmonthYearChange = (dt) => {
    var getYear = new Date(dt).getFullYear();
    localStorage.setItem("monthSearch", "");
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
      localStorage.setItem("year", JSON.stringify(finalData));
      getOrgExpCount(finalData);
      getPreviousYearsExpCountOfOrg(finalData);
    }
  };

  const onSelectChange = (optFiltrVal) => {
    if (optFiltrVal) {
      localStorage.setItem("monthSearch", optFiltrVal);
      setSearchData({
        ...searchData,
        monthSearch: optFiltrVal,
        yearSearch: new Date(startMonthDate).getFullYear(),
      });
      const finalDataReport = {
        monthSearch: optFiltrVal,
        yearSearch: new Date(startMonthDate).getFullYear(),
        OrganizationId: logUser && logUser.OrganizationId,
      };
      getTenantReportYearMonth(finalDataReport);
    }
  };
  const [monthfilter, setMonthFilter] = useState("");
  const onSelectOrgChange = (optFiltrVal) => {
    setMonthFilter(optFiltrVal);
    if (optFiltrVal) {
      localStorage.setItem("monthSearch", optFiltrVal);
      setSearchData({
        ...searchData,
        monthSearch: optFiltrVal,
        yearSearch: new Date(startMonthDate).getFullYear(),
      });
      const finalDataReport = {
        monthSearch: optFiltrVal,
        yearSearch: new Date(startMonthDate).getFullYear(),
      };
      getOrgExp(finalDataReport);
      getOrgExpCount(finalDataReport);
      getOrganizationExpiryReport(finalDataReport);
    }
  };

  const oldExpCountFetch = () => {
    setMonthFilter("");
    localStorage.setItem("monthSearch", "");
    setSearchData({
      ...searchData,
      monthSearch: "",
      yearSearch: new Date(startMonthDate).getFullYear(),
    });
    const finalDataReportOld = {
      monthSearch: "",
      yearSearch: new Date(startMonthDate).getFullYear(),
      OrganizationId: logUser && logUser.OrganizationId,
    };
    getTenantReportOldExp(finalDataReportOld);
  };
  const oldExpCountFetchOrg = () => {
    setMonthFilter("");
    setSearchData({
      ...searchData,
      monthSearch: "",
      yearSearch: new Date(startMonthDate).getFullYear(),
    });
    localStorage.setItem("monthSearch", "");
    const finalDataReportOld = {
      monthSearch: "",
      yearSearch: new Date(startMonthDate).getFullYear(),
      OrganizationId: logUser && logUser.OrganizationId,
    };
    getOrganizationExpiryReport(finalDataReportOld);
  };

  return !isAuthenticated || !user || !users ? (
    <Fragment></Fragment>
  ) : (
    <>
      {logUser.usergroup === "Super Admin" ? (
        //super admin filterrr
        <Fragment>
          <div className="container_align top_menu col-sm-12 responsiveDiv  ">
            {/* <div className="row pb-2  ml-2 responsiveDiv  bg-success "> */}
            <div className="col-lg-12 col-md-1 col-sm-1 col-1 text-center tenantfilter">
              {/* this is for textbox below image for showing the total count of Renewal */}
              <div>
                <Link
                  title="Previous Year Renewal Count"
                  to="/Organization-filter"
                  onClick={() => oldExpCountFetchOrg()}
                >
                  <div
                    className={`btn_before_filter text-center ${
                      blnSearchOld ? "active" : ""
                    }`}
                    title="Previous Year Renewal Count"
                    style={{ cursor: "pointer" }}
                  >
                    {" "}
                    {ext_year_count_org && ext_year_count_org.length > 0
                      ? ext_year_count_org.length
                      : 0}
                  </div>
                </Link>

                <div className="yearpicker">
                  <DatePicker
                    className="form-control text-center"
                    placeholder="yyyy"
                    onChange={(date) => OrgainzationmonthYearChange(date)}
                    dateFormat="yyyy"
                    selected={startMonthDate}
                    showYearPicker
                  />
                </div>
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
                    <div className="filter_bg  " key={idx}>
                      <div
                        className="tenantfil d-flex flex-row "
                        style={{
                          // fontWeight: "bold",
                          color: "#fff",
                          padding: "0px 0px 0px 5px",
                        }}
                      >
                        {" "}
                        <div className=" monthdiv">
                          <Link
                            to="/Organization-report"
                            name="alphaSearch"
                            onClick={() => onSelectOrgChange(optFiltr.value)}
                            style={
                              Number(monthSearch) === Number(optFiltr.value) &&
                              blnSearchCurr
                                ? {
                                    fontWeight: "bold",
                                    color: "#e8a317",
                                    fontSize: "115%",
                                  }
                                : { fontWeight: "", fontSize: "115%" }
                            }
                          >
                            {optFiltr.label}
                          </Link>{" "}
                        </div>
                        {/* &nbsp; */}
                        <div>
                          <label
                            className="btn-roun  "
                            style={
                              Number(monthSearch) === Number(optFiltr.value) &&
                              blnSearchCurr
                                ? {
                                    padding: "2px",
                                    fontSize: "80%",
                                    color: "#fff",
                                    background: "#e8a317",
                                  }
                                : {
                                    padding: "2px",
                                    fontSize: "80%",
                                    color: "#095A4A",
                                    background: "#fff",
                                  }
                            }
                          >
                            {countVal}
                          </label>
                        </div>
                      </div>
                    </div>
                  );
                })}
              {/* </form> */}
            </div>

            {/* <div className="col-lg-10 col-md-7 col-sm-8 col-8">
                <TenantReport />
              </div> */}
            {/* </div> */}
          </div>
        </Fragment>
      ) : (
        <>
          {/* TENANT FILTER */}
          {logUser.usergroup === "Admin" ? (
            <Fragment>
              <div className="container_align top_menu col-sm-12 responsiveDiv ml-3 ">
                {/* <div className="row pb-2 ml-2   "> */}
                <div className="col-lg-12 col-md-1 col-sm-1 col-1  text-center tenantfilter    ">
                  <div>
                    <Link
                      to="/tenant-report"
                      onClick={() => oldExpCountFetch()}
                    >
                      <div
                        className={`btn_before_filter text-center ${
                          blnSearchOld ? "active" : ""
                        }`}
                      >
                        {yearExpCnt && yearExpCnt.length > 0
                          ? yearExpCnt.length
                          : 0}
                      </div>
                    </Link>

                    <div className="yearpicker  ">
                      <DatePicker
                        className="form-control text-center  "
                        placeholder="yyyy"
                        onChange={(date) => monthYearChange(date)}
                        dateFormat="yyyy"
                        selected={startMonthDate}
                        style={{ textAlign: "center" }}
                        showYearPicker
                      />
                    </div>
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
                        <div
                          className=" filter_bg "
                          key={idx}
                          // style={{ border: "5px soild blue" }}
                        >
                          <div
                            className="tenantfil   d-flex flex-row"
                            style={{
                              fontWeight: "bold",
                              color: "#fff",
                              padding: "0px 0px 0px 5px",
                            }}
                          >
                            {" "}
                            <div className=" monthdiv">
                              <Link
                                to="/tenant-report"
                                name="alphaSearch"
                                onClick={() => onSelectChange(optFiltr.value)}
                                style={
                                  Number(monthSearch) ===
                                    Number(optFiltr.value) && blnSearchCurr
                                    ? {
                                        fontWeight: "bold",
                                        color: "#e8a317",
                                        fontSize: "115%",
                                      }
                                    : {
                                        fontWeight: "",
                                        fontSize: "115%",
                                      }
                                }
                              >
                                {optFiltr.label}
                              </Link>{" "}
                            </div>
                            {/* &nbsp; */}
                            <div>
                              <label
                                className="btn-roun  "
                                style={
                                  Number(monthSearch) ===
                                    Number(optFiltr.value) && blnSearchCurr
                                    ? {
                                        padding: "2px",
                                        fontSize: "80%",
                                        color: "#fff",
                                        background: "#e8a317",
                                      }
                                    : {
                                        padding: "2px",
                                        fontSize: "80%",
                                        color: "#095A4A",
                                        background: "#fff",
                                      }
                                }
                              >
                                {countVal}
                              </label>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                </div>
                {/* </div> */}
              </div>
            </Fragment>
          ) : (
            <></>
          )}
        </>
      )}
    </>
  );
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
  getOrgExp,
  ParticularTenant,
  getOrgExpCount,
  getOrganizationExpiryReport,
  getPreviousYearsExpCountOfOrg,
})(TenantFilters);
