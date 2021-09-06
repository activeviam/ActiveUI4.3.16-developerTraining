import {configureStore} from '@reduxjs/toolkit';
import {
  selectedDrawerReducer,
  SelectedDrawerState,
} from './selectedDrawerReducer';
import {
  dashboardTitleReducer,
  DashboardTitleState,
} from './dashboardTitleReducer';

export interface State {
  selectedDrawer: SelectedDrawerState;
  title: DashboardTitleState;
}

const getPreloadedState = (): Partial<State> => {
  const selectedDrawerJson = localStorage.getItem('selected-drawer');
  const selectedDrawer =
    selectedDrawerJson !== null ? JSON.parse(selectedDrawerJson) : undefined;
  return {
    selectedDrawer,
  };
};

export const store = configureStore({
  reducer: {
    selectedDrawer: selectedDrawerReducer,
    title: dashboardTitleReducer,
  },
  // Load saved state.
  preloadedState: getPreloadedState(),
});

// Save some of the state before the window unloads.
window.addEventListener('beforeunload', () => {
  const state = store.getState();
  localStorage.setItem('selected-drawer', JSON.stringify(state.selectedDrawer));
});
