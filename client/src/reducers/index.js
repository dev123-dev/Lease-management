import { combineReducers } from "redux";
import alert from "./alert";
import auth from "./auth";
import tenants from "./tenants";
export default combineReducers({
  alert,
  auth,
  tenants,
});
