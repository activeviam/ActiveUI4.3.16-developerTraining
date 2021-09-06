/** @jsx jsx */
import {css, jsx} from '@emotion/core';
import {useDispatch} from 'react-redux';
import {useHistory} from 'react-router-dom';
import {useEffect} from 'react';

import _ from 'lodash';
import {Container, ContainerFullValue} from '@activeviam/activeui-sdk';

import {startPluginKey} from '../Start';
import {RoutePath} from './RoutePath';
import {onBookmarkChanged} from '../../state/events';

interface DashboardProps {
  bookmark: ContainerFullValue;
}

const isEmptyDashboard = (bookmark?: ContainerFullValue) => {
  if (!bookmark) {
    return false;
  }
  if (bookmark.id) {
    return false;
  }
  const pages = _.get(bookmark, ['value', 'body', 'pages']);
  return (
    pages && pages.length === 1 && _.isEqual(_.get(pages, [0, 'content']), [])
  );
};

// Check that the dashboard has 1 page with 1 widget being a "start" container
const isStartDashboard = (bookmark?: ContainerFullValue) => {
  if (!bookmark) {
    return false;
  }
  if (bookmark.id) {
    return false;
  }
  const pages = _.get(bookmark, ['value', 'body', 'pages']);
  return (
    pages &&
    pages.length === 1 &&
    pages[0] &&
    pages[0].content &&
    pages[0].content.length === 1 &&
    _.get(pages, [0, 'content', 0, 'bookmark', 'value', 'containerKey']) ===
      startPluginKey
  );
};

const Dashboard = function ({bookmark}: DashboardProps) {
  const dispatch = useDispatch();
  const history = useHistory();

  // FIXME: The bookmark state should be lifted instead of relying on this.
  // Make sure the title in the application header is in sync with the bookmark name.
  const bookmarkName = bookmark.name;
  useEffect(() => {
    dispatch(onBookmarkChanged({name: bookmarkName}));
  }, [bookmarkName, dispatch]);

  return (
    <div
      css={css`
        height: 100%;
        width: 100%;
      `}
    >
      <Container
        value={bookmark}
        onChange={(newBookmark: ContainerFullValue | undefined | null) => {
          // Ignore if this is undefined.
          // FIXME: Understand implications of this.
          if (!newBookmark) {
            return;
          }
          // Adapt the URL to the updated bookmark
          if (
            isEmptyDashboard(newBookmark) &&
            history.location.pathname !== RoutePath.NewDashboard
          ) {
            history.push(RoutePath.NewDashboard);
          } else if (
            isStartDashboard(newBookmark) &&
            history.location.pathname !== RoutePath.Start
          ) {
            history.push(RoutePath.Start);
          } else if (
            newBookmark &&
            newBookmark.id &&
            newBookmark.id !== bookmark.id
          ) {
            const isDashboard = newBookmark.value.containerKey === 'dashboard';
            const prefix = isDashboard ? 'dashboard' : 'widget';
            history.push(`/${prefix}/${newBookmark.id}`);
          }
          // Adapt the title in the application header
          dispatch(onBookmarkChanged(newBookmark));
        }}
      />
    </div>
  );
};
export default Dashboard;
