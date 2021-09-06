/** @jsx jsx */
import {jsx} from '@emotion/core';
import {HashRouter as Router} from 'react-router-dom';
import {useSelector} from 'react-redux';
import {createUseStatePersisted} from 'use-persisted';
import _ from 'lodash';

import {useKeyboardShortcuts} from '../hooks/useKeyboardShortcuts';
import {getTitle} from '../state/dashboardTitleReducer';
import {
  getIsSelectedDrawerOpen,
  getSelectedDrawer,
} from '../state/selectedDrawerReducer';

import ActiveDrawer from './drawers/activeDrawer';
import SplitPane from './SplitPane';
import LeftBar from './leftBar/LeftBar';
import Header from './header/Header';
import DashboardBasedOnURL from './dashboard/DashboardBasedOnURL';
import {DrawerKey} from './drawers/availableDrawers';

const headerHeight = 46;
const minDrawerWidth = 250;
const defaultDrawerWidth = 300;
export const leftBarWidth = 46;

const useStatePersisted = createUseStatePersisted('drawer-widths');

export const AuthenticatedApp = () => {
  useKeyboardShortcuts();

  const selectedDrawer: DrawerKey | null = useSelector(getSelectedDrawer);

  const title = useSelector(getTitle);
  const isSelectedDrawerOpen = useSelector(getIsSelectedDrawerOpen);

  const [drawerWidths, setDrawerWidths] = useStatePersisted<{
    [key: string]: number;
  }>(_.mapValues(DrawerKey, () => defaultDrawerWidth));

  let selectedDrawerWidth = defaultDrawerWidth;
  if (selectedDrawer !== null && drawerWidths[selectedDrawer] !== undefined) {
    selectedDrawerWidth = drawerWidths[selectedDrawer];
  }

  return (
    <div css={{height: '100%'}}>
      <Router>
        {/* Hash router expects a single child https://reacttraining.com/react-router/web/api/HashRouter/children-node */}
        <div>
          <Header height={headerHeight} title={title} />
          <SplitPane
            allowResize={isSelectedDrawerOpen}
            onDragFinished={(width: number) => {
              if (selectedDrawer === null) {
                return;
              }
              setDrawerWidths({...drawerWidths, [selectedDrawer]: width});
            }}
            minSize={
              selectedDrawer ? leftBarWidth + minDrawerWidth : leftBarWidth
            }
            size={selectedDrawer ? selectedDrawerWidth : leftBarWidth}
            style={{height: `calc(100% - ${headerHeight}px)`}}
          >
            <div css={{height: '100%', display: 'flex'}}>
              <LeftBar />
              <ActiveDrawer />
            </div>
            <div
              css={{
                height: '100%',
                width: '100%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <DashboardBasedOnURL />
            </div>
          </SplitPane>
        </div>
      </Router>
    </div>
  );
};
