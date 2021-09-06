import React from 'react';

import useSetting from '../../hooks/useSetting';
import Dashboard from './Dashboard';
import DashboardLoadingBackground from './DashboardLoadingBackground';
import {ContainerFullValue} from '@activeviam/activeui-sdk';

function StartDashboard() {
  const startBookmark = useSetting('application.home.fallback');
  if (startBookmark === null) {
    return <DashboardLoadingBackground />;
  }
  return <Dashboard bookmark={startBookmark as ContainerFullValue} />;
}

export default StartDashboard;
