import {
  GET_ALL_SHOPS,
  GET_ALL_TENANTS,
  GET_ALL_SETTINGS,
  MONTH_EXP_CNT,
  YEAR_EXP_CNT,
  EXP_REPORT,
  GET_DOORNOS,
  GET_DOORNUMBER,
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
} from "../actions/types";

const initialState = {
  token: localStorage.getItem("token"),
  isAuthenticated: null,
  loading: true,
  user: null,
  users: [],
  errorResponse: "",
  successResponse: "",

  allShopDetails: [],
  alltenants: [""],
  allTenantSetting: [""],
  allDoorNos: [""],
  allDoorNumber: [""],
  monthExpCnt: [],
  yearExpCnt: [],
  expReport: [],
  allorg: [""],
  allsuperuser: [""],
  updatedorg: [""],
  particular_org_data: [""],
  particular_org_loc: [""],
  particular_user: [""],
  get_admin: [""],
  get_particular_org_user: [""],
  get_Particular_org_Tenantsetting: [""],
  get_particular_org_tenant: [""],
};

const tenants = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case EXP_REPORT:
      return {
        ...state,
        expReport: payload,
      };
    case GET_DOORNOS:
      return {
        ...state,
        allDoorNos: payload,
      };
    case GET_DOORNUMBER:
      return {
        ...state,
        allDoorNumber: payload,
      };
    case GET_ALL_SHOPS:
      return {
        ...state,
        allShopDetails: payload,
      };

    case GET_ALL_TENANTS:
      return {
        ...state,
        allTenants: payload,
      };
    case GET_ALL_SETTINGS:
      return {
        ...state,
        allTenantSetting: payload,
      };
    case GET_ALL_ORGANIZATION:
      return {
        ...state,
        allorg: payload,
      };
    case GET_ALL_SUPERUSER:
      return {
        ...state,
        allsuperuser: payload,
      };
    case UPDATE_ORG:
      return {
        ...state,
        updatedorg: payload,
      };
    case PARTICULAR_ORG_PROPERTY:
      return {
        ...state,
        particular_org_data: payload,
      };
    case PARTICULAR_ORG_LOCATION:
      return {
        ...state,
        particular_org_loc: payload,
      };
    case PARTICULAR_USER:
      return {
        ...state,
        particular_user: payload,
      };
    case GET_ADMIN:
      return {
        ...state,
        get_admin: payload,
      };
    case PARTICULAR_ORG_USER:
      return {
        ...state,
        get_particularOrg_user: payload,
      };
    case GET_PARTICULAR_ORG_TENANTSETTING:
      return {
        ...state,
        get_Particular_org_Tenantsetting: payload,
      };
    case PARTICULAR_ORG_TENANT:
      return {
        ...state,
        get_particular_org_tenant: payload,
      };

    default:
      return state;
  }
};

export default tenants;
