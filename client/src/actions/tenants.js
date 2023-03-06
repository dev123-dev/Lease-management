import axios from "axios";

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
  GET_ALL_ORGANIZATION,
  GET_ALL_SUPERUSER,
  UPDATE_ORG,
  PARTICULAR_ORG_PROPERTY,
  PARTICULAR_ORG_LOCATION,
  PARTICULAR_USER,
  GET_ADMIN,
  PARTICULAR_ORG_USER,
  GET_PARTICULAR_ORG_TENANTSETTING,
  PARTICULAR_ORG_TENANT,
} from "./types";

var linkPath = "";

const config = {
  headers: {
    "Content-Type": "application/json",
  },
};

// var linkPath = process.env.REACT_APP_BASE_URL;
var linkPath = "";

export const AddOrganization = (OrganizationData) => async (dispatch) => {
  try {
    await axios.post(
      `${linkPath}/api/tenants/add-Organization`,
      OrganizationData,
      config
    );
    //diapatching get function because it should relfex immidiatly after adding
    dispatch(getAllOrganization());
  } catch (err) {
    dispatch({
      type: AUTH_ERROR,
    });
  }
};
//get count of unOccupied Property
// export const getUnoccupiedProperty = () => async (dispatch) => {
//   console.log("insde the getUnoccupiedProperty");
//   try {
//   } catch (error) {
//     console.log(error.message);
//   }
// };

//getting seperate data for particular organization
export const getParticularProperty = (data) => async (dispatch) => {
  // console.log(data, "data of property");
  try {
    const res = await axios.post(
      `${linkPath}/api/tenants/get-Particular-Property`,
      data,
      config
    );

    dispatch({
      type: PARTICULAR_ORG_PROPERTY,
      payload: res.data,
    });
  } catch (error) {
    console.log(error.message);
  }
};

export const getParticularOrg = (data) => async (dispatch) => {
  try {
    const res = await axios.post(
      `${linkPath}/api/tenants/get-particular-org`,
      data,
      config
    );
    dispatch(getParticularProperty({ OrganizationId: data.Orgainzation_id }));

    dispatch({
      type: PARTICULAR_ORG_LOCATION,
      payload: res.data,
    });
  } catch (error) {}
};

export const getParticularUser = (data) => async (dispatch) => {
  let userdata = data;

  try {
    const res = await axios.post(
      `${linkPath}/api/tenants/get-particular-user`,
      userdata,
      config
    );
    dispatch({
      type: PARTICULAR_USER,
      payload: res.data,
    });
  } catch (error) {
    console.log(error.message);
  }
};

//gettting organization details
export const getAllOrganization = () => async (dispatch) => {
  try {
    const res = await axios.get(`${linkPath}/api/tenants/get-all-Organization`);
    dispatch({
      type: GET_ALL_ORGANIZATION,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: AUTH_ERROR,
    });
  }
};
//update Organzation
export const updateOrganization = (updatedata) => async (dispatch) => {
  try {
    const res = await axios.post(
      `${linkPath}/api/tenants/update-Organization`,
      updatedata,
      config
    );
    dispatch(getAllOrganization());
  } catch (err) {}
};

//update Property
export const updateProperty = (updatedata) => async (dispatch) => {
  try {
    const res = await axios.post(
      `${linkPath}/api/tenants/update-Property`,
      updatedata,
      config
    );
    dispatch(
      getParticularProperty({ OrganizationId: updatedata.Orgainzation_id })
    );
  } catch (err) {}
};

//update Super User Form
export const UpdateUser = (userdata) => async (dispatch) => {
  try {
    const res = await axios.post(
      `${linkPath}/api/tenants/Update-User`,
      userdata,
      config
    );
    dispatch(getalluser());
  } catch (error) {
    console.error(error.message);
  }
};

//adding Super user
export const Adduser = (userData) => async (dispatch) => {
  try {
    const res = await axios.post(
      `${linkPath}/api/tenants/add-SuperUser`,
      userData,
      config
    );
    dispatch(getalluser());
  } catch (err) {
    dispatch({
      type: AUTH_ERROR,
    });
  }
};

//get particular tenant details based on organization
export const ParticularTenant = (data) => async (dispatch) => {
  try {
    const res = await axios.post(
      `${linkPath}/api/tenants/get-particular-Tenant`,
      data
    );
    dispatch(
      getParticularOrg({ OrganizationId: data.OrganizationId }),
      getParticularProperty({ OrganizationId: data.OrganizationId })
    );
    dispatch({
      type: PARTICULAR_ORG_TENANT,
      payload: res.data,
    });
  } catch (error) {
    console.log(error.message);
  }
};

//add admin user
export const AddAdminuser = (userData) => async (dispatch) => {
  let data = userData.OrganizationId;
  try {
    const res = await axios.post(
      `${linkPath}/api/tenants/add-AdminUser`,
      userData,
      config
    );

    dispatch({
      type: GET_ADMIN,
      payload: res.data,
    });
    dispatch(get_particular_org_user({ orgId: userData.OrganizationId }));
  } catch (err) {
    dispatch({
      type: AUTH_ERROR,
    });
  }
};

//getting all the user (super)

export const getalluser = () => async (dispatch) => {
  try {
    const res = await axios.get(`${linkPath}/api/tenants/get-all-Superuser`);
    dispatch({
      type: GET_ALL_SUPERUSER,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: Error,
    });
  }
};

//get Particular Organization user
export const get_particular_org_user = (data) => async (dispatch) => {
  try {
    const res = await axios.post(
      `${linkPath}/api/tenants/get-particular-org-user`,
      data
    );

    dispatch({
      type: PARTICULAR_ORG_USER,
      payload: res.data,
    });
  } catch (error) {
    console.log(error.message);
  }
};

