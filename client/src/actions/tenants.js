import axios from "axios";

// import { getAllUsers } from "./auth";

import {
  TENANT_ADD_INIT,
  AUTH_ERROR,
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
  GET_DOORNUMBER,
  FINAL_DATA_REP,
  FINAL_DATA_REP_YEAR,
  GET_ALL_ORGANIZATION,
  GET_ALL_SUPERUSER,
  PARTICULAR_ORG_PROPERTY,
  PARTICULAR_ORG_LOCATION,
  PARTICULAR_USER,
  GET_ADMIN,
  PARTICULAR_ORG_USER,
  GET_PARTICULAR_ORG_TENANTSETTING,
  PARTICULAR_ORG_TENANT,
  EXP_ORG_DETAIL,
  EXP_ORG_COUNT,
  YEAR_EXP_COUNT_ORG,
  GET_EDIT_TENANT_DETAILS,
  EXP_ORG_,
  PROPERTY_RELATED_TENANT,
  PARTICULAR_ORG_TENANT_SORT,
  PARTICULAR_ORG_TENANT_SORT_CONTACT_REPORT,
  PARTICULAR_ORG_TENANT_LEASETRANSFER_SORT,
  GET_TENANT_RECEIPTNO,
  USER_ACTIVITY_DETAIL,
  NEW_USER_ACTIVITY,
  GET_MIS_REPORT,
  GET_MIS_AMOUNT_REPORT,
  GET_MIS_RENEWED_BAR_REPORT,
  TENANT_SORT_ACTIVECOUNT,
  TENANT_ACTIVECOUNT,
  TENANT_RENEWCOUNT,
  TENANT_DETAILS_LOADING,
  TENANT_DETAILS_LOADING_SUCCESS,
} from "./types";
import { loadUser } from "./auth";

const config = {
  headers: {
    "Content-Type": "application/json",
  },
};

var linkPath = process.env.REACT_APP_BASE_URL;
// var linkPath = "";

//Function when call is tenant-report and old records are being searched previous to selected which agreements have not expired
export const getRoutesSetOldRecordsClicked = (blnOldSearch) => (dispatch) => {
  dispatch({
    type: "TENANT_FILTER_OLD",
    payload: blnOldSearch,
  });
};

export const getRoutesSetCurrentYearMonthsRecordsClicked =
  (blnCurrYearMonthSearch) => (dispatch) => {
    dispatch({
      type: "TENANT_FILTER_CURR",
      payload: blnCurrYearMonthSearch,
    });
  };

//tenant setting
export const AddTenantSettingform = (finalData) => async (dispatch) => {
  try {
    dispatch({
      type: TENANT_ADD_INIT,
    });

    await axios.post(
      `${linkPath}/api/tenantSetting/add-tenant-settings`,
      finalData,
      config
    );
  } catch (err) {
    dispatch({
      type: AUTH_ERROR,
    });
  }
};

export const UpdateTenantSettingform = (finalData) => async (dispatch) => {
  // console.log("snd data", finalData);
  try {
    await axios.post(
      `${linkPath}/api/tenantSetting/update-tenant-settings`,
      finalData,
      config
    );
    dispatch(
      getAllSettings({
        OrganizationId: finalData && finalData.OrganizationId,
        userId: finalData && finalData.userId,
      })
    );
    dispatch(loadUser());
  } catch (err) {
    dispatch({
      type: TENANT_FEEDBACK_ERROR,
    });
  }
};

