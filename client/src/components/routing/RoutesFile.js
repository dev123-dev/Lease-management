import React, { useEffect } from "react";
import { Route, Switch, useLocation } from "react-router-dom";
import { connect } from "react-redux";
import NotFound from "../layout/NotFound";

//user Section
import PrivateRoute from "./PrivateRoute";
import RouteDriver from "../dashboard/RouteDriver";

//DashBoard
import changePassword from "../auth/ChangePwd";
import RenewalorgAgreement from "../dashboard/RenewalorgAgreementPage";
import AddTenantDetails from "../dashboard/AddTenantDetails";
import TenantSettings from "../dashboard/TenantSettings";
import TenantReport from "../dashboard/TenantReport";

import AddShopDetails from "../dashboard/AddShopDetails";
import EditTenantDetails from "../dashboard/EditTenantDetails";
import AddOrgDashBoard from "../dashboard/AddOrgDashBoard";
import SuperDashboard from "../dashboard/SuperUserDashboard";
import RenewalOrg_mainPage from "../dashboard/RenewalOrg_model";
import MainSuperPage from "../dashboard/MainSuperPage";
import Tenant_Details from "../dashboard/Tenant_Details";
import AddOrgModal from "../dashboard/AddOrgModal";
import PropertyDetail from "../dashboard/PropertyDetail";
import UserDetails from "../dashboard/UserDetails";
import MainAdmin from "../dashboard/MainAdminPage";
import AddAdminModal from "../dashboard/AddAdminUserModal";
import OrganizationFilter from "../dashboard/OrganizationFilter";
import OrganizationReport from "../dashboard/OrganizationReport";
import Profile from "../dashboard/Profile";
import AllReport from "../dashboard/AllReport";
import locationReport from "../dashboard/locationReport";
import BuildingReport from "../dashboard/BuildingReport";

import {
  getRoutesSetOldRecordsClicked,
  getRoutesSetCurrentYearMonthsRecordsClicked
} from "../../actions/tenants";

const RoutesFile = ({
  getRoutesSetOldRecordsClicked,
  getRoutesSetCurrentYearMonthsRecordsClicked
}) => {
  const location = useLocation();
  // Extract the pathname from the location object
  //This is to handle the css selection of the months and the previous records to the current year
  if (location?.pathname === "/tenant-report" && localStorage.getItem("monthSearch") !== "") {
    getRoutesSetOldRecordsClicked(false);
    getRoutesSetCurrentYearMonthsRecordsClicked(true);
  } else if (location?.pathname === "/tenant-report" && localStorage.getItem("monthSearch") === "") {
    getRoutesSetOldRecordsClicked(true);
    getRoutesSetCurrentYearMonthsRecordsClicked(false);
  } else {
    getRoutesSetOldRecordsClicked(false);
    getRoutesSetCurrentYearMonthsRecordsClicked(false);
  }

  return (
    <section>
      <Switch>
        <PrivateRoute exact path="/AdminProfile" component={Profile} />
        <PrivateRoute
          exact
          path="/add-tenant-details"
          component={AddTenantDetails}
        />
        <PrivateRoute exact path="/BuildingReport" component={BuildingReport} />
        <PrivateRoute exact path="/Report" component={AllReport} />
        <PrivateRoute exact path="/LocationReport" component={locationReport} />
        <PrivateRoute exact path="/tenant-report" component={TenantReport} />
        <PrivateRoute
          exact
          path="/Organization-report"
          component={OrganizationReport}
        />
        <PrivateRoute
          exact
          path="/Organization-filter"
          component={OrganizationFilter}
        />
        <PrivateRoute exact path="/PropertyDetail" component={PropertyDetail} />
        <PrivateRoute
          exact
          path="/Renewal-Org"
          component={RenewalorgAgreement}
        />

        <PrivateRoute exact path="/AddOrganization" component={AddOrgModal} />
        <PrivateRoute exact path="/tenant-detail" component={Tenant_Details} />

        <PrivateRoute exact path="/AddAdmin" component={AddAdminModal} />
        <PrivateRoute exact path="/MainSuper" component={MainSuperPage} />
        <PrivateRoute
          exact
          path="/Renewal_2nd"
          component={RenewalOrg_mainPage}
        />

        <PrivateRoute exact path="/Super" component={AddOrgDashBoard} />
        <PrivateRoute exact path="/SuperUser" component={SuperDashboard} />
        <PrivateRoute exact path="/AdminUser" component={UserDetails} />
        <PrivateRoute exact path="/tenant-setting" component={TenantSettings} />

        <PrivateRoute exact path="/MainAdmin" component={MainAdmin} />

        <PrivateRoute
          exact
          path="/shop-Details-add"
          component={AddShopDetails}
        />
        <PrivateRoute
          exact
          path="/change-password"
          component={changePassword}
        />
        <PrivateRoute
          exact
          path="/edit-tenant-details"
          component={EditTenantDetails}
        />
        <PrivateRoute exact path="/route-driver" component={RouteDriver} />
        <Route component={NotFound} />
      </Switch>
    </section>
  );
};

const mapStateToProps = (state) => ({

});

export default connect(mapStateToProps, {
  getRoutesSetOldRecordsClicked,
  getRoutesSetCurrentYearMonthsRecordsClicked
})(RoutesFile);
