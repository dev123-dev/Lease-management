import {
  USER_LOADED,
  AUTH_ERROR,
  REMOVE_ERROR,
  ALL_USERS,
  CHANGE_PWD_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  MONTH_EXP_CNT,
  YEAR_EXP_CNT,
  EXP_REPORT,
  GET_ALL_USER,
  OTP_SENT,
  SET_LOADING_TRUE,
  FINAL_DATA_REP,
} from "../actions/types";

const initialState = {
  token: localStorage.getItem("token"),
  isAuthenticated: null,
  loading: true,
  user: null,
  users: [],
  errorResponse: "",
  successResponse: "",

  // alllevels: [""],
  // alltenants: [""],
  // allTenantSetting: [""],

  monthExpCnt: [],
  yearExpCnt: [],
  expReport: [],
  otpMessage: "",
  finalDataRep: [],
};

const auth = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: payload,
      };
    case LOGIN_SUCCESS:
      localStorage.setItem("token", payload.token);
      return {
        ...state,
        ...payload,
        isAuthenticated: true,
        loading: false,
        errorResponse: "",
      };

    case LOGIN_FAIL:
    case AUTH_ERROR:
    case LOGOUT:
      localStorage.removeItem("token");
      return {
        ...state,
        user: null,
        token: null,
        isAuthenticated: false,
        loading: false,
        errorResponse: payload,
        successResponse: "",
        otpMessage: "",
      };

    case ALL_USERS:
      return {
        ...state,
        users: payload,
      };

    case REMOVE_ERROR:
      return {
        ...state,
        errorResponse: "",
        successResponse: "",
        otpMessage: "",
      };

    case CHANGE_PWD_FAIL:
      return {
        ...state,
        errorResponse: payload,
        successResponse: "",
      };

    // case GET_ALL_LEVELS:
    //   return {
    //     ...state,
    //     allLevels: payload,
    //   };

    // case GET_ALL_TENANTS:
    //   return {
    //     ...state,
    //     allTenants: payload,
    //   };
    // case GET_ALL_SETTINGS:
    //   return {
    //     ...state,
    //     allTenantSetting: payload,
    //   };

    case MONTH_EXP_CNT:
      return {
        ...state,
        monthExpCnt: payload,
      };
    case YEAR_EXP_CNT:
      return {
        ...state,
        yearExpCnt: payload,
      };
    case EXP_REPORT:
      return {
        ...state,
        expReport: payload,
      };
    case GET_ALL_USER:
      return {
        ...state,
        allUser: payload,
      };
    case FINAL_DATA_REP:
      return {
        ...state,
        finalDataRep: payload,
      };
    case OTP_SENT:
      return {
        ...state,
        otpMessage: payload,
        errorResponse: "",
        loading: false,
      };
    case SET_LOADING_TRUE:
      return {
        ...state,
        loading: true,
        otpMessage: "",
      };
    default:
      return state;
  }
};

export default auth;
