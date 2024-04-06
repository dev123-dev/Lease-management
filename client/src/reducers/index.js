import { combineReducers } from "redux";
import alert from "./alert";
import auth from "./auth";
import tenants from "./tenants";
import report from "./report";
export default combineReducers({
  alert,
  auth,
  tenants,
  report,
});
