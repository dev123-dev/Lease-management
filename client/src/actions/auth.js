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
  OTP_SENT,
  SET_LOADING_TRUE,
} from "./types";
import setAuthToken from "../utils/setAuthToken";

// Login User
export const login = (useremail, password, userOTP) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify({ useremail, password, userOTP });

  try {
    const res = await axios.post("/api/auth/login", body, config);
    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data,
    });
  } catch (err) {
    const errors = err.response.data.errors;
    dispatch({
      type: LOGIN_FAIL,
      payload: errors[0].msg,
    });
  }
};

export const sendOTP = (useremail, password) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  dispatch({
    type: SET_LOADING_TRUE,
  });

  const body = JSON.stringify({ useremail, password });

  try {
    const res = await axios.post("/api/auth/send_email-otp", body, config);
    dispatch({
      type: OTP_SENT,
      payload: res.data,
    });
  } catch (err) {
    const errors = err.response.data.errors;
    dispatch({
      type: LOGIN_FAIL,
      payload: errors[0].msg,
    });
  }
};

// Load User
export const loadUser = () => async (dispatch) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  try {
    const res = await axios.get("/api/auth/load-user");
    dispatch({
      type: USER_LOADED,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: AUTH_ERROR,
    });
  }
};

// Get All Users
export const getAllUsers = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/auth/all-users");
    dispatch({
      type: GET_ALL_USER,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: AUTH_ERROR,
    });
  }
};

export const AddUserDetailsform = (finalData) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    await axios.post("/api/auth/add-user-details", finalData, config);
    dispatch({
      type: ADD_USER_INIT,
    });
    dispatch(getAllUsers());
  } catch (err) {
    dispatch({
      type: AUTH_ERROR,
    });
  }
};

// Get user names based on search filter
export const getSearchUsersByFilter = (finalData) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  try {
    const res = await axios.post("/api/auth/filter-users", finalData, config);
    dispatch({
      type: ALL_USERS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: AUTH_ERROR,
    });
  }
};

// Change Password
export const changePwd = (formData) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  try {
    const res = await axios.post("/api/auth/change-pwd", formData, config);
    dispatch({
      type: LOGOUT,
    });
    dispatch(setAlert(res.data.msg, "danger"));
  } catch (err) {
    const errors = err.response.data.errors;
    dispatch({
      type: CHANGE_PWD_FAIL,
      payload: errors[0].msg,
    });
  }
};

// Logout
export const logout = () => async (dispatch) => {
  dispatch({ type: LOGOUT });
};

// remove error
export const removeError = () => async (dispatch) => {
  dispatch({ type: REMOVE_ERROR });
};
