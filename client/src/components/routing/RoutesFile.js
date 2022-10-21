import React from "react";
import { Route, Switch } from "react-router-dom";
import NotFound from "../layout/NotFound";

//user Section
import PrivateRoute from "./PrivateRoute";
import RouteDriver from "../dashboard/RouteDriver";

//DashBoard
import changePassword from "../auth/ChangePwd";

import AddTenantDetails from "../dashboard/AddTenantDetails";
import TenantSettings from "../dashboard/TenantSettings";
import TenantReport from "../dashboard/TenantReport";
import ShopDetails from "../dashboard/ShopDetails";
import AllUserDetails from "../dashboard/AllUserDetails";
import AllTenantShopDetails from "../dashboard/AllTenantShopDetails";
import AddShopDetails from "../dashboard/AddShopDetails";
import EditTenantDetails from "../dashboard/EditTenantDetails";

const RoutesFile = () => {
  return (
    <section>
      <Switch>
        <PrivateRoute
          exact
          path="/add-tenant-details"
          component={AddTenantDetails}
        />
        <PrivateRoute exact path="/tenant-report" component={TenantReport} />
        <PrivateRoute exact path="/tenant-setting" component={TenantSettings} />
        <PrivateRoute exact path="/shop-Details" component={ShopDetails} />
        <PrivateRoute exact path="/add-user" component={AllUserDetails} />

        <PrivateRoute
          exact
          path="/all-tenant-shop-Details"
          component={AllTenantShopDetails}
        />

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