export const getAllSettings = (data) => async (dispatch) => {
  try {
    const res = await axios.post(
      `${linkPath}/api/tenantSetting/get-all-settings`,
      data
    );
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

//tenant setting end

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

//getting seperate data for particular organization
export const getParticularProperty = (data) => async (dispatch) => {
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

// export const getAllRenewalAmount = (data) => async (dispatc) => {
//   try {
//    await axios.post(
//       `${linkPath}/api/tenants/get-renewal-amount`,
//       data
//     );
//   } catch (error) {
//     console.log(error.message);
//   }
// };

export const getParticularOrg = (data) => async (dispatch) => {
  try {
    if (data.OrganizationId) {
      const res = await axios.post(
        `${linkPath}/api/tenants/get-particular-org`,
        data,
        config
      );

      dispatch(getParticularProperty({ OrganizationId: data.OrganizationId }));

      dispatch({
        type: PARTICULAR_ORG_LOCATION,
        payload: res.data,
      });
    }
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
    await axios.post(
      `${linkPath}/api/tenants/update-Organization`,
      updatedata,
      config
    );
    dispatch(getAllOrganization());
  } catch (err) {}
};

//update Property
export const updateProperty = (updatedata) => async (dispatch) => {
  // console.log("updateProperty", updatedata);
  try {
    await axios.post(
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

    dispatch(
      get_particular_org_user({ OrganizationId: userdata.OrganizationId })
    );
  } catch (error) {
    console.error(error.message);
  }
};

//adding Super user
export const Adduser = (userData) => async (dispatch) => {
  try {
    await axios.post(`${linkPath}/api/tenants/add-SuperUser`, userData, config);
    dispatch(getalluser());
  } catch (err) {
    dispatch({
      type: AUTH_ERROR,
    });
  }
};
export const getPropertyTenantData = (data) => async (dispatch) => {
  try {
    const res = await axios.post(
      `${linkPath}/api/tenants/get-Property-tenant-details`,
      data
    );
    dispatch({
      type: PROPERTY_RELATED_TENANT,
      payload: res.data,
    });
  } catch (error) {
    console.log(error.message);
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

//no use //flag
// export const getDoorNo = () => async (dispatch) => {
//   try {
//     const res = await axios.get(`${linkPath}/api/tenants/get-door-no`);

//     dispatch({
//       type: PARTICULAR_ORG_TENANT,
//       payload: res.data,
//     });
//   } catch (error) {
//     console.log(error.message);
//   }
// };

export const ParticularTenantFilter = (data) => async (dispatch) => {
  try {
    const res = await axios.post(
      `${linkPath}/api/tenants/get-tenant-sort`,
      data
    );

    dispatch({
      type: PARTICULAR_ORG_TENANT_SORT,
      payload: res.data,
    });
  } catch (error) {
    console.log(error.message);
  }
};

export const TenantCount = (data) => async (dispatch) => {
  try {
    const res = await axios.post(
      `${linkPath}/api/tenants/get-tenant-sort-for-activecount`,
      data
    );

    dispatch({
      type: TENANT_SORT_ACTIVECOUNT,
      payload: res.data,
    });
  } catch (error) {
    console.log(error.message);
  }
};
export const TenantActiveCount = (data) => async (dispatch) => {
  try {
    const res = await axios.post(
      `${linkPath}/api/tenants/get-tenant-activecount`,
      data
    );

    dispatch({
      type: TENANT_ACTIVECOUNT,
      payload: res.data,
    });
  } catch (error) {
    console.log(error.message);
  }
};
export const TenantRenewedCount = (data) => async (dispatch) => {
  try {
    const res = await axios.post(
      `${linkPath}/api/tenants/get-tenant-renewedcount`,
      data
    );

    dispatch({
      type: TENANT_RENEWCOUNT,
      payload: res.data,
    });
  } catch (error) {
    console.log(error.message);
  }
};
export const ParticularTenantFilterContactReport =
  (data) => async (dispatch) => {
    try {
      const res = await axios.post(
        `${linkPath}/api/tenants/get-tenant-sort-contact-report`,
        data
      );

      dispatch({
        type: PARTICULAR_ORG_TENANT_SORT_CONTACT_REPORT,
        payload: res.data,
      });
    } catch (error) {
      console.log(error.message);
    }
  };

//tenantLeaseTransfer sort

export const ParticularTenantLeaseTransferFilter =
  (data) => async (dispatch) => {
    try {
      const res = await axios.post(
        `${linkPath}/api/tenants/get-tenantLeaseTransfer-sort`,
        data
      );

      dispatch({
        type: PARTICULAR_ORG_TENANT_LEASETRANSFER_SORT,
        payload: res.data,
      });
    } catch (error) {
      console.log(error.message);
    }
  };
//add admin user
export const AddAdminuser = (userData) => async (dispatch) => {
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
    dispatch(
      get_particular_org_user({ OrganizationId: userData.OrganizationId })
    );
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
  // console.log(data,"data")
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
    await axios.post(`${linkPath}/api/tenants/deactive-user`, id, config);
    dispatch(getalluser());
    //dispatch(get_particular_org_user({ OrganizationId: id.orgId }));
  } catch (err) {
    dispatch({
      type: TENANT_FEEDBACK_ERROR,
    });
  }
};

//deleting organization details
export const deleteOrganization = (id) => async (dispatch) => {
  try {
    // console.log(id);
    await axios.post(
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
    await axios.post(
      `${linkPath}/api/tenants/Renew-Organization`,
      renewdata,
      config
    );
    dispatch(getAllOrganization());
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
    dispatch(
      getParticularTenantSetting({ OrganizationId: finalData.OrganizationId })
    );
    dispatch(getMonthExpCount(finalDataExpCount)); //change
    dispatch(getPreviousYearsExpCount(finalDataPrevYear));
  } catch (err) {
    dispatch({
      type: AUTH_ERROR,
    });
  }
};

//User Activity

export const AddUserActivity = (finalData) => async (dispatch) => {
  try {
    const res = await axios.post(
      `${linkPath}/api/tenants/add-user-activity-details`,
      finalData,
      config
    );
    dispatch({
      type: NEW_USER_ACTIVITY,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: AUTH_ERROR,
    });
  }
};

export const getTenantDetails = (data) => async (dispatch) => {
  try {
    dispatch({
      type: GET_EDIT_TENANT_DETAILS,
      payload: data,
    });
  } catch (error) {
    console.log(error.message);
  }
};

//tenant setting

//setting end tenat
export const AddShopDetailsform = (finalData) => async (dispatch) => {
  try {
    await axios.post(
      `${linkPath}/api/tenants/add-Property-details`,
      finalData,
      config
    );
    dispatch(
      getParticularProperty({ OrganizationId: finalData.OrganizationId }),
      getParticularTenantSetting({ OrganizationId: finalData.OrganizationId })
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
    await axios.post(
      `${linkPath}/api/tenants/deactive-property`,
      finalData,
      config
    );

    // dispatch(
    //   getParticularProperty({ OrganizationId: finalData.OrganizationId })
    // );
  } catch (err) {
    dispatch({
      type: TENANT_FEEDBACK_ERROR,
    });
  }
};

export const deactiveTenantsDetails = (finalData) => async (dispatch) => {
  try {
    await axios.post(
      `${linkPath}/api/tenants/deactive-tenant`,
      finalData,
      config
    );
    dispatch(ParticularTenant({ OrganizationId: finalData.OrganizationId }));
    dispatch(ParticularTenantFilter());
  } catch (err) {
    dispatch({
      type: TENANT_FEEDBACK_ERROR,
    });
  }
};
export const UpdateTenantsDetails = (finalData) => async (dispatch) => {
  try {
    await axios.post(
      `${linkPath}/api/tenants/update-tenant-details`,
      finalData,
      config
    );
    dispatch(ParticularTenantFilter());
    dispatch(TenantCount());
    // dispatch(ParticularTenant({ OrganizationId: finalData.OrganizationId }));
    // dispatch(getAllTenants());
  } catch (err) {
    console.log(err.message);
    dispatch({
      type: TENANT_FEEDBACK_ERROR,
    });
  }
};

export const ActivateTenantDetails = (finalData) => async (dispatch) => {
  try {
    await axios.post(
      `${linkPath}/api/tenants/activate-tenant-details`,
      finalData,
      config
    );
    dispatch(ParticularTenantFilter());
    // dispatch(ParticularTenant({ OrganizationId: finalData.OrganizationId }));
  } catch (err) {
    console.log(err.message);
    dispatch({
      type: TENANT_FEEDBACK_ERROR,
    });
  }
};

//edit tenant lease transfer

export const EditTenantLeaseTransferDetails =
  (finalData) => async (dispatch) => {
    try {
      await axios.post(
        `${linkPath}/api/tenants/edit-tenant-leasetransfer-details`,
        finalData,
        config
      );

      dispatch(ParticularTenantFilter());
      // dispatch(
      //   getParticularTenantSetting({ OrganizationId: finalData.OrganizationId })
      // );
      // dispatch(getAllTenants());
    } catch (err) {
      console.log(err.message);
      dispatch({
        type: TENANT_FEEDBACK_ERROR,
      });
    }
  };

export const tenantsDetailsHistory = (historyData) => async (dispatch) => {
  try {
    await axios.post(
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

//get month exp for organization
export const getOrgExpCount = (finaldata) => async (dispatch) => {
  try {
    const res = await axios.post(
      `${linkPath}/api/tenants/get-month-exp-org-count`,
      finaldata
    );
    dispatch({
      type: EXP_ORG_COUNT,
      payload: res.data,
    });
  } catch (error) {
    console.log(error.message);
  }
};
export const getOrgExp = (finaldata) => async (dispatch) => {
  try {
    const res = await axios.post(
      `${linkPath}/api/tenants/get-month-exp-org`,
      finaldata
    );
    dispatch({
      type: EXP_ORG_,
      payload: res.data,
    });
  } catch (error) {
    console.log(error.message);
  }
};

// Get Exp Month Count
export const getMonthExpCount = (finalData) => async (dispatch) => {
  dispatch({
    type: "TENANT_DETAILS_LOADING",
  });

  try {
    const res = await axios.post(
      `${linkPath}/api/tenants/get-month-exp-count`,
      finalData
    );
    dispatch({
      type: MONTH_EXP_CNT,
      payload: res.data,
    });
    dispatch({
      type: "TENANT_DETAILS_LOADING_SUCCESS",
    });
  } catch (err) {
    dispatch({
      type: AUTH_ERROR,
    });
  }
};

// Get Exp Month Count filter
// export const getMonthExpCountFilter = (finalData) => async (dispatch) => {
//   const config = {
//     headers: {
//       "Content-Type": "application/json",
//     },
//   };
//   try {
//     const res = await axios.post(
//       `${linkPath}/api/tenants/get-month-exp-count-filter`,
//       finalData,
//       config
//     );
//     dispatch({
//       type: MONTH_EXP_CNT,
//       payload: res.data,
//     });
//   } catch (err) {
//     dispatch({
//       type: AUTH_ERROR,
//     });
//   }
// };

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

//get user activity

export const getUserActivity = (data) => async (dispatch) => {
  try {
    const res = await axios.post(
      `${linkPath}/api/tenants/get-user-activity`,
      data
    );
    dispatch({
      type: USER_ACTIVITY_DETAIL,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: AUTH_ERROR,
    });
  }
};

//get year exp count for Orgnization
export const getPreviousYearsExpCountOfOrg = (data) => async (dispatch) => {
  try {
    const res = await axios.post(
      `${linkPath}/api/tenants/get-previous-years-exp-Org`,
      data,
      config
    );
    // console.log(" getPreviousYearsExpCountOfOrg ", res.data);
    dispatch({
      type: YEAR_EXP_COUNT_ORG,
      payload: res.data,
    });
  } catch (error) {
    console.log(error.message);
  }
};

// Get Year Exp Count filter
export const getPreviousYearsExpCount = (finalData) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  dispatch({
    type: "TENANT_DETAILS_LOADING",
  });

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

    dispatch({
      type: "TENANT_DETAILS_LOADING_SUCCESS",
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
    dispatch(
      ParticularTenant({ OrganizationId: finalDataReport.OrganizationId })
    );
    dispatch({
      type: "TENANT_DETAILS_LOADING",
    });
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
      dispatch({
        type: "TENANT_DETAILS_LOADING_SUCCESS",
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

//get tenant receipt number
export const getTenantReceiptNo = (data) => async (dispatch) => {
  try {
    const res = await axios.post(
      `${linkPath}/api/tenants/get-tenant-receiptnumber`,
      data
    );
    dispatch({
      type: GET_TENANT_RECEIPTNO,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: AUTH_ERROR,
    });
  }
};

//add tenant receipt details

export const AddTenantReceiptDetails = (finalData) => async (dispatch) => {
  try {
    await axios.post(
      `${linkPath}/api/tenants/update-tenant-Receiptdetails`,
      finalData,
      config
    );
  } catch (err) {
    console.log(err.message);
    dispatch({
      type: TENANT_FEEDBACK_ERROR,
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

export const getOrganizationExpiryReport =
  (finalOrgData) => async (dispatch) => {
    try {
      const res = await axios.post(
        `${linkPath}/api/tenants/get-organization-expiry-report`,
        finalOrgData
      );
      dispatch({
        type: EXP_ORG_DETAIL,
        payload: res.data,
      });
    } catch (error) {
      console.log(error.message);
    }
  };

export const getTenantReportOldExp =
  (finalDataReportOld) => async (dispatch) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    dispatch({
      type: "TENANT_DETAILS_LOADING",
    });

    try {
      const res = await axios.post(
        `${linkPath}/api/tenants/get-tenant-old-exp-report`,
        finalDataReportOld,
        config
      );
      dispatch({
        type: FINAL_DATA_REP,
        payload: finalDataReportOld,
      });
      dispatch({
        type: EXP_REPORT,
        payload: res.data,
      });
      dispatch({
        type: "TENANT_DETAILS_LOADING_SUCCESS",
      });
    } catch (err) {
      dispatch({
        type: AUTH_ERROR,
      });
    }
  };

///123
export const getTenantReportYearExp =
  (finalDataReportOld) => async (dispatch) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    dispatch({
      type: "TENANT_DETAILS_LOADING",
    });

    try {
      const res = await axios.post(
        `${linkPath}/api/tenants/get-tenant-year-report`,
        finalDataReportOld,
        config
      );
      dispatch({
        type: FINAL_DATA_REP_YEAR,
        payload: finalDataReportOld,
      });
      dispatch({
        type: EXP_REPORT,
        payload: res.data,
      });
      dispatch({
        type: "TENANT_DETAILS_LOADING_SUCCESS",
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
    OrganizationId: finalData.OrganizationId,
  };

  const finalDataExpCount = {
    selectedY: finalData.selectedY,
    OrganizationId: finalData.OrganizationId,
  };

  const finalDataPrevYear = {
    selectedVal: finalData.selectedVal,
    OrganizationId: finalData.OrganizationId,
  };

  const finalData2 = {
    tenantRentAmount: finalData.tenantRentAmount,
    tenantFileNo: finalData.tenantFileNo,
    tenantDoorNo: finalData.tenantDoorNo,
    tenantLeaseStartDate: finalData.tenantLeaseStartDate,
    tenantLeaseEndDate: finalData.tenantLeaseEndDate,
    tdId: finalData.tdId,
    OrganizationId: finalData.OrganizationId,
    BuildingId: finalData.BuildingId,
    BuildingName: finalData.BuildingName,
    AgreementStatus: finalData.AgreementStatus,
    agreementId: finalData.agreementId,
    tenantEnteredBy: finalData.tenantEnteredBy,
    tenantDate: finalData.tenantDate,
    //new
    tenantPaymentMode: finalData.tenantPaymentMode,
    tenantChequenoOrDdno: finalData.tenantChequenoOrDdno,
    tenantBankName: finalData.tenantBankName,
    tenantchequeDate: finalData.tenantchequeDate,
    tenantTransId: finalData.tenantTransId,
    tenantCardType: finalData.tenantCardType,
    stampDuty: finalData.stampDuty,
    oldRentAmount: finalData.oldRentAmount,
  };

  try {
    await axios.post(
      `${linkPath}/api/tenants/renew-tenant-details`,
      finalData2,
      config
    );
    dispatch(getTenantReportYearMonth(finalDataReport));
    dispatch(getMonthExpCount(finalDataExpCount)); //change
    dispatch(getPreviousYearsExpCount(finalDataPrevYear));
  } catch (err) {
    dispatch({
      type: AUTH_ERROR,
    });
  }
};

//get MIS report

export const getMisReport = (finalOrgData) => async (dispatch) => {
  try {
    const res = await axios.post(
      `${linkPath}/api/tenants/get-mis-report`,
      finalOrgData
    );

    dispatch({
      type: GET_MIS_REPORT,
      payload: res.data,
    });
  } catch (error) {
    console.log(error.message);
  }
};

export const getMisAmountReport = (finalOrgData1) => async (dispatch) => {
  try {
    const res = await axios.post(
      `${linkPath}/api/tenants/get-mis-amount-report`,
      finalOrgData1
    );

    dispatch({
      type: GET_MIS_AMOUNT_REPORT,
      payload: res.data,
    });
  } catch (error) {
    console.log(error.message);
  }
};

export const getMisRenewedBarReport = (finalData) => async (dispatch) => {
  try {
    const res = await axios.post(
      `${linkPath}/api/tenants/get-mis-renewed-bar-report`,
      finalData
    );

    dispatch({
      type: GET_MIS_RENEWED_BAR_REPORT,
      payload: res.data,
    });
  } catch (error) {
    console.log(error.message);
  }
};
