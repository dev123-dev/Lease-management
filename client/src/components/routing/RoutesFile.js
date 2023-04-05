import React from "react";
import { Route, Switch } from "react-router-dom";
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
const RoutesFile = () => {
  return (
    <section>
      <Switch>
        <PrivateRoute exact path="/AdminProfile" component={Profile} />
        <PrivateRoute
          exact
          path="/add-tenant-details"
          component={AddTenantDetails}
        />
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

export default RoutesFile;
