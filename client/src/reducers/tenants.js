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
  allorg : [""],
  allsuperuser : [""],
  updatedorg : [""],
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
        return{
          ...state,
          allorg : payload,
        }
        case GET_ALL_SUPERUSER:
        return{
          ...state,
          allsuperuser  : payload,
        }
        case UPDATE_ORG :
          return {
            ...state,
            updatedorg : payload,
          }
    default:
      return state;
  }
};

export default tenants;
