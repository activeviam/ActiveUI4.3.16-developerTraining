/** @jsx jsx */
import {jsx} from '@emotion/core';
import {useSelector} from 'react-redux';
import {useState} from 'react';

import {leftBarWidth} from '../AuthenticatedApp';
import {
  getSelectedDrawer,
  getIsSelectedDrawerOpen,
} from '../../state/selectedDrawerReducer';

import {availableDrawers, DrawerKey} from './availableDrawers';
import {DrawerSection} from './widgets/Widgets';

const ActiveDrawer = () => {
  const [
    widgetsDrawerActiveSections,
    setWidgetsDrawerActiveSections,
  ] = useState([DrawerSection.defaultWidgets]);
  const selectedDrawer: DrawerKey | null = useSelector(getSelectedDrawer);
  const isSelectedDrawerOpen = useSelector(getIsSelectedDrawerOpen);

  const SelectedDrawer =
    isSelectedDrawerOpen &&
    selectedDrawer !== null &&
    availableDrawers[selectedDrawer].Drawer;

  const selectedDrawerProps =
    selectedDrawer === 'widgets'
      ? {
          activeSections: widgetsDrawerActiveSections,
          onActiveSectionsChange: setWidgetsDrawerActiveSections,
        }
      : undefined;

  return SelectedDrawer ? (
    <div
      css={{width: `calc(100% - ${leftBarWidth}px)`}}
      data-testid={`ActiveDrawer:${selectedDrawer}`}
    >
      <SelectedDrawer {...selectedDrawerProps} />
    </div>
  ) : null;
};

export default ActiveDrawer;
