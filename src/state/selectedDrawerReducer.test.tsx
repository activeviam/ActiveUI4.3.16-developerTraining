import {DrawerKey} from '../components/drawers/availableDrawers';
import {selectedDrawerReducer} from './selectedDrawerReducer';
import {
  onClickedDrawerIcon,
  onClickedOpenContentEditor,
  onCreatedDashboard,
  onClickedOpenDashboardOnStartPage,
  onToggledDrawerWithKeyboardShortcut,
} from './events';

test('opens the drawer on click', () => {
  const event = onClickedDrawerIcon(DrawerKey.widgets);
  expect(selectedDrawerReducer(DrawerKey.dashboards, event)).toBe(
    DrawerKey.widgets,
  );
});

test('closes the drawer on click if already open', () => {
  const event = onClickedDrawerIcon(DrawerKey.dashboards);
  expect(selectedDrawerReducer(DrawerKey.dashboards, event)).toBe(null);
});

test('opens the drawer using keyboard shortcuts', () => {
  const event = onToggledDrawerWithKeyboardShortcut(DrawerKey.widgets);
  expect(selectedDrawerReducer(undefined, event)).toBe(DrawerKey.widgets);
});

test('opens the content editor', () => {
  const event = onClickedOpenContentEditor();
  expect(selectedDrawerReducer(undefined, event)).toBe(DrawerKey.contentEditor);
});

test('keeps the content editor active', () => {
  const action = onClickedOpenContentEditor();
  expect(selectedDrawerReducer(DrawerKey.contentEditor, action)).toBe(
    DrawerKey.contentEditor,
  );
});

test('opens the widgets drawer when user creates dashboard', () => {
  const event = onCreatedDashboard();
  expect(selectedDrawerReducer(undefined, event)).toBe(DrawerKey.widgets);
});

test('keeps the widgets drawer active', () => {
  const event = onCreatedDashboard();
  expect(selectedDrawerReducer(DrawerKey.widgets, event)).toBe(
    DrawerKey.widgets,
  );
});

test('opens the dashboards drawer when user clicks to open dashboard', () => {
  const event = onClickedOpenDashboardOnStartPage();
  expect(selectedDrawerReducer(undefined, event)).toBe(DrawerKey.dashboards);
});

test('keeps the dashboards drawer active', () => {
  const action = onClickedOpenDashboardOnStartPage();
  expect(selectedDrawerReducer(DrawerKey.dashboards, action)).toBe(
    DrawerKey.dashboards,
  );
});
