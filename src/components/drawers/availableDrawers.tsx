import Dashboards from './dashboards/Dashboards';
import {DashboardsIcon} from './dashboards/DashboardsIcon';
import Widgets from './widgets/Widgets';
import {WidgetsIcon} from './widgets/WidgetsIcon';
import ContentEditor from './contentEditor/ContentEditor';
import {ContentEditorIcon} from './contentEditor/ContentEditorIcon';
import StateEditor from './stateEditor/StateEditor';
import {StateEditorIcon} from './stateEditor/StateEditorIcon';
import {DisplayMode} from '@activeviam/activeui-sdk';
import {FiltersIcon} from './contentEditor/FiltersIcon';
import StyleEditor from './styleEditor/StyleEditor';
import {StyleEditorIcon} from './styleEditor/StyleEditorIcon';

export enum DrawerKey {
  dashboards = 'dashboards',
  widgets = 'widgets',
  contentEditor = 'contentEditor',
  stateEditor = 'stateEditor',
  filters = 'filters',
  styleEditor = 'styleEditor',
}

export type DrawerDescription = {
  Drawer: React.ComponentType<any>;
  Icon: React.ComponentType<any>;
  isVisible: (viewMode: DisplayMode) => boolean;
};

type AvailableDrawers = {
  [key in DrawerKey]: DrawerDescription;
};

const visibleIfEditMode = (mode: DisplayMode) => mode === DisplayMode.EDIT;
const visibleIfViewMode = (mode: DisplayMode) => mode === DisplayMode.VIEW;

export const availableDrawers: AvailableDrawers = {
  dashboards: {
    Drawer: Dashboards,
    Icon: DashboardsIcon,
    isVisible: () => true,
  },
  widgets: {
    Drawer: Widgets,
    Icon: WidgetsIcon,
    isVisible: visibleIfEditMode,
  },
  contentEditor: {
    Drawer: ContentEditor,
    Icon: ContentEditorIcon,
    isVisible: visibleIfEditMode,
  },
  filters: {
    Drawer: ContentEditor,
    Icon: FiltersIcon,
    isVisible: visibleIfViewMode,
  },
  styleEditor: {
    Drawer: StyleEditor,
    Icon: StyleEditorIcon,
    isVisible: visibleIfEditMode,
  },
  stateEditor: {
    Drawer: StateEditor,
    Icon: StateEditorIcon,
    isVisible: visibleIfEditMode,
  },
};
