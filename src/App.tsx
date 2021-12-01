import {ActiveUIProvider, createActiveUI,} from '@activeviam/activeui-sdk';
import _ from 'lodash';
import React from 'react';
import {Provider} from 'react-redux';
import {contentEditorConfigurationSettingKey} from './components/drawers/contentEditor/ContentEditor';
import {OpenContentEditorPlugin} from './components/OpenContentEditor';

import {StartCustomContainerPlugin} from './components/Start';
import {startBookmark} from './configurations/startBookmark';
import {bookmarkTreeHandlersContextMenu} from "./custom/configurations/bookmarkTree";
import MyCustomDashboardPlugin from "./custom/dashboards/CustomDashboard";
import {countKpi} from "./custom/plugins/CountKpiRenderer";
import {showSingleValue} from "./custom/plugins/SingleValueAction";
import {enhancedChart} from "./custom/widgets/initialWidgets/enhancedChart";
import {
  enhancedPivotTable,
  enhancedPivotTableHandlersContextMenu
} from "./custom/widgets/initialWidgets/enhancedPivotTable";
import {enhancedTabular, enhancedTabularHandlersContextMenu} from "./custom/widgets/initialWidgets/enhancedTabular";
import {activeMonitorServerUrl, activePivotServerUrl, contentServerUrl,} from './env';
import LoadingOrApp from './LoadingOrApp';
import {store} from './state/store';


let defaultSettings = {
  // default settings from sandboxes
  "application.home.fallback": startBookmark("Start page"),
  "dashboard.actions": [],
  "dashboard.quickActions": [],
  "bookmarks.favorites.discovery-tree.hidden": true,
  "bookmarks.favorites.content-editor.hidden": true,
  "bookmarks.favorites.state-editor.hidden": true,
  "bookmark-tree.handlers.contextmenu": bookmarkTreeHandlersContextMenu,
  [contentEditorConfigurationSettingKey]: {
    autoSwitchToFieldsOnEmptyWidget: true,
  },
  "placeholder.handlers.click": ["open-content-editor"],
  // settings for default context menus
  "tabular-view.handlers.contextmenu": enhancedTabularHandlersContextMenu,
  "pivot-table.handlers.contextmenu": enhancedPivotTableHandlersContextMenu,
  // Hide the default table/pivot widgets and make our own better ones
  "bookmarks.favorites.tabular-view.hidden": true,
  "bookmarks.favorites.pivot-table.hidden": true,
  "bookmarks.favorites.chart.hidden": true,
  // Custom, enhanced widgets
  "bookmarks.favorites.enhanced-tabular": enhancedTabular,
  "bookmarks.favorites.enhanced-pivot-table": enhancedPivotTable,
  "bookmarks.favorites.enhanced-chart": enhancedChart,

  showLegacyCharts: true,
  showLegacyMaps: true,
  // 5.6.1 TODO: register filterOnClickPlugin key for chart.handlers.click
  // refer to https://activeviam.com/activeui/documentation/4.3.16/dev/reference/settings.html#charthandlersclick

};

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
    //TODO: Ex5 - Add translation for your custom action
    return _.merge({}, coreTranslation, projectTranslation, {
      "bookmarks.new.myCustomContainer.title": "My Dashboard",
      "bookmarks.new.myCustomContainer.description": "Custom dashboard exercise",
      "showPnLDiffBetweenDesks": "show as singleValue",
    });

  },
  defaultSettings: defaultSettings,
  plugins: {
    // TODO: Ex4 - add your custom container to the project
    container: [
        StartCustomContainerPlugin,
        MyCustomDashboardPlugin
    ],
    action: [
        OpenContentEditorPlugin,
        showSingleValue
    ],
    "cell-renderer":[countKpi]
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
