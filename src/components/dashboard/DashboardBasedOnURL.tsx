import React from 'react';
import {Switch, Route} from 'react-router-dom';

import Home from './Home';
import SavedDashboard from './SavedDashboard';
import NewDashboard from './NewDashboard';
import StartDashboard from './StartDashboard';
import ErrorPage from './ErrorPage';
import {RoutePath} from './RoutePath';

const DashboardBasedOnURL = function () {
  return (
    <Switch>
      <Route exact={true} path={RoutePath.Home}>
        <Home />
      </Route>
      <Route exact={true} path={RoutePath.NewDashboard}>
        <NewDashboard />
      </Route>
      <Route exact={true} path={RoutePath.Start}>
        <StartDashboard />
      </Route>
      <Route path={RoutePath.SavedBookmark}>
        <SavedDashboard />
      </Route>
      <Route path={RoutePath.Any}>
        <ErrorPage />
      </Route>
    </Switch>
  );
};

export default DashboardBasedOnURL;
