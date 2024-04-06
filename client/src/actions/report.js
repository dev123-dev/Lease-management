import axios from "axios";
import { setAlert } from "./alert";

import {
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  ADD_USER_INIT,
  CHANGE_PWD_FAIL,
  REMOVE_ERROR,
  ALL_USERS,
  GET_ALL_USER,
  LOGOUT,
  SET_LOADING_TRUE,
  SET_LOADING_FALSE,
} from "./types";
const config = {
  headers: {
    "Content-Type": "application/json",
  },
};

// var linkPath = process.env.REACT_APP_BASE_URL;
var linkPath = "";

export const getPropertyReport = (data) => async (dispatch) => {
  console.log("dataaction",data)
  try {
    const res = await axios.post(`${linkPath}/api/report/getPropertyReport`,data);
    dispatch({
      type: "PROPERTY_REPORT_LIST",
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: AUTH_ERROR,
    });
  }
};
