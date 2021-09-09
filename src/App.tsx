import React from 'react';
import {
  createActiveUI,
  ActiveUIProvider,
  DisplayMode,
} from '@activeviam/activeui-sdk';
import {Provider} from 'react-redux';
import _ from 'lodash';

import {StartCustomContainerPlugin} from './components/Start';
import MyCustomDashboardPlugin from "./custom/dashboards/CustomDashboard";
import {enhancedChart} from "./custom/widgets/initialWidgets/enhancedChart";
import {enhancedPivotTable} from "./custom/widgets/initialWidgets/enhancedPivotTable";
import {enhancedTabular} from "./custom/widgets/initialWidgets/enhancedTabular";
import {store} from './state/store';
import {startBookmark} from './configurations/startBookmark';
import LoadingOrApp from './LoadingOrApp';
import {OpenContentEditorPlugin} from './components/OpenContentEditor';
import {serializedShareAction} from './components/header/file/SubMenu';
import {contentEditorConfigurationSettingKey} from './components/drawers/contentEditor/ContentEditor';
import {
  activeMonitorServerUrl,
  activePivotServerUrl,
  contentServerUrl,
} from './env';

const activeUI = createActiveUI({
  // Create React App handles uncaught errors in development only, not in production.
  // So in production we let ActiveUI SDK notify users of such errors, to make sure they are reported.
  notifyUncaughtExceptions: process.env.NODE_ENV === 'production',
  fetchTranslation: async (locale: string) => {
    const [coreTranslation, projectTranslation] = await Promise.all([
      import(`@activeviam/activeui-sdk/locales/${locale}.json`),
      import(`./translations/${locale}.json`)
    ]);

    //TODO:  Ex4 - Add custom translation for the container of the custom dashboard
    return _.merge({}, coreTranslation, projectTranslation, {
      "bookmarks.new.myCustomContainer.title": "My Dashboard",
      "bookmarks.new.myCustomContainer.description":
          "Custom dashboard exercise",
    });

  },
  defaultSettings: {
    'application.defaultDisplayMode': DisplayMode.VIEW,
    enforceViewModeOnReadonlyBookmark: true,
    'application.home.fallback': startBookmark('Start page'),
    'dashboard.actions': [],
    'dashboard.quickActions': [],
    'bookmarks.favorites.discovery-tree.hidden': true,
    'bookmarks.favorites.content-editor.hidden': true,
    'bookmarks.favorites.style-editor.hidden': true,
    'bookmarks.favorites.state-editor.hidden': true,
    'bookmark-tree.handlers.contextmenu': [
      'rename-server',
      'delete-server',
      'separator',
      'create-folder',
      'separator',
      'load-bookmark',
      'rename-bookmark',
      'move-bookmark',
      serializedShareAction,
      'add-to-favorites',
      'separator',
      'open-widget-to-modify',
      'make-home-page',
      'bookmark-state-editor',
      'separator',
      'delete-bookmark',
    ],
    [contentEditorConfigurationSettingKey]: {
      autoSwitchToFieldsOnEmptyWidget: true,
    },
    'placeholder.handlers.click': ['open-content-editor'],
    'userFilters.enabled': true,
    // Custom, enhanced widgets used in Ex5
    "bookmarks.favorites.enhanced-tabular": enhancedTabular,
    "bookmarks.favorites.enhanced-pivot-table": enhancedPivotTable,
    "bookmarks.favorites.enhanced-chart": enhancedChart,
  },
  plugins: {
    // TODO: Ex4 - add your custom container to the project
    container: [StartCustomContainerPlugin, MyCustomDashboardPlugin],
    action: [OpenContentEditorPlugin],
  },
});

const servers = activeUI.queries.serversPool;

servers.addActivePivotServer({
  url: activePivotServerUrl,
  activeMonitorServer: activeMonitorServerUrl
    ? servers.addActiveMonitorServer({
        url: activeMonitorServerUrl,
      })
    : undefined,
  contentServer: servers.addContentServer({url: contentServerUrl}),
});

export default function App() {
  return (
    <Provider store={store}>
      <ActiveUIProvider activeUI={activeUI}>
        <LoadingOrApp />
      </ActiveUIProvider>
    </Provider>
  );
}
