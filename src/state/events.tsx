import {createAction} from '@reduxjs/toolkit';
import {DrawerKey} from '../components/drawers/availableDrawers';

export const onClickedOpenDashboardOnStartPage = createAction(
  'clickedOpenDashboardOnStartPage',
);

export const onCreatedDashboard = createAction('createdDashboard');

export const onClickedOpenContentEditor = createAction(
  'clickedOpenContentEditor',
);

export const onToggledDrawerWithKeyboardShortcut = createAction<DrawerKey>(
  'toggledDrawerWithKeyboardShortcut',
);

export const onClickedDrawerIcon = createAction<DrawerKey | null>(
  'clickedDrawerIcon',
);

/**
 * This event only requires the name. It should be dispatched when the current bookmark changes.
 */
export const onBookmarkChanged = createAction<{name: string}>(
  'bookmarkChanged',
);
