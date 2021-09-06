import React from 'react';
import {useParams} from 'react-router-dom';

import Dashboard from './Dashboard';
import DashboardLoadingBackground from './DashboardLoadingBackground';
import useSavedBookmark from '../../hooks/useSavedBookmark';
import ErrorPage from './ErrorPage';
import {useActiveUI, ContainerFullValue} from '@activeviam/activeui-sdk';

const SavedDashboard = function () {
  const {bookmarkId} = useParams();
  const {bookmark, isFetched} = useSavedBookmark(bookmarkId);
  const activeUI = useActiveUI();
  const translator = activeUI.i18n.getTranslator();
  if (!isFetched) {
    return <DashboardLoadingBackground />;
  } else if (bookmark === undefined) {
    return (
      <ErrorPage
        reason={translator.format('project.invalidUrl.reason.unknownBookmark')}
      />
    );
  } else if (bookmark.type !== 'container') {
    return (
      <ErrorPage
        reason={translator.format('project.invalidUrl.reason.wrongType')}
      />
    );
  }
  return <Dashboard bookmark={bookmark as ContainerFullValue} />;
};

export default SavedDashboard;
