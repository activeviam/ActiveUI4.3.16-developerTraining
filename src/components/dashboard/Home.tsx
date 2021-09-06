import React from 'react';
import {Redirect} from 'react-router-dom';
import DashboardLoadingBackground from './DashboardLoadingBackground';
import useSetting from '../../hooks/useSetting';
import {RoutePath} from './RoutePath';

const Home = function () {
  const homeBookmarkId = useSetting('application.home');
  if (homeBookmarkId === null) {
    return <DashboardLoadingBackground />;
  }
  return (
    <Redirect
      to={homeBookmarkId ? `/dashboard/${homeBookmarkId}` : RoutePath.Start}
    />
  );
};

export default Home;
