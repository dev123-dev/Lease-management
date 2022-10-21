import axios from "axios";
import { setAlert } from "./alert";
// import { getAllUsers } from "./auth";

import {
  TENANT_ADD_INIT,
  AUTH_ERROR,
  SHOP_ADD_INIT,
  AGREEMENT_ADD_INIT,
  MONTH_EXP_CNT,
  YEAR_EXP_CNT,
  EXP_REPORT,
  GET_DOORNOS,
  NEW_TENENTDETAILS,
  TENANT_FEEDBACK_ERROR,
  GET_ALL_SHOPS,
  GET_ALL_TENANTS,
  GET_ALL_SETTINGS,
  GET_DELAYS,
  GET_DOORNUMBER,
  GET_ALL_USER,
  FINAL_DATA_REP,
} from "./types";

const config = {
  headers: {
    "Content-Type": "application/json",
  },
};

// Add Staff Performance feedback
export const AddTenantDetailsform = (finalData) => async (dispatch) => {
  const finalDataExpCount = {
    selectedY: finalData.selectedY,
  };

  const finalDataPrevYear = {
    selectedVal: finalData.selectedVal,
  };
  try {
    const res = await axios.post(
      "/api/tenants/add-tenant-details",
      finalData,
      config
    );
    dispatch({
      type: NEW_TENENTDETAILS,
      payload: res.data,
    });

    dispatch(getAllDoorNos());
    dispatch(getMonthExpCountFilter(finalDataExpCount));
    dispatch(getPreviousYearsExpCount(finalDataPrevYear));
  } catch (err) {
    dispatch({
      type: AUTH_ERROR,
    });
  }
};

export const AddTenantSettingsform = (finalData) => async (dispatch) => {
  try {
    dispatch({
      type: TENANT_ADD_INIT,
    });

    await axios.post("/api/tenants/add-tenant-settings", finalData, config);
  } catch (err) {
    dispatch({
      type: AUTH_ERROR,
    });
  }
};

export const AddTenantSettingform = (finalData) => async (dispatch) => {
  try {
    dispatch({
      type: TENANT_ADD_INIT,
    });

    await axios.post("/api/tenants/add-tenant-settings", finalData, config);
  } catch (err) {
    dispatch({
      type: AUTH_ERROR,
    });
  }
};

export const AddShopDetailsform = (finalData) => async (dispatch) => {
  try {
    await axios.post("/api/tenants/add-shop-details", finalData, config);
    dispatch(getAllShops());
  } catch (err) {
    dispatch({
      type: AUTH_ERROR,
    });
  }
};

export const AddTenantAgreementform = (finalData) => async (dispatch) => {
  try {
    await axios.post("/api/tenants/add-agreement-details", finalData, config);
    dispatch({
      type: AGREEMENT_ADD_INIT,
    });
  } catch (err) {
    dispatch({
      type: AUTH_ERROR,
    });
  }
};

export const deactiveTenantsDetails = (finalData) => async (dispatch) => {
  try {
    const res = await axios.post(
      "/api/tenants/deactive-tenant",
      finalData,
      config
    );
    // dispatch(getAllTenants());
  } catch (err) {
    dispatch({
      type: TENANT_FEEDBACK_ERROR,
    });
  }
};
export const UpdateTenantsDetails =
  (finalData, finalData2) => async (dispatch) => {
    try {
      // console.log(finalData);
      const res = await axios.post(
        "/api/tenants/update-tenant-details",
        finalData,
        config
      );
      // dispatch({
      //   type: GET_ALL_TENANTS,
      // });
      dispatch(getAllTenants());
    } catch (err) {
      dispatch({
        type: TENANT_FEEDBACK_ERROR,
      });
    }
  };

export const tenantsDetailsHistory = (historyData) => async (dispatch) => {
  try {
    const res = await axios.post(
      "/api/tenants/tenant-update-history",
      historyData,
      config
    );
  } catch (err) {
    dispatch({
      type: TENANT_FEEDBACK_ERROR,
    });
  }
};

export const UpdateTenantSettingform = (finalData) => async (dispatch) => {
  try {
    const res = await axios.post(
      "/api/tenants/update-tenant",
      finalData,
      config
    );
  } catch (err) {
    dispatch({
      type: TENANT_FEEDBACK_ERROR,
    });
  }
};

