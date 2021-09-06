import {createReducer, createSelector} from '@reduxjs/toolkit';

import {DrawerKey} from '../components/drawers/availableDrawers';

import {
  onClickedOpenContentEditor,
  onClickedOpenDashboardOnStartPage,
  onCreatedDashboard,
  onClickedDrawerIcon,
  onToggledDrawerWithKeyboardShortcut,
} from './events';

export type SelectedDrawerState = DrawerKey | null;
export const initialState: SelectedDrawerState = null;

const toggleDrawer = (
  state: SelectedDrawerState,
  event: {payload: DrawerKey | null},
) => {
  if (event.payload !== state) {
    // If drawer is not currently selected or open,
    // it becomes the selected drawer.
    return event.payload;
  }
  // If drawer is already open, we close it.
  return null;
};

export const selectedDrawerReducer = createReducer<SelectedDrawerState>(
  initialState,
  (builder) =>
    builder
      .addCase(onClickedDrawerIcon, toggleDrawer)
      .addCase(onToggledDrawerWithKeyboardShortcut, toggleDrawer)
      .addCase(onCreatedDashboard, () => DrawerKey.widgets)
      .addCase(onClickedOpenDashboardOnStartPage, () => DrawerKey.dashboards)
      .addCase(onClickedOpenContentEditor, () => DrawerKey.contentEditor),
);

export const getSelectedDrawer = (state: {
  selectedDrawer: SelectedDrawerState;
}) => state.selectedDrawer;

export const getIsSelectedDrawerOpen = createSelector(
  getSelectedDrawer,
  (selectedDrawer) => selectedDrawer !== undefined && selectedDrawer !== null,
);
