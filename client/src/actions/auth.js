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

 } from "./types";
import setAuthToken from "../utils/setAuthToken";

<<<<<<< HEAD
// var linkPath = process.env.REACT_APP_BASE_URL;
=======
>>>>>>> b64c2bb7f829b01ebac57cfc09ff334c618c8a47
var linkPath = "";

// Login User
export const login = (useremail, password) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify({ useremail, password});
  // console.log("useremail", useremail);
  // console.log("useremail", useremail);
  try {
<<<<<<< HEAD
    const res = await axios.post(`${linkPath}/api/auth/login`, body, config);
=======
    const res = await axios.post(
      `${linkPath}/api/auth/login`,
      body,
      config
    );
>>>>>>> b64c2bb7f829b01ebac57cfc09ff334c618c8a47
    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data,
    });
  } catch (err) {
    // const errors = err.response.data.errors;
    dispatch({
      type: LOGIN_FAIL,
      // payload: errors[0].msg,
    });
  }
};

// export const sendOTP = (useremail, password) => async (dispatch) => {
//   const config = {
//     headers: {
//       "Content-Type": "application/json",
//     },
//   };
//   dispatch({
//     type: SET_LOADING_TRUE,
//   });

  //const body = JSON.stringify({ useremail, password });

<<<<<<< HEAD
  try {
    const res = await axios.post(
      `${linkPath}/api/auth/send_email-otp`,
      body,
      config
    );
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
=======
//   try {
//     const res = await axios.post(
//       `${linkPath}/api/auth/send_email-otp`,
//       body,
//       config
//     );
//     dispatch({
//       type: OTP_SENT,
//       payload: res.data,
//     });
//   } catch (err) {
//     const errors = err.response.data.errors;
//     dispatch({
//       type: LOGIN_FAIL,
//       payload: errors[0].msg,
//     });
//   }
// };
>>>>>>> b64c2bb7f829b01ebac57cfc09ff334c618c8a47

// Load User
export const loadUser = () => async (dispatch) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  try {
<<<<<<< HEAD
    const res = await axios.get(`${linkPath}/api/auth/load-user`);
=======
    const res = await axios.get(
      `${linkPath}/api/auth/load-user`
    );
>>>>>>> b64c2bb7f829b01ebac57cfc09ff334c618c8a47
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
<<<<<<< HEAD
    const res = await axios.get(`${linkPath}/api/auth/all-users`);
=======
    const res = await axios.get(
      `${linkPath}/api/auth/all-users`
    );
>>>>>>> b64c2bb7f829b01ebac57cfc09ff334c618c8a47
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
    await axios.post(
      `${linkPath}/api/auth/add-user-details`,
      finalData,
      config
    );
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
    const res = await axios.post(
      `${linkPath}/api/auth/filter-users`,
      finalData,
      config
    );
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
    const res = await axios.post(
      `${linkPath}/api/auth/change-pwd`,
      formData,
      config
    );
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