//deactivating the user in super admin page
export const deactivateUser = (id) => async (dispatch) => {
  try {
    const res = await axios.post(
      `${linkPath}/api/tenants/deactive-user`,
      id,
      config
    );

    dispatch(get_particular_org_user({ orgid: id.orgId }));
  } catch (err) {
    dispatch({
      type: TENANT_FEEDBACK_ERROR,
    });
  }
};

//deleting organization details
export const deleteOrganization = (id) => async (dispatch) => {
  try {
    const res = await axios.post(
      `${linkPath}/api/tenants/deactive-Organization`,
      id,
      config
    );
    dispatch(getAllOrganization());
  } catch (err) {
    console.log("error while sending from action");
    dispatch({
      type: TENANT_FEEDBACK_ERROR,
    });
  }
};

//Renew Organization details
export const RenewOrgDetailsform = (renewdata) => async (dispatch) => {
  try {
    const res = await axios.post(
      `${linkPath}/api/tenants/Renew-Organization`,
      renewdata,
      config
    );
  } catch (error) {
    console.log(error.message);
  }
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
      `${linkPath}/api/tenants/add-tenant-details`,
      finalData,
      config
    );
    dispatch({
      type: NEW_TENENTDETAILS,
      payload: res.data,
    });
    dispatch(getAllTenants());
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

    await axios.post(
      `${linkPath}/api/tenants/add-tenant-settings`,
      finalData,
      config
    );
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

    await axios.post(
      `${linkPath}/api/tenants/add-tenant-settings`,
      finalData,
      config
    );
  } catch (err) {
    dispatch({
      type: AUTH_ERROR,
    });
  }
};

export const AddShopDetailsform = (finalData) => async (dispatch) => {
  try {
    await axios.post(
      `${linkPath}/api/tenants/add-Property-details`,
      finalData,
      config
    );
    dispatch(
      getParticularProperty({ OrganizationId: finalData.OrganizationId })
    );
  } catch (err) {
    dispatch({
      type: AUTH_ERROR,
    });
  }
};

export const AddTenantAgreementform = (finalData) => async (dispatch) => {
  try {
    await axios.post(
      `${linkPath}/api/tenants/add-agreement-details`,
      finalData,
      config
    );
    dispatch({
      type: AGREEMENT_ADD_INIT,
    });
  } catch (err) {
    dispatch({
      type: AUTH_ERROR,
    });
  }
};

//deactivate property details
export const deactiveProperty = (finalData) => async (dispatch) => {
  try {
    const res = await axios.post(
      `${linkPath}/api/tenants/deactive-property`,
      finalData,
      config
    );

    dispatch(
      getParticularProperty({ OrganizationId: finalData.OrganizationId })
    );
  } catch (err) {
    dispatch({
      type: TENANT_FEEDBACK_ERROR,
    });
  }
};

export const deactiveTenantsDetails = (finalData) => async (dispatch) => {
  try {
    const res = await axios.post(
      `${linkPath}/api/tenants/deactive-tenant`,
      finalData,
      config
    );
    dispatch(getAllTenants());
  } catch (err) {
    dispatch({
      type: TENANT_FEEDBACK_ERROR,
    });
  }
};
export const UpdateTenantsDetails = (finalData) => async (dispatch) => {
  try {
    const res = await axios.post(
      `${linkPath}/api/tenants/update-tenant-details`,
      finalData,
      config
    );
    dispatch(getAllTenants());
  } catch (err) {
    console.log(err.message);
    dispatch({
      type: TENANT_FEEDBACK_ERROR,
    });
  }
};

export const tenantsDetailsHistory = (historyData) => async (dispatch) => {
  try {
    const res = await axios.post(
      `${linkPath}/api/tenants/tenant-update-history`,
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
      `${linkPath}/api/tenants/update-tenant`,
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
    const res = await axios.get(`${linkPath}/api/tenants/get-month-exp-count`);
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
      `${linkPath}/api/tenants/get-month-exp-count-filter`,
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

export const getAllShops = (data) => async (dispatch) => {
  try {
    const res = await axios.post(`${linkPath}/api/tenants/get-all-shops`, data);
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
      `${linkPath}/api/tenants/get-previous-years-exp`,
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
        `${linkPath}/api/tenants/get-tenant-exp-report`,
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
    const res = await axios.get(`${linkPath}/api/tenants/get-all-tenants`);
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
    const res = await axios.get(`${linkPath}/api/tenants/get-all-settings`);
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

//get particular Organization tenant Setting
export const getParticularTenantSetting = (data) => async (dispatch) => {
  try {
    const res = await axios.post(
      `${linkPath}/api/tenants/get-Particular-org-Tenantsetting`,
      data
    );
    dispatch({
      type: GET_PARTICULAR_ORG_TENANTSETTING,
      payload: res.data,
    });
  } catch (error) {
    console.log(error.message);
  }
};

export const getAllDoorNos = () => async (dispatch) => {
  try {
    const res = await axios.get(`${linkPath}/api/tenants/get-door-nos`);
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
    const res = await axios.get(`${linkPath}/api/tenants/get-door-number`);
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
        `${linkPath}/api/tenants/get-tenant-old-exp-report`,
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
      `${linkPath}/api/tenants/filter-tenant-doorno-pref`,
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
    await axios.post(
      `${linkPath}/api/tenants/renew-tenant-details`,
      finalData2,
      config
    );
    dispatch(getTenantReportYearMonth(finalDataReport));
    dispatch(getMonthExpCountFilter(finalDataExpCount));
    dispatch(getPreviousYearsExpCount(finalDataPrevYear));
  } catch (err) {
    dispatch({
      type: AUTH_ERROR,
    });
  }
};