// Get Exp Month Count
export const getMonthExpCount = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/tenants/get-month-exp-count");
    dispatch({
      type: MONTH_EXP_CNT,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: AUTH_ERROR,
    });
  }
};

// Get Exp Month Count filter
export const getMonthExpCountFilter = (finalData) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    const res = await axios.post(
      "/api/tenants/get-month-exp-count-filter",
      finalData,
      config
    );
    dispatch({
      type: MONTH_EXP_CNT,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: AUTH_ERROR,
    });
  }
};

export const getAllShops = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/tenants/get-all-shops");
    dispatch({
      type: GET_ALL_SHOPS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: AUTH_ERROR,
    });
  }
};

// Get Year Exp Count filter
export const getPreviousYearsExpCount = (finalData) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    const res = await axios.post(
      "/api/tenants/get-previous-years-exp",
      finalData,
      config
    );
    dispatch({
      type: YEAR_EXP_CNT,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: AUTH_ERROR,
    });
  }
};

// Get Year Month Report
export const getTenantReportYearMonth =
  (finalDataReport) => async (dispatch) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    dispatch({
      type: FINAL_DATA_REP,
      payload: finalDataReport,
    });
    try {
      const res = await axios.post(
        "/api/tenants/get-tenant-exp-report",
        finalDataReport,
        config
      );
      dispatch({
        type: EXP_REPORT,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: AUTH_ERROR,
      });
    }
  };
export const getAllTenants = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/tenants/get-all-tenants");
    dispatch({
      type: GET_ALL_TENANTS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: AUTH_ERROR,
    });
  }
};

export const getAllSettings = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/tenants/get-all-settings");
    dispatch({
      type: GET_ALL_SETTINGS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: AUTH_ERROR,
    });
  }
};

export const getAllDoorNos = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/tenants/get-door-nos");
    dispatch({
      type: GET_DOORNOS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: AUTH_ERROR,
    });
  }
};

export const getAllDoorNumbers = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/tenants/get-door-number");
    dispatch({
      type: GET_DOORNUMBER,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: AUTH_ERROR,
    });
  }
};
export const getTenantReportOldExp =
  (finalDataReportOld) => async (dispatch) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const res = await axios.post(
        "/api/tenants/get-tenant-old-exp-report",
        finalDataReportOld,
        config
      );
      dispatch({
        type: EXP_REPORT,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: AUTH_ERROR,
      });
    }
  };

export const getAllTenanatDoornoFilter = (finalData) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    const res = await axios.post(
      "/api/tenants/filter-tenant-doorno-pref",
      finalData,
      config
    );
    dispatch({
      type: GET_ALL_TENANTS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: AUTH_ERROR,
    });
  }
};

export const RenewTenantDetailsform = (finalData) => async (dispatch) => {
  const finalDataReport = {
    monthSearch: finalData.monthSearch,
    yearSearch: finalData.yearSearch,
  };

  const finalDataExpCount = {
    selectedY: finalData.selectedY,
  };

  const finalDataPrevYear = {
    selectedVal: finalData.selectedVal,
  };

  const finalData2 = {
    tenantRentAmount: finalData.tenantRentAmount,
    tenantFileNo: finalData.tenantFileNo,
    tenantDoorNo: finalData.tenantDoorNo,
    tenantLeaseStartDate: finalData.tenantLeaseStartDate,
    tenantLeaseEndDate: finalData.tenantLeaseEndDate,
    tdId: finalData.tdId,
    AgreementStatus: finalData.AgreementStatus,
    agreementId: finalData.agreementId,
    tenantEnteredBy: finalData.tenantEnteredBy,
    tenantDate: finalData.tenantDate,
  };
  try {
    await axios.post("/api/tenants/renew-tenant-details", finalData2, config);
    dispatch(getTenantReportYearMonth(finalDataReport));
    dispatch(getMonthExpCountFilter(finalDataExpCount));
    dispatch(getPreviousYearsExpCount(finalDataPrevYear));
  } catch (err) {
    dispatch({
      type: AUTH_ERROR,
    });
  }
};
