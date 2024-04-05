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
import setAuthToken from "../utils/setAuthToken";

// var linkPath = process.env.REACT_APP_BASE_URL;
var linkPath = "";

export const getPropertyReport = () => async (dispatch) => {
  try {
    console.log("hello");
  } catch (err) {
    dispatch({
      type: AUTH_ERROR,
    });
  }
};
