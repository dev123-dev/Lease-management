import React from "react";
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
import NoContent from "../layout/nocontent";
import UserActivityDetails from "../dashboard/UserActivityDetails";

//Report
import PropertyReport from "../reports/PropertyReport";
import RenewalReport from "../reports/RenewalReport";
import {
  getRoutesSetOldRecordsClicked,
  getRoutesSetCurrentYearMonthsRecordsClicked,
} from "../../actions/tenants";
import ContactReport from "../dashboard/ContactReport";
import MISReport from "../dashboard/MISReport";
import RenewedTenantReport from "../dashboard/RenewedTenantReport";
import RenewableTenantReport from "../dashboard/RenewableTenantReport";
import UnOccupiedUnits from "../dashboard/UnOccupiedUnits";

const RoutesFile = ({
  getRoutesSetOldRecordsClicked,
  getRoutesSetCurrentYearMonthsRecordsClicked,
}) => {
  const location = useLocation();

  // Extract the pathname from the location object
  //This is to handle the css selection of the months and the previous records to the current year
  if (
    location?.pathname === "/tenant-report" &&
    localStorage.getItem("monthSearch") !== ""
  ) {
    getRoutesSetOldRecordsClicked(false);
    getRoutesSetCurrentYearMonthsRecordsClicked(true);
  } else if (
    location?.pathname === "/tenant-report" &&
    localStorage.getItem("monthSearch") === ""
  ) {
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
        <PrivateRoute exact path="/contact-report" component={ContactReport} />
        <PrivateRoute exact path="/mis-report" component={MISReport} />
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
        <PrivateRoute
          exact
          path="/user-activity"
          component={UserActivityDetails}
        />
        <PrivateRoute
          exact
          path="/renewed-report"
          component={RenewedTenantReport}
        />
        <PrivateRoute
          exact
          path="/renewable-report"
          component={RenewableTenantReport}
        />
        <PrivateRoute
          exact
          path="/unoccupied-units"
          component={UnOccupiedUnits}
        />
        <PrivateRoute exact path="/route-driver" component={RouteDriver} />
        <PrivateRoute exact path="/nocontent" component={NoContent} />

        {/* Report Route */}
        <PrivateRoute
          exact
          path="/property-report"
          component={PropertyReport}
        />

        <PrivateRoute exact path="/renewal-report" component={RenewalReport} />

        <Route component={NotFound} />
      </Switch>
    </section>
  );
};

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, {
  getRoutesSetOldRecordsClicked,
  getRoutesSetCurrentYearMonthsRecordsClicked,
})(RoutesFile);
