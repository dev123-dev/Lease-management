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
  SET_LOADING_TRUE,
  SET_LOADING_FALSE,
  FINAL_DATA_REP,
  FINAL_DATA_REP_YEAR,
} from "../actions/types";

const initialState = {
  token: localStorage.getItem("token"),
  isAuthenticated: null,
  loading: true,
  user: null,
  users: [],
  errorResponse: "",
  successResponse: "",
  monthExpCnt: [],
  yearExpCnt: [],
  expReport: [],
  finalDataRep: [],
  optName: [
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
  ],
};

const auth = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case USER_LOADED:
      localStorage.setItem("user", JSON.stringify(payload));

      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: payload,
        x: payload,
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
      return {
        ...state,
        errorResponse: "Invalid Email or Password",
      };
    case AUTH_ERROR:
    case LOGOUT:
      localStorage.removeItem("token");
      localStorage.clear();
      return {
        ...state,
        user: null,
        token: null,
        isAuthenticated: false,
        loading: false,
        errorResponse: payload, //"Invalid UserName or Password",
        successResponse: "",
        // otpMessage: "",
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
        //otpMessage: "",
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
    case FINAL_DATA_REP_YEAR:
      return {
        ...state,
        finalDataRep: payload,
      };
    // case OTP_SENT:
    //   return {
    //     ...state,
    //     otpMessage: payload,
    //     errorResponse: "",
    //     loading: false,
    //   };
    case SET_LOADING_TRUE:
      return {
        ...state,
        loading: true,
      };
    case SET_LOADING_FALSE:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
};

export default auth;
